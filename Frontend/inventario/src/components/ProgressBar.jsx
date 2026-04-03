function ProgressBar({ value, max = 100 }) {
  const percentage = Math.round((value / max) * 100);
  const colorClass = percentage < 20 ? "bg-red-500" : "bg-blue-600";
  
  return (
    <div className="flex flex-col gap-1.5 w-full max-w-[120px]">
      <div className="flex justify-between text-[10px] font-bold text-gray-400">
        <span>{value} / {max}</span>
        <span className="text-gray-800">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
        <div
          className={`${colorClass} h-full rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default ProgressBar;
