import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import TaskCard from '../TaskCard/TaskCard';

const TaskList = ({ columnId, tasks, onTaskClick }) => (
    <Droppable droppableId={columnId}>
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
                        onClick={() => onTaskClick(task.id)}
                    />
                ))}
                {provided.placeholder}
            </div>
        )}
    </Droppable>
);

export default TaskList;