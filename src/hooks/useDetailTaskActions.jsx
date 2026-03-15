import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
export const useDetailTaskActions = (task) => {


  const updateDescription = async (newDescription) => {
    try {
      const taskRef = doc(db, "tasks", task.id);
      await updateDoc(taskRef, { description: newDescription });
    } catch (error) {
      console.log(error)
    }
  };

  const addChecklistItem = async (text) => {
    const newItem = { id: Date.now(), text, isDone: false };

    try {
      const taskRef = doc(db, "tasks", task.id);
      const updatedChecklists = [...(task.checklists || []), newItem];
      await updateDoc(taskRef, { checklists: updatedChecklists });
    } catch (error) {
      console.log(error)
    }
  };

  const toggleChecklistItem = async (itemId) => {

    try {
      const taskRef = doc(db, "tasks", task.id);
      const updated = task.checklists.map(item =>
        item.id === itemId ? { ...item, isDone: !item.isDone } : item
      );
      await updateDoc(taskRef, { checklists: updated });
    } catch (error) {
      console.log(error)
    }
  };

  const removeChecklistItem = async (itemId) => {
    try {
      const taskRef = doc(db, "tasks", task.id);
      const updated = task.checklists.filter(item => item.id !== itemId);
      await updateDoc(taskRef, { checklists: updated });
    } catch (error) {
      console.log(error)

    }
  };

  return { updateDescription, addChecklistItem, toggleChecklistItem, removeChecklistItem };
};