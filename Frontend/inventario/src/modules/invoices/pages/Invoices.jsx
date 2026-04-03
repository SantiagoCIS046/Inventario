import { useEffect, useState } from "react";
import { getInvoices } from "../services/invoiceService";
import { useNavigate } from "react-router-dom";
import { FileText, Plus, Eye, Calendar, DollarSign, ArrowRight } from "lucide-react";

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    try {
      const data = await getInvoices();
      setInvoices(data);
    } catch (error) {
      console.error("Error loading invoices", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-10">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight flex items-center gap-4">
             <FileText className="text-indigo-600" size={36} />
             Gestión de Facturas
          </h1>
          <p className="text-gray-500 font-medium mt-1">StitchFlow ERP • Documentos Comerciales y Fiscales</p>
        </div>

        <button 
          onClick={() => navigate("/invoices/create")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-3 shadow-2xl shadow-indigo-100 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
        >
          <Plus size={20} />
          Nueva Factura
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-indigo-900/5 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-50">
              <th className="px-10 py-7 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Referencia</th>
              <th className="px-10 py-7 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Fecha Emisión</th>
              <th className="px-10 py-7 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-center">Estado</th>
              <th className="px-10 py-7 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Monto Total</th>
              <th className="px-10 py-7 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Acción</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {loading ? (
              [1, 2, 3].map(i => (
                <tr key={i} className="animate-pulse">
                  <td colSpan="5" className="px-10 py-6 bg-gray-50/20" />
                </tr>
              ))
            ) : invoices.map((inv) => (
              <tr 
                key={inv.id} 
                onClick={() => navigate(`/invoices/${inv.id}`)}
                className="group hover:bg-indigo-50/30 transition-all cursor-pointer"
              >
                <td className="px-10 py-6">
                  <span className="text-indigo-600 font-black text-sm tracking-tight capitalize">
                    INV-{inv.id.toString().padStart(5, '0')}
                  </span>
                </td>
                <td className="px-10 py-6">
                  <div className="flex items-center gap-2 text-sm font-bold text-gray-800">
                    <Calendar size={14} className="text-gray-300" />
                    {new Date(inv.createdAt).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}
                  </div>
                </td>
                <td className="px-10 py-6 text-center">
                   <span className="bg-green-50 text-green-600 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border border-green-100">
                      PAID
                   </span>
                </td>
                <td className="px-10 py-6">
                   <div className="flex items-center gap-1.5 text-base font-black text-gray-900 tracking-tighter">
                      <DollarSign size={14} className="text-gray-400" />
                      {inv.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                   </div>
                </td>
                <td className="px-10 py-6 text-right">
                  <div className="inline-flex items-center gap-2 text-xs font-black text-indigo-600 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                    Ver Detalle
                    <ArrowRight size={14} />
                  </div>
                </td>
              </tr>
            ))}

            {!loading && invoices.length === 0 && (
              <tr>
                <td colSpan="5" className="py-24 text-center opacity-30">
                  <FileText size={64} className="mx-auto mb-4" />
                  <p className="font-black text-xs uppercase tracking-[0.2em]">No se han emitido facturas aún</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
