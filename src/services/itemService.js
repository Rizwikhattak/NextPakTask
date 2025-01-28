import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

// Reference to the Items collection
const itemsCollection = collection(db, "items");

// ✅ Add a new Item to a List
export const createItem = async (listId, name, completed = false) => {
  try {
    const docRef = await addDoc(itemsCollection, {
      list_id: listId,
      name,
      completed,
    });
    return docRef.id; // Return the new item ID
  } catch (error) {
    console.error("Error adding item:", error.message);
    throw error;
  }
};

// ✅ Get all Items for a given List
export const getItems = async (listId) => {
  try {
    const q = query(itemsCollection, where("list_id", "==", listId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching items:", error.message);
    throw error;
  }
};

export const getItemsByList = async (listId) => {
  try {
    const q = query(itemsCollection, where("list_id", "==", listId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Convert all items into an array and include the ID
      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Attach document ID
        ...doc.data(),
      }));

      return items; // Return list of items with IDs
    } else {
      return []; // Return empty array if no items found
    }
  } catch (error) {
    console.error("Error fetching items by list:", error.message);
    throw error;
  }
};
// ✅ Update an Item (e.g., change name or mark as completed)
export const updateItem = async (itemId, updatedData) => {
  try {
    const itemRef = doc(db, "items", itemId);
    await updateDoc(itemRef, updatedData);
  } catch (error) {
    console.error("Error updating item:", error.message);
    throw error;
  }
};

// ✅ Delete an Item
export const deleteItem = async (itemId) => {
  try {
    const itemRef = doc(db, "items", itemId);
    await deleteDoc(itemRef);
  } catch (error) {
    console.error("Error deleting item:", error.message);
    throw error;
  }
};
