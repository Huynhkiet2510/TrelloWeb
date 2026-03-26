import { Trash } from "lucide-react";
import { useState } from "react";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal"

const BoardItem = ({
  board, isEditing, editTitle, setEditTitle,
  onStartEdit, onUpdate, onRemove, onViewDetail
}) => {

  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <div className="h-28 bg-white rounded-md p-4 cursor-pointer shadow-sm flex flex-col justify-between transition-all group relative">
        {isEditing ? (
          <input
            autoFocus
            className="text-sm font-bold p-1 w-full text-gray-800 rounded outline-none border-2 border-blue-400"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            onBlur={() => onUpdate(board.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onUpdate(board.id);
              if (e.key === 'Escape') onStartEdit(null); 
            }}
          />
        ) : (
          <div className="flex justify-between items-start">
            <h2
              onClick={(e) => onStartEdit(e, board)}
              className="font-semibold text-black cursor-pointer w-full truncate pr-2 hover:text-blue-400 transition-colors"
            >
              {board.title}
            </h2>
            <button
              onClick={() => setShowConfirm(true) }
              className="text-white bg-red-500 hover:bg-red-600 p-1.5 rounded transition-all opacity-0 group-hover:opacity-100"
            >
              <Trash size={16} />
            </button>
          </div>
        )}

        <div
          onClick={() => onViewDetail(board.id)}
          className="text-[10px] text-gray-400 uppercase hover:text-blue-600 tracking-widest font-semibold transition-colors"
        >
          View Detail
        </div>
      </div>

      <ConfirmModal
        isOpen={showConfirm}
        title="Xóa cột này?"
        message="Toàn bộ thẻ (cards) bên trong cột này sẽ bị mất vĩnh viễn. Bạn có chắc chắn không?"
        onConfirm={() => onRemove(board.id)}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
};

export default BoardItem;