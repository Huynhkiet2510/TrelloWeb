import { useState, useEffect } from "react";
import {
  collection, query, where, onSnapshot, orderBy,
  addDoc, deleteDoc, updateDoc, doc
} from "firebase/firestore";
import { db } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { removeTask, setTasks, updateTask, addTask } from "../stores/taskSlice";

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
      dispatch(setTasks({ columnId, tasks: tasksData }));
    });

    return () => unsubscribe();
  }, [columnId, dispatch]);

  const handleEditTask = (task) => {
    setNewTaskTitle(task.title);
    setIsEditTaskTitle(task.id);
  };

  const handleSave = async () => {
    if (!newTaskTitle.trim()) return;
    const title = newTaskTitle.trim();

    setIsOpenTaskModal(false);
    setIsEditTaskTitle(null);
    setNewTaskTitle("");

    const newTask = {
      id: Date.now().toString(),
      title,
      columnId,
      description: "",
      checklists: [],
      order: Date.now(),
      createdAt: Date.now()
    };

    try {
      if (isEditTaskTitle) {
        dispatch(updateTask({ id: isEditTaskTitle, title }));
        await updateDoc(doc(db, "tasks", isEditTaskTitle), { title });
        setIsEditTaskTitle(null);
      } else {
        dispatch(addTask(newTask));
        await addDoc(collection(db, "tasks"), {
          title: newTask.title,
          columnId: newTask.columnId,
          description: newTask.description,
          checklists: newTask.checklists,
          order: newTask.order,
          createdAt: newTask.createdAt
        });
      }
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleRemoveTask = async (taskId) => {
    dispatch(removeTask(taskId));
    setSelectedTask(null);

    try {
      await deleteDoc(doc(db, "tasks", taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
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