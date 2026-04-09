import { useState, useEffect } from "react";
import { X, Save, Camera, Barcode } from "lucide-react";
import { formatInputNumber, cleanFormattedNumber } from "../../../utils/formatters";

function ProductForm({ onClose, onSubmit, product }) {
  const [form, setForm] = useState({
    nombre: "",
    categoria: "",
    precio: "",
    stock: "",
    talla: "",
    codigoBarras: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product) {
      setForm({
        nombre: product.nombre || "",
        categoria: product.categoria || "",
        precio: formatInputNumber(product.precio) || "",
        stock: product.stock || "",
        talla: product.talla || "",
        codigoBarras: product.codigoBarras || "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    
    // Si es el campo de precio, aplicar formato de miles
    if (name === "precio") {
      value = formatInputNumber(value);
    }
    
    setForm({ ...form, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.nombre.trim()) newErrors.nombre = "El nombre es requerido";
    if (!form.categoria) newErrors.categoria = "Selecciona una categoría";
    if (!form.precio || Number(form.precio) <= 0) newErrors.precio = "Ingresa un precio válido";
    if (!form.stock || Number(form.stock) < 0) newErrors.stock = "Ingresa un stock válido";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSubmit({
      nombre: form.nombre,
      categoria: form.categoria,
      precio: cleanFormattedNumber(form.precio),
      stock: parseInt(form.stock),
      talla: form.talla,
      codigoBarras: form.codigoBarras || null,
    });
  };

  const categories = ["Camisas", "Oversize", "Jeans", "Cargo", "Pantalonetas", "Shorts", "Zapatos", "Gorras", "Polos", "Otros"];

  const TALLAS_SUPERIOR = ["S", "M", "L", "XL", "XXL"];
  const TALLAS_INFERIOR = ["28", "30", "32", "34", "36", "38", "40"];
  const TALLAS_CALZADO = ["34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45"];

  const getTallasDisponibles = () => {
    if (["Camisas", "Polos", "Oversize"].includes(form.categoria)) return TALLAS_SUPERIOR;
    if (["Jeans", "Cargo", "Pantalonetas", "Shorts"].includes(form.categoria)) return TALLAS_INFERIOR;
    if (form.categoria === "Zapatos") return TALLAS_CALZADO;
    return null;
  };

  const tallasDisponibles = getTallasDisponibles();

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 pb-2">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>

          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            {product ? "Editar Producto" : "Nuevo Producto"}
          </h2>
          <p className="text-sm text-gray-400 font-medium mt-1">
            {product ? "Modifica los detalles del producto existente." : "Ingresa los detalles para el nuevo registro de inventario."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-5 pt-4 space-y-3.5">
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.15em]">Product Name</label>
              <span className="text-[10px] font-black text-red-500 uppercase tracking-wider">Required</span>
            </div>
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Ej: Camisa Slim Fit Negra"
              className={`w-full bg-gray-50 border ${errors.nombre ? 'border-red-300 ring-2 ring-red-50' : 'border-gray-200'} rounded-xl px-4 py-2 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all`}
            />
            {errors.nombre && <p className="text-xs text-red-500 font-semibold mt-1.5 flex items-center gap-1">⊘ {errors.nombre}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.15em] mb-1">Código de Barras / Escáner</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-300">
                  <Barcode size={16} />
                </span>
                <input
                  name="codigoBarras"
                  value={form.codigoBarras}
                  onChange={handleChange}
                  placeholder="Escanee o escriba..."
                  className="w-full bg-indigo-50/50 border border-indigo-100 rounded-xl pl-10 pr-4 py-2 text-sm text-indigo-900 font-mono placeholder-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.15em] mb-1">Category</label>
              <select
                name="categoria"
                value={form.categoria}
                onChange={handleChange}
                className={`w-full bg-gray-50 border ${errors.categoria ? 'border-red-300' : 'border-gray-200'} rounded-xl px-4 py-2 text-sm text-gray-700 focus:outline-none focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-50 cursor-pointer appearance-none transition-all`}
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center" }}
              >
                <option value="">Seleccionar...</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.categoria && <p className="text-xs text-red-500 font-semibold mt-1.5 flex items-center gap-1">⊘ {errors.categoria}</p>}
            </div>
          </div>

          {tallasDisponibles && (
            <div className="animate-in slide-in-from-top-2 duration-300">
               <label className="block text-[10px] font-black text-blue-600 uppercase tracking-[0.15em] mb-2">Seleccionar Talla / Medida</label>
               <div className="flex flex-wrap gap-2">
                  {tallasDisponibles.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setForm({ ...form, talla: t })}
                      className={`h-8 min-w-[2.5rem] px-2 rounded-lg text-[10px] font-black transition-all border-2 ${
                        form.talla === t 
                          ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100" 
                          : "bg-white border-gray-100 text-gray-500 hover:border-blue-200"
                      }`}
                    >
                      {form.categoria === "Zapatos" ? `Talla ${t}` : t}
                    </button>
                  ))}
               </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.15em] mb-1">Price ($)</label>
              <input
                name="precio"
                type="text"
                inputMode="numeric"
                value={form.precio}
                onChange={handleChange}
                placeholder="0"
                className={`w-full bg-gray-50 border ${errors.precio ? 'border-red-300 ring-2 ring-red-50' : 'border-gray-200'} rounded-xl px-4 py-2 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all`}
              />
              {errors.precio && <p className="text-xs text-red-500 font-semibold mt-1.5 flex items-center gap-1">⊘ {errors.precio}</p>}
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.15em] mb-1">Stock</label>
              <input
                name="stock"
                type="number"
                min="0"
                value={form.stock}
                onChange={handleChange}
                placeholder="0"
                className={`w-full bg-gray-50 border ${errors.stock ? 'border-red-300 ring-2 ring-red-50' : 'border-gray-200'} rounded-xl px-4 py-2 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all`}
              />
              {errors.stock && <p className="text-xs text-red-500 font-semibold mt-1.5 flex items-center gap-1">⊘ {errors.stock}</p>}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.15em] mb-1">Product Image (Optional)</label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer group">
              <div className="w-8 h-8 mx-auto bg-blue-50 rounded-lg flex items-center justify-center text-blue-500 mb-2 group-hover:scale-110 transition-transform">
                <Camera size={18} />
              </div>
              <p className="text-xs text-gray-500 font-semibold">Click to upload or drag and drop</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">PNG, JPG or WEBP (Max. 5MB)</p>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-sm font-bold text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-blue-200 transition-all hover:scale-105 cursor-pointer"
            >
              <Save size={16} />
              {product ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
