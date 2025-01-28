import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import PropTypes from "prop-types";
import { createList } from "../../services/listService"; 
import { createItem } from "../../services/itemService";

AddListDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  onAddList: PropTypes.func.isRequired,
  categoryId: PropTypes.string.isRequired, 
};

export default function AddListDialog({
  open,
  onOpenChange,
  onAddList,
  categoryId,
}) {
  const [listName, setListName] = useState("");
  const [items, setItems] = useState([""]);
  const [loading, setLoading] = useState(false);
  console.log("Category id inside dialogue", categoryId);
  const handleAddItem = () => {
    setItems([...items, ""]);
  };

  const handleItemChange = (index, value) => {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!listName.trim()) return;

    setLoading(true);
    try {
      const listId = await createList(categoryId, listName);

      for (const item of items) {
        if (item.trim() !== "") {
          await createItem(listId, item.trim(), false);
        }
      }

      onAddList();
      setListName("");
      setItems([""]);
      onOpenChange(false); 
    } catch (error) {
      console.error("Error adding list and items:", error.message);
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New List</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="listName">List Name</Label>
            <Input
              id="listName"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              placeholder="e.g., Monday"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Items</Label>
            {items.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={item}
                  onChange={(e) => handleItemChange(index, e.target.value)}
                  placeholder="Add an item"
                />
                {items.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveItem(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddItem}
              className="mt-2"
            >
              Add Item
            </Button>
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Create List"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
