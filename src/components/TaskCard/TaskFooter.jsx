import { Clock, Pencil, FilePen, CheckSquare } from "lucide-react";

const TaskFooter = ({ dueDate, checklists, onEdit, onClick }) => {
    const formatVietnameseDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit' }).format(date);
    };

    return (
        <div className='flex items-center justify-between min-h-[24px] mt-2'>
            <div className="flex items-center gap-3 text-gray-500">

                {dueDate && (
                    <div className="flex items-center gap-1">
                        <Clock size={14} strokeWidth={2} />
                        <span className="text-[12px] font-medium">
                            {formatVietnameseDate(dueDate)}
                        </span>
                    </div>
                )}

                {checklists?.length > 0 && (
                    <div className="flex items-center gap-1">
                        <CheckSquare size={14} strokeWidth={2} />
                        <span className="text-[12px] font-medium">{checklists.length}</span>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={onEdit} className="p-1 hover:bg-gray-100 rounded text-green-600">
                    <Pencil size={14} />
                </button>
                <button onClick={onClick} className="p-1 hover:bg-gray-100 rounded text-yellow-600">
                    <FilePen size={14} />
                </button>
            </div>
        </div>
    );
};

export default TaskFooter;