<template>
  <div class="denuncias-container">
    <header class="header">
      <h1>Mis Denuncias</h1>
      <router-link class="btn primary" to="/denuncias/crear"
        >Crear denuncia</router-link
      >
    </header>

    <p v-if="store.isLoading" class="empty">
      Cargando denuncias...
    </p>

    <p v-else-if="store.error" class="empty error">
      {{ store.error }}
    </p>

    <section class="table-wrap">
      <p v-if="denuncias.length === 0" class="empty">
        No hay denuncias aún. Usa "Crear denuncia" para agregar una.
      </p>

      <table v-else class="denuncias-table">
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Ubicación</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="denuncia in denuncias" :key="denuncia.id">
            <td class="descripcion">{{ denuncia.descripcion || denuncia.titulo }}</td>
            <td>{{ denuncia.ubicacion }}</td>
            <td>{{ denuncia.fecha }}</td>
            <td>
              <span :class="['status', denuncia.estado.toLowerCase().replace(/\s+/g, '-') ]">{{ denuncia.estado }}</span>
            </td>
            <td class="actions">
              <router-link class="btn primary small" :to="`/denuncias/${denuncia.id}`">Detalle</router-link>
              <router-link class="btn primary small" :to="`/denuncias/${denuncia.id}/editar`">Editar</router-link>
              <router-link class="btn success small" :to="`/denuncias/${denuncia.id}/evidencia`">Subir evidencia</router-link>
              <button class="btn success small export-btn" @click="handleExportPDF(denuncia.id)" :disabled="isExporting === denuncia.id">
                {{ isExporting === denuncia.id ? 'Exportando...' : 'Exportar' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, watch, ref } from "vue";
import { useComplaintsStore } from "@/stores/complaints";
import { useAuthStore } from "@/stores/auth";
import { exportComplaintPDF } from "@/services/complaintsService";

const store = useComplaintsStore();
const authStore = useAuthStore();
const isExporting = ref(null);

async function handleExportPDF(denunciaId) {
  isExporting.value = denunciaId;
  try {
    await exportComplaintPDF(denunciaId);
  } catch (error) {
    alert("Error al descargar el PDF: " + error.message);
  } finally {
    isExporting.value = null;
  }
}

async function loadData() {
  console.log(JSON.parse(JSON.stringify(authStore.usuario)));
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
    titulo: c.descripcion ?? "Sin descripción",
    descripcion: c.descripcion ?? "",
    fecha: c.fecha ?? "",
    estado: c.estado ?? "En revisión",
    ubicacion: c.ubicacion ?? "",
    _raw: c,
  })),
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
  margin-bottom: 20px;
}

.header h1 {
  margin: 0;
}
.table-wrap {
  overflow-x: auto;
  border-radius: 12px;
}

.denuncias-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,.08);
}

.denuncias-table thead th {
  text-align: left;
  padding: 14px 16px;
  background: #f7f9fc;
  font-weight: 600;
  color: #111827;
}
.denuncias-table tbody td {
  padding: 14px 16px;
  border-top: 1px solid #eee;
  vertical-align: middle;
  color: #1f2937;
}
.actions {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: flex-start;
  white-space: nowrap;
}
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  min-width: 80px;
  padding: 0 12px;
  border-radius: 6px;
  border: none;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  box-sizing: border-box;
}
.btn.primary {
  background: #2b8aef;
  color: white;
}

.btn.primary:hover {
  background:#1d6fd8;
}
.btn.success {
  background:#10b981;
  color:white;
}
.btn.success:hover {
  background:#059669;
}
.btn.success:disabled {
  background:#9ca3af;
  cursor:not-allowed;
}
.btn.small {
  height:30px;
  min-width:65px;
  padding:0 10px;
  font-size:13px;
}
.status {
  display:inline-flex;
  align-items:center;
  padding:5px 10px;
  border-radius:999px;
  font-size:13px;
  background:#f3f4f6;
  color:#111827;
}
.status.en-revision,
.status.en-revisión {
  background:#fef3c7;
}
.status.aprobado {
  background:#bbf7d0;
}
.status.rechazado {
  background:#fecaca;
}
.empty {
  text-align:center;
  color:#666;
  margin-top:20px;
}
.error {
  color:#b42318;
}
.grid {
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(280px,1fr));
  gap:16px;
}
.card {
  background:white;
  border-radius:10px;
  padding:16px;
}
.card-actions {
  display:flex;
  justify-content:flex-end;
  gap:8px;
  margin-top:12px;
}
button.btn {
  font-family: inherit;
  line-height: normal;
  appearance: none;
  -webkit-appearance: none;
}
.actions .btn {
  vertical-align: middle;
}

.actions button.btn {
  margin: 0;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.export-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
