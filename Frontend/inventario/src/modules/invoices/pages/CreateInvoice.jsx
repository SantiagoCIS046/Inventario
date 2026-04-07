import { useState, useEffect } from "react";
import { createInvoice } from "../services/invoiceService";
import { getProducts } from "../../inventory/services/inventoryService";
import { useSalesStore } from "../../../store/useSalesStore";
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  X, 
  CheckCircle2, 
  Diamond,
  Search,
  ChevronRight,
  Landmark,
  CreditCard,
  Banknote
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Alert from "../../../components/Alert";

export default function CreateInvoice() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("EFECTIVO");
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const addToCart = (product) => {
    const existing = cart.find(p => p.id === product.id);
    if (existing) {
      setCart(cart.map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, delta) => {
    setCart(cart.map(p => {
      if (p.id === id) {
        const q = Math.max(1, p.quantity + delta);
        return { ...p, quantity: q };
      }
      return p;
    }));
  };

  const removeFromCart = (id) => setCart(cart.filter(p => p.id !== id));

  const subtotal = cart.reduce((acc, p) => acc + (p.precioVenta * p.quantity), 0);
  const iva = subtotal * 0.19;
  const total = subtotal + iva;

  const handleSubmit = async () => {
    if (cart.length === 0) {
      setError("Por favor, agrega al menos un producto al carrito");
      setTimeout(() => setError(""), 5000);
      return;
    }
    setLoading(true);
    try {
      const data = {
        items: cart.map((p) => ({
          productoId: p.id,
          cantidad: p.quantity,
          precio: p.precioVenta,
        })),
        total
      };

      const res = await createInvoice(data);
      setSuccess(true);
      // Redirigir al detalle de la factura recién creada
      const invoiceId = res.data?.id || res.id;
      setTimeout(() => navigate(`/invoices/${invoiceId}`), 1500);
    } catch (err) {
      setError("Error al crear factura. Verifique el stock o la conexión.");
      setTimeout(() => setError(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  const filtered = products.filter(p => p.nombre.toLowerCase().includes(search.toLowerCase()));

  if (success) return (
     <div className="flex flex-col items-center justify-center min-h-[60vh] animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white shadow-2xl shadow-green-100 mb-8">
           <CheckCircle2 size={48} />
        </div>
        <h2 className="text-4xl font-black text-gray-900 tracking-tighter">Factura Generada</h2>
        <p className="text-gray-400 font-bold mt-2 uppercase tracking-widest text-[10px]">Redirigiendo al historial...</p>
     </div>
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 px-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight flex items-center gap-4">
             <Diamond className="text-indigo-600" size={32} />
             Nueva Transacción
          </h1>
          <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em] px-1">Generación de Factura Automática • POS Terminal</p>
        </div>
      </div>

        <div className="px-4">
          <Alert type="danger" message={error} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Col: Products */}
        <div className="lg:col-span-8 space-y-8">
           <div className="bg-white p-2 pl-6 pr-2 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 group focus-within:border-indigo-400 transition-all">
              <Search size={18} className="text-gray-300 group-focus-within:text-indigo-600" />
              <input 
                type="text" 
                placeholder="Buscar por nombre o colección..."
                className="flex-1 bg-transparent border-none outline-none py-3 text-sm font-bold text-gray-700"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {filtered.map(p => (
                <div key={p.id} className="bg-white rounded-[2rem] border border-gray-50 shadow-sm hover:shadow-2xl hover:shadow-indigo-900/5 transition-all group overflow-hidden flex flex-col">
                   <div className="aspect-square bg-gray-50 flex items-center justify-center relative overflow-hidden">
                      <span className="text-6xl grayscale opacity-20 group-hover:opacity-100 group-hover:grayscale-0 transition-all group-hover:scale-110 duration-700">📦</span>
                      <div className="absolute top-4 right-4 h-2 w-2 bg-green-500 rounded-full" />
                   </div>
                   <div className="p-7 space-y-4">
                      <div className="flex justify-between items-start">
                         <h3 className="font-black text-gray-800 line-clamp-1">{p.nombre}</h3>
                         <span className="text-lg font-black text-indigo-600 tracking-tighter">${p.precioVenta.toFixed(2)}</span>
                      </div>
                      <button 
                        onClick={() => addToCart(p)}
                        className="w-full bg-gray-50 hover:bg-indigo-600 hover:text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-indigo-600 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                         <Plus size={14} /> Agregar
                      </button>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Right Col: Invoice Draft / Cart */}
        <div className="lg:col-span-4 space-y-8">
           <div className="bg-indigo-900 rounded-[2.5rem] shadow-2xl shadow-indigo-900/10 overflow-hidden flex flex-col max-h-[800px]">
              {/* Draft Header */}
              <div className="p-8 pb-4">
                 <div className="flex justify-between items-center mb-10">
                    <h3 className="text-xl font-black text-white tracking-tight">Orden Directa</h3>
                    <div className="bg-indigo-800 p-2 rounded-xl text-indigo-400">
                       <ShoppingBag size={20} />
                    </div>
                 </div>
                 
                 {/* Items in draft */}
                 <div className="space-y-6 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
                    {cart.map(item => (
                       <div key={item.id} className="flex gap-4 items-center animate-in slide-in-from-right duration-500">
                          <div className="h-12 w-12 bg-white/10 rounded-xl flex items-center justify-center text-white/20 font-black flex-shrink-0 border border-white/5 uppercase text-[10px]">
                             #id
                          </div>
                          <div className="flex-1 min-w-0">
                             <p className="text-xs font-black text-white truncate">{item.nombre}</p>
                             <p className="text-[10px] font-black text-indigo-400 mt-1">${item.precioVenta.toFixed(2)} / unit</p>
                          </div>
                          <div className="flex items-center gap-3 bg-indigo-800/50 p-1.5 rounded-xl border border-white/5">
                             <button onClick={() => updateQuantity(item.id, -1)} className="text-indigo-300 hover:text-white transition-colors cursor-pointer"><Minus size={12} /></button>
                             <span className="text-[10px] font-black text-white w-4 text-center">{item.quantity}</span>
                             <button onClick={() => updateQuantity(item.id, 1)} className="text-indigo-300 hover:text-white transition-colors cursor-pointer"><Plus size={12} /></button>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-indigo-800 hover:text-red-400 transition-colors cursor-pointer"><X size={14} /></button>
                       </div>
                    ))}
                    
                    {cart.length === 0 && (
                      <div className="py-20 text-center opacity-20 border-2 border-dashed border-indigo-700/50 rounded-3xl">
                         <p className="text-[9px] font-black text-indigo-300 uppercase tracking-[0.2em]">Seleccione productos</p>
                      </div>
                    )}
                 </div>
              </div>

              {/* Summary and Confirm */}
              <div className="mt-auto p-10 bg-indigo-950/50 backdrop-blur-sm border-t border-white/5 space-y-10">
                 <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs font-black">
                       <span className="text-indigo-400 uppercase tracking-widest">Subtotal</span>
                       <span className="text-white">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-black">
                       <span className="text-indigo-400 uppercase tracking-widest">Tax (21%)</span>
                       <span className="text-white">${iva.toFixed(2)}</span>
                    </div>
                    <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                       <span className="text-5xl font-black text-white tracking-tighter">${total.toFixed(2)}</span>
                       <span className="text-[10px] font-black text-indigo-300 uppercase tracking-[0.2em] leading-none mb-2">Total FINAL</span>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest px-2">Método Seleccionado</p>
                    <div className="grid grid-cols-3 gap-3">
                       {[
                         { id: "EFECTIVO", icon: <Banknote size={16} /> },
                         { id: "TARJETA", icon: <CreditCard size={16} /> },
                         { id: "TRANSF.", icon: <Landmark size={16} /> }
                       ].map(m => (
                         <button 
                           key={m.id}
                           onClick={() => setPaymentMethod(m.id)}
                           className={`p-4 rounded-2xl flex flex-col items-center gap-2 transition-all border cursor-pointer ${
                             paymentMethod === m.id ? "bg-indigo-600 border-indigo-400 text-white shadow-xl shadow-indigo-950" : "bg-indigo-900/50 border-white/5 text-indigo-400 hover:border-indigo-600"
                           }`}
                         >
                           {m.icon}
                           <span className="text-[8px] font-black tracking-tighter capitalize">{m.id.toLowerCase().replace('.','')}</span>
                         </button>
                       ))}
                    </div>
                 </div>

                 <button 
                   onClick={handleSubmit}
                   disabled={cart.length === 0 || loading}
                   className="w-full bg-white hover:bg-gray-100 disabled:opacity-30 text-indigo-900 py-6 rounded-3xl font-black text-sm uppercase tracking-widest transition-all shadow-2xl shadow-indigo-950 flex items-center justify-center gap-3 cursor-pointer"
                 >
                   {loading ? "Emitiendo..." : (
                     <>
                        Confirmar Factura
                        <ChevronRight size={18} />
                     </>
                   )}
                 </button>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
