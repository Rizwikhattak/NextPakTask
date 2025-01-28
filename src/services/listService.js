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

// Reference to the Lists collection
const listsCollection = collection(db, "lists");

// ✅ Add a new List
export const createList = async (categoryId, name) => {
  try {
    const docRef = await addDoc(listsCollection, {
      category_id: categoryId,
      name,
    });
    return docRef.id; // Return the new list ID
  } catch (error) {
    console.error("Error adding list:", error.message);
    throw error;
  }
};

// ✅ Get all Lists (optional filtering by category)
export const getLists = async (categoryId = null) => {
  try {
    let q = listsCollection;
    if (categoryId) {
      q = query(listsCollection, where("category_id", "==", categoryId));
    }
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching lists:", error.message);
    throw error;
  }
};

// ✅ Get Lists by Category ID
export const getListsByCategory = async (categoryId) => {
  try {
    const q = query(listsCollection, where("category_id", "==", categoryId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching lists by category:", error.message);
    throw error;
  }
};

// ✅ Update a List Name
export const updateList = async (listId, newName) => {
  try {
    const listRef = doc(db, "lists", listId);
    await updateDoc(listRef, { name: newName });
  } catch (error) {
    console.error("Error updating list:", error.message);
    throw error;
  }
};

// ✅ Delete a List
export const deleteList = async (listId) => {
  try {
    const listRef = doc(db, "lists", listId);
    await deleteDoc(listRef);
    return true;
  } catch (error) {
    console.error("Error deleting list:", error.message);
    return false;
  }
};
