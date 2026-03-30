import { Plus } from 'lucide-react';
import { useLabelAction } from '../../../hooks/useLabelAction';
import LabelHeader from './LabelHeader';
import LabelItem from './LabelItem';
import LabelEditor from './LabelEditor';

const Labels = ({ task, onToggleLabel, onClose }) => {
  const {
    handleEditClick, handleRemove, handleSaveLabel, resetForm,
    setIsEditorOpen, editingLabelId, labelTitle, setLabelTitle,
    labelColor, setLabelColor, isEditorOpen, allLabels, currentTaskLabelIds
  } = useLabelAction(task);

  return (
    <div className="absolute top-0 right-0 ml-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 z-50 p-3 animate-in fade-in zoom-in duration-150">
      <LabelHeader
        title={isEditorOpen ? (editingLabelId ? "Edit label" : "Add label") : "Labels"}
        showBack={isEditorOpen}
        onBack={resetForm}
        onClose={onClose}
      />

      {isEditorOpen ? (
        <LabelEditor
          title={labelTitle} color={labelColor}
          setTitle={setLabelTitle} setColor={setLabelColor}
          onSave={handleSaveLabel} onRemove={() => handleRemove(editingLabelId)}
          isEditing={!!editingLabelId}
        />
      ) : (
        <div>
          <p className="text-[11px] font-bold text-gray-500 uppercase mb-2">Board labels</p>
          <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
            {allLabels.length === 0 ? (
              <div className="text-center py-1 text-gray-400 text-sm italic">No labels yet...</div>
            ) : (
              allLabels.map(label => (
                <LabelItem
                  key={label.id} label={label}
                  isSelected={currentTaskLabelIds.includes(label.id)}
                  onToggle={onToggleLabel} onEdit={handleEditClick}
                />
              ))
            )}
          </div>
          <button
            onClick={() => setIsEditorOpen(true)}
            className="w-full mt-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm font-medium flex items-center justify-center gap-2 transition"
          >
            <Plus size={16} /> Add new label
          </button>
        </div>
      )}
    </div>
  );
};

export default Labels;