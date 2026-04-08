import { 
  Megaphone, 
  Send, 
  Zap, 
  Target, 
  Users, 
  MousePointer2, 
  ArrowUpRight,
  Sparkles
} from "lucide-react";

function MarketingPage() {
  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-10">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                <Megaphone size={24} />
             </div>
             <h1 className="text-4xl font-black text-gray-900 tracking-tight">Marketing</h1>
          </div>
          <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em] px-1">Estrategias de Crecimiento y Adquisición de Clientes</p>
        </div>

        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl shadow-indigo-100 transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-3 cursor-pointer">
          <Plus size={18} /> Lanzar Nueva Campaña
        </button>
      </div>

      {/* Campaigns Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {[
          { title: "Lanzamiento Verano", status: "Activa", reach: "12.4k", conv: "3.2%", color: "indigo" },
          { title: "Reactivación", status: "Pausada", reach: "8.1k", conv: "1.8%", color: "orange" },
          { title: "Estrategia SEO", status: "Borrador", reach: "---", conv: "---", color: "gray" },
        ].map((camp, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm space-y-6 group hover:border-indigo-100 transition-all">
             <div className="flex justify-between items-start">
                <div className={`h-12 w-12 bg-${camp.color}-50 rounded-2xl flex items-center justify-center text-${camp.color}-600`}>
                   <Target size={24} />
                </div>
                <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-${camp.color}-50 text-${camp.color}-600 border border-${camp.color}-100`}>
                   {camp.status}
                </span>
             </div>
             <div>
                <h3 className="text-lg font-black text-gray-800 tracking-tight">{camp.title}</h3>
                <p className="text-xs font-medium text-gray-400 mt-1">Análisis de alcance omnicanal.</p>
             </div>
             <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
                <div>
                   <p className="text-xs font-black text-gray-900">{camp.reach}</p>
                   <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">Alcance Total</p>
                </div>
                <div>
                   <p className="text-xs font-black text-gray-900">{camp.conv}</p>
                   <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">Tasa de Conv.</p>
                </div>
             </div>
          </div>
        ))}
      </div>

      {/* Analytics Insight */}
      <div className="bg-indigo-900 rounded-[3rem] p-12 overflow-hidden relative group">
         <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-700">
            <Sparkles size={160} className="text-white" />
         </div>
         
         <div className="max-w-2xl space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/10">
               <Zap size={14} className="text-indigo-300" />
               <span className="text-[10px] font-black tracking-[0.2em] uppercase text-indigo-100">Análisis Predictivo de IA</span>
            </div>
            <h2 className="text-4xl font-black text-white tracking-tighter leading-tight">Optimiza tu alcance con datos en tiempo real.</h2>
            <p className="text-indigo-200 font-medium text-lg leading-relaxed">Nuestra IA analiza el comportamiento de tus clientes para sugerir los mejores momentos y canales para tus campañas de Marketing.</p>
            <div className="flex gap-4 pt-4">
               <button className="bg-white text-indigo-900 px-10 py-5 rounded-2xl font-black text-sm transition-all hover:scale-[1.05] active:scale-95 cursor-pointer">
                  Iniciar Análisis
               </button>
               <button className="text-white border border-white/20 px-10 py-5 rounded-2xl font-black text-sm transition-all hover:bg-white/5 cursor-pointer">
                  Ver Historial Completo
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}

function Plus({ size }) {
  return <Zap size={size} />;
}

export default MarketingPage;
