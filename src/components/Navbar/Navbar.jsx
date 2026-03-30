import { Search, Home, Star, Plus, Bell } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "../../stores/taskSlice"

const Navbar = ({ board}) => {

  const searchQuery = useSelector(state => state.task.searchQuery)

  const dispatch = useDispatch();
  const navigate = useNavigate();


  return (
    <div className="bg-[#026AA7] h-12 flex items-center justify-between px-4 text-white">

      <div className="flex items-center gap-2">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center bg-white/20 h-8 w-8 rounded-md hover:bg-white/30">
          <Home size={16} />
        </button>

        <div className="flex items-center bg-white/20 px-3 h-8 rounded-md hover:bg-white/30">
          <span className="font-medium">Kiệt Trello</span>
        </div>

        <div className="flex items-center gap-2 bg-white/20 px-3 h-8 rounded-md hover:bg-white/30">
          <Star size={16} />
          <span> {board?.title} </span>
        </div>

      </div>

      <div className="flex items-center bg-white/20 px-3 h-8 rounded-md w-72 hover:bg-white/30">
        <Search size={16} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          placeholder="Search tasks..."
          className="bg-transparent outline-none px-2 text-sm placeholder-white w-full"
        />
      </div>

      <div className="flex items-center gap-2">

        <button className="p-2 rounded hover:bg-white/20 transition">
          <Plus size={18} />
        </button>

        <button className="p-2 rounded hover:bg-white/20 transition">
          <Bell size={18} />
        </button>

        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center font-bold text-sm">
          K
        </div>

      </div>

    </div>
  );
};

export default Navbar;