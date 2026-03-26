import { useNavigate } from "react-router-dom";
import { useBoardAction } from "../../hooks/useBoardAction";
import bg from "../../assets/bg.jpg";
import BoardHeader from "./BoardHeader";
import BoardItem from "./BoardItem";
import AddBoardCard from "./AddBoardCard";
import BoardSkeleton from "../../components/Skeleton/BoardSkeleton";


const BoardList = () => {
  const navigate = useNavigate();
  
  const {
    boardList, newBoard, setNewBoard, handleAdd, handleRemove,
    editingId, editTitle, setEditTitle, boardLoading,
    startEdit, handleUpdate
  } = useBoardAction();

  return (
    <div
      className="p-6 md:p-8 min-h-screen text-white font-sans bg-black/50"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >

      <BoardHeader totalBoards={boardList?.length || 0} />

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {boardLoading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <BoardSkeleton key={i} />
          ))
        ) : (
          <>
            {boardList.map((board) => (
              <BoardItem
                key={board.id}
                board={board}
                isEditing={editingId === board.id}
                editTitle={editTitle}
                setEditTitle={setEditTitle}
                onStartEdit={startEdit}
                onUpdate={handleUpdate}
                onRemove={handleRemove}
                onViewDetail={(id) => navigate(`/board/${id}`)}
              />
            ))}

            <AddBoardCard
              value={newBoard}
              onChange={setNewBoard}
              onAdd={handleAdd}
            />
          </>
        )}
      </div>
      

    </div>
  );
};

export default BoardList;