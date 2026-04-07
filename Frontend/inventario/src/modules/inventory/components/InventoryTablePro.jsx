import React from "react";
import InventoryRowPro from "./InventoryRowPro";

export default function InventoryTablePro({ products, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] bg-gray-50/30 border-b border-gray-50">
              <th className="px-6 py-3">Producto</th>
              <th className="px-4 py-3">SKU</th>
              <th className="px-4 py-3 text-center">Categoría</th>
              <th className="px-4 py-3 text-center">Precio</th>
              <th className="px-4 py-3">Stock Actual</th>
              <th className="px-4 py-3 text-center">Estado</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.map(p => (
              <InventoryRowPro 
                key={p.id} 
                product={p} 
                onEdit={onEdit} 
                onDelete={onDelete} 
              />
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="7" className="py-20 text-center">
                  <div className="opacity-20">
                     <p className="text-xl font-black uppercase tracking-widest">Sin productos registrados</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Mockup (as in design) */}
      <div className="p-4 border-t border-gray-50 flex items-center justify-between">
         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Mostrando {products.length} de {products.length * 10} productos
         </p>
         <div className="flex gap-2">
            {[1, 2, 3].map(i => (
               <button 
                 key={i} 
                 className={`h-10 w-10 rounded-xl text-[10px] font-black transition-all cursor-pointer ${
                   i === 1 ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" : "text-gray-400 hover:bg-gray-50"
                 }`}
               >
                  {i}
               </button>
            ))}
         </div>
      </div>
    </div>
  );
}
