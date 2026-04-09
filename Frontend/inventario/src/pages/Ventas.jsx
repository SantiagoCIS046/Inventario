import React, { useState, useCallback, useEffect } from 'react';
import api from '../api/axios';
import BuscadorProducto from '../components/BuscadorProducto';
import Carrito from '../components/Carrito';
import MetodoPago from '../components/MetodoPago';
import PagoEfectivo from '../components/PagoEfectivo';
import PagoTransferencia from '../components/PagoTransferencia';
import ResumenVenta from '../components/ResumenVenta';

const Ventas = () => {
  const [carrito, setCarrito] = useState([]);
  const [metodoPago, setMetodoPago] = useState('efectivo');
  const [dineroRecibido, setDineroRecibido] = useState(0);
  const [loading, setLoading] = useState(false);

  // Atajo Inteligente para el Escáner:
  // Si el usuario presiona una tecla y NO hay ningún input con foco,
  // enfocamos automáticamente el buscador.
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      const activeEl = document.activeElement;
      const isInput = ['INPUT', 'SELECT', 'TEXTAREA'].includes(activeEl?.tagName);
      
      // Si ya hay un input con foco, respetamos la escritura del usuario
      if (isInput) return;

      // Si es una tecla "de escritura" (alfanumérica), enfocamos el buscador
      if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
        const buscador = document.getElementById('buscador-pos');
        if (buscador) {
          buscador.focus();
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Sintetizar un "beep" para el escáner
  const playBeep = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); 
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.1);
    } catch (e) {
      console.error('Audio beep failed', e);
    }
  };

  const agregarAlCarrito = useCallback((producto) => {
    playBeep();
    setCarrito((prev) => {
      const existe = prev.find((p) => p.id === producto.id);
      if (existe) {
        return prev.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  }, []);

  const handleBuscar = async (query) => {
    try {
      let res;
      // Si el código es largo (típico de código de barras), buscamos por ese campo
      if (query.length > 5 && !isNaN(query)) {
        res = await api.get(`/products?codigoBarras=${query}`);
      } else if (!isNaN(query)) {
        res = await api.get(`/products/${query}`);
      } else {
        res = await api.get(`/products?nombre=${query}&limit=1`);
      }

      // El backend devuelve success(res, product) -> { data: product } (para ID)
      // O success(res, { data, meta }) -> { data: { data: [...], meta } } (para búsquedas)
      const responseBody = res.data.data;
      let producto = null;

      if (Array.isArray(responseBody)) {
        producto = responseBody[0];
      } else if (responseBody && Array.isArray(responseBody.data)) {
        producto = responseBody.data[0];
      } else {
        producto = responseBody;
      }

      if (producto && producto.id) {
        agregarAlCarrito(producto);
      } else {
        alert('Producto no encontrado');
      }
    } catch (error) {
      console.error('Error buscando producto:', error);
      alert('Error al buscar el producto');
    }
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      setCarrito(prev => prev.filter(p => p.id !== id));
      return;
    }
    setCarrito(prev => prev.map(p => p.id === id ? { ...p, cantidad: newQuantity } : p));
  };

  const removeFromCart = (id) => {
    setCarrito(prev => prev.filter(p => p.id !== id));
  };

  const subtotal = carrito.reduce((acc, p) => acc + Number(p.precio) * p.cantidad, 0);
  const pagoValido = metodoPago === 'transferencia' || dineroRecibido >= subtotal;

  const finalizarCompra = async () => {
    if (!pagoValido || carrito.length === 0) return;

    setLoading(true);
    try {
      const payload = {
        productos: carrito.map(p => ({
          productoId: p.id,
          cantidad: p.cantidad
        })),
        metodoPago
      };

      const res = await api.post('/ventas', payload);

      if (res.status === 201) {
        setCarrito([]);
        setMetodoPago('efectivo');
        setDineroRecibido(0);
        // Pequeña demora para permitir que React limpie la interfaz antes de bloquear con el alert
        setTimeout(() => alert('Venta realizada con éxito'), 10);
      }
    } catch (error) {
      console.error('Error al finalizar venta:', error);
      alert(error.response?.data?.error || 'Error al procesar la venta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen overflow-hidden p-4 bg-[#f8fafc] flex flex-col animate-in fade-in duration-700">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 max-w-[1600px] mx-auto w-full flex-1 overflow-hidden">
        
        {/* LADO IZQUIERDO: Buscador y Carrito */}
        <div className="xl:col-span-8 flex flex-col gap-6 h-full overflow-hidden pr-2">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center overflow-hidden shadow-lg shadow-indigo-100 p-1">
                <img src="/gestion-de-materiales.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tighter leading-none">
                Nexus POS <span className="text-indigo-600">.</span>
              </h1>
            </div>
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[.2em] ml-1">Terminal de Ventas #01</p>
          </div>

          <BuscadorProducto onBuscar={handleBuscar} />

          <div className="flex-1 flex flex-col overflow-hidden bg-white/40 backdrop-blur-sm rounded-[2rem] border border-white shadow-inner-light">
            <div className="flex items-center justify-between p-4 pb-2">
              <h2 className="text-sm font-black text-slate-800 tracking-tight flex items-center gap-2">
                <div className="w-1.5 h-4 bg-indigo-600 rounded-full" />
                Artículos en Venta
              </h2>
              <span className="bg-indigo-600 text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-indigo-100">
                {carrito.reduce((acc, p) => acc + p.cantidad, 0)} Items
              </span>
            </div>
            <div className="flex-1 overflow-y-auto p-4 pt-0 scroll-premium">
              <Carrito 
                items={carrito} 
                onUpdateQuantity={updateQuantity} 
                onRemove={removeFromCart} 
              />
            </div>
          </div>
        </div>

        {/* LADO DERECHO: Pago y Resumen */}
        <div className="xl:col-span-4 flex flex-col gap-4 h-full overflow-hidden">
          <div className="space-y-2">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Método de Pago</h3>
            <MetodoPago selected={metodoPago} onChange={setMetodoPago} />
          </div>

          <div className="flex-1 overflow-y-auto pr-2 scroll-premium">
            {metodoPago === 'efectivo' ? (
              <PagoEfectivo 
                total={subtotal} 
                dineroRecibido={dineroRecibido} 
                onChange={setDineroRecibido} 
              />
            ) : (
              <PagoTransferencia />
            )}
          </div>

          <div className="pt-2">
            <ResumenVenta 
              subtotal={subtotal} 
              onFinalizar={finalizarCompra} 
              disabled={!pagoValido || carrito.length === 0 || loading} 
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Ventas;
