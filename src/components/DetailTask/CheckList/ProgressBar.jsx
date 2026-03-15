import React from 'react'

const ProgressBar = ({ items = [] }) => {
  const total = items.checklists?.length || 0;
  const completed = items.checklists?.filter(t => t.isDone).length || 0;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="mb-4">
      <div className="flex items-center gap-3 mb-1">
        <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-500 ease-out"
            style={{ width: `${percent}%` }}
          ></div>
        </div>
        <span className="text-xs font-bold text-gray-600 w-8">{percent}%</span>
      </div>
    </div>
  )
}

export default ProgressBar