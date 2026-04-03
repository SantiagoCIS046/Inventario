import Badge from "./Badge";
import ProgressBar from "./ProgressBar";
import { Edit3, MoreHorizontal, Filter } from "lucide-react";

function Table() {
  const data = [
    {
      name: "Cien Años de Soledad",
      edition: "Edición Especial",
      sku: "ISBN-9780307474728",
      stock: 450,
      maxStock: 500,
      price: 29.99,
      status: "in-stock",
    },
    {
      name: "Crónica de una Muerte Anunciada",
      edition: "Tapa Blanda",
      sku: "ISBN-9781400034710",
      stock: 8,
      maxStock: 200,
      price: 18.5,
      status: "low-stock",
    },
    {
      name: "El Amor en los Tiempos del Cólera",
      edition: "Edición Ilustrada",
      sku: "ISBN-9780307387264",
      stock: 120,
      maxStock: 250,
      price: 32.00,
      status: "in-stock",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-50 flex justify-between items-center text-gray-800">
        <h2 className="font-bold text-lg">Resumen de Inventario</h2>
        <div className="flex gap-2">
          <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
            <Filter size={18} />
          </button>
          <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50/50 text-gray-400">
            <tr>
              <th className="text-left px-8 py-4 font-bold uppercase tracking-widest text-[10px]">Item Name</th>
              <th className="text-left px-4 py-4 font-bold uppercase tracking-widest text-[10px]">SKU</th>
              <th className="text-left px-4 py-4 font-bold uppercase tracking-widest text-[10px]">Stock Level</th>
              <th className="text-left px-4 py-4 font-bold uppercase tracking-widest text-[10px]">Price</th>
              <th className="text-left px-4 py-4 font-bold uppercase tracking-widest text-[10px]">Status</th>
              <th className="text-right px-8 py-4 font-bold uppercase tracking-widest text-[10px]">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {data.map((item, i) => (
              <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-16 bg-gray-100 rounded-md flex-shrink-0 border border-gray-200 overflow-hidden shadow-sm shadow-gray-200 group-hover:scale-105 transition-transform">
                      {/* Simulación de portada del libro */}
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <span className="text-[8px] font-black italic text-gray-400 uppercase leading-none text-center px-1">Book Cover</span>
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 leading-snug">{item.name}</p>
                      <p className="text-[11px] text-gray-400 font-medium">{item.edition}</p>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-5 font-mono text-[11px] text-gray-400">
                  {item.sku}
                </td>

                <td className="px-4 py-5">
                  <ProgressBar value={item.stock} max={item.maxStock} />
                </td>

                <td className="px-4 py-5 font-bold text-gray-800">
                  ${item.price.toFixed(2)}
                </td>

                <td className="px-4 py-5">
                  <Badge status={item.status} />
                </td>

                <td className="px-8 py-5 text-right">
                  <button className="p-2 text-gray-300 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all cursor-pointer">
                    <Edit3 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-6 border-t border-gray-50 flex justify-between items-center text-xs text-gray-400 font-bold">
        <span>Mostrando 1-3 de 1,240 libros</span>
        <div className="flex gap-2">
          <button className="p-1.5 border border-gray-100 rounded hover:bg-gray-50 disabled:opacity-30 cursor-pointer" disabled>Prev</button>
          <button className="p-1.5 border border-gray-100 rounded hover:bg-gray-50 cursor-pointer text-blue-600 font-black">1</button>
          <button className="p-1.5 border border-gray-100 rounded hover:bg-gray-50 cursor-pointer">2</button>
          <button className="p-1.5 border border-gray-100 rounded hover:bg-gray-50 cursor-pointer">Next</button>
        </div>
      </div>
    </div>
  );
}

export default Table;
