import { useEffect, useMemo } from "react";
import { useSalesStore } from "../../../store/useSalesStore";
import SalesTable from "../components/SalesTable";
import { 
  History, 
  Download, 
  Plus, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Zap, 
  RefreshCw 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function SalesHistoryPage() {
  const { sales, loadSales } = useSalesStore();
  const navigate = useNavigate();

  useEffect(() => {
    loadSales();
  }, []);

  const stats = useMemo(() => {
    if (!sales.length) return { total: 0, average: 0, highest: 0 };
    const total = sales.reduce((acc, s) => acc + s.total, 0);
    const average = total / sales.length;
    const highest = Math.max(...sales.map(s => s.total));
    return { total, average, highest };
  }, [sales]);

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-10">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
             <History className="text-indigo-600" size={32} />
             Historial de Ventas
          </h1>
          <p className="text-gray-500 font-medium mt-1">Gestiona y consulta el registro detallado de todas las transacciones comerciales.</p>
        </div>

        <div className="flex gap-3">
           <button className="bg-white border border-gray-100 text-gray-600 px-6 py-3.5 rounded-2xl font-black text-xs flex items-center gap-2 shadow-sm hover:bg-gray-50 transition-all cursor-pointer">
            <Download size={18} />
            Exportar CSV
          </button>
          <button 
            onClick={() => navigate("/sales")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-2xl font-black text-sm flex items-center gap-2 shadow-xl shadow-indigo-200 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            <Plus size={20} />
            Nueva Venta
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-2 text-indigo-600 mb-2">
           <Filter size={18} />
           <span className="text-[10px] font-black uppercase tracking-widest">Filtros de Búsqueda</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Desde</label>
            <div className="relative group">
              <input type="date" className="w-full bg-gray-50 border border-transparent rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:outline-none focus:bg-white focus:border-indigo-400 transition-all" />
              <Calendar size={16} className="absolute right-4 top-3.5 text-gray-300 pointer-events-none" />
            </div>
          </div>
          <div className="space-y-2">
             <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Hasta</label>
             <div className="relative group">
              <input type="date" className="w-full bg-gray-50 border border-transparent rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:outline-none focus:bg-white focus:border-indigo-400 transition-all" />
              <Calendar size={16} className="absolute right-4 top-3.5 text-gray-300 pointer-events-none" />
            </div>
          </div>
          <div className="md:col-span-2 space-y-2">
             <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Rango de Monto ($)</label>
             <div className="flex items-center gap-4">
                <input type="number" placeholder="Min" className="flex-1 bg-gray-50 border border-transparent rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:outline-none focus:bg-white focus:border-indigo-400 transition-all" />
                <span className="text-gray-300">—</span>
                <input type="number" placeholder="Max" className="flex-1 bg-gray-50 border border-transparent rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:outline-none focus:bg-white focus:border-indigo-400 transition-all" />
                <button className="bg-gray-100 p-3 rounded-xl text-gray-500 hover:text-indigo-600 transition-all cursor-pointer">
                  <RefreshCw size={18} />
                </button>
             </div>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <SalesTable sales={sales} />

      {/* Bottom Insights Grid (Nexus Style) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-indigo-600 p-8 rounded-[2.5rem] shadow-2xl shadow-indigo-200 relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform duration-500">
              <TrendingUp size={80} className="text-white" />
           </div>
           <p className="text-[10px] font-black text-indigo-200 uppercase tracking-[0.2em] mb-4">Total Ventas (Periodo)</p>
           <div className="flex items-end gap-3 text-white">
              <span className="text-4xl font-black tracking-tighter">${stats.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-full mb-1">↗ +12%</span>
           </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative group">
           <div className="absolute top-0 right-0 p-8 opacity-5">
              <DollarSign size={64} className="text-indigo-600" />
           </div>
           <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] mb-4">Promedio de Venta</p>
           <div className="flex flex-col">
              <span className="text-4xl font-black text-gray-900 tracking-tighter">${stats.average.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              <span className="text-[10px] font-bold text-gray-400 mt-2">Enero - Octubre</span>
           </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-indigo-100 shadow-sm relative group overflow-hidden">
           <div className="absolute left-0 top-0 w-1.5 h-full bg-indigo-600" />
           <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] mb-4">Venta más Alta</p>
           <div className="flex flex-col">
              <div className="flex items-end gap-2">
                <span className="text-4xl font-black text-gray-900 tracking-tighter">${stats.highest.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                <span className="text-[10px] font-bold text-gray-400 mb-1">FACTURA #90112</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

import { Filter } from "lucide-react";

export default SalesHistoryPage;
