import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import { ShoppingBag } from "lucide-react";

function SalesPage() {
  return (
    <div className="space-y-10 animate-in fade-in duration-1000 pb-10 max-w-[1600px] mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 px-4">
        <div className="space-y-2">
          <h1 className="text-5xl font-black text-gray-900 tracking-tighter">
             Colección 2024
          </h1>
          <p className="text-gray-400 font-bold text-xs uppercase tracking-[0.1em]">Gestión de inventario y ventas en tiempo real</p>
        </div>
        
        <div className="relative w-full lg:max-w-md group">
           <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-300 group-focus-within:text-indigo-600 transition-colors" />
           </div>
           <input 
             type="text" 
             placeholder="Buscar prenda..."
             className="w-full bg-white border border-gray-100 py-5 pl-16 pr-8 rounded-[2rem] text-sm font-bold text-gray-700 shadow-sm focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 outline-none transition-all"
           />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-start">
        {/* Productos (2/3 -> col-span-8) */}
        <div className="xl:col-span-8 space-y-10">
           <ProductList />
        </div>

        {/* Carrito (1/3 -> col-span-4) */}
        <aside className="xl:col-span-4 sticky top-12 h-[calc(100vh-100px)]">
           <Cart />
        </aside>
      </div>
    </div>
  );
}

import { Search } from "lucide-react";

export default SalesPage;
