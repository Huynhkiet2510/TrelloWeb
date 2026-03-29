import React from 'react'

const ProgressBar = ({ items = [] }) => {
  const total = items.length;
  const completed = items.filter(t => t.isDone).length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="mb-2">
      <div className="flex items-center gap-3">
        <span className="text-[11px] font-medium text-gray-500 w-8">{percent}%</span>
        <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ease-out ${percent === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
            style={{ width: `${percent}%` }}
          >

          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar;