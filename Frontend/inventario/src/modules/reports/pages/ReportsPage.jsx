import { useEffect, useState } from "react";
import { getDashboardStats, exportVentasExcel } from "../services/reportService";
import { 
  BarChart3, 
  Download, 
  TrendingUp, 
  Calendar, 
  ChevronDown, 
  ArrowUpRight, 
  Zap, 
  Bell, 
  Star 
} from "lucide-react";

function ReportsPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats().then(res => {
      setStats(res.data || res);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const { metrics, topProducts, chartData } = stats;

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-10">
      {/* Header section with Date Filter */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Reportes</h1>
          <p className="text-gray-500 font-medium mt-1">Visión estratégica de rendimiento y operaciones comerciales.</p>
        </div>

        <div className="flex gap-3">
          <div className="bg-white border border-gray-100 px-5 py-3 rounded-2xl flex items-center gap-3 shadow-sm cursor-pointer hover:bg-gray-50 transition-all">
             <Calendar size={18} className="text-indigo-600" />
             <span className="text-xs font-black text-gray-700 uppercase tracking-widest">Últimos 30 días</span>
             <ChevronDown size={16} className="text-gray-400" />
          </div>
          <button 
            onClick={exportVentasExcel}
            className="bg-gray-100 hover:bg-gray-200 p-3.5 rounded-2xl text-gray-600 transition-all cursor-pointer shadow-sm"
          >
            <Download size={20} />
          </button>
        </div>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-500">
              <Zap size={80} className="text-indigo-600" />
           </div>
           <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4">Ventas del Día</p>
           <div className="flex items-end gap-3">
              <span className="text-4xl font-black text-gray-900 tracking-tighter">${(metrics.todaySales || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              <span className="text-[10px] font-black text-green-500 bg-green-50 px-2.5 py-1 rounded-full mb-1 flex items-center gap-1">
                 <ArrowUpRight size={10} /> +5%
              </span>
           </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-500">
              <TrendingUp size={80} className="text-indigo-600" />
           </div>
           <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4">Ventas de la Semana</p>
           <div className="flex items-end gap-3">
              <span className="text-4xl font-black text-gray-900 tracking-tighter">${(metrics.weeklySales || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              <span className="text-[10px] font-black text-green-500 bg-green-50 px-2.5 py-1 rounded-full mb-1 flex items-center gap-1">
                 <ArrowUpRight size={10} /> +12%
              </span>
           </div>
        </div>

        <div className="bg-indigo-600 p-8 rounded-[2.5rem] shadow-2xl shadow-indigo-100 relative group overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
              <Star size={80} className="text-white" />
           </div>
           <p className="text-[10px] font-black text-indigo-200 uppercase tracking-[0.2em] mb-4 leading-none">Ingresos del Mes</p>
           <div className="flex items-center gap-3 mt-4 text-white">
              <span className="text-4xl font-black tracking-tighter">${(metrics.monthlyIncome || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              <div className="h-10 w-10 bg-white/20 rounded-xl flex items-center justify-center">
                 <Zap size={20} />
              </div>
           </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {/* Main Sales Chart */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-50 p-10 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-10">
            <div>
              <h2 className="text-xl font-black text-gray-900 tracking-tight">Ventas por Día</h2>
              <p className="text-xs font-medium text-gray-400 mt-1">Rendimiento volumétrico diario acumulado.</p>
            </div>
            <div className="flex items-center gap-2">
               <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />
               <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest leading-none">Período Actual</span>
            </div>
          </div>

          <div className="flex-1 min-h-[300px] relative mt-4">
             <svg className="w-full h-full overflow-visible" viewBox="0 0 800 300" preserveAspectRatio="none">
               <defs>
                 <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                   <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.2" />
                   <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
                 </linearGradient>
               </defs>
               
               {[0, 1, 2, 3].map(i => (
                 <line key={i} x1="0" y1={i * 100} x2="800" y2={i * 100} stroke="#f1f5f9" strokeWidth="1" />
               ))}

               {chartData && chartData.length > 1 && (
                 <>
                   <path 
                     d={`M 0 300 ${chartData.map((d, i) => `L ${(i / (chartData.length - 1)) * 800} ${300 - (d.sales / Math.max(...chartData.map(d => d.sales || 1))) * 250}`).join(' ')} L 800 300 Z`}
                     fill="url(#chartGradient)"
                   />
                   
                   <path 
                     d={`M 0 ${300 - (chartData[0]?.sales / Math.max(...chartData.map(d => d.sales || 1))) * 250} ${chartData.map((d, i) => `L ${(i / (chartData.length - 1)) * 800} ${300 - (d.sales / Math.max(...chartData.map(d => d.sales || 1))) * 250}`).join(' ')}`}
                     fill="none"
                     stroke="#4f46e5"
                     strokeWidth="4"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                   />

                   {chartData.map((d, i) => (
                     <circle 
                        key={i}
                        cx={(i / (chartData.length - 1)) * 800}
                        cy={300 - (d.sales / Math.max(...chartData.map(d => d.sales || 1))) * 250}
                        r="4"
                        fill="white"
                        stroke="#4f46e5"
                        strokeWidth="3"
                        className="hover:r-6 cursor-pointer transition-all"
                     />
                   ))}
                 </>
               )}
             </svg>
             
             <div className="flex justify-between mt-8">
               {chartData?.map((d, i) => (
                 <span key={i} className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{d.date.split('-')[2]} {new Date(d.date).toLocaleString('default', { month: 'short' })}</span>
               ))}
             </div>
          </div>
        </div>

        {/* Top Products Sidebar */}
        <div className="bg-white rounded-[2.5rem] border border-gray-50 p-10 shadow-sm flex flex-col">
           <div className="flex justify-between items-center mb-10">
              <h2 className="text-xl font-black text-gray-900 tracking-tight">Productos TOP</h2>
              <div className="text-gray-300">•••</div>
           </div>

           <div className="space-y-8 flex-1">
              {topProducts?.map((p, i) => (
                <div key={i} className="space-y-3">
                   <div className="flex justify-between items-end">
                      <p className="text-sm font-black text-gray-800">{p.name}</p>
                      <p className="text-xs font-bold text-gray-500">{p.sold} uds.</p>
                   </div>
                   <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-600 rounded-full" 
                        style={{ width: `${(p.sold / (topProducts[0]?.sold || 1)) * 100}%` }}
                      ></div>
                   </div>
                </div>
              ))}
           </div>

           <button className="w-full bg-gray-100 hover:bg-indigo-50 hover:text-indigo-600 text-gray-500 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all mt-10">
              Ver Inventario Completo
           </button>
        </div>
      </div>

      {/* Insights Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="bg-orange-50/50 p-8 rounded-[2rem] border border-orange-100/50 flex gap-6 items-center">
            <div className="h-16 w-16 bg-white rounded-2xl shadow-xl shadow-orange-900/5 flex items-center justify-center relative">
               <Bell className="text-orange-500" size={24} />
               <div className="absolute top-0 right-0 -mt-1 -mr-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white" />
            </div>
            <div>
               <h3 className="font-black text-gray-900 leading-tight">Alerta de Stock Crítico</h3>
               <p className="text-xs font-medium text-gray-500 mt-1 max-w-xs">3 productos del catálogo "Premium" están por debajo del mínimo establecido.</p>
            </div>
         </div>

         <div className="bg-indigo-50/30 p-8 rounded-[2rem] border border-indigo-100/50 flex gap-6 items-center">
            <div className="h-16 w-16 bg-white rounded-2xl shadow-xl shadow-indigo-900/5 flex items-center justify-center">
               <Zap className="text-indigo-600" size={24} />
            </div>
            <div>
               <h3 className="font-black text-gray-900 leading-tight">Editorial AI Insight</h3>
               <p className="text-xs font-medium text-gray-500 mt-1 max-w-xs">Se proyecta un incremento del 15% en ventas de temporada para la próxima semana.</p>
            </div>
         </div>
      </div>
    </div>
  );
}

export default ReportsPage;
