import { Draggable } from '@hello-pangea/dnd';
import { useSelector } from "react-redux";
import { selectTaskById } from "../../stores/taskSlice";
import TaskLabels from "./TaskLabels";
import TaskFooter from "./TaskFooter";
import { useChecklist } from '../DetailTask/CheckList/useChecklist';

const TaskCard = ({ task, index, onEdit, onClick }) => {
  const allLabels = useSelector(state => state.label.items);
  const taskDetail = useSelector((state) => selectTaskById(state, task.id));
  const searchQuery = useSelector(state => state.task.searchQuery);

  const { checklists } = useChecklist(task.id)

  const isMatched = task.title.toLowerCase().includes(searchQuery.toLowerCase());
  const isDimmed = searchQuery !== "" && !isMatched;
  const isHighlight = searchQuery.length > 0 && isMatched;

  const cardClass = `
    group bg-white p-3 rounded border mb-2 transition-all duration-200
    ${isHighlight ? "border-2 border-blue-500" : "border-gray-200 shadow-sm"}
    ${isDimmed ? "opacity-30 grayscale-[50%] pointer-events-none" : "opacity-100"}
  `;

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`${cardClass} ${snapshot.isDragging ? "shadow-2xl ring-2 ring-blue-400" : ""}`}
          style={provided.draggableProps.style}
        >
          <TaskLabels labels={task.labels} allLabels={allLabels} />

          <div className='mb-3'>
            <h3 className="font-medium text-gray-800 text-sm leading-tight">{task.title}</h3>
          </div>

          <TaskFooter
            dueDate={taskDetail?.dueDate}
            checklists={checklists}
            onEdit={(e) => { e.stopPropagation(); onEdit(task); }}
            onClick={(e) => { e.stopPropagation(); onClick(); }}
          />
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;