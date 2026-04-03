import { create } from "zustand";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../modules/users/services/userService";

export const useUserStore = create((set, get) => ({
  users: [],
  loading: false,

  loadUsers: async () => {
    set({ loading: true });
    try {
      const res = await getUsers();
      set({ users: res.data || [], loading: false });
    } catch (error) {
      console.error("Error cargando usuarios", error);
      set({ loading: false });
    }
  },

  addUser: async (user) => {
    await createUser(user);
    get().loadUsers();
  },

  editUser: async (id, user) => {
    await updateUser(id, user);
    get().loadUsers();
  },

  removeUser: async (id) => {
    await deleteUser(id);
    get().loadUsers();
  },
}));
