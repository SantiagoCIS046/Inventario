import { Plus } from "lucide-react";

function InventoryHeader({ onAdd, totalProducts, totalValue, lowStock, categories, showAddButton = true }) {
  return (
    <div className="space-y-8">
      {/* Title + Action */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Inventario</h1>
          <p className="text-gray-400 font-medium mt-1">Gestiona tu catálogo de productos y niveles de stock globales.</p>
        </div>
        {showAddButton && (
          <button
            onClick={onAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-blue-200 transition-all hover:scale-105 cursor-pointer"
          >
            <Plus size={20} />
            Agregar Producto
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Productos */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.15em] mb-3">Total Productos</p>
          <div className="flex items-end gap-3">
            <span className="text-4xl font-black text-gray-900 tracking-tighter">{totalProducts.toLocaleString()}</span>
            <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded-full mb-1">+12%</span>
          </div>
        </div>

        {/* Valor Total */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.15em] mb-3">Valor Total</p>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-black text-gray-900 tracking-tighter">${totalValue}</span>
            <span className="text-xs font-bold text-gray-400 mb-1">USD</span>
          </div>
        </div>

        {/* Bajo Stock */}
        <div className="bg-white rounded-2xl border border-orange-200 p-6 shadow-sm">
          <p className="text-[10px] font-black text-orange-500 uppercase tracking-[0.15em] mb-3">Bajo Stock</p>
          <div className="flex items-end gap-3">
            <span className="text-4xl font-black text-gray-900 tracking-tighter">{lowStock}</span>
            <span className="text-orange-400 mb-1">⚠</span>
          </div>
        </div>

        {/* Categorías */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.15em] mb-3">Categorías</p>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-black text-gray-900 tracking-tighter">{categories}</span>
            <span className="text-xs font-bold text-gray-400 mb-1">Activas</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InventoryHeader;
