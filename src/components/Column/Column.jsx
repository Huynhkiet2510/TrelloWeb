import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Droppable } from '@hello-pangea/dnd';
import TaskCard from '../TaskCard/TaskCard';
import TaskDetailModal from '../DetailTask/TaskDetailModal';
import { useTaskAction } from '../../hooks/useTaskAction';
import { useColumnAction } from '../../hooks/useColumnAction';

const Column = ({ column }) => {
    const { handleRemoveColumn, handleUpdateColumnTitle } = useColumnAction();
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [titleValue, setTitleValue] = useState(column.title);
    

    const {
        tasks, 
        isOpenTaskModal,
        setIsOpenTaskModal,
        selectedTask,
        setSelectedTask,
        isEditTaskTitle,
        newTaskTitle,
        setNewTaskTitle,
        handleEditTask,
        handleSave,
        handleRemoveTask,
        handleKeyDown,
    } = useTaskAction(column?.id); 

    const handleUpdateTitle = () => {
        if (titleValue.trim() !== "" && titleValue !== column.title) {
            handleUpdateColumnTitle(column.id, titleValue);
        }
        setIsEditingTitle(false);
    };

    return (
        <div className="bg-[#ebedf0] w-[280px] shrink-0 rounded-xl flex flex-col max-h-[80vh] p-3 shadow-md relative group">
            <div className="flex justify-between items-center mb-3 px-1">
                {isEditingTitle ? (
                    <input
                        autoFocus
                        className="text-sm font-bold p-1 w-full border-2 border-blue-500 rounded outline-none"
                        value={titleValue}
                        onChange={(e) => setTitleValue(e.target.value)}
                        onBlur={handleUpdateTitle}
                        onKeyDown={(e) => e.key === 'Enter' && handleUpdateTitle()}
                    />
                ) : (
                    <h2
                        onClick={() => setIsEditingTitle(true)}
                        className="font-semibold text-gray-700 cursor-pointer w-full truncate pr-2 hover:text-blue-600 transition-colors"
                    >
                        {column.title}
                    </h2>
                )}

                <button
                    onClick={() => handleRemoveColumn(column.id)}
                    className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1 rounded-md transition-all opacity-0 group-hover:opacity-100"
                    title="Xóa cột"
                >
                    <X size={18} />
                </button>
            </div>

            {/* Droppable Area */}
            <Droppable droppableId={column?.id}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="flex-1 overflow-y-auto flex flex-col gap-2 pr-1 min-h-[10px]"
                    >
                        {tasks.map((task, index) => (
                             <TaskCard
                                    key={task.id}
                                    task={task}
                                    index={index}
                                    onEdit={handleEditTask}                        
                                    onClick={() => setSelectedTask(task.id)} 
                                   
                                />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

            {/* Add/Edit Task Input Area */}
            {!isOpenTaskModal ? (
                <button
                    onClick={() => setIsOpenTaskModal(true)}
                    className="mt-3 flex items-center gap-2 text-gray-600 hover:bg-gray-300/50 p-2 rounded-lg w-full transition font-medium text-sm"
                >
                    <Plus size={18} /> Add a card
                </button>
            ) : (
                <div className='mt-3'>
                    <textarea
                        autoFocus
                        placeholder="Nhập nội dung thẻ..."
                        value={newTaskTitle}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        className="w-full p-2 bg-white border-2 border-blue-500 rounded-lg outline-none shadow-sm text-sm min-h-[80px] resize-none"
                    />
                    <div className="flex items-center gap-2 mt-2">
                        <button
                            onClick={handleSave}
                            className="bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded text-white text-sm font-medium transition active:scale-95 shadow-sm"
                        >
                           {isEditTaskTitle ? "Save" : "Add"}
                        </button>
                        <button
                            onClick={() => setIsOpenTaskModal(false)}
                            className="p-1.5 hover:bg-gray-200 rounded-md transition text-gray-500"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>
            )}

            {selectedTask && (
                <TaskDetailModal
                column={column}
                    taskId={selectedTask}
                    onRemove={handleRemoveTask}
                    onClose={() => setSelectedTask(null)}
                />
            )}
        </div>
    );
};

export default Column;