import React from "react";
import { X, Printer, Download, Share2 } from "lucide-react";

function Receipt({ sale, onClose }) {
  if (!sale) return null;

  const subtotal = sale.total / 1.21;
  const tax = sale.total - subtotal;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md flex items-center justify-center z-[100] p-6 animate-in fade-in duration-300 no-print">
      <div className="bg-white rounded-[2.5rem] w-full max-w-md shadow-2xl shadow-indigo-900/20 overflow-hidden animate-in zoom-in-95 duration-500 overflow-y-auto max-h-[90vh]">
        {/* Actions Header */}
        <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
           <div className="flex gap-2">
              <button 
                onClick={handlePrint}
                className="p-3 bg-white border border-gray-100 rounded-xl text-gray-600 hover:text-indigo-600 shadow-sm transition-all cursor-pointer"
              >
                <Printer size={18} />
              </button>
              <button className="p-3 bg-white border border-gray-100 rounded-xl text-gray-600 hover:text-indigo-600 shadow-sm transition-all cursor-pointer">
                <Download size={18} />
              </button>
           </div>
           <button 
             onClick={onClose}
             className="p-3 text-gray-300 hover:text-gray-600 transition-all cursor-pointer"
           >
             <X size={20} />
           </button>
        </div>

        {/* Ticket Content */}
        <div id="printable-receipt" className="p-10 text-center space-y-8 font-mono ticket-container">
           {/* Logo / Header */}
           <div className="space-y-2">
              <h2 className="text-2xl font-black text-gray-900 tracking-tighter uppercase italic">Main Street Apparel</h2>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sucursal Central #04 • Terminal #01</p>
              <div className="w-full border-b border-dashed border-gray-200 pt-4" />
           </div>

           {/* Sale Info */}
           <div className="text-left text-[11px] space-y-1 font-bold text-gray-500 uppercase tracking-tight">
              <p>Factura: <span className="text-gray-900">#VEN-{sale.id?.toString().padStart(5, '0')}</span></p>
              <p>Fecha: <span className="text-gray-900">{new Date(sale.createdAt).toLocaleDateString()}</span></p>
              <p>Hora: <span className="text-gray-900">{new Date(sale.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></p>
              <p>Cajero: <span className="text-gray-900">Admin Strategist</span></p>
           </div>

           <div className="w-full border-b border-dashed border-gray-200" />

           {/* Items Table */}
           <div className="space-y-4">
              <div className="flex justify-between text-[9px] font-black text-gray-400 uppercase tracking-widest">
                 <span className="w-1/2 text-left">Descripción</span>
                 <span className="w-1/4 text-center">Cant</span>
                 <span className="w-1/4 text-right">Total</span>
              </div>
              
              <div className="space-y-3">
                 {sale.detalles?.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-[11px] font-bold text-gray-800 leading-tight">
                       <span className="w-1/2 text-left uppercase">{item.producto?.nombre || "Producto"}</span>
                       <span className="w-1/4 text-center">x{item.cantidad}</span>
                       <span className="w-1/4 text-right">${(item.precio * item.cantidad).toFixed(2)}</span>
                    </div>
                 ))}
              </div>
           </div>

           <div className="w-full border-b border-dashed border-gray-200" />

           {/* Totals */}
           <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-bold text-gray-500 uppercase">
                 <span>Subtotal</span>
                 <span className="text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[11px] font-bold text-gray-500 uppercase">
                 <span>IVA (21%)</span>
                 <span className="text-gray-900">${tax.toFixed(2)}</span>
              </div>
              <div className="pt-2 flex justify-between items-center text-xl font-black text-gray-900 tracking-tighter uppercase italic">
                 <span>Total</span>
                 <span>${sale.total.toFixed(2)}</span>
              </div>
           </div>

           <div className="w-full border-b border-dashed border-gray-200" />

           {/* Footer */}
           <div className="space-y-4">
              <div className="flex justify-center">
                 <div className="bg-gray-100 p-2 rounded-lg opacity-30 grayscale">
                    {/* Barcode Mock */}
                    <div className="flex gap-0.5 items-end h-8">
                       {[2,4,1,3,2,1,4,2,3,1,2,4,1,3].map((h, i) => (
                          <div key={i} className="bg-black" style={{ width: '2px', height: `${h * 8}px` }} />
                       ))}
                    </div>
                 </div>
              </div>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] px-4 leading-relaxed">
                 ¡Gracias por su compra! <br /> cambios válidos con ticket hasta 30 días.
              </p>
           </div>
        </div>
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; margin: 0; padding: 0; }
          .ticket-container { width: 80mm; padding: 5mm !important; margin: 0 auto; }
          #printable-receipt { display: block !important; }
        }
      `}</style>
    </div>
  );
}

export default Receipt;
