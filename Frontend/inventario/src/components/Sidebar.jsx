import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  BarChart3, 
  Settings, 
  LogOut 
} from "lucide-react";

function Sidebar() {
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", active: true },
    { icon: <Package size={20} />, label: "Inventario" },
    { icon: <ShoppingCart size={20} />, label: "Ventas" },
    { icon: <BarChart3 size={20} />, label: "Reportes" },
    { icon: <Settings size={20} />, label: "Configuración" },
  ];

  return (
    <aside className="w-72 bg-white border-r border-gray-100 flex flex-col h-full sticky top-0">
      <div className="p-8 flex items-center gap-3">
        <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-200">
          E
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-800 leading-none">Epicure Pro</h2>
          <p className="text-[10px] font-bold text-blue-500 uppercase tracking-tighter mt-1">Management System</p>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1.5">
        {menuItems.map((item, idx) => (
          <a
            key={idx}
            href="#"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all group ${
              item.active 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-100" 
                : "text-gray-500 hover:bg-gray-50 hover:text-blue-600"
            }`}
          >
            <span className={item.active ? "text-white" : "text-gray-400 group-hover:text-blue-500 transition-colors"}>
              {item.icon}
            </span>
            {item.label}
          </a>
        ))}
      </nav>

      <div className="p-6 border-t border-gray-50">
        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors cursor-pointer group">
          <LogOut size={20} className="text-red-400 group-hover:text-red-500 transition-colors" />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
