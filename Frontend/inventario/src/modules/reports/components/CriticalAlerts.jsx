import React from "react";
import { AlertCircle, TrendingUp, TrendingDown, Target, Zap } from "lucide-react";

export default function CriticalAlerts({ items }) {
  return (
    <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-10 min-w-[340px]">
      <div className="flex items-center gap-3">
         <AlertCircle className="text-red-500" size={24} />
         <h3 className="text-xl font-black text-gray-900 tracking-tight">Alertas Críticas</h3>
      </div>

      <div className="space-y-6">
        {items?.map((item, idx) => {
          const isAgotado = item.stock === 0;
          const isExceso = item.daysLeft > 90;

          return (
            <div key={item.id} className={`p-6 rounded-3xl border transition-all hover:scale-[1.02] ${
              isAgotado ? "bg-red-50/30 border-red-100" : 
              isExceso ? "bg-indigo-50/20 border-indigo-100" : 
              "bg-amber-50/30 border-amber-100"
            }`}>
              <div className="flex gap-4">
                 <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center border border-gray-50 flex-shrink-0 shadow-sm overflow-hidden grayscale opacity-70">
                    <span className="text-3xl opacity-40">👕</span>
                 </div>
                 <div className="flex-1 min-w-0">
                    <p className="text-xs font-black text-gray-800 truncate uppercase">{item.nombre}</p>
                    <p className={`text-[10px] font-black uppercase tracking-widest mt-1 ${isAgotado ? "text-red-600" : isExceso ? "text-indigo-600" : "text-amber-600"}`}>
                      {isAgotado ? "Stock Agotado: 0 unidades" : isExceso ? `Exceso Stock: ${item.stock} unidades` : `Stock Bajo: ${item.stock} unidades`}
                    </p>
                    <p className="text-[9px] font-bold text-gray-400 mt-2">
                       {isAgotado ? "Reponer vía Supplier #42" : isExceso ? "Sugerencia: Promoción de temporada" : `Venta proyectada: ${Math.round(item.dailyAvg * 7)}u/semana`}
                    </p>
                 </div>
              </div>
            </div>
          );
        })}
      </div>

      <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-900 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all cursor-pointer">
         Ver todas las alertas
      </button>
    </div>
  );
}
