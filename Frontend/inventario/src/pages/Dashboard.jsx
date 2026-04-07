import { useEffect, useState } from "react";
import api from "../api/axios";
import StatCard from "../modules/reports/components/StatCard";
import SalesChart from "../modules/reports/components/VentasChart";
import RecentSales from "../modules/reports/components/RecentSales";
import StockAlerts from "../modules/reports/components/StockAlerts";
import { Plus, Filter, Calendar, Diamond } from "lucide-react";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/reports/dashboard").then(res => {
      setStats(res.data.data);
      setLoading(false);
    }).catch(err => {
      console.error("Error fetching dashboard stats", err);
      if (err.response?.status === 401) {
        console.warn("Sesión no autorizada o expirada. Redirigiendo...");
        // Opcional: window.location.href = "/login";
      }
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh] animate-pulse">
       <Diamond size={48} className="text-indigo-200 animate-spin" />
    </div>
  );

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-20">
      
      {/* Header section with Action Button */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 px-2">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Bienvenido de vuelta, Admin</h1>
          <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em]">Aquí está lo que ha pasado en tu editorial hoy.</p>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="hidden md:flex items-center gap-2 bg-white border border-gray-100 p-2 pl-4 rounded-2xl shadow-sm">
              <Calendar size={16} className="text-gray-300" />
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-2 pr-4 border-r border-gray-100">Últimos 30 días</span>
              <button className="p-2 hover:bg-gray-50 rounded-xl transition-all cursor-pointer">
                 <Filter size={16} className="text-indigo-600" />
              </button>
           </div>
           
           <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-2 shadow-2xl shadow-indigo-100 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer">
              <Plus size={20} />
              New Entry
           </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        <StatCard 
          title="Ventas Totales" 
          value={`$${stats?.summary?.ventasHoy?.toLocaleString() || '0'}`} 
          trend={12.5} 
          type="ventas" 
          color="indigo"
          subtitle="Crecimiento diario"
        />
        <StatCard 
          title="Pedidos Pendientes" 
          value={`${stats?.summary?.cantidadHoy || 0} items`} 
          type="facturas" 
          color="amber"
          subtitle="Requieren atención inmediata"
        />
        <StatCard 
          title="Stock Crítico" 
          value={`${stats?.lowStock?.length || 0} items`} 
          type="stock" 
          color="red"
          subtitle="Bajo el umbral mínimo"
        />
        <StatCard 
          title="Ingresos Mensuales" 
          value={`$${stats?.summary?.ventasMes?.toLocaleString() || '0'}`} 
          trend={2.1} 
          type="ingresos" 
          color="green"
          subtitle="Octubre 2024"
        />
      </div>

      {/* Charts & Category Distribution Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2">
            <SalesChart data={stats?.chartData} />
         </div>

         <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col space-y-8">
            <div>
               <h3 className="text-xl font-black text-gray-900 tracking-tight">Categorías Populares</h3>
               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Top 4 categorías por volumen</p>
            </div>
            
            <div className="space-y-8 flex-1">
               {[
                 { label: "Ficción Contemporánea", value: 38, color: "bg-indigo-600" },
                 { label: "No Ficción / Biografías", value: 26, color: "bg-indigo-400" },
                 { label: "Infantil y Juvenil", value: 18, color: "bg-amber-500" },
                 { label: "Académico y Técnico", value: 12, color: "bg-gray-300" }
               ].map((cat, i) => (
                 <div key={i} className="space-y-3">
                    <div className="flex justify-between text-xs font-black text-gray-800">
                       <span className="tracking-tight">{cat.label}</span>
                       <span className="text-indigo-600">{cat.value}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                       <div 
                         className={`h-full ${cat.color} rounded-full transition-all duration-1000 delay-300`} 
                         style={{ width: `${cat.value}%` }}
                       />
                    </div>
                 </div>
               ))}
            </div>

            <div className="mt-auto bg-indigo-50/50 p-6 rounded-3xl border border-indigo-50 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Diamond size={48} className="text-indigo-600 group-hover:rotate-12 transition-transform duration-500" />
               </div>
               <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-2">Insight Editorial</p>
               <p className="text-[11px] font-bold text-indigo-900 leading-relaxed italic">
                 "La categoría de Ficción ha subido un 8% tras el lanzamiento del Bestseller de Verano."
               </p>
            </div>
         </div>
      </div>

      {/* Transactions & Alerts Table Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 flex flex-col">
            <RecentSales sales={stats?.recentSales} />
         </div>
         <StockAlerts items={stats?.lowStock} />
      </div>

    </div>
  );
}

export default Dashboard;
