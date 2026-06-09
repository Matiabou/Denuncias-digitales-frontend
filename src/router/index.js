import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'
import CreateComplaintView from '../views/CreateComplaintView.vue'
import EditComplaintView from '../views/EditComplaintView.vue'
import ComplaintSandboxView from '../views/ComplaintSandboxView.vue'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'login',
            component: LoginView
        },
        {
            path: '/denuncias/nueva',
            component: CreateComplaintView
        },
        {
            path:
                '/denuncias/:id/editar',
            component: EditComplaintView
        },
        {
            path:
                '/sandbox',

            component:
                ComplaintSandboxView
        }
    ]
})

export default router