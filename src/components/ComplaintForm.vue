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
      <button class="secondary" type="button">Guardar borrador</button>

      <button type="submit">
        {{ isEdit ? "Guardar cambios" : "Enviar denuncia" }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { reactive, computed } from "vue";

import { useRouter } from "vue-router";

import { useComplaintsStore } from "../stores/complaints";

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({}),
  },
});

const router = useRouter();

const store = useComplaintsStore();

const form = reactive({
  title: props.initialData.title || "",

  type: props.initialData.type || "",

  description: props.initialData.description || "",

  address: props.initialData.address || "",

  date: props.initialData.date || "",

  time: props.initialData.time || "",
});

const isEdit = computed(() => !!props.initialData.id);

function submit() {
  if (isEdit.value) {
    store.update(props.initialData.id, form);

    alert("Cambios guardados");

    router.push("/denuncias");

    return;
  }

  store.create(form);

  alert("Denuncia creada");

  router.push("/denuncias");
}
</script>
