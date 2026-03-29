import React from 'react';
import { useDetailTaskActions } from '../../hooks/useDetailTaskActions';
import DescriptionSection from './Description/DescriptionSection';
import ChecklistSection from './CheckList/ChecklistSection';
import Attachment from "./Attachment/Attachment"

const TaskDetailContent = ({ task, uploadingFile, setUploadingFile, }) => {

  const { removeChecklist, addChecklistItem, updateDescription, toggleChecklistItem, removeChecklistItem } = useDetailTaskActions(task);
  if (!task) return <div className="p-6 text-gray-500 text-center">Đang tải dữ liệu...</div>;

  return (
    <div className="flex-[2.5] p-6 pt-4 overflow-y-auto custom-scrollbar">
      <div className="mb-8">
        <h3 className="font-semibold text-gray-700 mb-3">Description</h3>
        <DescriptionSection
          initialDescription={task.description}
          onSave={updateDescription}
        />
        <Attachment
          taskId={task.id}
          showList={true}
          showUpload={false}
          uploadingFile={uploadingFile}
          setUploadingFile={setUploadingFile}
        />

      </div>

      <ChecklistSection
        taskId={task.id}
        onAdd={addChecklistItem}
        onToggle={toggleChecklistItem}
        onRemoveCheckList={removeChecklist}
        onRemoveItem={removeChecklistItem}
      />
    </div>
  );
};

export default TaskDetailContent;