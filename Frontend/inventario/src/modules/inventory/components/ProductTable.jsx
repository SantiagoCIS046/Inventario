import { Edit3, Trash2 } from "lucide-react";

function ProductTable({ products, onEdit, onDelete }) {
  const getStockColor = (stock) => {
    if (stock <= 5) return "bg-orange-500";
    if (stock <= 20) return "bg-orange-400";
    return "bg-blue-600";
  };

  const getStockWidth = (stock) => {
    const max = 100;
    return Math.min((stock / max) * 100, 100);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50/80">
            <tr className="text-gray-400">
              <th className="text-left px-6 py-4 font-black uppercase tracking-[0.15em] text-[10px]">Imagen</th>
              <th className="text-left px-4 py-4 font-black uppercase tracking-[0.15em] text-[10px]">Producto</th>
              <th className="text-left px-4 py-4 font-black uppercase tracking-[0.15em] text-[10px]">SKU</th>
              <th className="text-left px-4 py-4 font-black uppercase tracking-[0.15em] text-[10px]">Categoría</th>
              <th className="text-left px-4 py-4 font-black uppercase tracking-[0.15em] text-[10px]">Stock</th>
              <th className="text-left px-4 py-4 font-black uppercase tracking-[0.15em] text-[10px]">Precio</th>
              <th className="text-left px-4 py-4 font-black uppercase tracking-[0.15em] text-[10px]">Estado</th>
              <th className="text-right px-6 py-4 font-black uppercase tracking-[0.15em] text-[10px]">Acciones</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {products.length > 0 ? (
              products.map((p) => (
                <tr key={p.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="w-14 h-14 bg-gray-100 rounded-xl border border-gray-200 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform shadow-sm">
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <span className="text-lg">📦</span>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <p className="font-bold text-gray-800 leading-snug">{p.nombre}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{p.categoria}</p>
                  </td>

                  <td className="px-4 py-4">
                    <span className="font-mono text-[11px] text-gray-400 bg-gray-50 px-2 py-1 rounded">
                      SKU-{String(p.id).padStart(4, '0')}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100">
                      {p.categoria}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3 min-w-[100px]">
                      <div className="w-20 bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div
                          className={`${getStockColor(p.stock)} h-full rounded-full transition-all duration-700`}
                          style={{ width: `${getStockWidth(p.stock)}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-gray-700 min-w-[24px]">{p.stock}</span>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <span className="font-black text-gray-800">${p.precioVenta?.toFixed(2)}</span>
                  </td>

                  <td className="px-4 py-4">
                    {p.stock > 10 ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black bg-green-50 text-green-600 border border-green-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        In Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black bg-red-50 text-red-600 border border-red-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        Low Stock
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      {hasPermission(user, "edit_product") && (
                        <button 
                          onClick={() => onEdit(p)}
                          className="p-2 text-gray-300 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all cursor-pointer"
                        >
                          <Edit3 size={16} />
                        </button>
                      )}
                      {hasPermission(user, "delete_product") && (
                        <button
                          onClick={() => onDelete(p.id)}
                          className="p-2 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-6 py-16 text-center">
                  <div className="text-4xl mb-3">📦</div>
                  <p className="text-gray-400 font-bold">No hay productos registrados</p>
                  <p className="text-gray-300 text-xs mt-1">Agrega tu primer producto para empezar</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {products.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-50 flex justify-between items-center">
          <span className="text-xs font-bold text-gray-400">
            Mostrando 1-{products.length} de {products.length} productos
          </span>
          <div className="flex gap-1.5">
            <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-300 text-sm cursor-pointer" disabled>
              ‹
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-blue-600 text-white text-sm font-bold shadow-md shadow-blue-200 cursor-pointer">
              1
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 text-sm font-bold hover:bg-gray-50 cursor-pointer">
              2
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 text-sm font-bold hover:bg-gray-50 cursor-pointer">
              3
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 text-sm hover:bg-gray-50 cursor-pointer">
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductTable;
