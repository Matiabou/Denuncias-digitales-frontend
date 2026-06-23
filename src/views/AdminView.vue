<template>
  <div class="denuncias-container">
    <header class="header">
      <div>
        <p class="eyebrow">Panel</p>
        <h1>Administración de denuncias</h1>
      </div>
      <div class="header-badge">{{ denuncias.length }} denuncias</div>
    </header>

    <div class="filtros card">
      <label for="tipo-filtro">Filtrar por tipo</label>
      <select id="tipo-filtro" v-model="tipo" @change="filtrar">
        <option value="">Todos</option>
        <option value="robo">Robo</option>
        <option value="hurto">Hurto</option>
        <option value="vandalismo">Vandalismo</option>
        <option value="fraude">Fraude</option>
        <option value="violencia">Violencia</option>
        <option value="estafa">Estafa</option>
        <option value="acoso">Acoso</option>
        <option value="otros">Otros</option>
      </select>
    </div>

    <p v-if="store.isLoading" class="empty">Cargando denuncias...</p>

    <p v-else-if="store.error" class="empty error">
      {{ store.error }}
    </p>

    <section v-else-if="denuncias.length" class="grid">
      <article class="card denuncia-card" v-for="denuncia in denuncias" :key="denuncia.id">
        <div class="meta">
          <span class="pill">{{ denuncia.tipo || denuncia.type || "Sin tipo" }}</span>
          <span class="pill muted">{{ denuncia.fecha || "Sin fecha" }}</span>
        </div>

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

        <div class="acciones">
          <button class="btn primary" @click="guardarEstado(denuncia)">
            Guardar estado
          </button>

          <RouterLink class="btn secondary" :to="`/denuncias/${denuncia.id}`">
            Ver detalle
          </RouterLink>
        </div>
      </article>
    </section>

    <div v-else class="empty-state card">
      <h3>No hay denuncias para este filtro</h3>
      <p>Probá con otro tipo o reseteá la búsqueda para ver todas.</p>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import DenunciaCard from "@/components/denuncias/DenunciaCard.vue";
import { useComplaintsStore } from "@/stores/complaints";
import { useAuthStore } from "@/stores/auth";
import { RouterLink } from "vue-router";

const store = useComplaintsStore();
const authStore = useAuthStore();

const tipo = ref("");

async function filtrar() {
  if (!tipo.value) {
    await store.loadComplaints(authStore.usuario);
  } else {
    await store.loadByType(tipo.value);
  }
}

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
    titulo: c.titulo || c.title || c.descripcion || "Sin título",
    descripcion: c.descripcion || c.description || "",
    fecha: c.fecha || c.date || "",
    estado: c.estado || c.status || "En revisión",
    ubicacion: c.ubicacion || c.address || c.direccion || "",
    tipo: c.tipo || c.type || "",
    ...c,
  })),
);
</script>

<style scoped>
.denuncias-container {
  max-width: 1100px;
  margin: 24px auto;
  padding: 0 16px 24px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.eyebrow {
  margin: 0 0 4px;
  color: #2b8aef;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.header h1 {
  margin: 0;
}

.header-badge {
  background: #ebf5ff;
  color: #1d4ed8;
  padding: 8px 12px;
  border-radius: 999px;
  font-weight: 600;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
}

.denuncia-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.pill {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 999px;
  background: #eef6ff;
  color: #1d4ed8;
  font-size: 0.8rem;
  font-weight: 600;
}

.pill.muted {
  background: #f3f4f6;
  color: #475569;
}

.acciones {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
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

.btn.secondary {
  background: #64748b;
  color: white;
  text-decoration: none;
  text-align: center;
}

.filtros {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 20px;
}

.filtros select {
  width: 250px;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.empty {
  text-align: center;
}

.empty-state {
  text-align: center;
  padding: 32px 16px;
}

.error {
  color: red;
}
</style>
