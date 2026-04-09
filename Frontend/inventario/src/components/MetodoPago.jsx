import React from 'react';
import { Banknote, Landmark } from 'lucide-react';

const MetodoPago = ({ selected, onChange }) => {
  const options = [
    { 
      id: 'efectivo', 
      label: 'Efectivo', 
      icon: <Banknote size={20} />,
      color: 'bg-green-500',
      shadow: 'shadow-green-100'
    },
    { 
      id: 'transferencia', 
      label: 'Transferencia', 
      icon: <Landmark size={20} />,
      color: 'bg-indigo-600',
      shadow: 'shadow-indigo-100'
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-2">
      {options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => onChange(opt.id)}
          className={`flex flex-col items-center justify-center p-2 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
            selected === opt.id
              ? `border-indigo-600 bg-indigo-50/50 shadow-lg ${opt.shadow} scale-[1.02]`
              : 'border-gray-50 bg-white hover:border-gray-100 hover:bg-gray-50'
          }`}
        >
          <div className={`h-8 w-8 rounded-lg flex items-center justify-center mb-1.5 transition-all ${
            selected === opt.id ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-100 text-gray-400'
          }`}>
            {opt.icon}
          </div>
          <span className={`text-[10px] font-black uppercase tracking-[0.15em] ${
            selected === opt.id ? 'text-indigo-900' : 'text-gray-400'
          }`}>
            {opt.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default MetodoPago;
