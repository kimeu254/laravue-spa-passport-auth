import { createWebHistory, createRouter } from 'vue-router'
import store from '@/store'

/* Guest Component */
const Login = () => import('@/views/Login.vue')
const Register = () => import('@/views/Register.vue')
/* Guest Component */

/* Layouts */
const DahboardLayout = () => import('@/layouts/Default.vue')
/* Layouts */

/* Authenticated Component */
const Dashboard = () => import('@/views/Dashboard.vue')
/* Authenticated Component */


const routes = [
    {
        name: "login",
        path: "/login",
        component: Login,
        meta: {
            middleware: "guest",
            title: `Login`
        }
    },
    {
        name: "register",
        path: "/register",
        component: Register,
        meta: {
            middleware: "guest",
            title: `Register`
        }
    },
    {
        path: "/",
        component: DahboardLayout,
        meta: {
            middleware: "auth"
        },
        children: [
            {
                name: "dashboard",
                path: '/',
                component: Dashboard,
                meta: {
                    title: `Dashboard`
                }
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    if (to.meta.middleware !== 'guest' && !store.state.auth.authenticated) next({ name: 'login' })
    else if(to.meta.middleware == 'guest' && store.state.auth.authenticated) next({ name: "dashboard" })
    else next()
    // if (to.meta.middleware == "admin" && !store.state.auth.authenticated) {
    //     if (store.state.auth.authenticated) {
    //         next({ name: "dashboard" })
    //     }
    //     next()
    // } else {
    //     if (store.state.auth.authenticated) {
    //         next()
    //     } else {
    //         next({ name: "login" })
    //     }
    // }
})

export default router