import { useAuthStore } from "@/stores/auth";

import { createUser, loginUser } from "@/services/usersService";

export function useAuth() {
  const authStore = useAuthStore();

  async function login(dni, contrasenia) {
    const usuario = await loginUser({ dni, contrasenia });

    authStore.setUsuario(usuario);

    return usuario;
  }

  async function register(data) {
    const usuario = await createUser({
      ...data,
      contrasenia: data.contrasenia ?? data.password,
      rol: data.rol ?? "ciudadano",
    });

    authStore.setUsuario(usuario);

    return usuario;
  }

  function logout() {
    authStore.logout();
  }

  return {
    login,
    register,
    logout,
  };
}
