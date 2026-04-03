import { useSalesStore } from "../../../store/useSalesStore";
import { Minus, Plus, X } from "lucide-react";

function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useSalesStore();

  return (
    <div className="bg-white p-4 rounded-3xl border border-gray-50 flex items-center gap-5 group animate-in slide-in-from-right duration-300 shadow-sm hover:shadow-md transition-shadow">
      {/* Thumbnail */}
      <div className="h-20 w-20 bg-indigo-900 rounded-2xl flex-shrink-0 flex items-center justify-center overflow-hidden relative border border-indigo-800">
         <div className="absolute inset-0 bg-gradient-to-br from-indigo-800 to-indigo-950 opacity-50" />
         <span className="text-4xl grayscale opacity-30 group-hover:scale-110 transition-transform duration-500 z-10">👕</span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-black text-gray-800 truncate leading-none mb-1">{item.nombre}</h4>
        <p className="text-[10px] font-bold text-gray-400 tracking-tight">
          ${(item.precioVenta || item.price).toLocaleString()}
        </p>
        
        {/* Quantity Controls */}
        <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-1.5 border border-gray-100 mt-3 w-fit">
          <button 
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-indigo-600 transition-all cursor-pointer"
          >
            <Minus size={10} />
          </button>
          <span className="text-[11px] font-black text-gray-700 min-w-[14px] text-center">{item.quantity}</span>
          <button 
             onClick={() => updateQuantity(item.id, item.quantity + 1)}
             className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-indigo-600 transition-all cursor-pointer"
          >
            <Plus size={10} />
          </button>
        </div>
      </div>

      {/* Line Total and Remove */}
      <div className="flex flex-col items-end justify-between h-full py-1">
         <p className="text-[13px] font-black text-indigo-600 tracking-tighter">
            ${((item.precioVenta || item.price) * item.quantity).toLocaleString()}
         </p>
         <button 
            onClick={() => removeFromCart(item.id)}
            className="text-gray-200 hover:text-red-500 transition-all cursor-pointer p-1"
            title="Eliminar"
          >
            <Trash2 size={16} />
          </button>
      </div>
    </div>
  );
}

export default CartItem;
