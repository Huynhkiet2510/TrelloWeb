import { useSelector } from "react-redux";

import { selectTaskById } from "../../stores/taskSlice";
import TaskDetailContent from "./TaskDetailContent";
import TaskDetailSidebar from "./TaskDetailSidebar";
import TaskDetailHeader from "./TaskDetailHeader";
import { useState } from "react";

const ModalDetailTask = ({ taskId, onClose, onRemove, column }) => {
    const [uploadingFile, setUploadingFile] = useState(null);

    const task = useSelector((state) => selectTaskById(state, taskId));
    const allLabels = useSelector((state) => state.label.items);


    if (!task) return null;

    const hasTaskInfo =
        task?.labels?.length > 0 ||
        task?.dueDate;


    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 transition-opacity">


            <div className="bg-white w-[900px] h-[700px] rounded-xl shadow-2xl flex flex-col overflow-hidden relative z-10">

                <TaskDetailHeader column={column} task={task} onClose={onClose} />

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
                    <TaskDetailContent
                        task={task}
                        setUploadingFile={setUploadingFile}
                        uploadingFile={uploadingFile}
                    />

                    <TaskDetailSidebar
                        task={task}
                        onClose={onClose}
                        onRemove={onRemove}
                        setUploadingFile={setUploadingFile}
                        uploadingFile={uploadingFile}
                    />
                </div>
            </div>
        </div>
    );
};

export default ModalDetailTask;