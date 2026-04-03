import { create } from "zustand";
import { createSale, getSales, getSaleById } from "../modules/sales/services/salesService";

export const useSalesStore = create((set, get) => ({
  cart: [],
  total: 0,
  sales: [],
  selectedSale: null,

  addToCart: (product) => {
    const existing = get().cart.find(p => p.id === product.id);

    let newCart;

    if (existing) {
      newCart = get().cart.map(p =>
        p.id === product.id
          ? { ...p, quantity: p.quantity + 1 }
          : p
      );
    } else {
      newCart = [...get().cart, { ...product, quantity: 1 }];
    }

    set({ cart: newCart });
    get().calculateTotal();
  },

  removeFromCart: (id) => {
    const newCart = get().cart.filter(p => p.id !== id);
    set({ cart: newCart });
    get().calculateTotal();
  },

  updateQuantity: (id, quantity) => {
    if (quantity < 1) return;
    const newCart = get().cart.map(p =>
      p.id === id ? { ...p, quantity } : p
    );
    set({ cart: newCart });
    get().calculateTotal();
  },

  calculateTotal: () => {
    const subtotal = get().cart.reduce(
      (acc, p) => acc + (p.precioVenta || p.price) * p.quantity,
      0
    );
    set({ total: subtotal });
  },

  checkout: async () => {
    const { cart, total } = get();
    if (cart.length === 0) return;

    try {
      const payload = {
        items: cart.map(p => ({
          productoId: p.id,
          cantidad: p.quantity,
          precio: p.precioVenta || p.price,
        })),
        total,
      };

      await createSale(payload);
      set({ cart: [], total: 0 });
      return true;
    } catch (error) {
      console.error("Error en checkout", error);
      throw error;
    }
  },

  loadSales: async () => {
    try {
      const res = await getSales();
      set({ sales: res.data?.data || res.data || [] });
    } catch (error) {
      console.error("Error cargando historial", error);
    }
  },

  loadSaleDetail: async (id) => {
    try {
      const res = await getSaleById(id);
      set({ selectedSale: res.data || res });
    } catch (error) {
      console.error("Error cargando detalle", error);
    }
  },
}));
