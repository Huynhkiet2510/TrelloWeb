import React, { useState } from "react";
import { Tag, Trash2, CheckSquare } from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Labels from "./Labels/Labels";
import DateSection from "./Date/DateSection";
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import Attachment from "./Attachment/Attachment";
import CheckList from "./CheckList/CheckList";

const TaskDetailSidebar = ({ task, onRemove, uploadingFile, setUploadingFile }) => {
  const [isOpenLabel, setIsOpenLabel] = useState(false);
  const [isOpenCheckList, setIsOpenCheckList] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleToggleLabel = async (labelId) => {
    const currentLabels = task.labels || [];
    let newLabels;
    if (currentLabels.includes(labelId)) {
      newLabels = currentLabels.filter((id) => id !== labelId);
    } else {
      newLabels = [...currentLabels, labelId];
    }

    try {
      const taskRef = doc(db, "tasks", task.id);
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
          onClick={() => setIsOpenLabel(prev => !prev)}
          className="flex items-center gap-2 p-2 rounded text-sm transition bg-gray-200 hover:bg-gray-300"
        >
          <Tag size={16} /> Label
        </button>

        {isOpenLabel && (
          <Labels
            task={task}
            onToggleLabel={handleToggleLabel}
            onClose={() => setIsOpenLabel(false)}
          />
        )}

        <DateSection taskId={task?.id} dueDate={task?.dueDate} />

        <button
          onClick={() => setIsOpenCheckList(prev => !prev)}
          className="flex w-full items-center gap-2 bg-gray-200 p-2 rounded text-sm hover:bg-gray-300" >
          <CheckSquare size={16} /> Checklist
        </button>
        {isOpenCheckList && (
          <CheckList taskId={task.id} onClose={() => setIsOpenCheckList(false)} />
        )}

        <Attachment
          taskId={task.id}
          showList={false}
          showUpload={true}
          uploadingFile={uploadingFile}
          setUploadingFile={setUploadingFile}
        />

      </div>



      <h3 className="text-xs font-bold text-gray-500 uppercase mt-8 mb-3">Action</h3>

      <button
        onClick={() => setShowConfirm(true)}
        className="flex items-center gap-2 bg-red-100 text-red-700 p-2 rounded text-sm w-full hover:bg-red-200 transition"
      >
        <Trash2 size={16} /> Delete Task
      </button>

      <ConfirmModal
        isOpen={showConfirm}
        title="Xóa cột này?"
        message="Toàn bộ thẻ (cards) bên trong cột này sẽ bị mất vĩnh viễn. Bạn có chắc chắn không?"
        onConfirm={() => onRemove(task.id)}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
};

export default TaskDetailSidebar;