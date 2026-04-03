import { Search, FilterX } from "lucide-react";

function InventoryFilters({ filters, onFilterChange, onClear, categories }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 px-6 py-4 flex flex-wrap items-center gap-6 shadow-sm animate-in fade-in slide-in-from-top-2 duration-500">
      {/* Buscador */}
      <div className="relative flex-1 min-w-[280px] group">
        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-300 group-focus-within:text-blue-500 transition-colors">
          <Search size={18} />
        </span>
        <input
          type="text"
          value={filters.search}
          onChange={(e) => onFilterChange("search", e.target.value)}
          placeholder="Buscar productos..."
          className="w-full bg-gray-50 border border-transparent rounded-xl pl-11 pr-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-50/50 transition-all font-medium"
        />
      </div>

      {/* Filtro Estado */}
      <div className="relative">
        <select
          value={filters.status}
          onChange={(e) => onFilterChange("status", e.target.value)}
          className="bg-gray-50 border border-gray-200 rounded-xl pl-4 pr-10 py-2.5 text-sm text-gray-600 font-bold focus:outline-none focus:ring-4 focus:ring-blue-50/50 focus:border-blue-400 cursor-pointer appearance-none transition-all"
          style={{ 
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")", 
            backgroundRepeat: "no-repeat", 
            backgroundPosition: "right 14px center" 
          }}
        >
          <option value="all">Estado</option>
          <option value="in-stock">En stock</option>
          <option value="low-stock">Bajo stock</option>
        </select>
      </div>

      {/* Filtro Categoría */}
      <div className="relative">
        <select
          value={filters.category}
          onChange={(e) => onFilterChange("category", e.target.value)}
          className="bg-gray-50 border border-gray-200 rounded-xl pl-4 pr-10 py-2.5 text-sm text-gray-600 font-bold focus:outline-none focus:ring-4 focus:ring-blue-50/50 focus:border-blue-400 cursor-pointer appearance-none transition-all"
          style={{ 
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")", 
            backgroundRepeat: "no-repeat", 
            backgroundPosition: "right 14px center" 
          }}
        >
          <option value="all">Categoría</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Limpiar Filtros */}
      <button 
        onClick={onClear}
        className="flex items-center gap-2 px-4 py-2.5 text-sm font-black text-blue-600 hover:bg-blue-50 rounded-xl transition-all cursor-pointer group"
      >
        <FilterX size={18} className="group-hover:rotate-12 transition-transform" />
        Limpiar filtros
      </button>
    </div>
  );
}

export default InventoryFilters;
