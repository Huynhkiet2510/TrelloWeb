import { 
  doc, updateDoc, deleteDoc, addDoc, collection, 
  serverTimestamp, writeBatch, query, where, getDocs 
} from 'firebase/firestore';
import { db } from '../firebase';

export const useDetailTaskActions = (task) => {

  const updateDescription = async (newDescription) => {
    try {
      const taskRef = doc(db, "tasks", task.id);
      await updateDoc(taskRef, { description: newDescription });
    } catch (error) {
      console.error("Lỗi cập nhật description:", error);
    }
  };

  const addChecklist = async (taskId, title) => {
    if (!title.trim()) return;
    try {
      await addDoc(collection(db, "checklists"), {
        taskId,
        title,
        createdAt: serverTimestamp(), 
      });
    } catch (error) {
      console.error("Lỗi thêm checklist:", error);
    }
  };

  const removeChecklist = async (checklistId) => {
    try {
      const batch = writeBatch(db);
      
      const checklistRef = doc(db, "checklists", checklistId);
      batch.delete(checklistRef);

      const itemsQuery = query(
        collection(db, "checklistItems"), 
        where("checklistId", "==", checklistId)
      );
      const itemsSnapshot = await getDocs(itemsQuery);
      itemsSnapshot.forEach((itemDoc) => {
        batch.delete(itemDoc.ref);
      });

      await batch.commit();
    } catch (error) {
      console.error("Lỗi khi xóa checklist và items:", error);
    }
  };

  const addChecklistItem = async (checklistId, text) => {
    if (!text.trim()) return;
    try {
      await addDoc(collection(db, "checklistItems"), {
        taskId: task.id,
        checklistId: checklistId,
        text: text,
        isDone: false,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Lỗi thêm checklist item:", error);
    }
  };

  const toggleChecklistItem = async (itemId, currentStatus) => {
    try {
      const ref = doc(db, "checklistItems", itemId);
      await updateDoc(ref, { isDone: !currentStatus });
    } catch (error) {
      console.error("Lỗi cập nhật trạng thái item:", error);
    }
  };

  const removeChecklistItem = async (itemId) => {
    try {
      await deleteDoc(doc(db, "checklistItems", itemId));
    } catch (error) {
      console.error("Lỗi xóa checklist item:", error);
    }
  };

  return { 
    updateDescription, 
    addChecklist, 
    removeChecklist, 
    addChecklistItem, 
    toggleChecklistItem, 
    removeChecklistItem 
  };
};