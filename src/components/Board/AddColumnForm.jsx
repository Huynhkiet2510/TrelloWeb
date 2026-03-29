import React from "react";

const AddColumnForm = ({
    isAdding,
    setIsAdding,
    title,
    setTitle,
    onSubmit,
}) => {
    if (!isAdding) {
        return (
            <div className="shrink-0">
                <button
                    onClick={() => setIsAdding(true)}
                    className="bg-white/40 hover:bg-white/30 text-white min-w-[280px] h-12 rounded-lg transition"
                >
                    + Add a column
                </button>
            </div>
        );
    }

    return (
        <div className="shrink-0">
            <form
                onSubmit={onSubmit}
                className="bg-[#f1f2f4] min-w-[280px] p-2 rounded-lg shadow-md"
            >
                <input
                    autoFocus
                    className="w-full p-2 rounded border-2 border-blue-500 outline-none text-sm"
                    placeholder="Nhập tiêu đề danh sách..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div className="flex items-center gap-2 mt-2">
                    <button
                        type="submit"
                        disabled={!title.trim()}
                        className={`px-3 py-1.5 rounded text-sm font-medium transition-all duration-200 bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400
                                   disabled:bg-gray-200
                                   disabled:text-gray-400
                                     disabled:cursor-not-allowed
                                   
  `}
                    >
                        Add
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setIsAdding(false);
                            setTitle("");
                        }}
                        className="text-gray-500 hover:text-gray-800 p-1 px-2 text-xl"
                    >
                        ✕
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddColumnForm;
