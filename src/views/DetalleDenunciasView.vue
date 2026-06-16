<template>
  <div class="detalle-container">
    <div v-if="isLoading" class="detalle-card">
      <p>Cargando denuncia...</p>
    </div>

    <div v-else-if="denuncia" class="detalle-card">
      <h1 class="titulo">Detalle de la denuncia</h1>

      <div class="campo">
        <span>Título</span>
        <p>{{ denuncia.title }}</p>
      </div>

      <div class="campo">
        <span>Tipo</span>
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

      <router-link to="/denuncias" class="btn-volver">
        Volver al listado
      </router-link>
    </div>

    <div v-else class="error">Denuncia no encontrada</div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useComplaintsStore } from "@/stores/complaints";

const route = useRoute();
const store = useComplaintsStore();

const denuncia = ref(null);
const isLoading = ref(false);

async function loadDenuncia() {
  const id = route.params.id;

  denuncia.value = store.getById(id);

  if (!denuncia.value) {
    isLoading.value = true;
    try {
      await store.loadComplaint(id);
      denuncia.value = store.getById(id);
    } finally {
      isLoading.value = false;
    }
  }

  console.log("ID recibido:", id);
  console.log("Denuncia:", denuncia.value);
}

onMounted(loadDenuncia);

watch(
  () => route.params.id,
  () => {
    loadDenuncia();
  },
);
</script>

<style scoped>
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
