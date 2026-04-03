import React from "react";
import { AlertTriangle, TrendingDown, Package, Zap } from "lucide-react";

export default function PredictiveStockCard({ item }) {
  const isCritical = item.daysLeft < 7;
  const isHighGrowth = item.status === "HIGH GROWTH";
  const isFastMoving = item.status === "FAST MOVING";

  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-900/5 transition-all group relative overflow-hidden flex flex-col h-full">
      {/* Badge Top */}
      <div className="flex justify-between items-start mb-6">
         <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
           isHighGrowth ? "bg-green-50 text-green-600" : 
           isFastMoving ? "bg-indigo-50 text-indigo-600" : 
           "bg-gray-50 text-gray-400"
         }`}>
            {item.status}
         </span>
         <div className={`p-2 rounded-xl ${isCritical ? "bg-red-50 text-red-500 animate-pulse" : "bg-gray-50 text-gray-300"}`}>
            {isCritical ? <AlertTriangle size={16} /> : <Package size={16} />}
         </div>
      </div>

      <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter leading-tight mb-6">
        {item.nombre}
      </h3>

      <div className="mt-auto space-y-6">
         <div className="flex items-end gap-2">
            <span className={`text-5xl font-black tracking-tighter ${isCritical ? "text-red-500" : "text-gray-900"}`}>
               {item.daysLeft}
            </span>
            <div className="mb-2">
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Días</p>
               <p className="text-[8px] font-bold text-gray-300 uppercase tracking-tight leading-none mt-1">Restantes de stock</p>
            </div>
         </div>

         {/* Stock Level Bar */}
         <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100">
            <div 
               className={`h-full rounded-full transition-all duration-1000 ${
                 isCritical ? "bg-red-500" : "bg-green-500"
               }`}
               style={{ width: `${Math.min(100, (item.daysLeft / 30) * 100)}%` }}
            />
         </div>

         {item.reorderSuggested > 0 && (
            <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Reordenar Sugerido: <span className="text-indigo-600">{item.reorderSuggested}u</span></p>
               <button className="p-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all">
                  <Zap size={14} />
               </button>
            </div>
         )}
      </div>

      <div className="absolute -right-4 -top-4 opacity-[0.02] group-hover:scale-150 transition-transform duration-1000">
         <Package size={120} />
      </div>
    </div>
  );
}
