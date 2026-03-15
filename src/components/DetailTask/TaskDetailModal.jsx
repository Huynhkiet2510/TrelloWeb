import React from 'react';
import { X, AppWindow } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectTaskById } from '../../stores/taskSlice';
import TaskDetailContent from './TaskDetailContent';
import TaskDetailSidebar from './TaskDetailSidebar';

const ModalDetailTask = ({ taskId, onClose, onRemove, column }) => {
    const task = useSelector((state) => selectTaskById(state, taskId));
    const allLabels = useSelector((state) => state.label.items);

    if (!task) return null;

    const hasTaskInfo = task?.labels?.length > 0 || task?.dueDate;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 transition-opacity">
            <div className="absolute inset-0" onClick={onClose}></div>

            <div className="bg-white w-[900px] h-[700px] rounded-xl shadow-2xl flex flex-col overflow-hidden relative z-10">
                <div className="flex justify-between items-start p-6 pb-3 border-b">
                    <div className="flex items-start gap-4 flex-1">
                        <AppWindow size={24} className="text-gray-600 mt-[6px]" />
                        <div className="flex-1">
                            <h2 className="font-semibold text-xl text-gray-800">
                                {task.title}
                            </h2>
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

                {hasTaskInfo && (
                    <div className="px-10 py-4 grid grid-cols-2 gap-8">
                        {task?.labels?.length > 0 && (
                            <div>
                                <p className="text-xs font-semibold text-gray-500 mb-2 uppercase">
                                    Labels
                                </p>
                                <div className="flex gap-2 flex-wrap">
                                    {task.labels.map((labelId) => {
                                        const labelData = allLabels.find((l) => l.id === labelId);
                                        return labelData ? (
                                            <div
                                                key={labelId}
                                                className="h-8 px-3 rounded flex items-center text-white text-sm font-medium"
                                                style={{ backgroundColor: labelData.color }}
                                            >
                                                {labelData.text}
                                            </div>
                                        ) : null;
                                    })}
                                </div>
                            </div>
                        )}
                        {task?.dueDate && (
                            <div>
                                <p className="text-xs font-semibold text-gray-500 mb-2 uppercase">
                                    Due date
                                </p>
                                <div className="bg-gray-100 px-3 py-1.5 rounded text-sm inline-flex items-center gap-2">

                                    <span>{new Date(task.dueDate).toLocaleDateString("vi-VN")}</span>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <div className="flex flex-1 overflow-hidden border-t">
                    <TaskDetailContent task={task} />
                    <TaskDetailSidebar
                        task={task}
                        onClose={onClose}
                        onRemove={onRemove}
                    />
                </div>
            </div>
        </div>
    );
};

export default ModalDetailTask;