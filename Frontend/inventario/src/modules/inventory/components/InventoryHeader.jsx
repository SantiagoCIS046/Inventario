import { Plus, Filter, Download } from "lucide-react";

function InventoryHeader({ onAdd }) {
  return (
    <div className="flex justify-between items-end">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Inventario</h1>
        <p className="text-gray-400 text-sm font-medium mt-1">Gestión de productos y stock</p>
      </div>

      <div className="flex gap-3">
        <button className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer flex items-center gap-2">
          <Filter size={16} />
          Filtrar
        </button>
        <button className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer flex items-center gap-2">
          <Download size={16} />
          Exportar
        </button>
        <button
          onClick={onAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-blue-200 transition-all hover:scale-105 cursor-pointer"
        >
          <Plus size={18} />
          Nuevo Producto
        </button>
      </div>
    </div>
  );
}

export default InventoryHeader;
