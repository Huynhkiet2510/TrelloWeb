import {
  addDoc,
  collection,
  deleteDoc,
  onSnapshot,
  doc,
  updateDoc
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

export const useBoardAction = () => {
  const [boardList, setBoardList] = useState([]);
  const [newBoard, setNewBoard] = useState("");
  const [isEditBoard, setIsEditBoard] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "boards"), (snapshot) => {
      setBoardList(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
      );
    });

    return () => unsubscribe();
  }, []);

  const handleSave = async () => {
    if (!newBoard.trim()) return;

    try {
      if (isEditBoard) {
        const boardRef = doc(db, "boards", isEditBoard);

        await updateDoc(boardRef, {
          title: newBoard
        });

        setIsEditBoard(null);
      } else {
        await addDoc(collection(db, "boards"), {
          title: newBoard,
          createdAt: Date.now(),
          background:
            "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba"
        });
      }
      setNewBoard("");
    } catch (error) {
      console.error("Save board error:", error);
    }
  };

  const handleRemove = async (boardId) => {
    try {
      await deleteDoc(doc(db, "boards", boardId));
    } catch (error) {
      console.log("Delete board error:", error);
    }
  };

  return {
    boardList,
    newBoard,
    setNewBoard,
    handleSave,
    handleRemove,
    isEditBoard,
    setIsEditBoard
  };
};