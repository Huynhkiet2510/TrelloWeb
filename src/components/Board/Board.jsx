import { DragDropContext } from '@hello-pangea/dnd';
import Column from '../Column/Column';

const Board = ({
    board,
    columns,
    newColumnTitle,
    setNewColumnTitle,
    isAddColumnModal,
    setIsAddColumnModal,
    handleAddColumn,
    onDragEnd
}) => {

    return (
        <div className="absolute inset-0 flex flex-col">
            <DragDropContext onDragEnd={onDragEnd}>
                <div
                    className="flex-1 bg-cover bg-center bg-no-repeat flex flex-col"
                    style={{ backgroundImage: `url(${board?.background})` }}
                >
                    <div className="flex-1 overflow-x-auto overflow-y-hidden px-8 py-8 flex gap-4 items-start">
                        {columns?.map(col => (
                            <div key={col.id} className="shrink-0">
                                <Column column={col} />
                            </div>
                        ))}

                        <div className="shrink-0">
                            {!isAddColumnModal ? (
                                <button onClick={() => setIsAddColumnModal(true)} className="bg-white/40 hover:bg-white/30 text-white min-w-[280px] h-12 rounded-lg transition">+ Add a column</button>
                            ) : (
                                <form onSubmit={handleAddColumn} className="bg-[#f1f2f4] min-w-[280px] p-2 rounded-lg shadow-md">
                                    <input autoFocus className="w-full p-2 rounded border-2 border-blue-500 outline-none text-sm" placeholder="Nhập tiêu đề..." value={newColumnTitle} onChange={(e) => setNewColumnTitle(e.target.value)} />
                                    <div className="flex items-center gap-2 mt-2">
                                        <button type="submit" className="bg-blue-600 text-white px-3 py-1.5 rounded text-sm">Add</button>
                                        <button type="button" onClick={() => setIsAddColumnModal(false)} className="text-gray-500 p-1">✕</button>
                                    </div>
                                </form>
                            )}
                        </div>

                        <div className="w-8 shrink-0 h-full"></div>
                    </div>
                </div>
            </DragDropContext>
        </div>
    );
};

export default Board;