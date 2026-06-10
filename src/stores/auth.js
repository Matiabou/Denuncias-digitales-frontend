import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    usuario: JSON.parse(localStorage.getItem("usuario")) || null,
  }),

  getters: {
    estaAutenticado: (state) => state.usuario !== null,

    esAdmin: (state) => state.usuario?.rol === "admin",
  },

  actions: {
    setUsuario(usuario) {
      this.usuario = usuario;

      localStorage.setItem("usuario", JSON.stringify(usuario));
    },

    logout() {
      this.usuario = null;

      localStorage.removeItem("usuario");
    },
  },
});
