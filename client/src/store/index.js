import { create } from "zustand";

const useStore = create((set) => ({
  user: null,
  
  // JSON.parse(localStorage.getItem("user")) || {},
  isLoading: false,

  theme: typeof window !== "undefined" && (localStorage.getItem("theme") ?? "light"),

  signIn: (data) => set((state) => ({ user: data })),

  setTheme: (value) => set({ theme: value }),

  signOut: () => set({ user: {} }),

  setIsLoading: (val) => set((state) => ({ isLoading: val })),
}));

export default useStore;
