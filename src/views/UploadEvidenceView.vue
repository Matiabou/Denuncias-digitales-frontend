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

    <!-- Modal de Éxito -->
    <Transition name="fade">
      <div v-if="showSuccessAlert" class="modal-overlay">
        <div class="modal-card">
          <div class="success-icon-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#10b981"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-check"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h2>¡Subida Exitosa!</h2>
          <p>La evidencia se ha adjuntado correctamente a la denuncia.</p>
          <button class="btn primary btn-confirm" type="button" @click="closeAlertAndRedirect">
            Aceptar
          </button>
        </div>
      </div>
    </Transition>
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
const showSuccessAlert = ref(false);

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

function closeAlertAndRedirect() {
  showSuccessAlert.value = false;
  router.push(`/denuncias/${route.params.id}`);
}

async function submit() {
  error.value = "";

  if (!selectedFile.value) {
    error.value = "Seleccioná un archivo antes de continuar.";
    return;
  }

  console.log("ARCHIVO A SUBIR:", selectedFile.value);

  isSaving.value = true;

  try {
    const formData = new FormData();
    formData.append("archivo", selectedFile.value);

    console.log("ENVIANDO FORM DATA");

    await uploadEvidence(route.params.id, formData);

    console.log("SUBIDA OK");

    await store.loadComplaint(route.params.id);

    showSuccessAlert.value = true;

  } catch (uploadError) {
    console.log("ERROR SUBIDA:", uploadError);
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

/* Modal de Éxito CSS */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-card {
  background: white;
  padding: 32px 24px;
  border-radius: 16px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  animation: scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.success-icon-container {
  width: 72px;
  height: 72px;
  background: #ecfdf5;
  border: 3px solid #10b981;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 20px auto;
  animation: pulse 2s infinite;
}

.modal-card h2 {
  margin: 0 0 10px 0;
  color: #111827;
  font-size: 22px;
  font-weight: 700;
}

.modal-card p {
  margin: 0 0 24px 0;
  color: #6b7280;
  font-size: 15px;
  line-height: 1.5;
}

.btn-confirm {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  font-weight: 600;
  background: #10b981;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: white;
  transition: background-color 0.2s, transform 0.1s;
}

.btn-confirm:hover {
  background: #059669;
}

.btn-confirm:active {
  transform: scale(0.98);
}

/* Animations */
@keyframes scaleUp {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(16, 185, 129, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
  }
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
