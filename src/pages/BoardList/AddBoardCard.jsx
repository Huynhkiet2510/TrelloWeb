const AddBoardCard = ({ value, onChange, onAdd }) => (
  <div className="h-28 bg-white/50 border-2 border-dashed border-white/60 rounded-md p-3 
                  flex flex-col justify-between transition-all duration-200 
                  hover:bg-white/20 hover:border-white/40 group">
    <input
      className="bg-black/20 border-none text-white text-sm px-3 py-1.5 rounded 
                 placeholder:text-blue-100/40 focus:bg-black/40 outline-none transition-all"
      placeholder="Enter new board..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && onAdd()}
    />
    <button
      onClick={onAdd}
      disabled={!value.trim()}
      className="w-full bg-[#4E96C2] hover:bg-[#5da8d6] 
                 text-white font-bold py-1.5 rounded text-sm transition-colors 
                 shadow-md  disabled:opacity-40  disabled:cursor-not-allowed"
    >
      + Add board
    </button>
  </div>
);

export default AddBoardCard;