import { Check, X, ChevronLeft, Trash, Pencil } from 'lucide-react';
import { useLabelAction } from '../../hooks/useLabelAction';

const Labels = ({ task, onToggleLabel, onClose }) => {
  const {
    handleEditClick, handleRemove, handleSaveLabel,
    resetForm, setIsEditorOpen, editingLabelId, labelTitle,
    setLabelTitle, labelColor, setLabelColor,
    isEditorOpen, allLabels, currentTaskLabelIds
  } = useLabelAction(task);

  return (
    <div className="absolute top-0 right-0 ml-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 z-50 p-3">
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        {isEditorOpen && (
          <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
            <ChevronLeft size={18} />
          </button>
        )}
        <span className="text-sm font-semibold text-gray-600 flex-1 text-center">
          {isEditorOpen ? (editingLabelId ? "Sửa nhãn" : "Tạo nhãn mới") : "Nhãn dán"}
        </span>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X size={18} />
        </button>
      </div>

      {isEditorOpen ? (
        <div className="space-y-4">
          <div>
            <label className="text-[11px] font-bold text-gray-500 uppercase">Tiêu đề</label>
            <input
              type="text"
              autoFocus
              value={labelTitle}
              onChange={(e) => setLabelTitle(e.target.value)}
              className='w-full border-2 border-gray-200 rounded p-2 outline-none focus:border-blue-500 text-sm mt-1'
              placeholder="Nhập tên nhãn..."
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-gray-500 uppercase">Chọn màu sắc</label>
            <div className="flex items-center gap-3 mt-1">
              <input
                type="color"
                value={labelColor}
                onChange={(e) => setLabelColor(e.target.value)}
                className='w-10 h-10 border-none cursor-pointer bg-transparent'
              />
              <span className="text-xs text-gray-500 font-mono uppercase">{labelColor}</span>
            </div>
          </div>

          <button
            onClick={handleSaveLabel}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition shadow-sm"
          >
            {editingLabelId ? "Lưu thay đổi" : "Tạo mới"}
          </button>
        </div>
      ) : (
        <div>
          <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
            <p className="text-[11px] font-bold text-gray-500 uppercase">Nhãn dán của bảng</p>
            {allLabels.map((label) => {
              const isSelected = currentTaskLabelIds.includes(label.id);

              return (
                <div key={label.id} className="flex items-center gap-2 group">
                  <div
                    onClick={() => onToggleLabel(label.id)}
                    className="flex-1 h-8 rounded px-3 flex items-center justify-between text-white text-sm font-medium transition-all hover:brightness-90 shadow-sm cursor-pointer"
                    style={{ backgroundColor: label.color }}
                  >
                    <span className="truncate pr-2">{label.text}</span>
                    {isSelected && <Check size={16} />}
                  </div>

                  <button
                    onClick={() => handleEditClick(label)}
                    className="p-1 hover:bg-gray-100 rounded text-gray-400 opacity-0 group-hover:opacity-100 transition"
                  >
                    <Pencil size={15} color="green" />
                  </button>
                  <button
                    onClick={() => handleRemove(label.id)}
                    className="p-1 hover:bg-gray-100 rounded text-gray-400 opacity-0 group-hover:opacity-100 transition"
                  >
                    <Trash size={15} color="red" />
                  </button>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => setIsEditorOpen(true)}
            className="w-full mt-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm font-medium transition"
          >
            Tạo nhãn mới
          </button>
        </div>
      )}
    </div>
  );
};

export default Labels;