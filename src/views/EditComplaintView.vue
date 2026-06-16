<template>
  <div v-if="store.isLoading" class="complaint-page">
    <p>Cargando denuncia...</p>
  </div>

  <div v-else-if="store.error" class="complaint-page">
    <p>{{ store.error }}</p>
  </div>

  <div v-else-if="complaint" class="complaint-page">
    <ComplaintForm :initialData="complaint" />
  </div>

  <div v-else class="complaint-page">
    <p>No se encontró la denuncia.</p>
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from "vue";

import { useRoute } from "vue-router";

import { useComplaintsStore } from "../stores/complaints";

import ComplaintForm from "../components/ComplaintForm.vue";

const route = useRoute();

const store = useComplaintsStore();

async function loadComplaint() {
  await store.loadComplaint(route.params.id);
}

onMounted(loadComplaint);

watch(
  () => route.params.id,
  () => {
    loadComplaint();
  },
);

const complaint = computed(() => store.getById(route.params.id));
</script>
