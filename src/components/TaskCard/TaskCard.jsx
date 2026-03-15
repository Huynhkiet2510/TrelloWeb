import { Pencil, Trash2, FilePen } from "lucide-react";
import { Draggable } from '@hello-pangea/dnd';
import { useSelector } from "react-redux";

const TaskCard = ({ task, index, onEdit, onClick }) => {
  const allLabels = useSelector(state => state.label.items);

  const searchQuery = useSelector(state => state.task.searchQuery)

  const isMatched = task.title.toLowerCase().includes(searchQuery.toLowerCase());

  const isDimmed = searchQuery !== "" && !isMatched

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
          {task.labels && task.labels.length > 0 && (
            <div className="flex flex-wrap gap-1 ">
              {task.labels.map((labelId) => {
                const labelData = allLabels.find((l) => l.id === labelId);

                return labelData ? (
                  <div
                    key={labelId}
                    title={labelData.text}
                    style={{ backgroundColor: labelData.color }}
                    className="h-2 w-10 rounded-full"
                  />
                ) : null;
              })}
            </div>
          )}

          <div className='mb-2'>
            <h3 className="font-medium text-gray-800">{task.title}</h3>
          </div>

          <div className='flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity'>
            <button
              onClick={() => onEdit(task)}
              className="p-1 hover:bg-green-50 rounded transition-colors"
            >
              <Pencil size={16} className='text-green-400 hover:scale-110 transition-transform' />
            </button>
            <button
              onClick={onClick}
              className="p-1 hover:bg-green-50 rounded transition-colors"
            >
              <FilePen size={16} className='text-yellow-400 hover:scale-110 transition-transform' />
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;