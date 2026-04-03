function ProgressBar({ progress, color = "blue", size = "md", showLabel = false }) {
  const colors = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    amber: "bg-amber-500",
    red: "bg-red-500",
    indigo: "bg-indigo-500",
  };

  const sizes = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  const percentage = Math.min(100, Math.max(0, progress));

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-semibold text-gray-600">{percentage}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-100 rounded-full ${sizes[size] || sizes.md} overflow-hidden`}>
        <div
          className={`h-full ${colors[color] || colors.blue} transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
