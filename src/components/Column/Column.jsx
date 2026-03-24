import React from 'react';
import TaskDetailModal from '../DetailTask/TaskDetailModal';
import { useTaskAction } from '../../hooks/useTaskAction';
import { useColumnAction } from '../../hooks/useColumnAction';
import ColumnHeader from './ColumnHeader';
import TaskList from './TaskList';
import AddTaskForm from './AddTaskForm';

const Column = ({ column }) => {
    const { handleRemoveColumn, handleUpdateColumnTitle } = useColumnAction();
    const {
        tasks, isOpenTaskModal, setIsOpenTaskModal,
        selectedTask, setSelectedTask, newTaskTitle,
        setNewTaskTitle, handleSave, handleRemoveTask, handleKeyDown,
    } = useTaskAction(column?.id);

    return (
        <div className="bg-[#ebedf0] w-[280px] shrink-0 rounded-xl flex flex-col max-h-[80vh] p-3 shadow-md relative group">
            <ColumnHeader
                title={column.title}
                columnId={column.id}
                onUpdateTitle={handleUpdateColumnTitle}
                onRemoveColumn={handleRemoveColumn}
            />

            <TaskList
                columnId={column?.id}
                tasks={tasks}
                onTaskClick={setSelectedTask}
            />

            <AddTaskForm
                isOpen={isOpenTaskModal}
                setIsOpen={setIsOpenTaskModal}
                title={newTaskTitle}
                setTitle={setNewTaskTitle}
                onSave={handleSave}
                onKeyDown={handleKeyDown}
            />

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