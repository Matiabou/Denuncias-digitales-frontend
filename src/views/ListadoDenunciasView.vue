<template>
  <div class="denuncias-container">
    <header class="header">
      <h1>Mis Denuncias</h1>
      <router-link class="btn primary" to="/denuncias/crear">Crear denuncia</router-link>
    </header>

    <p v-if="store.isLoading" class="empty">
      Cargando denuncias...
    </p>

    <p v-else-if="store.error" class="empty error">
      {{ store.error }}
    </p>

    <section class="grid">
      <article class="card" v-for="denuncia in denuncias" :key="denuncia.id">
        <DenunciaCard :denuncia="denuncia" />

        <div class="card-actions">
          <router-link class="btn" :to="`/denuncias/${denuncia.id}/editar`">Editar</router-link>
        </div>
      </article>
    </section>

    <p v-if="denuncias.length === 0" class="empty">
      No hay denuncias aún. Usa "Crear denuncia" para agregar una.
    </p>
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from "vue";
import DenunciaCard from "@/components/denuncias/DenunciaCard.vue";
import { useComplaintsStore } from "@/stores/complaints";
import { useAuthStore } from "@/stores/auth";

const store = useComplaintsStore();
const authStore = useAuthStore();

async function loadData() {
  await store.loadComplaints(authStore.usuario);
}

onMounted(loadData);

watch(
  () => authStore.usuario,
  () => {
    loadData();
  },
);


const denuncias = computed(() =>
  store.complaints.map((c) => ({
    id: c.id,
    titulo: c.title ?? c.titulo ?? "Sin título",
    descripcion: c.description ?? c.descripcion ?? "",
    fecha: c.date ?? c.fecha ?? "",
    estado: c.estado ?? "En revisión",
    _raw: c,
  }))
);
</script>

<style scoped>
.denuncias-container {
  max-width: 980px;
  margin: 24px auto;
  padding: 0 16px;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}
.card {
  display: flex;
  flex-direction: column;
  background: var(--card-bg, #fff);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  padding: 12px;
}
.card-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
}
.btn {
  display: inline-block;
  padding: 8px 12px;
  border-radius: 6px;
  text-decoration: none;
  color: var(--btn-color, #333);
  background: var(--btn-bg, #efefef);
  border: 1px solid rgba(0, 0, 0, 0.06);
}
.btn.primary {
  background: #2b8aef;
  color: white;
  border-color: rgba(0, 0, 0, 0.08);
}
.empty {
  text-align: center;
  color: #666;
  margin-top: 20px;
}
.error {
  color: #b42318;
}
</style>
