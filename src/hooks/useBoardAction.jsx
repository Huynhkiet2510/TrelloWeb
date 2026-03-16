import {
  addDoc,
  collection,
  deleteDoc,
  onSnapshot,
  doc,
  updateDoc,
  query,
  orderBy
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import bg from "../assets/bg.jpg";

export const useBoardAction = () => {
  const [boardList, setBoardList] = useState([]);
  const [newBoard, setNewBoard] = useState("");
  
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  useEffect(() => {
    const q = query(collection(db, "boards"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setBoardList(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => unsubscribe();
  }, []);

  const handleAdd = async () => {
    if (!newBoard.trim()) return;
    const titleToSave = newBoard;
    setNewBoard(""); // Clear input ngay để UX mượt hơn

    try {
      await addDoc(collection(db, "boards"), {
        title: titleToSave,
        createdAt: Date.now(),
        background: "https://static.vecteezy.com/system/resources/previews/002/098/380/non_2x/silhouette-forest-landscape-flat-design-with-gradient-illustration-background-free-vector.jpg"
      });
    } catch (error) {
      console.error("Save board error:", error);
    }
  };

  const handleRemove = async (boardId) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa bảng này?")) return;

    try {
      await deleteDoc(doc(db, "boards", boardId));
    } catch (error) {
      console.error("Delete board error:", error);
    }
  };

  const startEdit = (e, board) => {
    e.stopPropagation();
    setEditingId(board.id);
    setEditTitle(board.title);
  };

  const handleUpdate = async (boardId) => {
    if (!editTitle.trim()) {
      setEditingId(null);
      return;
    }

    try {
      const boardRef = doc(db, "boards", boardId);
      await updateDoc(boardRef, {
        title: editTitle
      });
      setEditingId(null);
    } catch (error) {
      console.error("Update board error:", error);
    }
  };

  return {
    boardList,
    newBoard,
    setNewBoard,
    handleAdd,
    handleRemove,
    editingId,
    setEditingId,
    editTitle,
    setEditTitle,
    startEdit,
    handleUpdate
  };
};