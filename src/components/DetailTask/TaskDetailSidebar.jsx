import React, { useEffect, useState } from "react";
import { Tag, CheckSquare, Trash2 } from "lucide-react";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import Labels from "../Labels/Labels";
import DateSection from "../Date/DateSection";

const TaskDetailSidebar = ({ task, onRemove, onClose }) => {
  const [isOpenLabel, setIsOpenLabel] = useState(false);
  const [currentTask, setCurrentTask] = useState(task);

  useEffect(() => {
    if (!task?.id) return;

    const taskRef = doc(db, "tasks", task?.id);
    const unsubscribe = onSnapshot(taskRef, (docSnap) => {
      if (docSnap.exists()) {
        setCurrentTask({ id: docSnap.id, ...docSnap.data() });
      }
    });

    return () => unsubscribe();
  }, [task.id]);

  const handleToggleLabel = async (labelId) => {
    const currentLabels = currentTask.labels || [];
    let newLabels;
    if (currentLabels.includes(labelId)) {
      newLabels = currentLabels.filter((id) => id !== labelId);
    } else {
      newLabels = [...currentLabels, labelId];
    }

    try {
      const taskRef = doc(db, "tasks", currentTask.id);
      await updateDoc(taskRef, {
        labels: newLabels,
      });
    } catch (error) {
      console.error("Lỗi cập nhật nhãn:", error);
    }
  };

  return (
    <div className="flex-1 bg-gray-50 p-6 pt-4 border-l relative">
      <h3 className="text-xs font-bold text-gray-500 uppercase mb-3">Add</h3>

      <div className="flex flex-col gap-2 relative">
        <button
          onClick={() => setIsOpenLabel((prev) => !prev)}
          className={`flex items-center gap-2 p-2 rounded text-sm transition ${isOpenLabel ? "bg-blue-100 text-blue-700" : "bg-gray-200 hover:bg-gray-300"
            }`}
        >
          <Tag size={16} /> Label
        </button>

        {isOpenLabel && (
          <Labels
            task={currentTask}
            onToggleLabel={handleToggleLabel}
            onClose={() => setIsOpenLabel(false)}
          />
        )}

     

        <DateSection taskId={task?.id} dueDate={task?.dueDate} />
      </div>

      <h3 className="text-xs font-bold text-gray-500 uppercase mt-8 mb-3">Action</h3>

      <button
        onClick={() => {
          onRemove(task?.id);
          onClose();
        }}
        className="flex items-center gap-2 bg-red-100 text-red-700 p-2 rounded text-sm w-full hover:bg-red-200 transition"
      >
        <Trash2 size={16} /> Delete Task
      </button>
    </div>
  );
};

export default TaskDetailSidebar;