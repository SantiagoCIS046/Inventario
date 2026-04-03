import { useState } from "react";
import { useSalesStore } from "../../../store/useSalesStore";
import SaleDetailModal from "./SaleDetailModal";
import { Eye, ChevronRight, ChevronLeft, CreditCard, Banknote, ShoppingBag } from "lucide-react";

function SalesTable({ sales }) {
  const { loadSaleDetail } = useSalesStore();
  const [showModal, setShowModal] = useState(false);

  const handleView = async (id) => {
    await loadSaleDetail(id);
    setShowModal(true);
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl shadow-gray-200/50 overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-50/30 border-b border-gray-50">
            <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">ID Venta</th>
            <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Fecha</th>
            <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] text-center">Cant. Productos</th>
            <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Total</th>
            <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] text-right">Acciones</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-50">
          {sales.map((s) => (
            <tr key={s.id} className="group hover:bg-gray-50/50 transition-all duration-300">
              <td className="px-8 py-5">
                <span className="text-indigo-600 font-black text-[13px] tracking-tight">
                  #VEN-{s.id.toString().padStart(5, '0')}
                </span>
              </td>
              <td className="px-8 py-5">
                <div className="flex flex-col">
                  <span className="text-sm font-black text-gray-800 tracking-tight">
                    {new Date(s.createdAt).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">
                    {new Date(s.createdAt).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: true })}
                  </span>
                </div>
              </td>
              <td className="px-8 py-5 text-center">
                 <div className="inline-flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full">
                    <span className="text-[11px] font-black text-gray-700">{s.detalles?.length || 0}</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Items</span>
                 </div>
              </td>
              <td className="px-8 py-5">
                 <span className="text-base font-black text-gray-900Tracking-tighter">
                   ${s.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                 </span>
              </td>

              <td className="px-8 py-5 text-right">
                <button 
                  onClick={() => handleView(s.id)}
                  className="inline-flex items-center gap-2 bg-white border border-gray-100 px-4 py-2 rounded-xl text-xs font-black text-indigo-600 transition-all hover:bg-indigo-600 hover:text-white hover:border-indigo-600 hover:shadow-lg hover:shadow-indigo-100 cursor-pointer shadow-sm group/btn"
                >
                  Ver detalle
                  <Eye size={14} className="opacity-60 group-hover/btn:opacity-100" />
                </button>
              </td>
            </tr>
          ))}

          {sales.length === 0 && (
            <tr>
              <td colSpan="5" className="py-20 text-center opacity-30">
                <ShoppingBag size={48} className="mx-auto mb-4" />
                <p className="font-bold">No se han registrado ventas recientemente</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination (Visual Mockup) */}
      <div className="px-8 py-5 bg-gray-50/30 flex justify-between items-center border-t border-gray-50">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Mostrando 1 a {sales.length} de {sales.length} ventas</p>
        <div className="flex gap-2">
          <button className="p-1.5 bg-white border border-gray-100 rounded-lg text-gray-400 hover:text-indigo-600 transition-all cursor-pointer shadow-sm">
            <ChevronLeft size={16} />
          </button>
          <div className="flex gap-1.5 px-1">
             <button className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-black text-xs shadow-lg shadow-indigo-100">1</button>
             <button className="w-8 h-8 rounded-lg bg-white border border-gray-100 text-gray-400 font-black text-xs hover:text-indigo-600 shadow-sm transition-all">2</button>
          </div>
          <button className="p-1.5 bg-white border border-gray-100 rounded-lg text-gray-400 hover:text-indigo-600 transition-all cursor-pointer shadow-sm text-center">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {showModal && <SaleDetailModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default SalesTable;
