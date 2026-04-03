import React from "react";
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, Package, FileText } from "lucide-react";

const icons = {
  ventas: <ShoppingBag size={20} />,
  ingresos: <DollarSign size={20} />,
  stock: <Package size={20} />,
  facturas: <FileText size={20} />
};

export default function StatCard({ title, value, trend, type, subtitle, color = "indigo" }) {
  const colors = {
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
    red: "bg-red-50 text-red-600 border-red-100",
    green: "bg-green-50 text-green-600 border-green-100"
  };

  return (
    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-900/5 transition-all group relative overflow-hidden">
      <div className="flex justify-between items-start relative z-10">
        <div className={`p-3 rounded-2xl ${colors[color]} border shadow-sm group-hover:scale-110 transition-transform`}>
          {icons[type]}
        </div>
        {trend && (
           <span className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg ${trend > 0 ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
              {trend > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {Math.abs(trend)}%
           </span>
        )}
      </div>

      <div className="mt-6 relative z-10">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">{title}</p>
        <h3 className="text-3xl font-black text-gray-900 tracking-tighter">{value}</h3>
        {subtitle && <p className={`text-[10px] font-bold mt-2 ${colors[color].split(' ')[1]}`}>{subtitle}</p>}
      </div>

      {/* Decorative background element */}
      <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full opacity-[0.03] group-hover:scale-150 transition-transform duration-700 ${colors[color].split(' ')[0]}`} />
    </div>
  );
}
