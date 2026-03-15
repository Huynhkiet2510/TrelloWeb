import { useNavigate } from "react-router-dom";
import { useBoardAction } from "../hooks/useBoardAction";
import { Trash } from 'lucide-react';

const BoardList = () => {
  const {
    boardList,
    newBoard,
    setNewBoard,
    handleAdd,
    handleRemove,
    editingId,
    setEditingId,
    editTitle,
    setEditTitle,
    startEdit,
    handleUpdate
  } = useBoardAction();

  const navigate = useNavigate();

  return (
    <div className="p-6 md:p-8 bg-[#026AA7] min-h-screen text-white font-sans">
      <div className="w-full mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-tight">
            Workspace
          </h1>
          <p className="text-blue-100/70 text-sm">
            Your project boards
          </p>
        </div>

        <div className="text-xs bg-[#4E96C2] px-3 py-1.5 rounded font-bold shadow-sm">
          Total: {boardList.length}
        </div>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {boardList.map((board) => (
          <div
            key={board.id}
            onClick={() => navigate(`/board/${board.id}`)}
            className="h-28 bg-[#4E96C2] rounded-md p-4 cursor-pointer shadow-sm flex flex-col justify-between transition-all group relative"
          >
            {editingId === board.id ? (
              <input
                autoFocus
                className="text-sm font-bold p-1 w-full text-gray-800 rounded outline-none border-2 border-yellow-400"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                onBlur={() => handleUpdate(board.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleUpdate(board.id);
                  if (e.key === 'Escape') setEditingId(null);
                }}
              />
            ) : (
              <div className="flex justify-between items-start">
                <h2
                  onClick={(e) => startEdit(e, board)}
                  className="font-semibold text-white cursor-pointer w-full truncate pr-2 hover:text-blue-400 transition-colors"
                >
                  {board.title}
                </h2>
                <button
                  onClick={(e) => handleRemove(e, board.id)}
                  className="text-[10px] bg-red-500 hover:bg-red-600 px-2 py-1 rounded transition-all cursor-pointer"
                >
                  <Trash size={18} />
                </button>
              </div>
            )}

            <div className="text-[10px] uppercase tracking-widest opacity-60 font-semibold">
              View Detail
            </div>
          </div>
        ))}

        <div className="h-28 bg-white/10 border-2 border-dashed border-white/20 rounded-md p-3 
                        flex flex-col justify-between transition-all duration-200 
                        hover:bg-white/20 hover:border-white/40 group">
          <input
            className="bg-black/20 border-none text-white text-sm px-3 py-1.5 rounded 
                       placeholder:text-blue-100/40 focus:bg-black/40 outline-none transition-all"
            placeholder="Tên bảng mới..."
            value={newBoard}
            onChange={(e) => setNewBoard(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          />

          <button
            onClick={handleAdd}
            disabled={!newBoard.trim()}
            className="w-full bg-[#4E96C2] hover:bg-[#5da8d6] disabled:opacity-40 
                       text-white font-bold py-1.5 rounded text-sm transition-colors 
                       shadow-md active:scale-95"
          >
            + Add board
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardList;