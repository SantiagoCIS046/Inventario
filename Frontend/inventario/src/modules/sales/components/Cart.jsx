import { useSalesStore } from "../../../store/useSalesStore";
import CartItem from "./CartItem";
import { 
  Trash2, 
  CreditCard, 
  Banknote, 
  CheckCircle2, 
  ShoppingBag, 
  Landmark, 
  Printer,
  ArrowRight
} from "lucide-react";
import { useState } from "react";
import Receipt from "./Receipt";

function Cart() {
  const { cart, total, checkout, removeFromCart } = useSalesStore();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("EFECTIVO");
  const [showReceipt, setShowReceipt] = useState(false);
  const [lastSale, setLastSale] = useState(null);

  const iva = total * 0.19; // Updated to 19% as requested
  const finalTotal = total + iva;

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    // Validación de stock antes de vender
    const itemSinStock = cart.find(item => item.stock < item.quantity);
    if (itemSinStock) {
      alert(`No hay suficiente stock para "${itemSinStock.nombre}". \nDisponibles: ${itemSinStock.stock} unidades.`);
      return;
    }

    setLoading(true);
    try {
      const saleData = { 
        id: Math.floor(Math.random() * 10000), 
        createdAt: new Date(), 
        total: finalTotal,
        detalles: cart.map(i => ({ ...i, producto: { nombre: i.nombre } }))
      };
      setLastSale(saleData);
      await checkout();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      alert("Error al procesar la venta. Verifique el stock.");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    if (cart.length === 0) return;
    const currentSale = {
      id: Math.floor(Math.random() * 10000),
      createdAt: new Date(),
      total: finalTotal,
      detalles: cart.map(i => ({ ...i, producto: { nombre: i.nombre } }))
    };
    setLastSale(currentSale);
    setShowReceipt(true);
  };

  const handleClearCart = () => {
    cart.forEach(item => removeFromCart(item.id));
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-100 p-10 rounded-3xl flex flex-col items-center justify-center text-center animate-in zoom-in duration-300 h-full">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white mb-4 shadow-lg shadow-green-100">
          <CheckCircle2 size={32} />
        </div>
        <h2 className="text-xl font-black text-green-800 tracking-tight">¡Venta Exitosa!</h2>
        <p className="text-sm font-medium text-green-600 mt-1">Inventario actualizado.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-indigo-900/5 overflow-hidden flex flex-col h-full max-h-[calc(100vh-140px)] animate-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="p-8 pb-4 flex justify-between items-start">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight leading-none">Carrito de Ventas</h2>
          <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Orden #POS-{Math.floor(Math.random() * 90000) + 10000}</p>
        </div>
        <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest leading-none">
          {cart.reduce((acc, item) => acc + item.quantity, 0)} Items
        </span>
      </div>

      {/* Cart Content */}
      <div className="flex-1 overflow-y-auto p-8 pt-4 space-y-4 custom-scrollbar">
        {cart.length > 0 ? (
          cart.map(item => (
            <CartItem key={item.id} item={item} />
          ))
        ) : (
          <div className="py-20 text-center opacity-30 flex flex-col items-center gap-4">
            <ShoppingBag size={64} className="text-indigo-200" />
            <p className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-400">Sin productos seleccionados</p>
          </div>
        )}
      </div>

      {/* Totals & Sticky Footer */}
      <div className="p-10 pt-6 bg-white border-t border-gray-50 mt-auto space-y-6">
        <div className="space-y-3">
          <div className="flex justify-between text-sm font-bold text-gray-400">
            <span>Subtotal</span>
            <span className="text-gray-900">${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="flex justify-between text-sm font-bold text-gray-400">
            <span>IVA (19%)</span>
            <span className="text-gray-900">${iva.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="flex justify-between items-center pt-4">
            <span className="text-2xl font-black text-gray-900 tracking-tighter">TOTAL</span>
            <span className="text-5xl font-black text-indigo-600 tracking-tighter animate-in fade-in zoom-in duration-500">
              ${finalTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <button
            onClick={handleCheckout}
            disabled={cart.length === 0 || loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-6 rounded-3xl font-black text-sm shadow-2xl shadow-indigo-100 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 cursor-pointer group"
          >
            {loading ? "Procesando..." : (
              <>
                Finalizar Venta
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
          
          <div className="flex justify-center">
            <button 
              onClick={handleClearCart}
              className="text-[10px] font-black text-gray-300 hover:text-red-500 uppercase tracking-[0.2rem] transition-all cursor-pointer"
            >
              Vaciar Carrito
            </button>
          </div>
        </div>
      </div>
      {showReceipt && <Receipt sale={lastSale} onClose={() => setShowReceipt(false)} />}
    </div>
  );
}

export default Cart;
