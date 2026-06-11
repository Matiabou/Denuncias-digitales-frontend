<template>
  <div v-if="denuncia">
    <h1>Detalle de la denuncia</h1>

    <p><strong>Título:</strong> {{ denuncia.title }}</p>
    <p><strong>Tipo:</strong> {{ denuncia.type }}</p>
    <p><strong>Descripción:</strong> {{ denuncia.description }}</p>
    <p><strong>Dirección:</strong> {{ denuncia.address }}</p>
    <p><strong>Fecha:</strong> {{ denuncia.date }}</p>
    <p><strong>Hora:</strong> {{ denuncia.time }}</p>

    <router-link to="/denuncias"> Volver al listado </router-link>
  </div>

  <div v-else>Denuncia no encontrada</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useComplaintsStore } from "@/stores/complaints";

const route = useRoute();
const store = useComplaintsStore();

const denuncia = ref(null);

onMounted(() => {
  const id = route.params.id;

  denuncia.value = store.getById(id);

  console.log("ID recibido:", id);
  console.log("Denuncia:", denuncia.value);
});
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
  margin-bottom: 18px;
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
