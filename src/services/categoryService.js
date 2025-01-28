import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
// Initialize Firestore
const db = getFirestore();

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user); // User is logged in
      } else {
        reject(new Error("User not authenticated"));
      }
    });
  });
};

/**
 * ✅ Create a new category
 * @param {string} name - Name of the category
 */
export const createCategory = async (name) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const docRef = await addDoc(collection(db, "categories"), {
      user_id: user.uid,
      name: name,
    });

    return { id: docRef.id, user_id: user.uid, name };
  } catch (error) {
    console.error("Error creating category:", error.message);
    throw error;
  }
};

/**
 * ✅ Get all categories for the logged-in user
 */
export const getCategories = async () => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const q = query(
      collection(db, "categories"),
      where("user_id", "==", user.uid)
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    throw error;
  }
};

/**
 * ✅ Update a category by ID
 * @param {string} categoryId - ID of the category to update
 * @param {string} newName - New name of the category
 */
export const updateCategory = async (categoryId, newName) => {
  try {
    const categoryRef = doc(db, "categories", categoryId);
    await updateDoc(categoryRef, { name: newName });
    return { id: categoryId, name: newName };
  } catch (error) {
    console.error("Error updating category:", error.message);
    throw error;
  }
};

/**
 * ✅ Delete a category by ID
 * @param {string} categoryId - ID of the category to delete
 */
export const deleteCategory = async (categoryId) => {
  try {
    const categoryRef = doc(db, "categories", categoryId);
    await deleteDoc(categoryRef);
    return { success: true };
  } catch (error) {
    console.error("Error deleting category:", error.message);
    throw error;
  }
};
