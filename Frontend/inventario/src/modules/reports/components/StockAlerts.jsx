import React from "react";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function StockAlerts({ items }) {
  return (
    <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8 min-w-[320px]">
      <div className="px-2">
         <h3 className="text-xl font-black text-gray-900 tracking-tight">Alertas de Inventario</h3>
         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Items por debajo del stock mínimo</p>
      </div>

      <div className="space-y-6">
        {items?.map(p => (
           <div key={p.id} className="flex items-center gap-5 group">
              <div className="h-14 w-14 bg-gray-50 rounded-xl flex items-center justify-center grayscale opacity-80 border border-gray-50 flex-shrink-0">
                 <span className="text-2xl opacity-30">👕</span>
              </div>
              <div className="flex-1 min-w-0">
                 <p className="text-xs font-black text-gray-800 leading-none truncate">{p.nombre}</p>
                 <p className="text-[10px] font-bold text-red-500 mt-2 tracking-tight uppercase">
                    {p.stock} unidades restantes
                 </p>
              </div>
              <button className="p-2 text-gray-300 hover:text-indigo-600 transition-all cursor-pointer">
                 <RefreshCcw size={16} />
              </button>
           </div>
        ))}

        {(!items || items.length === 0) && (
           <div className="py-10 text-center opacity-20">
              <AlertCircle size={32} className="mx-auto mb-2 text-green-500" />
              <p className="text-[10px] font-black uppercase tracking-widest">Todo en orden</p>
           </div>
        )}
      </div>

      <button className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 cursor-pointer">
         <RefreshCcw size={16} />
         Reabastecer Todo
      </button>
    </div>
  );
}
