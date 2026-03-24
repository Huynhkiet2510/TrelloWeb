import { Check, Pencil  } from 'lucide-react';

const LabelItem = ({ label, isSelected, onToggle, onEdit }) => (
  <div className="flex items-center gap-2 group">
    <div
      onClick={() => onToggle(label.id)}
      className="flex-1 h-8 rounded px-3 flex items-center justify-between text-white text-xs font-semibold transition-all hover:brightness-90 shadow-sm cursor-pointer overflow-hidden"
      style={{ backgroundColor: label.color }}
    >
      <span className="truncate pr-2">{label.text || ""}</span>
      {isSelected && <Check size={14} strokeWidth={3} />}
    </div>
    <button
      onClick={() => onEdit(label)}
      className="p-1.5 hover:bg-gray-100 rounded text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
    >
      <Pencil size={14} className="text-gray-500" />
    </button>
  </div>
);
export default LabelItem;