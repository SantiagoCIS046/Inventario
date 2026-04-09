import React, { useState, useEffect } from 'react';
import { DollarSign } from 'lucide-react';
import { formatCurrency, formatInputNumber, cleanFormattedNumber } from '../utils/formatters';

const PagoEfectivo = ({ total, dineroRecibido, onChange }) => {
  const [inputValue, setInputValue] = useState(formatInputNumber(dineroRecibido) || '');

  // Sincronizar si cambia desde afuera
  useEffect(() => {
    const formatted = formatInputNumber(dineroRecibido);
    if (formatted !== inputValue) {
      setInputValue(formatted || '');
    }
  }, [dineroRecibido]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    const formatted = formatInputNumber(val);
    setInputValue(formatted);
    onChange(cleanFormattedNumber(formatted));
  };

  const vueltas = Math.max(0, (Number(dineroRecibido) || 0) - total);

  return (
    <div className="space-y-4 animate-in slide-in-from-right duration-500">
      <div className="space-y-2">
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Dinero Recibido</label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-300 group-focus-within:text-green-500 transition-colors">
            <DollarSign size={20} />
          </div>
          <input
            type="text"
            inputMode="decimal"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="0.00"
            autoComplete="off"
            className="w-full bg-white border-2 border-gray-50 py-2.5 pl-10 pr-4 rounded-xl text-lg font-black text-gray-800 shadow-sm focus:ring-4 focus:ring-green-50 focus:border-green-400 outline-none transition-all placeholder:text-gray-100"
          />
        </div>
      </div>

      <div className={`p-3 rounded-xl border-2 transition-all duration-500 ${
        dineroRecibido >= total 
          ? 'bg-indigo-600 border-indigo-500 shadow-lg shadow-indigo-100' 
          : 'bg-gray-50 border-gray-100'
      }`}>
        <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${
          dineroRecibido >= total ? 'text-indigo-200' : 'text-gray-400'
        }`}>
          Cambio (Vueltas)
        </p>
        <h2 className={`text-xl font-black tracking-tighter ${
          dineroRecibido >= total ? 'text-white' : 'text-gray-300'
        }`}>
          {formatCurrency(vueltas)}
        </h2>
      </div>
    </div>
  );
};

export default PagoEfectivo;
