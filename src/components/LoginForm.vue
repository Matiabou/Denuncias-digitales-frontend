<template>
  <div class="login-card">

    <h2>Iniciar sesión</h2>

    <form @submit.prevent="handleLogin">

      <div class="field">
        <label>DNI</label>

        <input
          type="text"
          inputmode="numeric"
          placeholder="12345678"
          v-model="dni"
        />
      </div>

      <div class="field">
        <label>Contraseña</label>

        <input
          type="password"
          placeholder="••••••••"
          v-model="password"
        />
      </div>

      <p v-if="error" class="error">
        {{ error }}
      </p>

      <button :disabled="isLoading" type="submit">
        {{ isLoading ? "Ingresando..." : "Ingresar" }}
      </button>

      <span class="divider">
        o
      </span>

      <button
        class="secondary"
        type="button"
        @click="router.push('/registro')"
      >
        Crear cuenta
      </button>

    </form>

  </div>
</template>

<script setup>
import { ref } from "vue";

import { useRouter } from "vue-router";

import { useAuth } from "@/composables/useAuth";

const router = useRouter();
const { login } = useAuth();

const dni = ref("");
const password = ref("");
const error = ref("");
const isLoading = ref(false);

async function handleLogin() {
  error.value = "";
  isLoading.value = true;

  try {
    await login(dni.value, password.value);

    await router.push("/denuncias");
  } catch (loginError) {
    error.value = loginError.message || "No se pudo iniciar sesión";
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
.error {
  color: #b42318;
  margin: 0;
}
</style>