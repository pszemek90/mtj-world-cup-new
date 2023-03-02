import { createApp } from 'vue';
import store from "./store";
import './style.css';
import VueTailwindDatepicker from 'vue-tailwind-datepicker'

import App from './App.vue';

const app = createApp(App)

app.use(VueTailwindDatepicker)
app.use(store);
app.mount('#app');
