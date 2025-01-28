import { auth } from "../firebaseConfig";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// Initialize Firestore
const db = getFirestore();

// ✅ Register a new user and store in Firestore
export const registerUser = async (email, password, fullName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Store user details in Firestore
    await setDoc(doc(db, "users", user.uid), {
      fullName,
      email,
      createdAt: new Date().toISOString(),
    });

    // Store token, user ID, and name in localStorage
    const token = await user.getIdToken();
    localStorage.setItem("token", token);
    localStorage.setItem("userId", user.uid);
    localStorage.setItem("userName", fullName); // Store user's name

    return user;
  } catch (error) {
    console.error("Registration Error:", error.message);
    throw error;
  }
};

// ✅ Log in a user and fetch name from Firestore
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Fetch user name from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const fullName = userDoc.exists() ? userDoc.data().fullName : "User";

    // Store token, user ID, and name in localStorage
    const token = await user.getIdToken();
    localStorage.setItem("token", token);
    localStorage.setItem("userId", user.uid);
    localStorage.setItem("userName", fullName); // Store user's name

    return user;
  } catch (error) {
    console.error("Login Error:", error.message);
    throw error;
  }
};

// ✅ Logout user and clear stored data
export const logoutUser = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName"); // Remove name on logout
  } catch (error) {
    console.error("Logout Error:", error.message);
  }
};
