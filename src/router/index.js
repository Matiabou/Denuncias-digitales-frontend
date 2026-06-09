import { createRouter, createWebHistory } from "vue-router";

import LoginView from "../views/LoginView.vue";
import ListadoDenunciasView from "@/views/ListadoDenunciasView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginView,
    },
    {
      path: "/denuncias",
      name: "denuncias",
      component: ListadoDenunciasView,
    },
  ],
});

export default router;
