import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBasket, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import Sidebar from "./Sidebar";
import AddListDialog from "./AddListDialogue";
import { logoutUser } from "../../services/authService";
import { deleteList, getListsByCategory } from "../../services/listService";
import { getItemsByList, updateItem } from "../../services/itemService";

export default function MainPage() {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedCategory) {
      fetchLists(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchLists = async (categoryId) => {
    setLoading(true);
    try {
      const listData = await getListsByCategory(categoryId);
      for (const list of listData) {
        const fetchedItems = await getItemsByList(list.id);
        list["items"] = fetchedItems;
      }
      setLists(listData);
    } catch (error) {
      console.error("Error fetching lists or items:", error.message);
    }
    setLoading(false);
  };

  const handleRemoveList = async (listId) => {
    const isRemoved = await deleteList(listId);
    if (isRemoved) {
      const newLists = lists.filter((list) => list.id !== listId);
      setLists(newLists);
    } else {
      console.error("Error removing list");
    }
  };

  const toggleItem = async (listId, itemId) => {
    console.log("Cliccckeedd");
    try {
      const updatedLists = lists.map((list) => {
        if (list.id === listId) {
          return {
            ...list,
            items: list.items.map((item) =>
              item.id === itemId
                ? { ...item, completed: !item.completed }
                : item
            ),
          };
        }
        return list;
      });

      setLists(updatedLists);

      const itemToUpdate = updatedLists
        .find((list) => list.id === listId)
        .items.find((item) => item.id === itemId);

      // Update Firestore database
      await updateItem(itemId, { completed: itemToUpdate.completed });
    } catch (error) {
      console.error("Error updating item status:", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBasket className="h-6 w-6 text-emerald-600" />
            <span className="text-xl font-semibold">GrocerySave</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Welcome, {localStorage.getItem("userName") || "Guest"}
            </span>
            <Button
              variant="default"
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto flex gap-6">
        <Sidebar onSelectCategory={setSelectedCategory} />

        {!selectedCategory ? (
          <>
            <div className="flex justify-center w-full p-5 h-screen bg-gray-100">
              <div className="px-2 py-5 h-fit rounded-lg shadow-md border-dashed border-gray-400 border w-[80%] flex justify-center items-center bg-gray-200">
                <p>Please select a category to view lists</p>
              </div>
            </div>
          </>
        ) : (
          <main className="flex-1 p-6 bg-gray-100 min-h-screen">
            <div className="mb-6">
              <Button
                className="bg-emerald-600 hover:bg-emerald-700"
                onClick={() => setIsDialogOpen(true)}
              >
                <Plus className="mr-1 h-4 w-4" /> Add List
              </Button>
            </div>

            {loading ? (
              <div className="flex justify-center">
                <div className="h-6 w-6 border-4 border-t-emerald-600 border-gray-300 rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="space-y-3">
                {lists.length > 0 ? (
                  lists.map((list) => (
                    <div
                      key={list.id}
                      className="bg-white rounded-lg shadow p-4"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">{list.name}</h2>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveList(list.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>

                      {/* ✅ Display Items of the List */}
                      <div className="space-y-3">
                        {list.items && list.items.length > 0 ? (
                          list.items.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center space-x-2"
                            >
                              <input
                                type="checkbox"
                                checked={item.completed}
                                onChange={() => toggleItem(list.id, item.id)}
                                className="h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                              />

                              <label className="text-sm text-gray-600">
                                {item.name}
                              </label>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500">
                            No items found.
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No lists available for this category.
                  </p>
                )}
              </div>
            )}
          </main>
        )}
      </div>

      <AddListDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onAddList={() => fetchLists(selectedCategory)}
        categoryId={selectedCategory}
      />
    </div>
  );
}
