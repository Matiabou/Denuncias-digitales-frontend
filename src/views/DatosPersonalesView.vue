<script setup>
import { reactive, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const { usuario } = storeToRefs(authStore);
const isEditing = ref(false);

const form = reactive({
  nombre: usuario.value?.nombre ?? "",
  apellido: usuario.value?.apellido ?? "",
  dni: usuario.value?.dni ?? "",
  email: usuario.value?.email ?? "",
});

watch(
  () => usuario.value,
  (newUsuario) => {
    form.nombre = newUsuario?.nombre ?? "";
    form.apellido = newUsuario?.apellido ?? "";
    form.dni = newUsuario?.dni ?? "";
    form.email = newUsuario?.email ?? "";
  },
  { immediate: true },
);

function startEdit() {
  isEditing.value = true;
}

function cancelEdit() {
  isEditing.value = false;
  form.nombre = usuario.value?.nombre ?? "";
  form.apellido = usuario.value?.apellido ?? "";
  form.dni = usuario.value?.dni ?? "";
  form.email = usuario.value?.email ?? "";
}

function saveChanges() {
  authStore.setUsuario({
    ...usuario.value,
    nombre: form.nombre,
    apellido: form.apellido,
    dni: form.dni,
    email: form.email,
  });
  isEditing.value = false;
  alert("Datos personales guardados");
}
</script>

<template>
  <main class="login-page">
    <section class="login-section">
      <div class="login-card">
        <h2>Datos Personales</h2>

        <div class="field">
          <label>Nombre</label>
          <input v-model="form.nombre" :disabled="!isEditing" />
        </div>

        <div class="field">
          <label>Apellido</label>
          <input v-model="form.apellido" :disabled="!isEditing" />
        </div>

        <div class="field">
          <label>DNI</label>
          <input v-model="form.dni" :disabled="!isEditing" />
        </div>

        <div class="field">
          <label>Email</label>
          <input v-model="form.email" :disabled="!isEditing" />
        </div>

        <div class="actions">
          <button
            v-if="!isEditing"
            type="button"
            @click="startEdit"
          >
            Editar datos
          </button>

          <button
            v-else
            type="button"
            @click="saveChanges"
          >
            Guardar cambios
          </button>

          <button
            v-if="isEditing"
            type="button"
            class="secondary"
            @click="cancelEdit"
          >
            Cancelar
          </button>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 16px;
  background: #f4f7fb;
}

.login-section {
  width: 100%;
  max-width: 640px;
}

.login-card {
  width: 100%;
  background: white;
  padding: 40px;
  border-radius: 24px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.08);
}

.login-card h2 {
  margin-bottom: 30px;
  color: #111827;
}

.actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  flex-wrap: wrap;
  margin-top: 12px;
}

.actions button {
  width: auto;
  min-width: 140px;
}

input:disabled {
  background: #f3f4f6;
}

@media (max-width: 900px) {
  .login-page {
    padding: 24px 12px;
  }

  .login-card {
    padding: 32px;
  }
}
</style>