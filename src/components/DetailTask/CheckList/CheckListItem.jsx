import { X } from "lucide-react";
import ConfirmModal from '../../ConfirmModal/ConfirmModal';
import { useState } from "react";

const ChecklistItem = ({ item, onRemove, onToggle }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    onRemove();
    setShowConfirm(false);
  };

  return (
    <>
      <li className="flex justify-between items-center gap-4 p-2 hover:bg-gray-50 rounded-md group">
        <div className="flex items-center gap-2 flex-1">
          <input
            type="checkbox"
            checked={item.isDone}
            onChange={onToggle}
            className="w-4 h-4 accent-blue-600 cursor-pointer"
          />

          <span
            className={`text-sm break-all ${item.isDone
              ? "line-through text-gray-400"
              : "text-gray-700"
              }`}
          >
            {item.text}
          </span>
        </div>

        <X 
          size={16} 
          onClick={() => setShowConfirm(true)} 
          className="text-gray-400 cursor-pointer hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" 
        />
      </li>

      <ConfirmModal
        isOpen={showConfirm}
        title="Xóa mục này?"
        message={`Bạn có chắc muốn xóa "${item.text}" không?`}
        onConfirm={handleDelete}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
};

export default ChecklistItem;