import { useSalesStore } from "../../../store/useSalesStore";
import { X, User, CreditCard, Send, Printer, Share2, RotateCcw, FileText, AlertCircle } from "lucide-react";

function SaleDetailModal({ onClose }) {
  const { selectedSale } = useSalesStore();

  if (!selectedSale) return null;

  const subtotal = selectedSale.total / 1.15;
  const tax = selectedSale.total - subtotal;

  return (
    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-6 animate-in fade-in duration-300">
      <div className="bg-white rounded-[2.5rem] w-full max-w-4xl shadow-2xl shadow-indigo-900/20 overflow-hidden animate-in zoom-in-95 duration-500">
        
        {/* Modal Header */}
        <div className="p-8 border-b border-gray-50 flex justify-between items-start bg-gray-50/30">
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
              Detalle de Venta #V-{selectedSale.id.toString().padStart(5, '0')}
            </h2>
            <p className="text-gray-400 text-xs font-bold leading-relaxed mt-1 flex items-center gap-2">
              <span className="bg-white px-2 py-0.5 rounded border border-gray-100">Realizada el {new Date(selectedSale.createdAt).toLocaleDateString(undefined, { day: '2-digit', month: 'long', year: 'numeric' })} • {new Date(selectedSale.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-300 hover:text-gray-600 hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-gray-50"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-10 space-y-10">
          {/* Info Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 flex items-start gap-4">
               <div className="p-2 bg-white rounded-xl text-indigo-600 shadow-sm border border-gray-50">
                  <User size={18} />
               </div>
               <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Cliente</p>
                  <p className="text-sm font-black text-gray-800">Public House / Guest</p>
                  <p className="text-[10px] font-bold text-gray-400 mt-0.5">ID: WALK-IN-001</p>
               </div>
            </div>
            <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 flex items-start gap-4">
               <div className="p-2 bg-white rounded-xl text-indigo-600 shadow-sm border border-gray-50">
                  <CreditCard size={18} />
               </div>
               <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Método de Pago</p>
                  <p className="text-sm font-black text-gray-800">Tarjeta de Débito</p>
                  <p className="text-[10px] font-bold text-gray-400 mt-0.5">Terminal POS #A2</p>
               </div>
            </div>
            <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 flex items-start gap-4">
               <div className="p-2 bg-white rounded-xl text-green-600 shadow-sm border border-gray-50">
                  <Send size={18} />
               </div>
               <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Estado Transacción</p>
                  <p className="text-sm font-black text-gray-800">Completada</p>
                  <p className="text-[10px] font-bold text-green-600 mt-0.5 flex items-center gap-1">
                    <div className="h-1 w-1 bg-green-500 rounded-full" /> Sincronizado
                  </p>
               </div>
            </div>
          </div>

          {/* Products Table */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-2 mb-4">Productos de la Transacción</h3>
            <div className="rounded-2xl border border-gray-50 overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/30 border-b border-gray-50">
                    <th className="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">Imagen</th>
                    <th className="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">Producto</th>
                    <th className="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none text-center">Cantidad</th>
                    <th className="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">Precio Unitario</th>
                    <th className="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none text-right">Total por Producto</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {selectedSale.detalles?.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/30 transition-colors">
                      <td className="px-6 py-4">
                         <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center text-xl grayscale opacity-30">
                            📦
                         </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-black text-gray-800 leading-tight">{(item.producto?.nombre || "Producto")}</p>
                        <p className="text-[10px] font-bold text-gray-400 mt-0.5">{(item.producto?.categoria || "Editorial")}</p>
                      </td>
                      <td className="px-6 py-4 text-center text-sm font-black text-gray-600">
                        <span className="bg-gray-50 border border-gray-100 px-3 py-1 rounded-lg">{item.cantidad}</span>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-500">${item.precio.toFixed(2)}</td>
                      <td className="px-6 py-4 text-right text-sm font-black text-gray-900">${(item.precio * item.cantidad).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer with Totals and Action Buttons */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-10 pt-6 border-t border-gray-50">
             <div className="flex flex-col md:flex-row gap-8 text-left">
                <div>
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 leading-none">Subtotal</p>
                   <p className="text-xl font-black text-gray-900 tracking-tighter leading-none">${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                </div>
                <div>
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 leading-none">Impuestos (15%)</p>
                   <p className="text-xl font-black text-gray-900 tracking-tighter leading-none">${tax.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                </div>
             </div>

             <div className="flex flex-col items-end gap-6">
                <div className="text-right">
                   <p className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-2 leading-none">Total Final</p>
                   <p className="text-5xl font-black text-gray-900 tracking-tighter leading-none">${selectedSale.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                </div>

                <div className="p-1 px-1.5 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-1.5">
                   <button className="flex items-center gap-2 px-4 py-3 text-[10px] font-black text-gray-500 uppercase tracking-widest hover:bg-white hover:text-indigo-600 hover:shadow-sm rounded-xl transition-all cursor-pointer">
                      <Printer size={16} /> Imprimir
                   </button>
                   <div className="w-px h-6 bg-gray-200" />
                   <button className="flex items-center gap-2 px-4 py-3 text-[10px] font-black text-gray-500 uppercase tracking-widest hover:bg-white hover:text-indigo-600 hover:shadow-sm rounded-xl transition-all cursor-pointer">
                      <Share2 size={16} /> Compartir
                   </button>
                   <div className="w-px h-6 bg-gray-200" />
                   <button className="flex items-center gap-2 px-4 py-3 text-[10px] font-black text-red-500 uppercase tracking-widest hover:bg-white hover:shadow-sm rounded-xl transition-all cursor-pointer">
                      <RotateCcw size={16} /> Devolución
                   </button>
                   <button 
                     onClick={onClose}
                     className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-100 transition-all ml-2 cursor-pointer"
                   >
                     Cerrar
                   </button>
                </div>
             </div>
          </div>
        </div>

        <div className="bg-indigo-50/30 p-6 flex items-center justify-center gap-3 border-t border-gray-50">
           <FileText size={16} className="text-indigo-400" />
           <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Nexus ERP Billing System • Digital Receipt Verified • #{selectedSale.id.toString(16).toUpperCase()}</p>
        </div>
      </div>
    </div>
  );
}

export default SaleDetailModal;
