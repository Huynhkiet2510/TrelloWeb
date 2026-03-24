import React from 'react';
import { useDetailTaskActions } from '../../hooks/useDetailTaskActions';
import DescriptionSection from './Description/DescriptionSection';
import ChecklistSection from './CheckList/ChecklistSection';

const TaskDetailContent = ({ task }) => {
  
  const { updateDescription, addChecklistItem, toggleChecklistItem, removeChecklistItem } = useDetailTaskActions(task);

  if (!task) return <div className="p-6 text-gray-500 text-center">Đang tải dữ liệu...</div>;

  return (
    <div className="flex-[2.5] p-6 pt-4 overflow-y-auto custom-scrollbar">
      <div className="mb-8">
        <h3 className="font-semibold text-gray-700 mb-3">Description</h3>
        <DescriptionSection
          initialDescription={task.description}
          onSave={updateDescription}
        />
      </div>

      <ChecklistSection
        task={task}
        onAdd={addChecklistItem}
        onToggle={toggleChecklistItem}
        onRemove={(id) => window.confirm("Xóa nhé?") && removeChecklistItem(id)}
      />
    </div>
  );
};

export default TaskDetailContent;