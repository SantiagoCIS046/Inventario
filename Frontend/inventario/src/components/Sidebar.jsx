import { Link, useLocation } from "react-router-dom";
import { 
  Diamond, 
  Monitor, 
  BarChart3, 
  Users, 
  Settings, 
  Plus, 
  Truck, 
  Megaphone, 
  Activity, 
  HelpCircle,
  Package,
  LogOut,
  ShoppingCart
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

function Sidebar() {
  const { user, logout } = useAuthStore();
  const location = useLocation();

  const menuItems = [
    { icon: <Package size={20} />, label: "Inventario", path: "/inventory" },
    { icon: <Activity size={20} />, label: "Ventas Predictivas", path: "/predictive-sales" },
    { icon: <BarChart3 size={20} />, label: "Análisis y Reportes", path: "/reports" },
    { icon: <Truck size={20} />, label: "Proveedores", path: "/suppliers" },
    { icon: <Users size={20} />, label: "Gestión de Personal", path: "/users" },
    { icon: <Megaphone size={20} />, label: "Marketing Digital", path: "/marketing" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0 animate-in slide-in-from-left duration-700">
      {/* Brand & Profile Header */}
      <div className="p-5 space-y-8">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
             <Diamond size={24} />
          </div>
          <div>
            <span className="text-xl font-black text-indigo-900 tracking-tighter block leading-none">StitchLogic</span>
            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest mt-1 block">Nivel Empresarial</span>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-gray-50/50 p-3 rounded-2xl border border-gray-50 group hover:border-indigo-100 transition-all cursor-pointer">
           <div className="h-10 w-10 bg-gray-900 rounded-xl flex items-center justify-center overflow-hidden border border-gray-800">
              <span className="text-2xl grayscale">👤</span>
           </div>
           <div>
              <p className="text-sm font-black text-gray-800 leading-none">{user?.nombre || "Usuario"}</p>
              <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">{user?.rol || "Administrador"}</p>
           </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1 mt-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
              location.pathname === item.path
                ? "bg-indigo-50 text-indigo-600 shadow-sm"
                : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
            }`}
          >
            <div className={`${location.pathname === item.path ? "text-indigo-600" : "text-gray-300 group-hover:text-gray-500"} transition-colors`}>
              {item.icon}
            </div>
            <span className={`text-sm font-black tracking-tight ${location.pathname === item.path ? "text-indigo-700" : "text-gray-500"}`}>
              {item.label}
            </span>
            {location.pathname === item.path && (
               <div className="ml-auto w-1.5 h-1.5 bg-indigo-600 rounded-full shadow-lg shadow-indigo-200" />
            )}
          </Link>
        ))}
      </nav>

      {/* Footer Actions */}
      <div className="p-5 space-y-4">
         <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-indigo-100 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer">
            Generar Reporte
         </button>
         
         <div className="space-y-4 pt-4 border-t border-gray-50">
            <button className="w-full flex items-center gap-3 px-6 py-2 text-gray-400 hover:text-gray-600 transition-all font-bold text-xs uppercase tracking-widest cursor-pointer">
              <HelpCircle size={16} /> Centro de Ayuda
            </button>
            <button
               onClick={logout}
               className="w-full flex items-center gap-3 px-6 py-2 text-gray-400 hover:text-red-500 transition-all font-bold text-xs uppercase tracking-widest cursor-pointer"
            >
               <LogOut size={16} /> Cerrar Sesión
            </button>
         </div>
      </div>
    </aside>
  );
}

export default Sidebar;
