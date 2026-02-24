import './assets/main.css'
import '@picocss/pico'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from "./locales";
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(Vue3Toastify, { 
	autoclose: 3000,
  	position: "bottom-left",
	theme: "colored"
 });
app.mount('#app');

// app.config.errorHandler = (err, vm, info) => {};