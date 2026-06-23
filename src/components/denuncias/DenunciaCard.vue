<template>
  <article class="denuncia-card">
    <div class="denuncia-header">
      <h2>{{ denuncia.titulo || denuncia.title || "Sin título" }}</h2>

      <span class="estado">
        {{ denuncia.estado }}
      </span>
    </div>

    <p>
      {{ denuncia.descripcion || denuncia.description || "Sin descripción" }}
    </p>

    <small>
      {{ denuncia.fecha || denuncia.date || "Sin fecha" }}
    </small>
  </article>
</template>

<script setup>
defineProps({
  denuncia: {
    type: Object,
    required: true,
  },
});
</script>
