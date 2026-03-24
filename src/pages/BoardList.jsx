import { useNavigate } from "react-router-dom";
import { useBoardAction } from "../hooks/useBoardAction";
import { Trash } from "lucide-react";
import bg from "../assets/bg.jpg";

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
    <div
      className="p-6 md:p-8 min-h-screen text-white font-sans bg-black/50"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="w-full mb-10 flex justify-between items-end border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter italic">
            Workspace
          </h1>
          <p className="text-blue-100/60 text-sm font-medium">
            Manage your project boards efficiently
          </p>
        </div>

        <div className="text-xs bg-blue-500/20 backdrop-blur-md border border-blue-400/30 text-blue-100 px-4 py-2 rounded-full font-bold">
          Total Boards: {boardList.length}
        </div>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {boardList.map((board) => (
          <div
            key={board.id}
            className="h-28 bg-white rounded-md p-4 cursor-pointer shadow-sm flex flex-col justify-between transition-all group relative"
          >
            {editingId === board.id ? (
              <input
                autoFocus
                className="text-sm font-bold p-1 w-full text-gray-800 rounded outline-none border-2 border-blue-400"
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
                  className="font-semibold text-black cursor-pointer w-full truncate pr-2 hover:text-blue-400 transition-colors"
                >
                  {board.title}
                </h2>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(board.id);
                  }}
                  className="text-[10px] bg-red-500 hover:bg-red-600 px-2 py-1 rounded transition-all cursor-pointer"
                >
                  <Trash size={18} />
                </button>
              </div>
            )}

            <div
              onClick={() => navigate(`/board/${board.id}`)}
              className="text-[10px] text-gray-700 uppercase hover:text-blue-600 tracking-widest opacity-60 font-semibold">
              View Detail
            </div>
          </div>
        ))}

        <div className="h-28 bg-white/50 border-2 border-dashed border-white/60 rounded-md p-3 
                        flex flex-col justify-between transition-all duration-200 
                        hover:bg-white/20 hover:border-white/40 group">
          <input
            className="bg-black/20 border-none text-white text-sm px-3 py-1.5 rounded 
                       placeholder:text-blue-100/40 focus:bg-black/40 outline-none transition-all"
            placeholder="Enter new board..."
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