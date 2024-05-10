import { createApp } from 'vue';
import { createPinia } from 'pinia';
import store from "./store";
import './style.css';
import App from './App.vue';
import ParameterService from "@/service/parameter-service";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/config/firebaseConfig";

const pinia = createPinia()
const app = createApp(App)
const baseUrl = await ParameterService.getParameter('mtj-url')
app.provide('baseUrl', baseUrl)
app.use(store);
app.use(pinia)
app.mount('#app');
initializeApp(firebaseConfig);
if(localStorage.getItem('darkMode') === 'true') {
    document.documentElement.classList.add('dark')
}