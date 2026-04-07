import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { User, Lock, ArrowRight, AlertCircle, ShieldCheck, Eye, EyeOff, UserPlus } from "lucide-react";
import bgImage from "../assets/bg_login.png";
import Alert from "../components/Alert";

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
    <div className="min-h-screen flex flex-col items-center justify-center p-6 animate-in fade-in duration-700 relative overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 z-0 bg-black/40" />

      <div className="mb-4 flex flex-col items-center relative z-10">
        <div className="h-14 w-14 bg-[#4338ca] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-500/40 mb-2 animate-bounce">
          {isRegister ? <UserPlus size={32} /> : <ShieldCheck size={32} />}
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight drop-shadow-lg">
          {isRegister ? "Crear Cuenta" : "Iniciar sesión"}
        </h1>
        <p className="text-gray-200 text-sm font-semibold mt-1 drop-shadow-md">
          {isRegister ? "Únete a la arquitectura editorial" : "Gestiona la arquitectura de tu empresa"}
        </p>
      </div>

      <div className="w-full max-w-sm relative z-10">
        <Alert type="danger" message={error} className="mb-4" />

        <form
          onSubmit={handleSubmit}
          className="bg-black/20 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl shadow-black/40 space-y-4"
        >
          {isRegister && (
            <div className="animate-in slide-in-from-top-2 duration-300">
              <label className="block text-[10px] font-black text-gray-200 uppercase tracking-widest mb-2.5">
                Nombre Completo
              </label>
              <div className="relative group">
                <input
                  name="nombre"
                  type="text"
                  placeholder="Juan Pérez"
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-white/5 rounded-2xl pl-4 pr-10 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:bg-white/20 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/20 transition-all font-medium"
                />
                <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 group-focus-within:text-white transition-colors">
                  <User size={18} />
                </span>
              </div>
            </div>
          )}

          <div>
            <label className="block text-[10px] font-black text-gray-200 uppercase tracking-widest mb-2.5">
              Correo Electrónico
            </label>
            <div className="relative group">
              <input
                name="email"
                type="email"
                placeholder="correo@ejemplo.com"
                onChange={handleChange}
                className="w-full bg-white/10 border border-white/5 rounded-2xl pl-4 pr-10 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:bg-white/20 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/20 transition-all font-medium"
              />
              <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 group-focus-within:text-white transition-colors">
                <User size={18} />
              </span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2.5">
              <label className="text-[10px] font-black text-gray-200 uppercase tracking-widest">
                Contraseña
              </label>
              {!isRegister && (
                <button type="button" className="text-[10px] font-black text-indigo-300 uppercase tracking-tighter hover:underline cursor-pointer transition-colors">
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
                className="w-full bg-white/10 border border-white/5 rounded-2xl pl-4 pr-10 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:bg-white/20 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/20 transition-all font-medium font-mono tracking-widest"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 py-1">
            <input 
              type="checkbox" 
              id="remember"
              className="w-4 h-4 rounded border-white/20 bg-white/10 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            />
            <label htmlFor="remember" className="text-xs font-bold text-gray-300 cursor-pointer hover:text-white transition-colors">
              Recordarme en este dispositivo
            </label>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (isRegister ? "Creando cuenta..." : "Iniciando sesión...") : (isRegister ? "Registrarse" : "Ingresar")}
            {!loading && <ArrowRight size={18} />}
          </button>

          <p className="text-center text-xs font-bold text-gray-400 pt-2">
            {isRegister ? "¿Ya tienes una cuenta?" : "¿Nuevo en la plataforma?"}{" "}
            <button 
              type="button" 
              onClick={() => { setIsRegister(!isRegister); setError(""); }}
              className="text-indigo-300 hover:underline cursor-pointer"
            >
              {isRegister ? "Inicia sesión aquí" : "Crea una cuenta corporativa"}
            </button>
          </p>
        </form>
      </div>


    </div>
  );
}

export default Login;
