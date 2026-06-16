import { createRouter, createWebHistory } from "vue-router";

import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import CreateComplaintView from "../views/CreateComplaintView.vue";
import EditComplaintView from "../views/EditComplaintView.vue";
import ListadoDenunciasView from "@/views/ListadoDenunciasView.vue";

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
            component: CreateComplaintView
        },
        {
            path:
                "/denuncias/:id/editar",
            component: EditComplaintView
        },
        {
            path: "/denuncias",
            name: "denuncias",
            component: ListadoDenunciasView,
        },
    ]
})

export default router;
