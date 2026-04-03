import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { User, Lock, ArrowRight, AlertCircle, ShieldCheck, Eye, EyeOff, UserPlus } from "lucide-react";

function Login() {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isRegister) {
        await useAuthStore.getState().register(form.nombre, form.email, form.password);
      } else {
        await login(form.email, form.password);
      }
      navigate("/");
    } catch {
      setError(isRegister ? "Error al registrarse. Intenta con otro correo." : "Credenciales no reconocidas. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8faff] p-6 animate-in fade-in duration-700">
      <div className="mb-8 flex flex-col items-center">
        <div className="h-14 w-14 bg-[#4338ca] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-100 mb-4 animate-bounce">
          {isRegister ? <UserPlus size={32} /> : <ShieldCheck size={32} />}
        </div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">
          {isRegister ? "Crear Cuenta" : "Iniciar sesión"}
        </h1>
        <p className="text-gray-400 text-sm font-semibold mt-1">
          {isRegister ? "Únete a la arquitectura editorial" : "Gestiona la arquitectura de tu empresa"}
        </p>
      </div>

      <div className="w-full max-w-md">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-xl animate-in slide-in-from-top-2 duration-300 flex items-center gap-3">
            <AlertCircle className="text-red-500" size={20} />
            <p className="text-xs font-bold text-red-700 leading-tight">{error}</p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded-3xl border border-gray-100 shadow-2xl shadow-gray-200/50 space-y-6"
        >
          {isRegister && (
            <div className="animate-in slide-in-from-top-2 duration-300">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2.5">
                Nombre Completo
              </label>
              <div className="relative group">
                <input
                  name="nombre"
                  type="text"
                  placeholder="Juan Pérez"
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 border border-transparent rounded-2xl pl-5 pr-12 py-3.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50/50 transition-all font-medium"
                />
                <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-300 group-focus-within:text-indigo-500 transition-colors">
                  <User size={18} />
                </span>
              </div>
            </div>
          )}

          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2.5">
              Correo Electrónico
            </label>
            <div className="relative group">
              <input
                name="email"
                type="email"
                placeholder="correo@ejemplo.com"
                onChange={handleChange}
                required
                className="w-full bg-gray-50 border border-transparent rounded-2xl pl-5 pr-12 py-3.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50/50 transition-all font-medium"
              />
              <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-300 group-focus-within:text-indigo-500 transition-colors">
                <User size={18} />
              </span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Contraseña
              </label>
              {!isRegister && (
                <button type="button" className="text-[10px] font-black text-indigo-500 uppercase tracking-tighter hover:underline cursor-pointer">
                  ¿Olvidaste tu contraseña?
                </button>
              )}
            </div>
            <div className="relative group">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                onChange={handleChange}
                required
                className="w-full bg-gray-50 border border-transparent rounded-2xl pl-5 pr-12 py-3.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50/50 transition-all font-medium font-mono"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-300 hover:text-indigo-500 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 py-1">
            <input 
              type="checkbox" 
              id="remember"
              className="w-5 h-5 rounded-lg border-gray-200 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            />
            <label htmlFor="remember" className="text-xs font-bold text-gray-400 cursor-pointer hover:text-gray-600 transition-colors">
              Recordarme en este dispositivo
            </label>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#4338ca] hover:bg-[#3730a3] text-white py-4 rounded-3xl font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-indigo-200 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (isRegister ? "Creando cuenta..." : "Iniciando sesión...") : (isRegister ? "Registrarse" : "Ingresar")}
            {!loading && <ArrowRight size={18} />}
          </button>

          <p className="text-center text-xs font-bold text-gray-400 pt-4">
            {isRegister ? "¿Ya tienes una cuenta?" : "¿Nuevo en la plataforma?"}{" "}
            <button 
              type="button" 
              onClick={() => { setIsRegister(!isRegister); setError(""); }}
              className="text-indigo-500 hover:underline cursor-pointer"
            >
              {isRegister ? "Inicia sesión aquí" : "Crea una cuenta corporativa"}
            </button>
          </p>
        </form>
      </div>

      <div className="mt-12 text-center">
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-10">Editorial Architect ERP • V4.2.0</p>
        
        <div className="flex items-center gap-8 text-[11px] font-bold text-gray-400 mb-8">
          <span className="cursor-pointer hover:text-gray-600 transition-colors">Privacy Policy</span>
          <span className="cursor-pointer hover:text-gray-600 transition-colors">Terms of Service</span>
          <span className="cursor-pointer hover:text-gray-600 transition-colors">Support</span>
        </div>

        <p className="text-[11px] text-gray-400">© 2026 Editorial Architect ERP. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Login;
