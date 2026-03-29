import React, { useState } from 'react';
import ConfirmModal from '../../ConfirmModal/ConfirmModal';
import { useChecklist } from './useChecklist';
import ChecklistGroup from './ChecklistGroup';

const ChecklistSection = ({ taskId, onAdd, onToggle, onRemoveCheckList, onRemoveItem }) => {
  const { checklists } = useChecklist(taskId);
  const [activeDeleteId, setActiveDeleteId] = useState(null);

  const selectedChecklist = checklists.find(c => c.id === activeDeleteId);

  const handleConfirmDelete = async () => {
    if (activeDeleteId) {
      await onRemoveCheckList(activeDeleteId);
      setActiveDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      {checklists.map((group) => (
        <ChecklistGroup
          key={group.id}
          group={group}
          onAdd={onAdd}
          onToggle={onToggle}
          onRemoveItem={onRemoveItem}
          onOpenDeleteModal={setActiveDeleteId} 
        />
      ))}

      <ConfirmModal
        isOpen={Boolean(activeDeleteId)}
        title="Xóa danh sách này?"
        message={`Bạn có chắc muốn xóa "${selectedChecklist?.title}" và tất cả mục con?`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setActiveDeleteId(null)}
      />
    </div>
  );
};

export default ChecklistSection;