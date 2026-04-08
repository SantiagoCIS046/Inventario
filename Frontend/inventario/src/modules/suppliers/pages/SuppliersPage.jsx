import { useState } from "react";
import { 
  Truck, 
  Plus, 
  Search, 
  MapPin, 
  Phone, 
  Mail, 
  MoreHorizontal, 
  ChevronRight,
  Package,
  ShieldCheck,
  Star,
  ExternalLink
} from "lucide-react";

const DEMO_SUPPLIERS = [
  { id: 1, name: "Global Textiles S.A.", contact: "Mario Rossi", email: "m.rossi@globaltext.it", phone: "+39 02 123 4567", category: "Telas", status: "Activo", rating: 4.8 },
  { id: 2, name: "EcoLogistics Port", contact: "Elena Vance", email: "evance@ecoport.com", phone: "+1 555 0123", category: "Envíos", status: "Revisar", rating: 4.2 },
  { id: 3, name: "Precision Buttons Co.", contact: "Hideo Kojima", email: "hideo@precision.jp", phone: "+81 3 4567 8901", category: "Fornituras", status: "Activo", rating: 4.9 },
  { id: 4, name: "Leather & Hide Ltd.", contact: "Sarah Miller", email: "sm@leatherhide.uk", phone: "+44 20 7946 0958", category: "Cuero", status: "Demorado", rating: 3.5 },
];

