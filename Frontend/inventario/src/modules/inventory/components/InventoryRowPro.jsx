import React from "react";
import { Edit2, Trash2, MoreHorizontal } from "lucide-react";

export default function InventoryRowPro({ product, onEdit, onDelete }) {
  const stock = product?.stock || 0;
  const isLowStock = stock < 10;
  const isOut = stock === 0;
  
  // Calculate percentage (mocking a 150 unit capacity for visualization as seen in the image)
  const percentage = Math.min(100, (product.stock / 150) * 100);

  return (
    <tr className="group hover:bg-gray-50/50 transition-all border-b border-gray-50">
      <td className="px-4 py-3">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 flex-shrink-0 group-hover:scale-105 transition-transform overflow-hidden grayscale opacity-70">
            <span className="text-xl">👕</span>
          </div>
          <div>
            <p className="text-[13px] font-black text-gray-900 leading-tight tracking-tight uppercase">{product.nombre}</p>
            <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-tighter">Color: Indigo / Stitch</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-6 font-bold text-[10px] text-gray-400 uppercase tracking-widest">
        {`SKU-${(product?.id || 0).toString().padStart(3, '0')}-PRO`}
      </td>
      <td className="px-6 py-6 text-center">
        <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[9px] font-black rounded-lg uppercase tracking-widest">
          {product.categoria}
        </span>
      </td>
      <td className="px-6 py-6 text-sm font-black text-gray-900 tracking-tighter text-center">
        ${(product?.precioVenta || 0).toLocaleString()}
      </td>
      <td className="px-4 py-3 min-w-[180px]">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-end">
            <span className={`text-[11px] font-black ${isLowStock ? "text-red-500" : "text-gray-900"}`}>
              {product.stock} u.
            </span>
            <span className="text-[10px] font-bold text-gray-300">{Math.round(percentage)}%</span>
          </div>
          <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-50">
             <div 
               className={`h-full rounded-full transition-all duration-1000 ${isLowStock ? "bg-red-500" : "bg-emerald-500"}`}
               style={{ width: `${percentage}%` }}
             />
          </div>
        </div>
      </td>
      <td className="px-6 py-6 text-center">
        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
          isOut ? "bg-red-50 text-red-500 border border-red-100" :
          isLowStock ? "bg-amber-50 text-amber-500 border border-amber-100" :
          "bg-emerald-50 text-emerald-600 border border-emerald-100"
        }`}>
          {isOut ? "SIN STOCK" : isLowStock ? "STOCK BAJO" : "EN STOCK"}
        </span>
      </td>
      <td className="px-6 py-6 text-right">
        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onEdit(product)}
            className="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-indigo-600 hover:border-indigo-100 hover:shadow-lg transition-all cursor-pointer"
          >
            <Edit2 size={14} />
          </button>
          <button 
            onClick={() => onDelete(product.id)}
            className="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-red-500 hover:border-red-100 hover:shadow-lg transition-all cursor-pointer"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
}
