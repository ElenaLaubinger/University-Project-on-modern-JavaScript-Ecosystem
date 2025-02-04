import { useEffect, useState } from "react";
import { collection, addDoc, deleteDoc, doc, getFirestore, onSnapshot, updateDoc } from "firebase/firestore";
import firebaseApp from "./FB_App";

function Database() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const database = getFirestore(firebaseApp);
  const collectionName = "testbooks";
  const collectionRef = collection(database, collectionName);

  useEffect(() => {
    updateData();
  }, []);

  const updateData = async () => {
    setIsLoading(true);
    try {
      onSnapshot(collectionRef, (querySnapshot) => {
        const displayItem = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setData(displayItem);
      });
    } catch (error) { }
    finally {
      setIsLoading(false);
    };
  };

  // Funktion zum Hinzufügen eines Buches
  const addBook = async (newBook) => {
    try {
      // Überprüfen, ob die ISBN bereits existiert
      const existingBook = data.find(book => book.isbn === newBook.isbn);
      if (existingBook) {
        throw new Error("There already exists a book with this ISBN!");
      }

      await addDoc(collectionRef, newBook);
      updateData(); // Nach dem Hinzufügen direkt aktualisieren
      return { success: true, message: "Book added successfully!" }; // Erfolg zurückgeben
    } catch (error) {
      console.error("Error adding book:", error.message);
      return { success: false, message: error.message }; // Fehler zurückgeben
    }
  };


  // Funktion zum Löschen eines Buches
  const deleteBook = async (bookId) => {
    const bookRef = doc(database, `${collectionName}/${bookId}`);

    try {
      await deleteDoc(bookRef);
      updateData(); // Nach dem Löschen direkt aktualisieren
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const updateRating = async (bookId, rating) => {
    const database = getFirestore(firebaseApp);
    const bookRef = doc(database, collectionName, bookId);

    try {
      await updateDoc(bookRef, { rating });
    } catch (error) {
      console.error("Fehler beim Aktualisieren der Bewertung:", error);
    }
  };

  return { data, addBook, deleteBook, updateData, isLoading, updateRating };
}

export default Database;
