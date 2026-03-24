import { DragDropContext } from '@hello-pangea/dnd';
import ColumnList from './ColumnList';
import AddColumnForm from './AddColumnForm';
import bg from "../../assets/bg.jpg";
import { useColumnAction } from '../../hooks/useColumnAction';

const Board = () => {
    const {
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
        <div className="absolute inset-0 flex flex-col">
            <DragDropContext onDragEnd={onDragEnd}>
                <div
                    className="flex-1 bg-cover bg-center bg-no-repeat flex flex-col"
                    style={{ backgroundImage: `url(${bg})` }}
                >
                    <div className="flex-1 overflow-x-auto overflow-y-hidden px-8 py-8 flex gap-4 items-start">

                        <ColumnList
                            loading={colsLoading}
                            columns={columns}
                        />

                        <AddColumnForm
                            isAdding={isAddColumnModal}
                            setIsAdding={setIsAddColumnModal}
                            title={newColumnTitle}
                            setTitle={setNewColumnTitle}
                            onSubmit={handleAddColumn}
                        />

                        <div className="w-8 shrink-0 h-full"></div>
                    </div>
                </div>
            </DragDropContext>
        </div>
    );
};

export default Board;