import React, { useState } from 'react';
import { CheckSquare, Plus, X } from 'lucide-react';
import ChecklistItem from './CheckListItem';
import ProgressBar from './ProgressBar';

const ChecklistGroup = ({
  group,
  onAdd,
  onToggle,
  onRemoveItem,
  onOpenDeleteModal
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (!text.trim()) return;
    onAdd(group.id, text);
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleAdd();
    }
  }

  const handleCancel = () => {
    setText("");
    setIsAdding(false);
  }

  return (
    <div className="group/section border-b pb-6 last:border-0">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          <CheckSquare size={18} className="text-blue-500" /> {group.title}
        </h3>
        <button
          onClick={() => onOpenDeleteModal(group.id)}
          className="p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover/section:opacity-100 transition-opacity"
        >
          <X size={16} />
        </button>
      </div>

      <ProgressBar items={group.items || []} />

      <div className="mt-4 space-y-1">
        {group.items?.map(item => (
          <ChecklistItem
            key={item.id}
            item={item}
            onToggle={() => onToggle(item.id, item.isDone)}
            onRemove={() => onRemoveItem(item.id)}
          />
        ))}
      </div>

      {isAdding ? (
        <div className='mt-3 ml-8'>
          <textarea
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='Enter your item ...'
            className="w-full p-2 border-2 border-blue-400 rounded-md text-sm outline-none shadow-sm"
          />
          <div className="flex gap-2 mt-2">
            <button
              disabled={!text.trim()}
              onClick={handleAdd}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded text-sm font-medium disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed">
              Add
            </button>
            <button onClick={handleCancel} className="p-1.5 hover:bg-gray-200 rounded text-gray-500">
              <X size={20} />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="ml-8 mt-2 flex items-center gap-2 text-gray-500 hover:bg-gray-100 px-2 py-1.5 rounded-md text-sm transition-all"
        >
          <Plus size={16} /> Add item
        </button>
      )}
    </div>
  );
};

export default ChecklistGroup;