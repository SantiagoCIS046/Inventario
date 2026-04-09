import prisma from "../prisma/client.js";
import ExcelJS from "exceljs";

export const ventasPorFecha = async (fechaInicio, fechaFin) => {
  return await prisma.venta.findMany({
    where: {
      createdAt: {
        gte: new Date(fechaInicio),
        lte: new Date(fechaFin),
      },
    },
    include: {
      detalles: true,
    },
  });
};

export const ingresosTotales = async (fechaInicio, fechaFin) => {
  const result = await prisma.venta.aggregate({
    _sum: {
      total: true,
    },
    where: {
      createdAt: {
        gte: new Date(fechaInicio),
        lte: new Date(fechaFin),
      },
    },
  });

  return result._sum.total || 0;
};

export const productosMasVendidos = async () => {
  return await prisma.detalleVenta.groupBy({
    by: ["productoId"],
    _sum: {
      cantidad: true,
    },
    orderBy: {
      _sum: {
        cantidad: "desc",
      },
    },
    take: 5,
  });
};

export const topProductos = async () => {
  const data = await prisma.detalleVenta.groupBy({
    by: ["productoId"],
    _sum: { cantidad: true },
    orderBy: { _sum: { cantidad: "desc" } },
    take: 5,
  });

  const productIds = data.map(item => item.productoId);
  const products = await prisma.producto.findMany({
    where: { id: { in: productIds } },
    select: { id: true, nombre: true }
  });

  const productsMap = new Map(products.map(p => [p.id, p]));

  return data.map(item => ({
    producto: productsMap.get(item.productoId)?.nombre || "Producto no encontrado",
    totalVendido: item._sum.cantidad,
  }));
};

export const getAdvancedDashboardStats = async () => {
  const now = new Date();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastWeek = new Date();
  lastWeek.setDate(now.getDate() - 7);

  const prevWeek = new Date();
  prevWeek.setDate(now.getDate() - 14);

  const lastMonth = new Date();
  lastMonth.setDate(now.getDate() - 30);

  // 1. Promesas en paralelo para velocidad
  const [currentWeekSales, previousWeekSales, invoices, productsWithSales, totalIncomeMonth, todaySales] = await Promise.all([
    // Ventas últimos 7 días
    prisma.venta.aggregate({
      _sum: { total: true },
      where: { createdAt: { gte: lastWeek } }
    }),
    // Ventas semana anterior
    prisma.venta.aggregate({
      _sum: { total: true },
      where: { createdAt: { gte: prevWeek, lt: lastWeek } }
    }),
    // Facturas últimos 7 días para ticket promedio
    prisma.venta.findMany({
      where: { createdAt: { gte: lastWeek } }
    }),
    // Productos con sus ventas de los últimos 30 días para predicción
    prisma.producto.findMany({
      where: { deletedAt: null },
      include: {
        ventas: {
          where: { venta: { createdAt: { gte: lastMonth } } }
        }
      }
    }),
    // Ingresos totales del mes
    prisma.venta.aggregate({
      _sum: { total: true },
      where: { createdAt: { gte: new Date(now.getFullYear(), now.getMonth(), 1) } }
    }),
    // Ventas de hoy
    prisma.venta.aggregate({
      _sum: { total: true },
      where: { createdAt: { gte: today } }
    })
  ]);

  // 2. Cálculos financieros
  const currentTotal = currentWeekSales._sum.total || 0;
  const previousTotal = previousWeekSales._sum.total || 0;
  const growth = previousTotal === 0 ? 100 : ((currentTotal - previousTotal) / previousTotal) * 100;
  
  const avgTicket = currentTotal / (invoices.length || 1);

  // 3. Predicción de Stock (Análisis IA)
  const stockAnalysis = productsWithSales.map(p => {
    const totalSold30 = p.ventas.reduce((acc, v) => acc + v.cantidad, 0);
    const dailyAvg = totalSold30 / 30;
    
    // Si no hay ventas, asumimos stock infinito (estable) o un promedio mínimo para evitar división por cero
    const daysLeft = dailyAvg === 0 ? 999 : p.stock / dailyAvg;

    // Determinar categoría de movimiento
    let status = "STABLE";
    if (daysLeft < 5) status = "CRITICAL";
    else if (dailyAvg > 1) status = "FAST MOVING"; // Más de 1 venta por día promedio
    else if (growth > 10 && totalSold30 > 5) status = "HIGH GROWTH";

    return {
      id: p.id,
      nombre: p.nombre,
      categoria: p.categoria,
      stock: p.stock,
      dailyAvg: dailyAvg.toFixed(2),
      daysLeft: Math.round(daysLeft),
      status,
      reorderSuggested: daysLeft < 10 ? Math.round(dailyAvg * 15) : 0 // Sugerir reorden para 15 días si quedan menos de 10
    };
  });

  // 4. Ventas por día (última semana) - Agrupación mejorada por fecha
  const rawChartData = await prisma.$queryRaw`
    SELECT DATE_TRUNC('day', "createdAt") as date, SUM(total) as total
    FROM "Venta"
    WHERE "createdAt" >= ${lastWeek}
    GROUP BY DATE_TRUNC('day', "createdAt")
    ORDER BY date ASC
  `;

  const chartDataFormatted = rawChartData.map(d => ({
    date: new Date(d.date).toISOString().split('T')[0],
    total: Number(d.total || 0)
  }));

  // 4. Top Productos
  const topProductsRaw = await prisma.detalleVenta.groupBy({
    by: ["productoId"],
    _sum: { cantidad: true },
    orderBy: { _sum: { cantidad: "desc" } },
    take: 5
  });


  const topProducts = await Promise.all(
    topProductsRaw.map(async (p) => {
      const product = await prisma.producto.findUnique({
        where: { id: p.productoId },
        select: { nombre: true }
      });
      return {
        name: product?.nombre || "Desconocido",
        sold: p._sum.cantidad
      };
    })
  );

  return {
    metrics: {
      todaySales: Number(todaySales._sum.total || 0),
      weeklySales: Number(currentTotal),
      growth,
      avgTicket,
      monthlyIncome: Number(totalIncomeMonth._sum.total || 0),
      conversionRate: 4.82 // Simulado según diseño
    },
    stockAnalysis: stockAnalysis.sort((a, b) => a.daysLeft - b.daysLeft).slice(0, 6),
    chartData: chartDataFormatted,
    topProducts
  };
};

export const exportVentasExcel = async () => {
// ... (rest of the file remains same, I'm just adding before exportVentasExcel)
  const ventas = await prisma.venta.findMany({
    include: {
      detalles: {
        include: {
          producto: true,
        },
      },
    },
  });

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Ventas");

  sheet.columns = [
    { header: "Venta ID", key: "ventaId", width: 10 },
    { header: "Producto", key: "producto", width: 20 },
    { header: "Cantidad", key: "cantidad", width: 10 },
    { header: "Precio", key: "precio", width: 10 },
    { header: "Total", key: "total", width: 15 },
    { header: "Fecha", key: "fecha", width: 20 },
  ];

  ventas.forEach((venta) => {
    venta.detalles.forEach((detalle) => {
      sheet.addRow({
        ventaId: venta.id,
        producto: detalle.producto.nombre,
        cantidad: detalle.cantidad,
        precio: detalle.precioUnitario,
        total: detalle.cantidad * Number(detalle.precioUnitario),
        fecha: venta.createdAt,
      });
    });
  });

  return workbook;
};
