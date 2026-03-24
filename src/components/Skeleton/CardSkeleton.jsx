const CardSkeleton = () => (
  <div className="bg-white/60 p-3 rounded shadow-sm mb-2 animate-pulse">
    <div className="w-10 h-2 bg-gray-300 rounded-full mb-3"></div>
    <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
  </div>
);


export default CardSkeleton;