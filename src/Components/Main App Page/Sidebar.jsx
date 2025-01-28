import { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  createCategory,
  getCategories,
  getCurrentUser,
  deleteCategory,
} from "../../services/categoryService";
import PropTypes from "prop-types";

Sidebar.propTypes = {
  onSelectCategory: PropTypes.func.isRequired,
};

export default function Sidebar({ onSelectCategory }) {
  const [categories, setCategories] = useState([]);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingAddCat, setLoadingAddCat] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const user = await getCurrentUser();
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
    setLoading(false);
  };

  const handleAddCategory = async () => {
    if (!categoryName.trim()) return;
    try {
      setLoadingAddCat(true);
      await createCategory(categoryName);
      setCategoryName("");
      setIsAddingCategory(false);
      fetchCategories();
    } catch (error) {
      console.error("Error adding category:", error.message);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const response = await deleteCategory(categoryId);
      if (response.success) {
        setCategories(
          categories.filter((category) => category.id !== categoryId)
        );
      }
    } catch (error) {
      console.error("Error deleting category:", error.message);
    }
  };

  return (
    <aside className=" sm:w-40 sm:max-w-56 md:w-48 md:max-w-48 lg:w-64 lg:max-w-64 py-6 px-3">
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2 flex items-center justify-between">
          Categories
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsAddingCategory(true)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </h2>
      </div>

      {loading ? (
        <div className="flex justify-center">
          <div className="h-6 w-6 border-4 border-t-emerald-600 border-gray-300 rounded-full animate-spin"></div>
        </div>
      ) : (
        isAddingCategory && (
          <div className="bg-gray-100 p-3 rounded-lg mb-4 transition-all duration-300">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">New Category</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsAddingCategory(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <Input
              type="text"
              placeholder="Category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full mt-2"
            />

            <Button
              onClick={handleAddCategory}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white mt-3"
            >
              {loadingAddCat ? (
                <div className="flex justify-center">
                  <div className="h-6 w-6 border-4 border-t-emerald-600 border-gray-300 rounded-full animate-spin"></div>
                </div>
              ) : (
                <span>Add Category</span>
              )}
            </Button>
          </div>
        )
      )}

      <div className="space-y-2">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between gap-2"
          >
            <button
              onClick={() => onSelectCategory(category.id)}
              className="flex-grow flex items-center justify-between px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              {category.name}
            </button>
            <button
              className="flex items-center justify-center p-2 text-gray-500 hover:text-red-600"
              onClick={() => handleDeleteCategory(category.id)}
            >
              <X className="w-4" />
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
}
