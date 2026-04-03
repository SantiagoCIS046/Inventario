import React from "react";
import { DollarSign, AlertCircle, ShoppingBag, Package } from "lucide-react";

export default function InventoryStatsRow({ totalValue, lowStockCount, totalItems }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* Valor Total */}
      <div className="bg-indigo-50/30 p-8 rounded-[2.5rem] border border-indigo-100 flex items-center gap-6 group hover:scale-[1.02] transition-all">
         <div className="h-16 w-16 bg-white rounded-3xl flex items-center justify-center text-indigo-600 border border-indigo-100 shadow-sm shadow-indigo-100/50">
            <DollarSign size={24} />
         </div>
         <div>
            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest leading-none">Valor Total</p>
            <h4 className="text-2xl font-black text-indigo-900 tracking-tighter mt-1">
               ${(totalValue || 0).toLocaleString()}
            </h4>
         </div>
      </div>

      {/* Items Bajos */}
      <div className="bg-amber-50/30 p-8 rounded-[2.5rem] border border-amber-100 flex items-center gap-6 group hover:scale-[1.02] transition-all">
         <div className="h-16 w-16 bg-white rounded-3xl flex items-center justify-center text-amber-600 border border-amber-100 shadow-sm shadow-amber-100/50">
            <AlertCircle size={24} />
         </div>
         <div>
            <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest leading-none">Items Bajos</p>
            <h4 className="text-2xl font-black text-amber-900 tracking-tighter mt-1">{lowStockCount} Referencias</h4>
         </div>
      </div>

      {/* Nuevos Ingresos */}
      <div className="bg-emerald-50/30 p-8 rounded-[2.5rem] border border-emerald-100 flex items-center gap-6 group hover:scale-[1.02] transition-all">
         <div className="h-16 w-16 bg-white rounded-3xl flex items-center justify-center text-emerald-600 border border-emerald-100 shadow-sm shadow-emerald-100/50">
            <Package size={24} />
         </div>
         <div>
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest leading-none">Total Items</p>
            <h4 className="text-2xl font-black text-emerald-900 tracking-tighter mt-1">{totalItems} Hoy</h4>
         </div>
      </div>

      {/* Inventory Health (New Card) */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-6 group hover:scale-[1.02] transition-all">
         <div className="h-16 w-16 bg-gray-50 rounded-3xl flex items-center justify-center text-gray-400 border border-gray-50">
            <ShoppingBag size={24} />
         </div>
         <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Salud Stock</p>
            <h4 className="text-2xl font-black text-gray-900 tracking-tighter mt-1">94%</h4>
         </div>
      </div>
    </div>
  );
}
