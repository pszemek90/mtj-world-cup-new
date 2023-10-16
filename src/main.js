import { createApp } from 'vue';
import { createPinia } from 'pinia';
import store from "./store";
import './style.css';
import App from './App.vue';
import ParameterService from "@/service/parameter-service";

const pinia = createPinia()
const app = createApp(App)
const baseUrl = await ParameterService.getParameter('mtj-url')
app.provide('baseUrl', baseUrl)
app.use(store);
app.use(pinia)
app.mount('#app');
