import './bootstrap';
import Router from '@/router'
import store from '@/store'
import 'vue3-toastify/dist/index.css';

import { createApp } from 'vue/dist/vue.esm-bundler';

const app = createApp({})
app.use(Router)
app.use(store)
app.mount('#app')