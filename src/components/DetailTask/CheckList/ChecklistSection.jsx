import React, { useState } from 'react';
import { CheckSquare, Plus, X } from 'lucide-react';
import ChecklistItem from './CheckListItem';
import ProgressBar from './ProgressBar';

const ChecklistSection = ({ task, onAdd, onToggle, onRemove }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-700 flex items-center gap-2">
        <CheckSquare size={20} /> Checklist
      </h3>
      
      <ProgressBar items={task} />

      <ul className="space-y-3">
        {task.checklists?.map(item => (
          <ChecklistItem key={item.id} item={item} onToggle={() => onToggle(item.id)} onRemove={() => onRemove(item.id)} />
        ))}
      </ul>

      {isAdding ? (
        <div className='mt-2'>
          <textarea autoFocus value={text} onChange={(e) => setText(e.target.value)} placeholder='Enter your item...' className="w-full p-2 border-2 border-blue-500 rounded min-h-[80px]" />
          <div className="flex gap-2 mt-2">
            <button onClick={handleAdd} className="bg-green-600 text-white px-4 py-1.5 rounded text-sm">Save</button>
            <button onClick={() => setIsAdding(false)} className="p-1.5 hover:bg-gray-200 rounded"><X size={20} /></button>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsAdding(true)} className="flex items-center gap-2 text-gray-600 p-2 rounded-lg w-full text-sm cursor-pointer">
          <Plus size={18} /> Add a item
        </button>
      )}
    </div>
  );
};

export default ChecklistSection;