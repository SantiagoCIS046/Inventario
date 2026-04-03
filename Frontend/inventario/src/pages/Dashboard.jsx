import Card from "../components/Card";
import Table from "../components/Table";
import ProgressBar from "../components/ProgressBar";
import { 
  DollarSign, 
  Package, 
  ShoppingCart, 
  Plus, 
  Zap,
  TrendingUp,
  Book
} from "lucide-react";

function Dashboard() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header section with Action Button */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Visión General</h1>
          <p className="text-gray-500 font-medium mt-1">Análisis en tiempo real de tu inventario editorial y flujo comercial.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-black text-sm flex items-center gap-2 shadow-xl shadow-blue-200 transition-all hover:scale-105 cursor-pointer">
          <Plus size={20} />
          Nuevo Registro
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card 
          title="Total Sales" 
          value="$ 45,230" 
          extra="+12%" 
          icon={<DollarSign size={20} />} 
          color="blue"
        />
        <Card 
          title="Inventory Items" 
          value="1,240" 
          extra="15 low stock" 
          icon={<Package size={20} />} 
          color="indigo"
        />
        <Card 
          title="Recent Orders" 
          value="128" 
          extra="Registradas hoy" 
          icon={<ShoppingCart size={20} />} 
          color="purple"
        />
      </div>

      {/* Main Content Area: Table */}
      <Table />

      {/* Bottom Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Distribution Analysis */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600" />
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-black text-lg text-gray-800">Análisis de Distribución</h3>
            <Zap size={20} className="text-blue-500" />
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-400">
                <span>Ficción</span>
                <span>62%</span>
              </div>
              <ProgressBar value={62} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-400">
                <span>Académico</span>
                <span>28%</span>
              </div>
              <ProgressBar value={28} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-400">
                <span>Infantil</span>
                <span>10%</span>
              </div>
              <ProgressBar value={10} />
            </div>
          </div>
        </div>

        {/* Stock Optimization */}
        <div className="bg-blue-50/50 p-8 rounded-3xl border border-blue-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-black text-lg text-gray-800 mb-4">Optimización de Stock</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Basado en tendencias de ventas de la última temporada, recomendamos reabastecer 
              <span className="text-blue-600 font-bold"> 4 títulos clave </span> 
              antes de fin de mes para evitar roturas de stock.
            </p>
          </div>
          
          <button className="flex items-center gap-2 text-blue-600 font-black text-sm group cursor-pointer mt-8">
            Ver recomendaciones detalladas
            <TrendingUp size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
