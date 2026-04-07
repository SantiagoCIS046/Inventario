import { TrendingUp, TrendingDown } from "lucide-react";

function Card({ title, value, extra, icon, color = "blue" }) {
  const isPositive = extra?.startsWith("+");
  
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200/60 flex flex-col justify-between hover:shadow-md transition-all duration-300 group">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">{title}</p>
          <h2 className="text-3xl font-black text-gray-800 tracking-tight">{value}</h2>
        </div>
        {icon && (
          <div className="p-2.5 bg-gray-50 rounded-xl text-gray-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors">
            {icon}
          </div>
        )}
      </div>
      
      {extra && (
        <div className="mt-4 flex items-center gap-1.5">
          <span className={`flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${
            isPositive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
          }`}>
            {isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
            {extra}
          </span>
          <span className="text-[10px] text-gray-400 font-medium">vs último mes</span>
        </div>
      )}
    </div>
  );
}

export default Card;
