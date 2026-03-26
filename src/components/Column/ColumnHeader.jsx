import React, { useState } from 'react';
import { X } from 'lucide-react';
import ConfirmModal from "../ConfirmModal/ConfirmModal"

const ColumnHeader = ({ title, columnId, onUpdateTitle, onRemoveColumn }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(title);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleSubmit = () => {
        if (value.trim() !== "" && value !== title) {
            onUpdateTitle(columnId, value);
        }
        setIsEditing(false);
    };

    return (
        <div className="flex justify-between items-center mb-3 px-1">
            {isEditing ? (
                <input
                    autoFocus
                    className="text-sm  p-1 w-full border-2 border-blue-500 rounded outline-none"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={handleSubmit}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                />
            ) : (
                <h2
                    onClick={() => setIsEditing(true)}
                    className="font-semibold text-gray-700 cursor-pointer w-full truncate pr-2 hover:text-blue-600 transition-colors"
                >
                    {title}
                </h2>
            )}
            <button
                onClick={() => setShowConfirm(true)}
                className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1 rounded-md transition-all opacity-0 group-hover:opacity-100"
            >
                <X size={18} />
            </button>

            <ConfirmModal
                isOpen={showConfirm}
                title="Xóa cột này?"
                message="Toàn bộ task của cột này sẽ mất"
                onConfirm={() => onRemoveColumn(columnId)}
                onCancel={() => setShowConfirm(false)}
            />
        </div>
    );
};

export default ColumnHeader;