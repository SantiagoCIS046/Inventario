import React from 'react';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

const Carrito = ({ items, onUpdateQuantity, onRemove }) => {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border-2 border-dashed border-gray-100 animate-in fade-in zoom-in duration-500">
        <div className="h-12 w-12 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-200">
          <ShoppingBag size={24} />
        </div>
        <h3 className="text-base font-black text-gray-400 tracking-tight">El carrito está vacío</h3>
        <p className="text-gray-300 text-[10px] font-bold mt-1 uppercase tracking-widest">Escanee un producto para comenzar</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="group flex items-center gap-4 p-3 bg-white rounded-2xl border border-gray-50 shadow-sm hover:shadow-lg hover:shadow-indigo-50/50 hover:border-indigo-100 transition-all duration-300 animate-in slide-in-from-bottom-2"
        >
          {/* Product Info */}
          <div className="flex-1">
            <h4 className="font-black text-gray-800 text-sm leading-tight group-hover:text-indigo-600 transition-colors uppercase tracking-tight">
              {item.nombre}
            </h4>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-[10px] font-black bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full uppercase tracking-widest">
                SKU: {item.id}
              </span>
              <span className="text-xs font-bold text-gray-400">
                {formatCurrency(item.precio)} / und
              </span>
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
            <button
              onClick={() => onUpdateQuantity(item.id, item.cantidad - 1)}
              className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-white hover:text-indigo-600 hover:shadow-sm text-gray-400 transition-all cursor-pointer"
            >
              <Minus size={12} strokeWidth={3} />
            </button>
            <input
              type="number"
              min="1"
              value={item.cantidad}
              onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value) || 0)}
              className="w-10 text-center font-black text-gray-800 text-xs bg-transparent border-none focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <button
              onClick={() => onUpdateQuantity(item.id, item.cantidad + 1)}
              className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-white hover:text-indigo-600 hover:shadow-sm text-gray-400 transition-all cursor-pointer"
            >
              <Plus size={12} strokeWidth={3} />
            </button>
          </div>

          {/* Subtotal & Action */}
          <div className="flex flex-col items-end gap-1">
            <span className="font-black text-gray-900 text-base tracking-tighter">
              {formatCurrency(Number(item.precio) * item.cantidad)}
            </span>
            <button
              onClick={() => onRemove(item.id)}
              className="text-gray-200 hover:text-red-500 transition-colors p-1 cursor-pointer"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carrito;
