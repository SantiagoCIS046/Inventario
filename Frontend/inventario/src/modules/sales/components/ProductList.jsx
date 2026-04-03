import { useEffect, useState } from "react";
import api from "../../../api/axios";
import { useSalesStore } from "../../../store/useSalesStore";
import { Search, Plus, Filter } from "lucide-react";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("TODOS");
  const { addToCart } = useSalesStore();

  useEffect(() => {
    api.get("/products").then(res => {
      const data = res.data.data?.data || res.data.data || res.data;
      setProducts(data || []);
    });
  }, []);

  const filtered = products.filter(p => {
    const matchesSearch = p.nombre.toLowerCase().includes(search.toLowerCase()) ||
                         p.categoria?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "TODOS" || p.categoria?.toUpperCase() === category;
    return matchesSearch && matchesCategory;
  });

  const categories = ["TODOS", "HOMBRE", "MUJER", "BÁSICOS"];

  return (
    <div className="space-y-10">
      {/* Category Filter */}
      <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all cursor-pointer whitespace-nowrap ${
              category === cat 
                ? "bg-indigo-600 text-white shadow-xl shadow-indigo-100 scale-105" 
                : "bg-white text-gray-400 border border-gray-100 hover:border-indigo-400 hover:text-indigo-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {filtered.map((product, idx) => (
          <div 
            key={product.id} 
            className="group bg-white rounded-[2.5rem] border border-gray-50 shadow-sm hover:shadow-2xl hover:shadow-indigo-900/5 transition-all duration-500 overflow-hidden flex flex-col"
          >
            {/* Image Wrapper */}
            <div className="aspect-[4/5] bg-gray-50 relative overflow-hidden flex items-center justify-center">
               {/* Badge Mocks */}
               {idx === 0 && (
                 <span className="absolute top-6 right-6 bg-white text-gray-900 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-sm z-10">NEW</span>
               )}
               {idx === 2 && (
                 <span className="absolute top-6 right-6 bg-red-600 text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-sm z-10">-15%</span>
               )}

               <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 group-hover:scale-110 transition-transform duration-700">
                  <span className="text-8xl grayscale opacity-20 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700">👕</span>
               </div>
               
               {/* Hover Quick Add */}
               <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-gray-900/60 to-transparent">
                  <button 
                    onClick={() => addToCart(product)}
                    className="w-full bg-white text-gray-900 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 hover:bg-gray-100 active:scale-95 transition-all cursor-pointer"
                  >
                     <Plus size={14} /> Quick Add
                  </button>
               </div>
            </div>

            {/* Info Section */}
            <div className="p-8 space-y-4">
              <div className="flex justify-between items-start gap-4">
                 <div className="space-y-1">
                    <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">{product.categoria || "Camisas"}</p>
                    <h3 className="text-base font-black text-gray-800 leading-tight group-hover:text-indigo-600 transition-colors uppercase italic truncate max-w-[140px]">
                      {product.nombre}
                    </h3>
                 </div>
                 <span className="text-xl font-black text-indigo-600 tracking-tighter">
                   ${product.precioVenta?.toLocaleString()}
                 </span>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full py-20 text-center bg-gray-50/30 rounded-3xl border border-dashed border-gray-200">
            <div className="text-5xl mb-4 opacity-10">🛍️</div>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No hay productos en esta categoría</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;
