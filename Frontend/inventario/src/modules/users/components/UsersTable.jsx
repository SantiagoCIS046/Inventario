import { useUserStore } from "../../../store/useUserStore";
import { Edit3, Trash2, Mail, ShieldCheck, ChevronRight, ChevronLeft } from "lucide-react";

function UsersTable({ users, onEdit }) {
  const { removeUser } = useUserStore();

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
      removeUser(id);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl shadow-gray-200/50 overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-50/50 border-b border-gray-50">
            <th className="px-8 py-5 text-[10px] font-black text-gray-600 uppercase tracking-widest">Nombre</th>
            <th className="px-8 py-5 text-[10px] font-black text-gray-600 uppercase tracking-widest">Email</th>
            <th className="px-8 py-5 text-[10px] font-black text-gray-600 uppercase tracking-widest">Rol</th>
            <th className="px-8 py-5 text-[10px] font-black text-gray-600 uppercase tracking-widest text-center">Estado</th>
            <th className="px-8 py-5 text-[10px] font-black text-gray-600 uppercase tracking-widest text-right">Acciones</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-50">
          {users.map((u) => (
            <tr key={u.id} className="group hover:bg-gray-50/50 transition-all duration-300">
              <td className="px-8 py-5">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-black text-xs border-2 border-white shadow-sm overflow-hidden">
                    <img src={`https://ui-avatars.com/api/?name=${u.nombre}&background=e0e7ff&color=4338ca`} alt={u.nombre} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm leading-tight">{u.nombre}</p>
                    <p className="text-[10px] font-bold text-gray-600 tracking-tighter mt-0.5">ID: #USER-{u.id}</p>
                  </div>
                </div>
              </td>
              <td className="px-8 py-5 font-bold text-gray-500 text-sm">{u.email}</td>
              <td className="px-8 py-5 text-sm">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                  (u.rol || u.role).toLowerCase() === "admin" 
                    ? "bg-indigo-50 text-indigo-600 border border-indigo-100" 
                    : "bg-gray-50 text-gray-500 border border-gray-100"
                }`}>
                  {u.rol || u.role}
                </span>
              </td>
              <td className="px-8 py-5 text-center">
                <div className="flex items-center justify-center gap-1.5">
                  <div className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black text-green-700 uppercase tracking-tighter">Activo</span>
                </div>
              </td>

              <td className="px-8 py-5 text-right">
                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => onEdit(u)}
                    className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-gray-100"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(u.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-gray-100"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Footer */}
      <div className="px-8 py-4 bg-gray-50/50 flex justify-between items-center border-t border-gray-50">
        <p className="text-[11px] font-bold text-gray-600 uppercase tracking-widest">Mostrando {users.length} de {users.length} usuarios</p>
        <div className="flex gap-2">
          <button className="p-1.5 bg-white border border-gray-100 rounded-lg text-gray-400 hover:text-indigo-600 transition-all cursor-pointer">
            <ChevronLeft size={16} />
          </button>
          <div className="flex gap-1.5 px-2">
            {[1, 2, 3].map(n => (
              <button key={n} className={`w-8 h-8 rounded-lg text-xs font-black transition-all ${n === 1 ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" : "bg-white border border-gray-100 text-gray-400 hover:text-indigo-600"}`}>
                {n}
              </button>
            ))}
          </div>
          <button className="p-1.5 bg-white border border-gray-100 rounded-lg text-gray-400 hover:text-indigo-600 transition-all cursor-pointer">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default UsersTable;
