<template>
  <div v-if="complaint" class="complaint-page">
    <h1 class="titulo">Editar denuncia</h1>
    <ComplaintForm :initialData="complaint" />
  </div>
</template>

<script setup>
import { computed } from "vue";

import { useRoute } from "vue-router";

import { useComplaintsStore } from "../stores/complaints";

import ComplaintForm from "../components/ComplaintForm.vue";

const route = useRoute();

const store = useComplaintsStore();

const complaint = computed(() => store.getById(route.params.id));
</script>

<style scoped>
.titulo {
  text-align: center;
  margin: 24px 0;
}
</style>
