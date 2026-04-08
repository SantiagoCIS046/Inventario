import React, { useEffect, useState } from "react";
import api from "../../../api/axios";
import { 
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area 
} from "recharts";
import { 
  TrendingUp, TrendingDown, Target, DollarSign, ShoppingCart, Activity, Sparkles, Diamond, ArrowUpRight
} from "lucide-react";
import PredictiveStockCard from "../components/PredictiveStockCard";
import CriticalAlerts from "../components/CriticalAlerts";
import SmartOrderBanner from "../components/SmartOrderBanner";
import StatCard from "../components/StatCard";

export default function PredictiveDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/reports/dashboard").then(res => {
      setData(res.data.data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  if (loading) return (
     <div className="min-h-screen flex items-center justify-center bg-gray-50/30">
        <div className="flex flex-col items-center gap-4">
           <Diamond className="text-indigo-600 animate-spin" size={48} />
           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Cargando Inteligencia Artificial...</p>
        </div>
     </div>
  );

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-20 max-w-[1600px] mx-auto">
      {/* Header Branding */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4">
         <div className="space-y-1">
            <h1 className="text-5xl font-black text-gray-900 tracking-tighter">StitchLogic AI</h1>
            <p className="text-gray-400 font-bold text-xs uppercase tracking-[0.2em]">Nivel de Inteligencia de Negocios stitchlogic v2.4</p>
         </div>
         <div className="flex items-center gap-6">
            <div className="flex -space-x-4">
               {[1, 2].map(i => (
                 <div key={i} className="h-10 w-10 rounded-full border-4 border-white bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <Diamond size={16} />
                 </div>
               ))}
               <div className="h-10 w-10 rounded-full border-4 border-white bg-indigo-600 flex items-center justify-center text-white text-[9px] font-black">+AI</div>
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">Análisis actualizado hace 14 min</p>
         </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        <StatCard 
          title="Ventas 7 días" 
          value={`$${data?.metrics.weeklySales.toLocaleString()}`} 
          trend={14.2} 
          type="ventas" 
          color="indigo"
          subtitle="Crecimiento semanal"
        />
        <StatCard 
          title="Ticket Promedio" 
          value={`$${Math.round(data?.metrics.avgTicket || 0)}`} 
          type="facturas" 
          color="indigo"
          subtitle="Estable"
        />
        <StatCard 
          title="Ingresos Totales (Mes)" 
          value={`$${(data?.metrics.monthlyIncome / 1000).toFixed(1)}k`} 
          trend={8.1} 
          type="ingresos" 
          color="indigo"
          subtitle="Octubre 2024"
        />
        <StatCard 
          title="Tasa de Conversión" 
          value={`${data?.metrics.conversionRate}%`} 
          trend={-2.4} 
          type="stock" 
          color="indigo"
          subtitle="Base de tráfico"
        />
      </div>

      {/* Main Content Area: Chart & Alerts */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
         <div className="xl:col-span-8 space-y-10">
            <div className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-sm relative overflow-hidden">
               <div className="flex justify-between items-center mb-12">
                  <div className="space-y-1">
                     <h2 className="text-3xl font-black text-gray-900 tracking-tighter">Ventas por Día</h2>
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Rendimiento omnicanal de la última semana</p>
                  </div>
                  <div className="flex gap-2 bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
                     <button className="px-6 py-2 rounded-xl text-[10px] font-black uppercase text-gray-400 hover:text-indigo-600 transition-all cursor-pointer">Semana</button>
                     <button className="px-6 py-2 rounded-xl text-[10px] font-black uppercase bg-indigo-600 text-white shadow-lg shadow-indigo-100 cursor-pointer">Mes</button>
                  </div>
               </div>

               <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                    <AreaChart data={data?.chartData}>
                      <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                      <XAxis 
                        dataKey="date" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fill: '#9ca3af', fontSize: 10, fontWeight: 700}}
                        dy={10}
                        tickFormatter={(val) => new Date(val).toLocaleDateString(undefined, { weekday: 'short' }).toUpperCase()}
                      />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '20px' }}
                        itemStyle={{ fontWeight: 900, fontSize: '14px', color: '#4f46e5' }}
                        cursor={{ stroke: '#4f46e5', strokeWidth: 2, strokeDasharray: '4 4' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="sales" 
                        stroke="#4f46e5" 
                        strokeWidth={4} 
                        fillOpacity={1} 
                        fill="url(#colorSales)" 
                        animationDuration={1500}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
               </div>
            </div>

            <SmartOrderBanner />

            {/* Top Productos Section */}
            <div className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-sm space-y-10">
               <div className="flex justify-between items-center">
                  <div className="space-y-1">
                     <h2 className="text-3xl font-black text-gray-900 tracking-tighter">Top Productos</h2>
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Los items más rentables de la semana</p>
                  </div>
                  <Target className="text-indigo-600" size={24} />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data?.topProducts.map((p, idx) => (
                    <div key={p.name} className="flex items-center gap-6 p-6 rounded-3xl bg-gray-50/50 border border-transparent hover:border-indigo-100 transition-all group">
                       <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 font-black text-lg shadow-sm group-hover:scale-110 transition-transform">
                          {idx + 1}
                       </div>
                       <div className="flex-1 min-w-0">
                          <p className="text-sm font-black text-gray-800 truncate uppercase">{p.name}</p>
                          <div className="flex items-center gap-3 mt-1">
                             <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-indigo-600 rounded-full" 
                                  style={{ width: `${Math.min(100, (p.sold / data.topProducts[0].sold) * 100)}%` }} 
                                />
                             </div>
                             <span className="text-[10px] font-black text-indigo-600">{p.sold} vendidos</span>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>

         <div className="xl:col-span-4">
            <CriticalAlerts items={data?.stockAnalysis.filter(p => p.daysLeft < 10)} />
         </div>
      </div>

      {/* Predictive Inventory Grid */}
      <div className="space-y-8">
         <div className="flex justify-between items-end px-2">
            <div className="space-y-1">
               <h2 className="text-3xl font-black text-gray-900 tracking-tighter">Inventario Predictivo</h2>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Proyecciones basadas en IA de rotación de stock</p>
            </div>
            <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">Ver todos los productos <ArrowUpRight className="inline" size={12} /></p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.stockAnalysis.map(item => (
              <PredictiveStockCard key={item.id} item={item} />
            ))}
         </div>
      </div>
    </div>
  );
}
