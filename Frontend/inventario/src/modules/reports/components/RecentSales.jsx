import React from "react";
import { ArrowUpRight, ShoppingBag, Clock, XCircle } from "lucide-react";
import { formatCurrency } from "../../../utils/formatters";

export default function RecentSales({ sales }) {
  return (
    <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8 flex-1">
      <div className="flex justify-between items-center px-2">
         <div>
            <h3 className="text-xl font-black text-gray-900 tracking-tight">Movimientos Recientes</h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Últimas transacciones procesadas</p>
         </div>
         <button className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] hover:underline cursor-pointer">Ver todo</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[9px] font-black text-gray-300 uppercase tracking-[0.15em] border-b border-gray-50">
              <th className="px-2 py-4">Transacción</th>
              <th className="px-2 py-4">Fecha</th>
              <th className="px-2 py-4">Monto</th>
              <th className="px-2 py-4 text-right">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {sales?.map((sale, idx) => (
              <tr key={sale.id} className="group hover:bg-gray-50/50 transition-colors">
                <td className="px-2 py-6">
                  <div className="flex items-center gap-4">
                     <div className={`p-2 rounded-xl border ${idx % 2 === 0 ? "bg-indigo-50 border-indigo-100 text-indigo-600" : "bg-amber-50 border-amber-100 text-amber-600"}`}>
                        {idx % 2 === 0 ? <ShoppingBag size={14} /> : <Clock size={14} />}
                     </div>
                     <div>
                        <p className="text-xs font-black text-gray-800 leading-none">Venta #{sale.id.toString().padStart(4, '0')}</p>
                        <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-tighter">Terminal #01</p>
                     </div>
                  </div>
                </td>
                <td className="px-2 py-6">
                   <p className="text-[11px] font-bold text-gray-800 leading-none">{new Date(sale.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                   <p className="text-[9px] font-bold text-gray-300 mt-1 uppercase">Hoy</p>
                </td>
                <td className="px-2 py-6 text-sm font-black text-gray-900 tracking-tighter">
                   {formatCurrency(sale.total)}
                </td>
                <td className="px-2 py-6 text-right">
                   <span className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest ${idx === 2 ? "bg-red-50 text-red-500 border border-red-100" : "bg-green-50 text-green-600 border border-green-100"}`}>
                      {idx === 2 ? "Cancelado" : "Completado"}
                   </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
