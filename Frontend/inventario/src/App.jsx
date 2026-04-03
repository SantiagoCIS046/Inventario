import MainLayout from "./layouts/MainLayout";
import Card from "./components/Card";
import Table from "./components/Table";
import Badge from "./components/Badge";
import ProgressBar from "./components/ProgressBar";
import { 
  TrendingUp, 
  Users, 
  Package, 
  DollarSign,
  MoreVertical,
  Eye,
  Edit
} from "lucide-react";

function App() {
  const stats = [
    { title: "Ventas Totales", value: "$42,500.00", icon: <DollarSign size={22} />, trend: 12.5, color: "green" },
    { title: "Nuevos Clientes", value: "124", icon: <Users size={22} />, trend: 5.2, color: "blue" },
    { title: "Stock Bajo", value: "18", icon: <Package size={22} />, trend: -2.4, color: "amber" },
    { title: "Crecimiento", value: "24.5%", icon: <TrendingUp size={22} />, trend: 8.1, color: "indigo" },
  ];

  const recentProducts = [
    { id: 1, name: "Camisa Oxford Azul", category: "Ropa", price: 45.00, stock: 85, status: "En Stock" },
    { id: 2, name: "Pantalón Chino Beige", category: "Ropa", price: 55.50, stock: 12, status: "Stock Bajo" },
    { id: 3, name: "Zapatos Cuero Marrón", category: "Calzado", price: 89.99, stock: 5, status: "Crítico" },
    { id: 4, name: "Reloj Minimalista Noir", category: "Accesorios", price: 120.00, stock: 45, status: "En Stock" },
  ];

  const tableHeaders = ["Producto", "Categoría", "Precio", "Stock", "Estado", "Acciones"];

  return (
    <MainLayout>
      <div className="space-y-8 animate-in fade-in duration-700">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Dashboard Overview</h1>
            <p className="text-gray-500 mt-1 font-medium">Panel principal de gestión Epicure Pro</p>
          </div>
          <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 transition-all cursor-pointer">
            Generar Reporte
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <Card key={idx} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Productos Recientes</h2>
              <button className="text-blue-600 text-sm font-bold hover:underline cursor-pointer">Ver todos</button>
            </div>
            <Table 
              headers={tableHeaders}
              data={recentProducts}
              renderRow={(product) => (
                <>
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-800">{product.name}</div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">ID: {product.id}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-medium">{product.category}</td>
                  <td className="px-6 py-4 text-sm text-blue-600 font-black">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 w-48">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase">
                        <span>{product.stock} unidades</span>
                        <span>{Math.round((product.stock / 100) * 100)}%</span>
                      </div>
                      <ProgressBar 
                        progress={product.stock} 
                        color={product.stock < 10 ? "red" : product.stock < 30 ? "amber" : "blue"} 
                        size="sm" 
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={product.status === "Crítico" ? "error" : product.status === "Stock Bajo" ? "warning" : "success"}>
                      {product.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all cursor-pointer">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-all cursor-pointer">
                        <Edit size={16} />
                      </button>
                    </div>
                  </td>
                </>
              )}
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800">Metas de Ventas</h2>
            <div className="bg-white rounded-2xl border border-gray-100 p-8 space-y-8 shadow-sm">
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Meta Mensual</p>
                    <h4 className="text-3xl font-black text-gray-800 tracking-tighter mt-1">$50,000</h4>
                  </div>
                  <span className="text-blue-600 font-black text-xl italic">85%</span>
                </div>
                <ProgressBar progress={85} size="lg" color="blue" />
              </div>

              <div className="pt-6 border-t border-gray-50 flex gap-4 items-center">
                <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Ritmo Actual</p>
                  <p className="font-black text-gray-800">+$1,200 / hoy</p>
                </div>
              </div>

              <button className="w-full bg-gray-50 text-gray-600 py-3 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors cursor-pointer">
                Ver Detalles de Metas
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default App;
