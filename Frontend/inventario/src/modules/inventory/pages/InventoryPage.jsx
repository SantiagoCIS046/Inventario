import { useEffect, useState, useMemo } from "react";
import { getProducts, updateProduct, deleteProduct, createProduct } from "../services/inventoryService";
import { Plus, Search, Filter, ChevronDown, LayoutGrid } from "lucide-react";
import InventoryTablePro from "../components/InventoryTablePro";
import InventoryStatsRow from "../components/InventoryStatsRow";
import ProductForm from "../components/ProductForm";
import { useAuthStore } from "../../../store/useAuthStore";

const CATEGORIES = ["Camisas", "Oversize", "Jeans", "Cargo", "Pantalonetas", "Shorts", "Zapatos", "Gorras", "Polos", "Otros"];

function InventoryPage() {
  const { user } = useAuthStore();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    category: "all"
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const data = await getProducts();
    setProducts(data.data || data || []);
    setLoading(false);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (!p) return false;
      const nombre = p.nombre || "";
      const stock = p.stock || 0;
      const categoria = p.categoria || "S/C";

      const matchSearch = nombre.toLowerCase().includes((filters.search || "").toLowerCase());
      const matchStatus =
        filters.status === "all" ||
        (filters.status === "in-stock" && stock > 10) ||
        (filters.status === "low-stock" && stock <= 10);
      const matchCategory = filters.category === "all" || categoria === filters.category;
      return matchSearch && matchStatus && matchCategory;
    });
  }, [products, filters]);

  const stats = useMemo(() => {
    const totalValue = products.reduce((sum, p) => sum + ((p?.precio || 0) * (p?.stock || 0)), 0);
    const lowStockCount = products.filter(p => (p?.stock || 0) < 10).length;
    return { totalValue, lowStockCount, totalItems: products.length };
  }, [products]);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Realmente deseas eliminar este producto?")) return;
    await deleteProduct(id);
    loadProducts();
  };

  const handleSave = async (data) => {
    if (selectedProduct) {
      await updateProduct(selectedProduct.id, data);
    } else {
      await createProduct(data);
    }
    setShowForm(false);
    setSelectedProduct(null);
    loadProducts();
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-1000 pb-20">
      
      {/* Header PRO */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 px-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-gray-900 tracking-tighter">Gestión de Inventario Pro</h1>
          <p className="text-gray-400 font-bold text-[9px] uppercase tracking-[0.2em]">Visualización editorial de productos y existencias globales.</p>
        </div>
        
        <button 
          onClick={() => { setSelectedProduct(null); setShowForm(true); }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-indigo-100 transition-all hover:scale-[1.03] active:scale-95 cursor-pointer"
        >
          <Plus size={20} />
          Nuevo Producto
        </button>
      </div>

      {/* Control Bar (As in Image) */}
      <div className="bg-white p-4 rounded-[1.5rem] border border-gray-200/60 shadow-sm flex flex-col lg:flex-row items-center gap-4">
         <div className="flex-1 w-full relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
            <input 
               type="text" 
               placeholder="Buscar por nombre, SKU o etiqueta..."
               className="w-full bg-gray-50 border-none rounded-xl py-3 pl-14 pr-4 text-sm font-bold text-gray-700 placeholder:text-gray-300 focus:ring-4 focus:ring-indigo-100 transition-all"
               value={filters.search}
               onChange={(e) => setFilters(prev => ({...prev, search: e.target.value}))}
            />
         </div>
         
         <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="relative group w-full lg:w-64">
               <select 
                  className="w-full appearance-none bg-gray-50 border-none rounded-xl py-3 px-6 text-[11px] font-black text-gray-600 uppercase tracking-widest cursor-pointer pr-10 focus:ring-4 focus:ring-indigo-100"
                  onChange={(e) => setFilters(prev => ({...prev, category: e.target.value}))}
                  value={filters.category}
               >
                  <option value="all">Todas las Categorías</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
               </select>
               <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" size={16} />
            </div>

            <div className="relative group w-full lg:w-64">
               <select 
                  className="w-full appearance-none bg-gray-50 border-none rounded-xl py-3 px-6 text-[11px] font-black text-gray-600 uppercase tracking-widest cursor-pointer pr-10 focus:ring-4 focus:ring-indigo-100"
                  onChange={(e) => setFilters(prev => ({...prev, status: e.target.value}))}
                  value={filters.status}
               >
                  <option value="all">Todos los Estados</option>
                  <option value="in-stock">En Stock</option>
                  <option value="low-stock">Stock Bajo</option>
               </select>
               <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" size={16} />
            </div>

            <button className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-all cursor-pointer">
               <LayoutGrid size={20} />
            </button>
         </div>
      </div>

      {/* Main Table */}
      <InventoryTablePro 
         products={filteredProducts} 
         onEdit={handleEdit} 
         onDelete={handleDelete} 
      />

      {/* Stats Footer Row */}
      <InventoryStatsRow 
         totalValue={stats.totalValue} 
         lowStockCount={stats.lowStockCount} 
         totalItems={stats.totalItems} 
      />

      {showForm && (
        <ProductForm
          product={selectedProduct}
          onSubmit={handleSave}
          onClose={() => {
            setShowForm(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
}

export default InventoryPage;
