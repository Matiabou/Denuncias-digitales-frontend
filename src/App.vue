<script setup>
import { storeToRefs } from "pinia";
import { RouterView, RouterLink, useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const { estaAutenticado } = storeToRefs(authStore);

function cerrarSesion() {
  authStore.logout();
  router.push("/");
}
</script>

<template>
  <div class="layout">
    <aside v-if="estaAutenticado && route.path !== '/login'" class="sidebar">
      <RouterLink to="/denuncias"> Mis denuncias </RouterLink>

      <RouterLink to="/datos-personales"> Datos personales </RouterLink>
      <RouterLink v-if="authStore.esAdmin" to="/admin">
        Administración
      </RouterLink>

      <button @click="cerrarSesion">Cerrar sesión</button>
    </aside>

    <main class="contenido">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 240px;
  background: #1e293b;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 15px;
}

.sidebar h2 {
  margin-bottom: 20px;
}

.sidebar a {
  color: white;
  text-decoration: none;
  padding: 10px;
  border-radius: 6px;
}

.sidebar a:hover,
.sidebar .router-link-active {
  background: #3b82f6;
}

.sidebar button {
  margin-top: auto;
  padding: 10px;
  border: none;
  background: #ef4444;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}

.sidebar button:hover {
  background: #dc2626;
}

.contenido {
  flex: 1;
  padding: 30px;
  background: #f5f5f5;
}
</style>
