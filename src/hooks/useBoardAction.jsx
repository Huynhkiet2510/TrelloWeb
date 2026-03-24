import {
  addDoc,
  collection,
  deleteDoc,
  onSnapshot,
  doc,
  where,
  getDocs,
  updateDoc,
  writeBatch,
  query,
  orderBy
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { useParams } from "react-router-dom";

export const useBoardAction = () => {
  const [boardList, setBoardList] = useState([]);
  const [newBoard, setNewBoard] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [board, setBoard] = useState(null);
  const [boardLoading, setBoardLoading] = useState(true);
  const [boardError, setBoardError] = useState(null);

  const { boardId } = useParams();

  useEffect(() => {
    if (!boardId) return;
    setBoardLoading(true);

    const unsubscribe = onSnapshot(
      doc(db, "boards", boardId),
      (docSnap) => {
        if (docSnap.exists()) {
          setBoard({ id: docSnap.id, ...docSnap.data() });
        } else {
          setBoardError("Bảng không tồn tại!");
        }
        setBoardLoading(false);
      },
      (err) => {
        console.error("Board Error:", err);
        setBoardError("Lỗi kết nối bảng.");
        setBoardLoading(false);
      }
    );

    return () => unsubscribe();
  }, [boardId]);

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
    setNewBoard("");

    try {
      await addDoc(collection(db, "boards"), {
        title: titleToSave,
        createdAt: Date.now(),
      });
    } catch (error) {
      console.error("Save board error:", error);
    }
  };

  const handleRemove = async (boardId) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa bảng này và tất cả dữ liệu liên quan?")) return;

    try {
      const batch = writeBatch(db);
      const collectionsToClean = ["tasks", "columns", "labels"];

      for (const colName of collectionsToClean) {
        const q = query(collection(db, colName), where("boardId", "==", boardId));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((document) => {
          batch.delete(document.ref);
        });
      }

      const boardRef = doc(db, "boards", boardId);
      batch.delete(boardRef);
      await batch.commit();
    } catch (error) {
      console.error("Lỗi khi xóa bảng:", error);
      alert("Có lỗi xảy ra khi xóa dữ liệu.");
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
    board,
    boardLoading,
    boardError,
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