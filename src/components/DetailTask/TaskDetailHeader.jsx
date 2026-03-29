import React from 'react'
import { useTaskAction } from '../../hooks/useTaskAction';
import { X, AppWindow } from "lucide-react";

const TaskDetailHeader = ({ column, task, onClose }) => {
    const {
        isEditTaskTitle,
        newTaskTitle,
        setNewTaskTitle,
        handleKeyDown,
        handleEditTask
    } = useTaskAction();

    return (
        <div className="flex justify-between items-start p-6 pb-3 border-b">
            <div className="flex items-start gap-4 flex-1">
                <AppWindow size={24} className="text-gray-600 mt-[6px]" />
                <div className="flex-1">
                    {isEditTaskTitle
                        ? (
                            <input
                                autoFocus
                                className="text-sm font-bold p-1 w-full border-2 border-blue-500 rounded outline-none"
                                value={newTaskTitle}
                                onChange={(e) => setNewTaskTitle(e.target.value)}                   
                                onKeyDown={handleKeyDown}
                            />
                        )
                        : (<h2
                            onClick={() => handleEditTask(task)}
                            className="font-semibold text-xl text-gray-800">
                            {task.title}
                        </h2>)}
                    <p className="text-sm text-gray-500 mt-1">
                        In Column{" "}
                        <span className="ml-1 underline hover:text-blue-600 cursor-pointer">
                            {column.title}
                        </span>
                    </p>
                </div>
            </div>

            <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
                <X size={20} className="text-gray-500" />
            </button>
        </div>
    )
}

export default TaskDetailHeader