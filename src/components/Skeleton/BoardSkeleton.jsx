const BoardSkeleton = () => {
  return (
    <div className="h-28 bg-white rounded-md p-4 shadow-sm flex flex-col justify-between animate-pulse">
      
      <div className="flex justify-between items-start">
        <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
        <div className="h-6 w-6 bg-gray-300 rounded"></div>
      </div>

      <div className="h-3 w-1/3 bg-gray-300 rounded"></div>
    </div>
  );
};

export default BoardSkeleton;