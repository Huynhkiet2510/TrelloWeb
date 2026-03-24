import CardSkeleton from "./CardSkeleton"

const ColumnSkeleton = () => (
  <div className="w-72 bg-gray-200/50 backdrop-blur-sm rounded-xl flex flex-col p-3 shrink-0 h-fit">
    <div className="h-4 bg-gray-300 rounded w-24 mb-5 animate-pulse ml-2"></div>

    <CardSkeleton />
    <CardSkeleton />
    <CardSkeleton />
    <CardSkeleton />
    <CardSkeleton />
    <CardSkeleton />

    <div className="h-8 bg-gray-300/50 rounded-md w-full mt-2 animate-pulse"></div>
  </div>
);

export default ColumnSkeleton;