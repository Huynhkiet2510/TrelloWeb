const TaskLabels = ({ labels = [], allLabels = [] }) => {
  if (!labels.length) return null;

  return (
    <div className="flex flex-wrap gap-1 mb-2">
      {labels.map((labelId) => {
        const labelData = allLabels.find((l) => l.id === labelId);
        return labelData ? (
          <div
            key={labelId}
            title={labelData.text}
            style={{ backgroundColor: labelData.color }}
            className="h-1.5 w-8 rounded-full"
          />
        ) : null;
      })}
    </div>
  );
};

export default TaskLabels;