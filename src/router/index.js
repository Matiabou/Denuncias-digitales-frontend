import { createRouter, createWebHistory } from "vue-router";

import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import CreateComplaintView from "../views/CreateComplaintView.vue";
import EditComplaintView from "../views/EditComplaintView.vue";
import ListadoDenunciasView from "@/views/ListadoDenunciasView.vue";
import DetalleDenunciasView from "../views/DetalleDenunciasView.vue";
import UploadEvidenceView from "../views/UploadEvidenceView.vue";
import DatosPersonalesView from "../views/DatosPersonalesView.vue";
import AdminView from "@/views/AdminView.vue";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/registro",
      name: "registro",
      component: RegisterView,
    },
    {
      path: "/denuncias/crear",
      component: CreateComplaintView,
    },
    {
      path: "/denuncias/:id",
      name: "detalle-denuncia",
      component: DetalleDenunciasView,
    },
    {
      path: "/denuncias/:id/editar",
      component: EditComplaintView,
    },
    {
      path: "/denuncias/:id/evidencia",
      name: "subir-evidencia",
      component: UploadEvidenceView,
    },
    {
      path: "/denuncias",
      name: "denuncias",
      component: ListadoDenunciasView,
      meta: {
        requiresAuth: true,
        userOnly: true,
      },
    },
    {
      path: "/datos-personales",
      name: "datosPersonales",
      component: DatosPersonalesView,
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminView,
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
      },
    },
  ],
});

router.beforeEach((to) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.estaAutenticado) {
    return { name: "login" };
  }

  if (to.meta.requiresAdmin && !authStore.esAdmin) {
    return { name: "denuncias" };
  }
});

export default router;
