import { Trash } from 'lucide-react';

const LabelEditor = ({ title, color, setTitle, setColor, onSave, onRemove, isEditing }) => (
    <div className="space-y-4">
        <div>
            <label className="text-[11px] font-bold text-gray-500 uppercase">title</label>
            <input
                type="text" autoFocus value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='w-full border-2 border-gray-200 rounded p-2 outline-none focus:border-blue-500 text-sm mt-1'
                placeholder="Enter your label..."
            />
        </div>
        <div>
            <label className="text-[11px] font-bold text-gray-500 uppercase">Select a color</label>
            <div className="flex items-center gap-3 mt-1">
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className='w-10 h-10 cursor-pointer bg-transparent border-none' />
                <span className="text-xs text-gray-500 font-mono uppercase bg-gray-100 px-2 py-1 rounded">{color}</span>
            </div>
        </div>
        <div className="flex gap-2 pt-2">
            <button
                disabled={!title.trim()}
                onClick={onSave}
                className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium shadow-sm transition disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed">
                {isEditing ? "Save" : "Add"}
            </button>
            {isEditing && (
                <button onClick={onRemove} className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded transition">
                    <Trash size={18} />
                </button>
            )}
        </div>
    </div>
);

export default LabelEditor;