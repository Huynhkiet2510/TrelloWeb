import { useState, useEffect } from "react";
import { 
  collection, query, where, onSnapshot, orderBy, 
  addDoc, deleteDoc, updateDoc, doc 
} from "firebase/firestore";
import { db } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "../stores/taskSlice";

export const useTaskAction = (columnId) => {
  const dispatch = useDispatch();
  
  const allTasks = useSelector((state) => state.task.tasks);
  const tasks = allTasks.filter(t => t.columnId === columnId);

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isOpenTaskModal, setIsOpenTaskModal] = useState(false);
  const [isEditTaskTitle, setIsEditTaskTitle] = useState(null);
  
  const [selectedTask, setSelectedTask] = useState(null); 

  useEffect(() => {
    if (!columnId) return;

    const q = query(
      collection(db, "tasks"),
      where("columnId", "==", columnId),
      orderBy("order", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksData = snapshot.docs.map((doc) => ({ 
        id: doc.id, 
        ...doc.data() 
      }));
      dispatch(setTasks(tasksData));
    });

    return () => unsubscribe();
  }, [columnId, dispatch]);

  const handleEditTask = (task) => {
    setNewTaskTitle(task.title);
    setIsEditTaskTitle(task.id);
    setIsOpenTaskModal(true);
  };

  const handleSave = async () => {
    if (!newTaskTitle.trim()) return;
    const title = newTaskTitle.trim();
    
    setIsOpenTaskModal(false);
    setNewTaskTitle("");

    try {
      if (isEditTaskTitle) {
        await updateDoc(doc(db, "tasks", isEditTaskTitle), { title });
        setIsEditTaskTitle(null);
      } else {
        await addDoc(collection(db, "tasks"), {
          title,
          columnId,
          description: "",
          checklists: [],
          order: Date.now(),
          createdAt: Date.now()
        });
      }
    } catch (error) {
      console.error("Lỗi khi lưu task:", error);
    }
  };

  const handleRemoveTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId));
      setSelectedTask(null); // Đóng modal sau khi xóa
    } catch (error) {
      console.error("Lỗi khi xóa task:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
  };

  return {
    tasks,
    isOpenTaskModal,
    setIsOpenTaskModal,
    newTaskTitle,
    setNewTaskTitle,
    isEditTaskTitle,
    setIsEditTaskTitle,
    selectedTask,
    setSelectedTask,
    handleEditTask,
    handleSave,
    handleRemoveTask,
    handleKeyDown,
  };
};