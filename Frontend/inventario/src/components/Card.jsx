function Card({ title, value, icon, description, trend, color = "blue" }) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    amber: "bg-amber-50 text-amber-600",
    red: "bg-red-50 text-red-600",
    indigo: "bg-indigo-50 text-indigo-600",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col gap-1 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <div className={`p-2.5 rounded-lg ${colorClasses[color] || colorClasses.blue}`}>
          {icon}
        </div>
        {trend && (
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${trend > 0 ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
            {trend > 0 ? "+" : ""}{trend}%
          </span>
        )}
      </div>
      <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      {description && <p className="text-xs text-gray-400 mt-1">{description}</p>}
    </div>
  );
}

export default Card;
