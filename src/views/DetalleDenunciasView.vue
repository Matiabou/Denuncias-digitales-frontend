<template>
  <div class="detalle-container">
    <div v-if="isLoading" class="detalle-card">
      <p>Cargando denuncia...</p>
    </div>

    <div v-else-if="denuncia" class="detalle-card">
      <h1 class="titulo">Detalle de la denuncia</h1>

      <div class="campo">
        <span>Tipo de denuncia</span>
        <p>{{ denuncia.type }}</p>
      </div>

      <div class="campo">
        <span>Descripción</span>
        <p>{{ denuncia.description }}</p>
      </div>

      <div class="campo">
        <span>Dirección</span>
        <p>{{ denuncia.address }}</p>
      </div>

      <div class="fila">
        <div class="campo">
          <span>Fecha</span>
          <p>{{ denuncia.date }}</p>
        </div>

        <div class="campo">
          <span>Hora</span>
          <p>{{ denuncia.time }}</p>
        </div>
      </div>

      <div class="campo evidencia-section">
        <span>Evidencias</span>

        <div v-if="denuncia.evidencias && denuncia.evidencias.length">
          <div
            v-for="(archivo, index) in denuncia.evidencias"
            :key="index"
            class="evidencia-item"
          >
            <div class="evidencia-content">
              <div class="evidencia-info">
                <p class="evidencia-name">
                  {{
                    archivo.nombre ||
                    archivo.filename ||
                    archivo.ruta?.split("/").pop() ||
                    "Evidencia"
                  }}
                </p>

                <button
                  class="btn-descarga-mini"
                  @click="descargarArchivo(archivo)"
                >
                  ⬇ Descargar
                </button>

                <small class="evidencia-date"> {{ formatearFecha(archivo.fecha) }}
                </small>
              </div>
            </div>
          </div>
        </div>

        <p v-else>No hay evidencias adjuntas</p>
      </div>

      <router-link :to="rutaVolver" class="btn-volver">
        Volver al listado
      </router-link>
    </div>

    <div v-else class="error">Denuncia no encontrada</div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useRoute } from "vue-router";
import { useComplaintsStore } from "@/stores/complaints";
import { useAuthStore } from "@/stores/auth";

const route = useRoute();
const store = useComplaintsStore();
const authStore = useAuthStore();

const denuncia = computed(() => store.getById(route.params.id));
const isLoading = ref(false);

const rutaVolver = computed(() =>
  authStore.esAdmin ? "/admin" : "/denuncias",
);


async function descargarArchivo(archivo) {
  try {
    const response = await fetch(archivo.url);

    console.log("🟡 Status:", response.status);
    console.log("🟡 OK:", response.ok);
    console.log("🟡 Content-Type:", response.headers.get("content-type"));

    if (!response.ok) {
      throw new Error(`Error al descargar archivo: ${response.status}`);
    }

    const blob = await response.blob();

    console.log("🟢 Blob type:", blob.type);
    console.log("🟢 Blob size:", blob.size);

    if (blob.size === 0) {
      throw new Error("El archivo está vacío (blob size = 0)");
    }

    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;

    const nombreArchivo =
      archivo.ruta?.split("/").pop() ||
      archivo.url?.split("/").pop() ||
      "archivo";

    console.log("📁 Nombre final:", nombreArchivo);

    link.download = nombreArchivo;

    document.body.appendChild(link);
    link.click();
    link.remove();

    // ⏱️ evitar corrupción por revoke inmediato
    setTimeout(() => {
      URL.revokeObjectURL(blobUrl);
      console.log("♻️ Blob URL liberada");
    }, 1000);

    console.log("✅ Descarga iniciada correctamente");

  } catch (error) {
    console.error("❌ Error en descarga:", error);
  }
}

watch(
  () => route.params.id,
  async (id) => {
    if (id) {
      await store.loadComplaint(id, true); // 🔥 IMPORTANTE force=true
    }
  },
  { immediate: true }
);

function formatearFecha(fecha) {
  const date = new Date(fecha);

  return date.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }) + " " +
  date.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit"
  });
}
</script>

<style scoped>
.btn-descarga-mini {
  background: #f3f6ff;
  border: 1px solid #dbe3ff;
  color: #4a6cf7;
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 4px;
  width: fit-content;
}

.btn-descarga-mini:hover {
  background: #e9eeff;
  border-color: #b9c6ff;
  transform: translateY(-1px);
}

.btn-descarga-mini:active {
  transform: translateY(0px);
}
.detalle-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 0 16px;
}

.detalle-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

h1 {
  margin-bottom: 24px;
}

.campo {
  background: #f8f9fa;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 18px;
  border-left: 4px solid #2b8aef;
}

.campo span {
  display: block;
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 4px;
}

.campo p {
  margin: 0;
  font-size: 1rem;
}

.fila {
  display: flex;
  gap: 24px;
}

.fila .campo {
  flex: 1;
}
.evidencia-section {
  padding: 18px;
}
.evidencia-item {
  margin-bottom: 16px;
}
.evidencia-content {
  display: flex;
  gap: 14px;
  align-items: center;
  flex-wrap: wrap;
}
.evidencia-img {
  max-width: 120px;
  border-radius: 8px;
  object-fit: cover;
}
.evidencia-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.evidencia-name {
  margin: 0;
  font-weight: 600;
}
.evidencia-link {
  color: #1d4ed8;
  text-decoration: none;
}
.evidencia-link:hover {
  text-decoration: underline;
}
.evidencia-date {
  color: #6b7280;
  font-size: 0.9rem;
}
.btn-volver {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 16px;
  background: #2b8aef;
  color: white;
  text-decoration: none;
  border-radius: 8px;
}

.btn-volver:hover {
  opacity: 0.9;
}

.error {
  text-align: center;
  padding: 30px;
}
</style>
