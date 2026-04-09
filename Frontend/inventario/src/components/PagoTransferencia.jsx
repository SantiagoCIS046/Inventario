import React from 'react';
import { Smartphone, CheckCircle2 } from 'lucide-react';

const PagoTransferencia = () => {
  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-500">
      <div className="bg-white p-8 rounded-[2rem] border-2 border-indigo-50 shadow-sm space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
            <Smartphone size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Número Nequi</p>
            <p className="text-xl font-black text-gray-800 mt-1 tracking-tight">312 456 7890</p>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-50">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Datos Bancarios</p>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-2xl">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Banco</p>
              <p className="text-sm font-black text-gray-800">Bancolombia - Ahorros</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Cuenta</p>
              <p className="text-sm font-black text-gray-800">123-456789-01</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 p-6 bg-green-50 rounded-3xl border-2 border-green-100 text-green-700">
        <CheckCircle2 size={24} />
        <p className="text-xs font-black uppercase tracking-widest">Valide la transferencia antes de finalizar</p>
      </div>
    </div>
  );
};

export default PagoTransferencia;
