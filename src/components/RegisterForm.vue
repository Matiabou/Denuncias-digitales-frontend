<template>
  <div class="login-card">
    <h2>Crear cuenta</h2>

    <form @submit.prevent="handleRegister">
      <div class="field">
        <label>Nombre</label>
        <input v-model="form.nombre" type="text" placeholder="Micaela" />
      </div>

      <div class="field">
        <label>Apellido</label>
        <input v-model="form.apellido" type="text" placeholder="García" />
      </div>

      <div class="field">
        <label>Email</label>
        <input v-model="form.email" type="email" placeholder="ejemplo@email.com" />
      </div>

      <div class="field">
        <label>DNI</label>
        <input v-model="form.dni" type="text" inputmode="numeric" placeholder="12345678" />
      </div>

      <div class="field">
        <label>Teléfono</label>
        <input v-model="form.telefono" type="text" placeholder="11 1234 5678" />
      </div>

      <div class="field">
        <label>Domicilio</label>
        <input v-model="form.domicilio" type="text" placeholder="Av. Corrientes 123" />
      </div>

      <div class="field">
        <label>Sexo</label>
        <select v-model="form.sexo">
          <option value="">Seleccionar</option>
          <option value="femenino">Femenino</option>
          <option value="masculino">Masculino</option>
          <option value="otro">Otro</option>
          <option value="prefiero_no_decirlo">Prefiero no decirlo</option>
        </select>
      </div>

      <div class="field">
        <label>Contraseña</label>
        <input v-model="form.contrasenia" type="password" placeholder="••••••••" />
      </div>

      <p v-if="error" class="error">{{ error }}</p>

      <button :disabled="isLoading" type="submit">
        {{ isLoading ? "Creando..." : "Crear cuenta" }}
      </button>

      <span class="divider">o</span>

      <button class="secondary" type="button" @click="router.push('/')">
        Volver al login
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

import { useRouter } from "vue-router";

import { useAuth } from "@/composables/useAuth";

const router = useRouter();
const { register } = useAuth();

const form = reactive({
  nombre: "",
  apellido: "",
  email: "",
  dni: "",
  telefono: "",
  domicilio: "",
  sexo: "",
  contrasenia: "",
});

const error = ref("");
const isLoading = ref(false);

async function handleRegister() {
  error.value = "";
  isLoading.value = true;

  try {
    await register(form);
    await router.push("/denuncias");
  } catch (registerError) {
    error.value = registerError.message || "No se pudo crear la cuenta";
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