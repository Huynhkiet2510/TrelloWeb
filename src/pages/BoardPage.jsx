import Board from '../components/Board/Board'
import Navbar from "../components/Navbar/Navbar"
import { useColumnAction } from '../hooks/useColumnAction';

const BoardPage = () => {
    const {
        board,
        columns,
        newColumnTitle,
        setNewColumnTitle,
        isAddColumnModal,
        setIsAddColumnModal,
        handleAddColumn,
        onDragEnd,
        colsLoading
    } = useColumnAction();

    return (
        <div className="h-screen flex flex-col">
            <Navbar board={board} />
            <div className="flex-1 relative overflow-hidden">
                <Board
                    colsLoading={colsLoading}
                    board={board}
                    columns={columns}
                    newColumnTitle={newColumnTitle}
                    setNewColumnTitle={setNewColumnTitle}
                    isAddColumnModal={isAddColumnModal}
                    setIsAddColumnModal={setIsAddColumnModal}
                    handleAddColumn={handleAddColumn}
                    onDragEnd={onDragEnd}
                />
            </div>
        </div>
    )
}

export default BoardPage