import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getInvoiceById } from "../services/invoiceService";
import { jsPDF } from "jspdf";
import { 
  Printer, 
  Download, 
  ChevronLeft, 
  User, 
  Truck, 
  CreditCard,
  CheckCircle2,
  Diamond
} from "lucide-react";

export default function InvoiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInvoice();
  }, [id]);

  const loadInvoice = async () => {
    try {
      const data = await getInvoiceById(id);
      setInvoice(data);
    } catch (error) {
      console.error("Error loading invoice detail", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!invoice) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;

    // Estilo y Cabecera
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(79, 70, 229); // Color Indigo
    doc.text("StitchLogic Enterprise", 20, 30);

    doc.setFontSize(10);
    doc.setTextColor(156, 163, 175); // Gray 400
    doc.text("INVOICE SYSTEM PRO v4.0", 20, 38);

    doc.setDrawColor(229, 231, 235); // Gray 200
    doc.line(20, 45, pageWidth - 20, 45);

    // Información de Factura
    doc.setFontSize(12);
    doc.setTextColor(31, 41, 55); // Gray 800
    doc.text(`Factura: #${invoice.id.toString().padStart(6, '0')}`, 20, 60);
    doc.text(`Fecha: ${new Date(invoice.createdAt).toLocaleDateString()}`, 20, 68);

    // Tabla de Productos
    doc.setFont("helvetica", "bold");
    doc.text("PRODUCTO", 20, 85);
    doc.text("CANT.", 120, 85);
    doc.text("P.UNIT", 150, 85);
    doc.text("TOTAL", 180, 85);

    doc.line(20, 88, pageWidth - 20, 88);
    doc.setFont("helvetica", "normal");

    let y = 98;
    invoice.detalles.forEach((item) => {
      doc.text(item.producto?.nombre || "Producto", 20, y);
      doc.text(item.cantidad.toString(), 120, y);
      doc.text(`$${item.precio.toFixed(2)}`, 150, y);
      doc.text(`$${(item.cantidad * item.precio).toFixed(2)}`, 180, y);
      y += 10;
    });

    // Totales
    doc.line(20, y + 5, pageWidth - 20, y + 5);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(`TOTAL FINAL: $${invoice.total.toFixed(2)}`, pageWidth - 80, y + 20);

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(156, 163, 175);
    doc.text("Gracias por su compra. StitchLogic Enterprise Tier.", 20, y + 40);

    doc.save(`factura-${invoice.id}.pdf`);
  };

  const handlePrint = () => window.print();

  if (loading) return (
     <div className="flex items-center justify-center min-h-[60vh] animate-pulse">
        <Diamond size={48} className="text-indigo-200 animate-spin" />
     </div>
  );
  
  if (!invoice) return (
     <div className="text-center py-20 bg-red-50 rounded-3xl border border-red-100">
        <p className="font-black text-red-500 uppercase tracking-widest">Factura no encontrada</p>
        <button onClick={() => navigate("/invoices")} className="mt-4 text-sm font-bold text-red-700 underline">Volver al listado</button>
     </div>
  );

  const subtotal = invoice.total / 1.15;
  const tax = invoice.total - subtotal;

  return (
    <div className="space-y-8 animate-in fade-in duration-1000 pb-20">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 px-4">
        <div className="space-y-1">
          <button 
            onClick={() => navigate("/invoices")}
            className="flex items-center gap-2 text-[10px] font-black text-indigo-400 uppercase tracking-widest hover:text-indigo-600 transition-all mb-2"
          >
            <ChevronLeft size={16} /> Volver a facturas
          </button>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Detalle de Comprobante</h1>
          <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em] px-1">Gestión Comercial • StitchFlow ERP</p>
        </div>

        <div className="flex gap-4">
           <button 
             onClick={handlePrint}
             className="bg-white border border-gray-100 px-6 py-4 rounded-2xl text-xs font-black text-gray-600 flex items-center gap-2 shadow-sm hover:bg-gray-50 transition-all cursor-pointer no-print"
           >
            <Printer size={18} />
            Imprimir
          </button>
          <button 
            onClick={handleDownloadPDF}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-indigo-100 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            <Download size={18} />
            Descargar PDF
          </button>
        </div>
      </div>

      {/* Main Invoice Card (StitchFlow High-Fidelity) */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-indigo-900/5 overflow-hidden flex flex-col p-8 md:p-16 space-y-16">
        
        {/* Header: Branding vs Metadata */}
        <div className="flex flex-col md:flex-row justify-between gap-12">
           <div className="flex items-start gap-6">
              <div className="h-16 w-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                 <Diamond size={32} />
              </div>
              <div className="space-y-1">
                 <h2 className="text-2xl font-black text-gray-900 tracking-tight">Indigo Ledger Clothiers</h2>
                 <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Official Invoice Representative</p>
                 <div className="pt-4 text-xs font-medium text-gray-400 max-w-xs leading-relaxed">
                    842 Sartorial Avenue, Atelier District<br />
                    London, UK EC1V 4PW<br />
                    <span className="text-indigo-400">contact@indigoledger.com</span>
                 </div>
              </div>
           </div>

           <div className="bg-gray-50/50 p-8 rounded-3xl border border-gray-50 min-w-[280px] space-y-6">
              <div className="flex justify-between items-start">
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Invoice Reference</p>
                 <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-tighter flex items-center gap-1">
                    <div className="w-1 h-1 bg-green-500 rounded-full" /> PAID
                 </span>
              </div>
              <h3 className="text-3xl font-black text-gray-900 tracking-tighter">INV-2026-{id.toString().padStart(3, '0')}</h3>
              
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1.5">Issue Date</p>
                    <p className="text-xs font-black text-gray-800">{new Date(invoice.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</p>
                 </div>
                 <div>
                    <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1.5">Due Date</p>
                    <p className="text-xs font-black text-gray-800">{new Date(new Date(invoice.createdAt).setDate(new Date(invoice.createdAt).getDate() + 15)).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Itemized Breakdown Table */}
        <div className="space-y-6">
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-2 mb-6 border-b border-gray-50 pb-4">Itemized Breakdown</p>
           <table className="w-full text-left">
              <thead>
                 <tr className="text-[9px] font-black text-gray-300 uppercase tracking-[0.15em]">
                    <th className="px-2 py-4">Item Description</th>
                    <th className="px-2 py-4 text-center">Qty</th>
                    <th className="px-2 py-4 text-right">Price</th>
                    <th className="px-2 py-4 text-right">Total</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                 {invoice.detalles?.map((item) => (
                    <tr key={item.id} className="group hover:bg-gray-50/30 transition-colors">
                       <td className="px-2 py-6">
                          <div className="flex items-center gap-6 text-left">
                             <div className="h-14 w-14 bg-gray-50 rounded-xl flex items-center justify-center grayscale opacity-40 group-hover:opacity-100 group-hover:grayscale-0 transition-all border border-gray-50">
                                📦
                             </div>
                             <div>
                                <p className="text-sm font-black text-gray-800 leading-none">{item.producto?.nombre || "Premium Cotton Shirt"}</p>
                                <p className="text-[10px] font-bold text-gray-400 mt-2 tracking-tight">Size: L • Color: Arctic White</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-2 py-6 text-center">
                          <span className="text-sm font-black text-gray-600">{item.cantidad.toString().padStart(2, '0')}</span>
                       </td>
                       <td className="px-2 py-6 text-right font-bold text-gray-500 text-sm">
                          ${item.precio.toFixed(2)}
                       </td>
                       <td className="px-2 py-6 text-right font-black text-gray-800 text-sm">
                          ${(item.precio * item.cantidad).toFixed(2)}
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>

        {/* Totals Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 border-t border-gray-100 pt-12">
            <div className="max-w-sm space-y-4">
               <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-2 px-1">Terms & Conditions</p>
               <p className="text-[10px] font-bold text-gray-400 leading-relaxed italic">
                  Returns are accepted within 30 days of the issue date with original tags attached. Please contact support for any billing discrepancies.
               </p>
            </div>

            <div className="min-w-[320px] space-y-4 text-left">
               <div className="flex justify-between text-sm font-bold text-gray-400 px-2">
                  <span>Subtotal</span>
                  <span className="text-gray-900 font-black">${subtotal.toFixed(2)}</span>
               </div>
               <div className="flex justify-between text-sm font-bold text-gray-400 px-2">
                  <span>Estimated Tax (15%)</span>
                  <span className="text-gray-900 font-black">${tax.toFixed(2)}</span>
               </div>
               <div className="flex justify-between items-end pt-8 px-2 border-t border-gray-50 mt-4">
                  <span className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.2em] leading-none mb-1">Grand Total</span>
                  <span className="text-5xl font-black text-indigo-600 tracking-tighter leading-none">${invoice.total.toFixed(2)}</span>
               </div>
            </div>
        </div>

        {/* Footer Grid (Customer & Method) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 border-t border-gray-50 no-print">
            <div className="bg-white p-8 rounded-3xl border border-gray-50/50 shadow-sm flex flex-col items-start gap-6 relative group overflow-hidden">
               <div className="absolute left-0 top-0 w-1 h-full bg-indigo-500" />
               <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest leading-none">Customer</p>
               <div>
                  <p className="text-lg font-black text-gray-800">Arthur Morgan</p>
                  <p className="text-xs font-bold text-gray-400 mt-1">arthur.m@outlaw.co</p>
                  <p className="text-[10px] font-bold text-indigo-300 uppercase mt-4 tracking-widest">Account ID: #AM-0982</p>
               </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-50/50 shadow-sm flex flex-col items-start gap-6 group overflow-hidden relative">
               <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest leading-none">Shipping Method</p>
               <div>
                  <div className="flex items-center gap-3 text-gray-800 mb-2">
                     <Truck size={20} className="text-indigo-600" />
                     <p className="text-base font-black">Priority Atelier Delivery</p>
                  </div>
                  <p className="text-xs font-bold text-gray-400">Estimated Arrival: Oct 28, 2024</p>
                  <span className="inline-block bg-indigo-50 text-indigo-600 px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest mt-4">
                     TRACKING: SF-90210
                  </span>
               </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-50/50 shadow-sm flex flex-col items-start gap-6 group overflow-hidden relative">
               <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest leading-none">Payment Source</p>
               <div className="space-y-4">
                  <div className="flex items-center gap-3">
                     <div className="bg-gray-100 p-2 rounded-lg text-gray-400">
                        <CreditCard size={18} />
                     </div>
                     <p className="text-base font-black text-gray-800">Corporate Card</p>
                  </div>
                  <p className="text-xs font-bold text-gray-400">Ending in •••• 9012</p>
                  <p className="text-[8px] font-black text-green-500 uppercase tracking-widest pt-2">Authorized on Oct 24</p>
               </div>
            </div>
        </div>
      </div>
    </div>
  );
}
