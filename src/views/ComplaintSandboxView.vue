<template>
  <div class="complaint-page">
    <h1>Denuncias (Mock)</h1>

    <div v-for="complaint in store.complaints" :key="complaint.id" class="card">
      <h2>
        {{ complaint.title }}
      </h2>

      <p>
        {{ complaint.type }}
      </p>

      <p>
        {{ complaint.description }}
      </p>

      <RouterLink :to="`/denuncias/${complaint.id}/editar`"> Editar </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { useComplaintsStore } from "../stores/complaints";

const store = useComplaintsStore();
</script>
