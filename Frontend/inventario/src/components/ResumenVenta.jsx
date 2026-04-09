import React from 'react';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

const ResumenVenta = ({ subtotal, onFinalizar, disabled }) => {
  const impuestos = subtotal * 0; // Se puede ajustar si se requiere IVA
  const total = subtotal + impuestos;

  return (
    <div className="bg-white p-4 rounded-xl border-2 border-gray-50 shadow-sm space-y-3">
      <div className="space-y-4">
        <div className="flex justify-between items-center text-gray-400">
          <span className="text-xs font-black uppercase tracking-widest">Subtotal</span>
          <span className="text-sm font-bold">{formatCurrency(subtotal)}</span>
        </div>
        
        <div className="pt-3 border-t border-gray-100 flex justify-between items-end">
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Total a Pagar</span>
            <span className="text-xl font-black text-gray-900 tracking-tighter">{formatCurrency(total)}</span>
          </div>
          <div className="h-8 w-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
            <ShoppingCart size={14} />
          </div>
        </div>
      </div>

      <button
        onClick={onFinalizar}
        disabled={disabled}
        className={`w-full py-2.5 rounded-xl font-black text-xs uppercase tracking-[0.15em] flex items-center justify-center gap-2 transition-all duration-300 shadow-lg cursor-pointer ${
          disabled
            ? 'bg-gray-100 text-gray-300 cursor-not-allowed grayscale'
            : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 shadow-indigo-100'
        }`}
      >
        <span>Finalizar Compra</span>
        <ArrowRight size={16} />
      </button>
    </div>
  );
};

export default ResumenVenta;
