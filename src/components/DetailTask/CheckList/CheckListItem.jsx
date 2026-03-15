import { X } from "lucide-react";

const ChecklistItem = ({ item, onRemove, onToggle }) => {

  return (
    <li className="flex justify-between items-center gap-4 p-2 hover:bg-gray-50 rounded-md">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={item.isDone}
          onChange={onToggle}
          readOnly
          className="w-4 h-4 accent-blue-600"
        />

        <span
          className={`text-sm ${item.isDone
              ? "line-through text-gray-400"
              : "text-gray-700"
            }`}
        >
          {item.text}
        </span>
      </div>

      <X size={16} onClick={onRemove} className="text-gray-400 cursor-pointer hover:text-red-500" />
    </li>
  );
};

export default ChecklistItem;