<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const { usuario } = storeToRefs(authStore);
</script>

<template>
  <div>
    <h2>Datos Personales</h2>

    <p><strong>Nombre:</strong> {{ usuario.nombre }}</p>
    <p><strong>Apellido:</strong> {{ usuario.apellido }}</p>
    <p><strong>DNI:</strong> {{ usuario.dni }}</p>
    <p><strong>Email:</strong> {{ usuario.email }}</p>
  </div>
</template>