<template>
  <div class="denuncias-container">
    <header class="header">
      <h1>Administración de denuncias</h1>
    </header>

    <p v-if="store.isLoading" class="empty">Cargando denuncias...</p>

    <p v-else-if="store.error" class="empty error">
      {{ store.error }}
    </p>

    <section class="grid">
      <article class="card" v-for="denuncia in denuncias" :key="denuncia.id">
        <DenunciaCard :denuncia="denuncia" />

        <div class="estado-container">
          <label>Estado</label>

          <select v-model="denuncia.estado">
            <option>En revisión</option>
            <option>En investigación</option>
            <option>Resuelta</option>
            <option>Rechazada</option>
          </select>
        </div>

        <button class="btn primary" @click="guardarEstado(denuncia)">
          Guardar estado
        </button>
      </article>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import DenunciaCard from "@/components/denuncias/DenunciaCard.vue";
import { useComplaintsStore } from "@/stores/complaints";
import { useAuthStore } from "@/stores/auth";

const store = useComplaintsStore();
const authStore = useAuthStore();

async function loadData() {
  await store.loadComplaints(authStore.usuario);
}

async function guardarEstado(denuncia) {
  try {
    await store.update(denuncia.id, denuncia, authStore.usuario);

    alert("Estado actualizado correctamente");
  } catch (error) {
    alert(error.message);
  }
}

onMounted(loadData);

const denuncias = computed(() =>
  store.complaints.map((c) => ({
    id: c.id,
    titulo: c.descripcion ?? "Sin descripción",
    descripcion: c.descripcion ?? "",
    fecha: c.fecha ?? "",
    estado: c.estado ?? "En revisión",
    ubicacion: c.ubicacion ?? "",
    ...c,
  })),
);
</script>

<style scoped>
.denuncias-container {
  max-width: 1100px;
  margin: 24px auto;
}

.header {
  margin-bottom: 20px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
}

.card {
  background: white;
  border-radius: 10px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.estado-container {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.estado-container select {
  padding: 8px;
}

.btn {
  border: none;
  cursor: pointer;
  padding: 10px;
  border-radius: 6px;
}

.btn.primary {
  background: #2b8aef;
  color: white;
}

.empty {
  text-align: center;
}

.error {
  color: red;
}
</style>