function SuppliersPage() {
  const [search, setSearch] = useState("");

  const filtered = DEMO_SUPPLIERS.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-10">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                <Truck size={24} />
             </div>
             <h1 className="text-4xl font-black text-gray-900 tracking-tight">Proveedores</h1>
          </div>
          <p className="text-gray-500 font-bold text-[10px] uppercase tracking-[0.2em] px-1">Gestión de Alianzas Estratégicas y Cadena de Suministro</p>
        </div>

        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl shadow-indigo-100 transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-3 cursor-pointer">
          <Plus size={18} /> Agregar Socio Estratégico
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Socios Activos", value: "24", icon: <ShieldCheck size={20} />, color: "bg-green-50 text-green-600" },
          { label: "Envíos Pendientes", value: "08", icon: <Package size={20} />, color: "bg-blue-50 text-blue-600" },
          { label: "Fiabilidad Promedio", value: "98.4%", icon: <Star size={20} />, color: "bg-orange-50 text-orange-600" },
          { label: "Puntuación Logística", value: "A+", icon: <ExternalLink size={20} />, color: "bg-purple-50 text-purple-600" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-50 shadow-sm flex items-center justify-between group hover:border-indigo-100 transition-all">
             <div className="space-y-1">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">{stat.label}</p>
                <p className="text-2xl font-black text-gray-900 tracking-tighter leading-none pt-2">{stat.value}</p>
             </div>
             <div className={`${stat.color} p-3 rounded-2xl group-hover:scale-110 transition-transform`}>
                {stat.icon}
             </div>
          </div>
        ))}
      </div>

      {/* Search and Table Content */}
      <div className="bg-white rounded-[2.5rem] border border-gray-50 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
         <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row gap-6 justify-between items-center bg-gray-50/20">
            <div className="relative w-full max-w-md group">
               <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
               <input 
                 type="text" 
                 placeholder="Buscar por nombre, región o categoría..." 
                 className="w-full bg-white border border-transparent rounded-2xl pl-14 pr-6 py-4 text-sm font-bold text-gray-700 placeholder-gray-400 focus:outline-none focus:border-indigo-100 focus:ring-4 focus:ring-indigo-50/50 transition-all"
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
               />
            </div>
            
            <div className="flex gap-4">
               {["Todos", "Telas", "Envíos", "Fornituras"].map(cat => (
                 <button key={cat} className="px-5 py-2 text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-indigo-600 transition-all">
                    {cat}
                 </button>
               ))}
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="border-b border-gray-50 bg-gray-50/10">
                     <th className="px-10 py-6 text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">Proveedor / Agencia</th>
                     <th className="px-6 py-6 text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">Categoría</th>
                     <th className="px-6 py-6 text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">Comunicación</th>
                     <th className="px-6 py-6 text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">Puntuación</th>
                     <th className="px-6 py-6 text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">Estado</th>
                     <th className="px-10 py-6"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {filtered.map(supplier => (
                    <tr key={supplier.id} className="group hover:bg-indigo-50/20 transition-all cursor-default">
                       <td className="px-10 py-6">
                          <div className="flex items-center gap-4">
                             <div className="h-12 w-12 bg-gray-900 rounded-2xl flex items-center justify-center text-white font-black overflow-hidden border border-gray-800 shadow-lg shadow-gray-200">
                                {supplier.name.charAt(0)}
                             </div>
                             <div>
                                <p className="text-sm font-black text-gray-800 leading-none">{supplier.name}</p>
                                <p className="text-[10px] font-bold text-gray-400 mt-2 flex items-center gap-1">
                                   <MapPin size={10} /> Sede Regional
                                </p>
                             </div>
                          </div>
                       </td>
                       <td className="px-6 py-6 text-xs font-black text-indigo-600 uppercase tracking-widest">
                          {supplier.category}
                       </td>
                       <td className="px-6 py-6">
                          <div className="space-y-1.5">
                             <p className="text-[11px] font-black text-gray-700 flex items-center gap-2">
                                <Mail size={12} className="text-gray-300" /> {supplier.email}
                             </p>
                             <p className="text-[11px] font-black text-gray-700 flex items-center gap-2">
                                <Phone size={12} className="text-gray-300" /> {supplier.phone}
                             </p>
                          </div>
                       </td>
                       <td className="px-6 py-6">
                          <div className="flex items-center gap-2">
                             <div className="flex gap-0.5">
                                {[1,2,3,4,5].map(i => (
                                  <Star key={i} size={10} className={`${i <= Math.round(supplier.rating) ? "text-orange-400 fill-orange-400" : "text-gray-200"}`} />
                                ))}
                             </div>
                             <span className="text-[10px] font-black text-gray-900">{supplier.rating}</span>
                          </div>
                       </td>
                       <td className="px-6 py-6">
                          <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                             supplier.status === "Activo" ? "bg-green-50 text-green-600 border border-green-100" :
                             supplier.status === "Revisar" ? "bg-orange-50 text-orange-600 border border-orange-100" :
                             "bg-red-50 text-red-600 border border-red-100"
                          }`}>
                             {supplier.status === "Activo" ? "ACTIVO" : supplier.status === "Revisar" ? "EN REVISIÓN" : "DEMORADO"}
                          </span>
                       </td>
                       <td className="px-10 py-6 text-right">
                          <button className="p-2 text-gray-300 hover:text-indigo-600 hover:bg-white rounded-xl transition-all shadow-sm">
                             <MoreHorizontal size={20} />
                          </button>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>

         {/* Empty state or loader simulation */}
         {filtered.length === 0 && (
           <div className="flex-1 flex flex-col items-center justify-center p-20 text-center space-y-4">
              <div className="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-200 transition-all group-hover:scale-110">
                 <Truck size={40} />
              </div>
              <h3 className="text-lg font-black text-gray-400 tracking-tight">No se encontraron socios</h3>
              <p className="text-xs font-bold text-gray-300 max-w-xs mx-auto">Prueba ajustando los términos de búsqueda o los filtros.</p>
           </div>
         )}
         
         <div className="mt-auto p-8 border-t border-gray-50 bg-gray-50/10 flex justify-between items-center group cursor-pointer hover:bg-indigo-50 transition-all decoration-indigo-600">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Ver Archivo de Contratos Estratégicos</span>
            <div className="text-indigo-600 font-black flex items-center gap-2 group-hover:translate-x-2 transition-all">
               <span className="text-xs uppercase tracking-widest">Abrir Archivo</span>
               <ChevronRight size={16} />
            </div>
         </div>
      </div>
    </div>
  );
}

export default SuppliersPage;
