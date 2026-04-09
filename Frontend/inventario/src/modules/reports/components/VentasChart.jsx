import React from "react";
import { formatCurrency } from "../../../utils/formatters";

export default function SalesChart({ data }) {
  if (!data || data.length === 0) return (
     <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-100 rounded-3xl opacity-20">
        <p className="font-black text-xs uppercase tracking-widest text-gray-400">Sin datos de actividad</p>
     </div>
  );

  const maxVal = Math.max(...data.map(d => Number(d.total || 0))) * 1.2 || 100;
  const height = 240;
  const width = 800;
  const barWidth = 40;
  const gap = 15;

  return (
    <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
      <div className="flex justify-between items-center">
         <div>
            <h3 className="text-xl font-black text-gray-900 tracking-tight">Rendimiento de Ventas</h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Actividad de los últimos 14 días</p>
         </div>
         <div className="flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-100">
            <div className="w-2 h-2 bg-indigo-600 rounded-full" />
            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Ventas</span>
         </div>
      </div>

      <div className="relative overflow-x-auto pb-4 custom-scrollbar">
        <svg height={height + 40} width={data.length * (barWidth + gap) + 60} className="mx-auto">
          {data.map((d, i) => {
            const value = Number(d.total || 0);
            const barHeight = (value / maxVal) * height;
            const x = i * (barWidth + gap) + 30;
            const y = height - barHeight + 20;

            return (
              <g key={i} className="group cursor-pointer">
                {/* Background ghost bar for hover area */}
                <rect 
                  x={x - 5} 
                  y={20} 
                  width={barWidth + 10} 
                  height={height} 
                  fill="transparent"
                  className="hover:fill-indigo-50/30 transition-colors"
                />
                
                {/* Actual Data Bar */}
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  rx="12"
                  className="fill-indigo-100 group-hover:fill-indigo-600 transition-all duration-500 ease-out"
                />

                {/* Highlight line for the latest bar (like in the image) */}
                {i === data.length - 1 && (
                   <rect
                     x={x + barWidth - 4}
                     y={y}
                     width="4"
                     height={barHeight}
                     rx="2"
                     className="fill-indigo-800"
                   />
                )}

                {/* Label (Date) */}
                <text
                  x={x + barWidth / 2}
                  y={height + 45}
                  textAnchor="middle"
                  className="text-[9px] font-black fill-gray-300 uppercase tracking-tighter"
                >
                  {new Date(d.date).toLocaleDateString(undefined, { day: '2-digit', month: 'short' })}
                </text>

                {/* Value on Hover tooltip area */}
                <title>{`Total: ${formatCurrency(d.total)}`}</title>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
