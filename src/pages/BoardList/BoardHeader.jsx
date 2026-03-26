const BoardHeader = ({ totalBoards }) => (
  <div className="w-full mb-10 flex justify-between items-end border-b border-white/10 pb-6">
    <div>
      <h1 className="text-3xl font-black uppercase tracking-tighter italic">Workspace</h1>
      <p className="text-blue-100/60 text-sm font-medium">
        Manage your project boards efficiently
      </p>
    </div>
    <div className="text-xs bg-blue-500/20 backdrop-blur-md border border-blue-400/30 text-blue-100 px-4 py-2 rounded-full font-bold">
      Total Boards: {totalBoards}
    </div>
  </div>
);

export default BoardHeader;