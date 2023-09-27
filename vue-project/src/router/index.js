import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Procesos.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/Users.vue')
    },
    {
      path: '/users/create',
      name: 'usersCreate',
      component: () => import('../views/UsersCreate.vue')
    },
    {
      path: '/users/:id/edit',
      name: 'usersEdit',
      component: () => import('../views/EditUser.vue')
    },
    {
      path: '/procesos',
      name: 'procesos',
      component: () => import('../views/Procesos.vue')
    },
    {
      path: '/procesos/eventos',
      name: 'procesosEventos',
      component: () => import('../views/Eventos.vue')
    },
    {
      path: '/eventos/crear',
      name: 'procesosEventosCrear',
      component: () => import('../views/CrearEvento.vue')
    },
    {
      path: '/eventos/buscar',
      name: 'procesosEventosBuscar',
      component: () => import('../views/BuscarEvento.vue')
    }
  ]
})

export default router
