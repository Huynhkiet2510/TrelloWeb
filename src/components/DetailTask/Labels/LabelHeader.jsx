import { X, ChevronLeft  } from 'lucide-react';

const LabelHeader = ({ title, showBack, onBack, onClose }) => (
    <div className="flex justify-between items-center mb-4 border-b pb-2">
        {showBack ? (
            <button onClick={onBack} className="text-gray-400 hover:text-gray-600">
                <ChevronLeft size={18} />
            </button>
        ) : <div className="w-4" />}
        <span className="text-sm font-semibold text-gray-600 flex-1 text-center">{title}</span>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={18} />
        </button>
    </div>
);

export default LabelHeader;