import { createApp } from 'vue';
import store from "./store";
import './style.css';
import App from './App.vue';
import ParameterService from "@/service/parameter-service";

const app = createApp(App)
const baseUrl = await ParameterService.getParameter('mtj-url')
app.provide('baseUrl', baseUrl)
app.use(store);
app.mount('#app');
