import { useState, useEffect } from "react";
import { useUserStore } from "../../../store/useUserStore";
import { User, Mail, Lock, Shield, X, AlertCircle } from "lucide-react";

function UserForm({ user, onClose }) {
  const { addUser, editUser } = useUserStore();

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    rol: "VENDEDOR",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        nombre: user.nombre || user.name || "",
        email: user.email || "",
        rol: user.rol || user.role || "VENDEDOR",
        password: "", // No prellenar password por seguridad
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (user) {
        await editUser(user.id, form);
      } else {
        await addUser(form);
      }
      onClose();
    } catch (error) {
      alert("Error al guardar usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl shadow-indigo-900/20 overflow-hidden animate-in zoom-in-95 duration-500">
        <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">
              {user ? "Configurar Miembro" : "Agregar Nuevo Usuario"}
            </h2>
            <p className="text-gray-400 text-xs font-bold leading-relaxed mt-1">
              Configure los detalles del perfil y permisos del nuevo integrante.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-300 hover:text-gray-600 hover:bg-white rounded-xl transition-all"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          <div className="space-y-6">
            {/* Nombre */}
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2.5 px-4">
                Nombre Completo
              </label>
              <div className="relative group">
                <input
                  name="nombre"
                  value={form.nombre}
                  placeholder="John Doe"
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 border border-transparent rounded-2xl pl-5 pr-12 py-4 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50/50 transition-all font-medium"
                />
                <span className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-300 group-focus-within:text-indigo-500 transition-colors">
                  <User size={18} />
                </span>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2.5 px-4">
                Correo Electrónico
              </label>
              <div className="relative group">
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  placeholder="john.doe@nx.erp"
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 border border-transparent rounded-2xl pl-5 pr-12 py-4 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50/50 transition-all font-medium"
                />
                <span className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-300 group-focus-within:text-indigo-500 transition-colors">
                  <Mail size={18} />
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Password */}
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2.5 px-4">
                  Contraseña
                </label>
                <div className="relative group">
                  <input
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    onChange={handleChange}
                    required={!user}
                    className="w-full bg-gray-50 border border-transparent rounded-2xl pl-5 pr-12 py-4 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50/50 transition-all font-medium"
                  />
                  <span className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-300 group-focus-within:text-indigo-500 transition-colors">
                     <Lock size={18} />
                  </span>
                </div>
              </div>

              {/* Rol */}
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2.5 px-4">
                  Rol de Acceso
                </label>
                <div className="relative group">
                  <select 
                    name="rol"
                    value={form.rol}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-transparent rounded-2xl pl-5 pr-12 py-4 text-sm text-gray-700 appearance-none focus:outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50/50 transition-all font-bold cursor-pointer"
                  >
                    <option value="ADMIN">Administrador</option>
                    <option value="VENDEDOR">Empleado</option>
                  </select>
                  <span className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-300 pointer-events-none group-focus-within:text-indigo-500 transition-colors">
                    <Shield size={18} />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
             <button
              type="button"
              onClick={onClose}
              className="text-xs font-black text-indigo-500 uppercase tracking-widest hover:text-indigo-700 transition-colors px-4"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-2xl font-black text-sm shadow-xl shadow-indigo-100 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 min-w-[160px] cursor-pointer"
            >
              {loading ? "Procesando..." : "Guardar Membrecía"}
            </button>
          </div>
        </form>

        <div className="bg-gray-50/50 p-6 flex items-center gap-3 border-t border-gray-50">
          <AlertCircle size={16} className="text-gray-400 flex-shrink-0" />
          <p className="text-[10px] font-bold text-gray-400 leading-tight">
            El usuario recibirá un correo de invitación para activar su cuenta y configurar sus credenciales de acceso.
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserForm;
