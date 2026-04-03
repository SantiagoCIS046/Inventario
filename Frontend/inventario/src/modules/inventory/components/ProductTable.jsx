import Badge from "../../../components/Badge";
import ProgressBar from "../../../components/ProgressBar";
import { Edit3, Trash2 } from "lucide-react";

function ProductTable({ products, onDelete }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50/50">
            <tr className="text-gray-400">
              <th className="text-left px-6 py-4 font-bold uppercase tracking-widest text-[10px]">Producto</th>
              <th className="text-left px-4 py-4 font-bold uppercase tracking-widest text-[10px]">Categoría</th>
              <th className="text-left px-4 py-4 font-bold uppercase tracking-widest text-[10px]">Stock</th>
              <th className="text-left px-4 py-4 font-bold uppercase tracking-widest text-[10px]">Precio Compra</th>
              <th className="text-left px-4 py-4 font-bold uppercase tracking-widest text-[10px]">Precio Venta</th>
              <th className="text-left px-4 py-4 font-bold uppercase tracking-widest text-[10px]">Estado</th>
              <th className="text-right px-6 py-4 font-bold uppercase tracking-widest text-[10px]">Acciones</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {products.length > 0 ? (
              products.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-800">{p.nombre}</p>
                  </td>

                  <td className="px-4 py-4 text-gray-500 font-medium">{p.categoria}</td>

                  <td className="px-4 py-4">
                    <ProgressBar value={p.stock} max={100} />
                  </td>

                  <td className="px-4 py-4 font-bold text-gray-600">${p.precioCompra?.toFixed(2)}</td>

                  <td className="px-4 py-4 font-bold text-blue-600">${p.precioVenta?.toFixed(2)}</td>

                  <td className="px-4 py-4">
                    <Badge status={p.stock > 10 ? "in-stock" : "low-stock"} />
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button className="p-2 text-gray-300 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all cursor-pointer">
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => onDelete(p.id)}
                        className="p-2 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-400 italic">
                  No hay productos registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductTable;
