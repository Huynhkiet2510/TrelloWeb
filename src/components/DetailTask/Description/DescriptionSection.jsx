import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const DescriptionSection = ({ initialDescription, onSave }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [desc, setDesc] = useState(initialDescription);

  useEffect(() => setDesc(initialDescription), [initialDescription]);

  const handleSave = () => {
    onSave(desc);
    setIsEdit(false);
  };

  if (isEdit) {
    return (
      <div className="space-y-2">
        <textarea
          autoFocus
          placeholder='Enter your description...'
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full p-2 border-2 border-blue-500 rounded min-h-[80px]"
        />
        <div className="flex gap-2">
          <button onClick={handleSave} className="bg-green-600 text-white px-4 py-1.5 rounded text-sm">Save</button>
          <button onClick={() => setIsEdit(false)} className="p-1.5 hover:bg-gray-200 rounded"><X size={20} /></button>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={() => setIsEdit(true)}
      className="w-full min-h-[60px] p-3 bg-gray-100/50 hover:bg-gray-200/50 rounded-lg cursor-pointer"
    >
      {initialDescription || "Thêm mô tả chi tiết..."}
    </div>
  );
};

export default DescriptionSection;