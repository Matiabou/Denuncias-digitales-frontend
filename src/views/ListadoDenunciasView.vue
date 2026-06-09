<template>
  <div class="denuncias-container">
    <h1>Mis Denuncias</h1>

    <DenunciaCard
      v-for="denuncia in denuncias"
      :key="denuncia.id"
      :denuncia="denuncia"
    />
  </div>
</template>

<script setup>
import DenunciaCard from "@/components/denuncias/DenunciaCard.vue";

const denuncias = [
  {
    id: 1,
    titulo: "Robo de bicicleta",
    descripcion: "Me robaron la bicicleta en la vía pública.",
    estado: "En revisión",
    fecha: "05/06/2026",
  },
  {
    id: 2,
    titulo: "Estafa online",
    descripcion: "Realicé una compra en un sitio fraudulento.",
    estado: "Aceptada",
    fecha: "01/06/2026",
  },
];
</script>
