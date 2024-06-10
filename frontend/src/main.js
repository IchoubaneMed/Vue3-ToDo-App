import './assets/styles.css'
import axios from 'axios';
import { createApp } from 'vue'
import { createPinia } from 'pinia';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import App from './App.vue'

axios.defaults.baseURL = 'http://localhost:8000';

const token = localStorage.getItem('token');

if(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const app = createApp(App);
const pinia = createPinia();
app.use(pinia)
app.use(Toast)
app.mount('#app')
