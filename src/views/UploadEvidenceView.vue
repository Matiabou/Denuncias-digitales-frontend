<template>
  <main class="upload-evidence-page">
    <div class="card">
      <h1>Subir evidencia</h1>
      <p>Seleccioná un archivo para adjuntar a esta denuncia.</p>

      <div class="field">
        <label for="archivo">Archivo</label>
        <input id="archivo" type="file" @change="handleFileChange" />
      </div>

      <p v-if="error" class="error">{{ error }}</p>

      <div class="actions">
        <button class="btn secondary" type="button" @click="goBack">Cancelar</button>
        <button class="btn primary" type="button" @click="submit" :disabled="isSaving">
          {{ isSaving ? "Subiendo..." : "Subir evidencia" }}
        </button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useComplaintsStore } from "@/stores/complaints";
import { uploadEvidence } from "@/services/complaintsService";

const route = useRoute();
const router = useRouter();
const store = useComplaintsStore();

const selectedFile = ref(null);
const error = ref("");
const isSaving = ref(false);

const complaint = computed(() => store.getById(route.params.id));

async function loadComplaint() {
  if (!complaint.value) {
    await store.loadComplaint(route.params.id);
  }
}

function handleFileChange(event) {
  selectedFile.value = event.target.files?.[0] ?? null;
  error.value = "";
}

function goBack() {
  router.push(`/denuncias/${route.params.id}`);
}

async function submit() {
  error.value = "";

  if (!selectedFile.value) {
    error.value = "Seleccioná un archivo antes de continuar.";
    return;
  }

  isSaving.value = true;

  try {
    const formData = new FormData();
    formData.append("archivo", selectedFile.value);

    await uploadEvidence(route.params.id, formData);
    await store.loadComplaint(route.params.id);

    alert("Evidencia subida correctamente.");
    router.push(`/denuncias/${route.params.id}`);
  } catch (uploadError) {
    error.value = uploadError.message || "No se pudo subir la evidencia.";
  } finally {
    isSaving.value = false;
  }
}

onMounted(loadComplaint);
</script>

<style scoped>
.upload-evidence-page {
  max-width: 720px;
  margin: 40px auto;
  padding: 0 16px;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

h1 {
  margin-top: 0;
  margin-bottom: 12px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 20px 0;
}

.field label {
  font-weight: 600;
  color: #444;
}

.field input {
  padding: 10px 12px;
  border: 1px solid #d0d7de;
  border-radius: 8px;
  font-size: 14px;
}

.error {
  color: #b42318;
  margin: 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.btn {
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: white;
}

.btn.primary {
  background: #2b8aef;
}

.btn.secondary {
  background: #6c757d;
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
