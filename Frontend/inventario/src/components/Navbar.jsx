import { Search, Bell, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

function Navbar() {
  const { user } = useAuthStore();
  
  return (
    <header className="bg-white border-b border-gray-100 px-6 py-2 flex justify-between items-center sticky top-0 z-10">
      <div className="relative group max-w-sm w-full">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 group-focus-within:text-blue-500 transition-colors">
          <Search size={18} />
        </span>
        <input
          type="text"
          placeholder="Buscar productos, ventas o clientes..."
          className="w-full bg-gray-50 border border-transparent rounded-xl pl-10 pr-4 py-1.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-50/50 transition-all font-medium"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all cursor-pointer">
          <Bell size={20} />
          <span className="absolute top-2 right-2.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-800 leading-tight">{user?.nombre || "Usuario"}</p>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">{user?.rol || "Administrador"}</p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-200 cursor-pointer hover:scale-105 transition-transform">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
