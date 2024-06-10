import './assets/styles.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import App from './App.vue'

const app = createApp(App);
const pinia = createPinia();
app.use(pinia)
app.use(Toast)
app.mount('#app')
