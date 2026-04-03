import React from "react";
import { Zap, X, Sparkles } from "lucide-react";

export default function SmartOrderBanner() {
  return (
    <div className="relative group overflow-hidden">
      <div className="bg-gradient-to-r from-gray-900 to-indigo-950 p-6 rounded-[2rem] border border-indigo-900/50 shadow-2xl relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 transition-all hover:scale-[1.01]">
         <div className="flex items-center gap-6">
            <div className="p-4 bg-indigo-500/20 rounded-2xl text-indigo-400 border border-indigo-500/30">
               <Zap size={24} className="animate-pulse" />
            </div>
            <div>
               <div className="flex items-center gap-3">
                  <span className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.3em]">Active Insight</span>
                  <div className="h-1 w-1 bg-indigo-500 rounded-full" />
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.1em]">Optimizar Inventario</span>
               </div>
               <p className="text-white font-black text-xl tracking-tight mt-1 truncate max-w-md">
                 Predicción: 3 productos clave se agotarán en <span className="text-indigo-400">menos de 72h</span>.
               </p>
            </div>
         </div>
         
         <div className="flex items-center gap-4">
            <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer">
               <Sparkles size={18} />
               Ejecutar SmartOrder
            </button>
            <button className="p-4 bg-white/5 hover:bg-white/10 text-gray-400 rounded-2xl transition-all cursor-pointer">
               <X size={20} />
            </button>
         </div>
      </div>
      
      {/* Decorative glows */}
      <div className="absolute top-0 right-1/4 w-64 h-64 bg-indigo-600/20 rounded-full blur-[100px] -z-0 group-hover:scale-150 transition-transform duration-1000" />
      <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-purple-600/10 rounded-full blur-[60px] -z-0" />
    </div>
  );
}
