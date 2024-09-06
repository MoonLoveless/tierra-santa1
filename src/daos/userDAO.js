import {
  collection,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
  addDoc,
} from "firebase/firestore";

import { db } from "../firebase.config";

/**
   * UserDAO Class
   * 
   * This class provides methods for interacting with the Firestore database
   * specifically for managing user documents in the "users" collection.
   */
class UserDAO {
  constructor() {
      this.collectionRef = collection(db, "users");
  }

  /**
     * Retrieve a user document by its ID.
     * 
     * @param {string} id - The ID of the user document to retrieve.
     * @returns {Promise<{success: boolean, data?: object, error?: Error}>} - 
     * An object containing the success status and either the user data or an error.
     */
  async getUserById(id) {
      try {
          const userDoc = await getDoc(doc(this.collectionRef, id));
          if (userDoc.exists()) {
              return { success: true, data: userDoc.data() };
          } else {
              return { success: false, data: null };
          }
      } catch (error) {
          console.log("Error getting document:", error);
          return { success: false, error };
      }
  }

   /**
     * Create a new user document.
     * 
     * @param {object} userData - The data to be stored in the new user document.
     * @returns {Promise<{success: boolean, id?: string, error?: Error}>} - 
     * An object containing the success status and the new document ID or an error.
     */
  async createUser(userData) {
      try {
          const docRef = await addDoc(this.collectionRef, userData);
          console.log("Document written with ID: ", docRef.id);
          return { success: true, id: docRef.id };
      } catch (error) {
          console.error("Error adding document: ", error);
          return { success: false, error };
      }
  }

   /**
     * Update an existing user document.
     * 
     * @param {string} id - The ID of the user document to update.
     * @param {object} userData - The updated data for the user document.
     * @returns {Promise<{success: boolean, error?: Error}>} - 
     * An object containing the success status or an error.
     */
  async updateUser(id, userData) {
      try {
          const userRef = doc(this.collectionRef, id);
          await updateDoc(userRef, userData);
          console.log("Document successfully updated!");
          return { success: true };
      } catch (error) {
          console.error("Error updating document: ", error);
          return { success: false, error };
      }
  }

  /**
     * Delete a user document by its ID.
     * 
     * @param {string} id - The ID of the user document to delete.
     * @returns {Promise<{success: boolean, error?: Error}>} - 
     * An object containing the success status or an error.
     */
  async deleteUser(id) {
      try {
          await deleteDoc(doc(this.collectionRef, id));
          console.log("Document successfully deleted!");
          return { success: true };
      } catch (error) {
          console.error("Error removing document: ", error);
          return { success: false, error };
      }
  }
}

export default new UserDAO();