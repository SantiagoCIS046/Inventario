import { useEffect, useState, useMemo } from "react";
import { useUserStore } from "../../../store/useUserStore";
import UsersTable from "../components/UsersTable";
import UserForm from "../components/UserForm";
import { Users as UsersIcon, UserPlus, Shield, Activity, Key } from "lucide-react";

function UsersPage() {
  const { users, loadUsers, loading } = useUserStore();

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const stats = useMemo(() => {
    const total = users.length;
    const admins = users.filter(u => (u.rol || u.role).toLowerCase() === "admin").length;
    const active = users.length; // Por ahora todos están activos si no están eliminados
    return { total, admins, active };
  }, [users]);

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-10">
      {/* Header section with Stats */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            <UsersIcon className="text-indigo-600" size={32} />
            Gestión de Usuarios
          </h1>
          <p className="text-gray-500 font-medium mt-1">Configure los niveles de acceso y permisos de seguridad globales.</p>
        </div>

        <button
          onClick={() => {
            setSelectedUser(null);
            setShowModal(true);
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-2xl font-black text-sm flex items-center gap-2 shadow-xl shadow-indigo-200 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer self-start md:self-auto"
        >
          <UserPlus size={20} />
          Agregar Usuario
        </button>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-sm">
          <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] mb-4">Total Usuarios</p>
          <div className="flex items-end gap-3">
            <span className="text-4xl font-black text-gray-900 tracking-tighter">{stats.total}</span>
            <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded-full mb-1">+12%</span>
          </div>
        </div>

        <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Shield size={64} className="text-indigo-600" />
          </div>
          <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] mb-4">Administradores</p>
          <span className="text-4xl font-black text-gray-900 tracking-tighter">{stats.admins}</span>
        </div>

        <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Activity size={64} className="text-green-600" />
          </div>
          <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] mb-4">Activos Ahora</p>
          <span className="text-4xl font-black text-gray-900 tracking-tighter">{stats.active}</span>
        </div>

        <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-sm">
          <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] mb-4">Licencias Libres</p>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-black text-gray-900 tracking-tighter">15</span>
            <span className="text-[10px] font-bold text-gray-400 mb-1">de 1,300</span>
          </div>
        </div>
      </div>

      {/* Main Table Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-black text-gray-800">Lista de Miembros</h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-xs font-bold text-gray-500 bg-white border border-gray-100 rounded-xl hover:bg-gray-50 transition-all cursor-pointer">Filtros</button>
            <button className="px-4 py-2 text-xs font-bold text-gray-500 bg-white border border-gray-100 rounded-xl hover:bg-gray-50 transition-all cursor-pointer">Exportar</button>
          </div>
        </div>
        
        <UsersTable
          users={users}
          onEdit={(u) => {
            setSelectedUser(u);
            setShowModal(true);
          }}
        />
      </div>

      {showModal && (
        <UserForm
          user={selectedUser}
          onClose={() => {
            setShowModal(false);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
}

export default UsersPage;
