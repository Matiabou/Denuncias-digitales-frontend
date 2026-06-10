import { useAuthStore } from "@/stores/auth";
import users from "@/mocks/users.json";

export function useAuth() {
  const authStore = useAuthStore();

  function login(email, password) {
    const usuario = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!usuario) {
      return false;
    }

    authStore.setUsuario(usuario);

    return true;
  }

  function logout() {
    authStore.logout();
  }

  return {
    login,
    logout,
  };
}
