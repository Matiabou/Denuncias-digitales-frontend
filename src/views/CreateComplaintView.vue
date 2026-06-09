<template>
  <main class="complaint-page">
    <header class="page-header">
      <h1>Nueva denuncia</h1>

      <p>Completá la información necesaria para iniciar el trámite.</p>
    </header>

    <ComplaintForm />
  </main>
</template>

<script setup>
import ComplaintForm from "../components/ComplaintForm.vue";
</script>
