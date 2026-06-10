<template>
  <article class="denuncia-card">
    <div class="denuncia-header">
      <h2>{{ denuncia.titulo }}</h2>

      <span class="estado">
        {{ denuncia.estado }}
      </span>
    </div>

    <p>
      {{ denuncia.descripcion }}
    </p>

    <small>
      {{ denuncia.fecha }}
    </small>

    <button>Ver detalle</button>
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
