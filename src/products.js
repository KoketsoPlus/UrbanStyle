// src/products.js

import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase.config"; // make sure this points to your Firebase config

/**
 * Fetches a product document from Firestore by its ID.
 * @param {string} id - The document id (e.g., rectangle1, apple2, hourglass3)
 * @returns {Promise<Object|null>} A promise that resolves to the product data, or null if not found.
 */
export async function getProductById(id) {
  try {
    const docRef = doc(db, "products", id); // products collection, document id
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() }; // include id and document data
    } else {
      return null; // document does not exist
    }
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
}
