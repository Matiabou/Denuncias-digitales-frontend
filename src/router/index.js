
import { createRouter, createWebHistory } from "vue-router";

import LoginView from '../views/LoginView.vue'
import CreateComplaintView from '../views/CreateComplaintView.vue'
import EditComplaintView from '../views/EditComplaintView.vue'
import ListadoDenunciasView from "@/views/ListadoDenunciasView.vue";
import RegistroView from '../views/RegistroView.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'login',
            component: LoginView
        },
        {
            path: '/denuncias/crear',
            component: CreateComplaintView
        },
        {
            path:
                '/denuncias/:id/editar',
            component: EditComplaintView
        },
        {
            path: "/denuncias",
            name: "denuncias",
            component: ListadoDenunciasView,
        },
        {
             path: '/registro',
             name: 'registro',
             component: RegistroView
         }
    ]
})

export default router;
