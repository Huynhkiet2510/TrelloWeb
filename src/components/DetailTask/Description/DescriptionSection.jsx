import React, { useState } from 'react';
import { X } from 'lucide-react';

const DescriptionSection = ({ initialDescription, onSave }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [desc, setDesc] = useState("");

  const handleStartEdit = () => {
    setDesc(initialDescription || "");
    setIsEdit(true);
  };

  const handleSave = () => {
    onSave(desc);
    setIsEdit(false);
  };

  const handleCancel = () => {
    setIsEdit(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  if (isEdit) {
    return (
      <div className="space-y-2">
        <textarea
          autoFocus
          placeholder="Enter your description..."
          value={desc}
          onKeyDown={handleKeyDown}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full p-2 border-2 focus:border-blue-500 rounded min-h-[80px] outline-none"
        />
        <div className="flex gap-2">
          <button
            disabled={!desc.trim()}
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700  text-white px-4 py-1.5 rounded text-sm disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="p-1.5 hover:bg-gray-200 rounded"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleStartEdit}
      className="w-full min-h-[60px] p-3 bg-gray-100/50 hover:bg-gray-200/50 rounded-lg cursor-pointer whitespace-pre-line"
    >
      {initialDescription || "Thêm mô tả chi tiết..."}
    </div>
  );
};

export default DescriptionSection;