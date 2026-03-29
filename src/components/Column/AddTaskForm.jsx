import React from 'react';
import { Plus, X } from 'lucide-react';

const AddTaskForm = ({ isOpen, setIsOpen, title, setTitle, onSave, onKeyDown }) => {
    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="mt-3 flex items-center gap-2 text-gray-600 hover:bg-gray-300/50 p-2 rounded-lg w-full transition font-medium text-sm"
            >
                <Plus size={18} /> Add a card
            </button>
        );
    }

    return (
        <div className='mt-3'>
            <textarea
                autoFocus
                placeholder="Nhập nội dung thẻ..."
                value={title}

                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={onKeyDown}
                className="w-full p-2 bg-white border-2 border-blue-500 rounded-lg outline-none shadow-sm text-sm min-h-[80px] resize-none"
            />
            <div className="flex items-center gap-2 mt-2">
                <button
                    disabled={!title.trim()}
                    onClick={onSave}
                    className="bg-green-600 hover:bg-green-700 px-4 py-1.5 rounded text-white text-sm font-medium transition shadow-sm
                  disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                    Add
                </button>
                <button
                    onClick={() => { setIsOpen(false); setTitle(""); }}
                    className="p-1.5 hover:bg-gray-200 rounded-md transition text-gray-500"
                >
                    <X size={20} />
                </button>
            </div>
        </div>
    );
};

export default AddTaskForm;