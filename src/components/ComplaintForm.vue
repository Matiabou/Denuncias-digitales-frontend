<template>
  <form class="complaint-form" @submit.prevent="submit">
    <div class="card">
      <h2>
        {{ isEdit ? "Modificar denuncia" : "Nueva denuncia" }}
      </h2>

      <div class="field">
        <label>Título</label>

        <input v-model="form.title" />
      </div>

      <div class="field">
        <label>Tipo de denuncia</label>

        <select v-model="form.type">
          <option value="">Seleccionar</option>

          <option>Robo</option>
          <option>Hurto</option>
          <option>Fraude</option>
          <option>Violencia</option>
          <option>Otro</option>
        </select>
      </div>

      <div class="field">
        <label>Descripción</label>

        <textarea rows="6" v-model="form.description" />
      </div>
    </div>

    <div class="card">
      <h2>Ubicación</h2>

      <div class="field">
        <label>Dirección</label>

        <input v-model="form.address" />
      </div>

      <div class="row">
        <div class="field">
          <label>Fecha</label>

          <input type="date" v-model="form.date" />
        </div>

        <div class="field">
          <label>Hora</label>

          <input type="time" v-model="form.time" />
        </div>
      </div>
    </div>

    <div class="card">
      <h2>Evidencia</h2>

      <div class="upload">
        <input type="file" multiple />

        <p>
          {{ evidenceText }}
        </p>
      </div>
    </div>

    <div class="actions">
      <p v-if="error" class="error">
        {{ error }}
      </p>

      <button class="secondary" type="button">Guardar borrador</button>

      <button :disabled="isSaving" type="submit">
        {{ isSaving ? "Guardando..." : isEdit ? "Guardar cambios" : "Enviar denuncia" }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { computed, reactive, ref, watch } from "vue";

import { useRouter } from "vue-router";

import { useComplaintsStore } from "../stores/complaints";
import { useAuthStore } from "@/stores/auth";

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({}),
  },
});

const router = useRouter();

const store = useComplaintsStore();
const authStore = useAuthStore();

const error = ref("");
const isSaving = ref(false);

function buildForm(data = {}) {
  return {
    title: data.title || "",
    type: data.type || "",
    description: data.description || "",
    address: data.address || "",
    date: data.date || "",
    time: data.time || "",
  };
}

const form = reactive({
  ...buildForm(props.initialData),
});

const isEdit = computed(() => !!props.initialData.id);

const evidenceText = computed(() =>
  isEdit.value ? "Los archivos adjuntos no se modifican desde esta versión." : "Adjuntá archivos si querés dejar constancia adicional."
);

watch(
  () => props.initialData,
  (newData) => {
    Object.assign(form, buildForm(newData));
  },
  { deep: true, immediate: true },
);

async function submit() {
  error.value = "";
  isSaving.value = true;

  if (isEdit.value) {
    try {
      await store.update(props.initialData.id, form, authStore.usuario);

      alert("Cambios guardados");

      router.push("/denuncias");
    } catch (saveError) {
      error.value = saveError.message || "No se pudo guardar la denuncia";
    } finally {
      isSaving.value = false;
    }

    return;
  }

  try {
    await store.create(form, authStore.usuario);

    alert("Denuncia creada");

    router.push("/denuncias");
  } catch (createError) {
    error.value = createError.message || "No se pudo crear la denuncia";
  } finally {
    isSaving.value = false;
  }
}
</script>

<style scoped>
.error {
  color: #b42318;
  margin: 0;
}

.complaint-form {
  max-width: 900px;
  margin: 30px auto;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.card h2 {
  margin-top: 0;
  margin-bottom: 20px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
}

.field label {
  font-weight: 600;
  color: #444;
}

.field input,
.field select,
.field textarea {
  padding: 10px 12px;
  border: 1px solid #d0d7de;
  border-radius: 8px;
  font-size: 14px;
}

.field textarea {
  resize: vertical;
}

.row {
  display: flex;
  gap: 16px;
}

.row .field {
  flex: 1;
}

.upload {
  padding: 20px;
  border: 2px dashed #d0d7de;
  border-radius: 8px;
  text-align: center;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.actions button {
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: #2b8aef;
  color: white;
}

.actions .secondary {
  background: #6c757d;
}
</style>
