import { createApp } from 'vue';
import App from './core/App.vue';
import router from "@/core/router";
import '../global.css';

const app = createApp(App);
app.use(router);
app.mount('#app');
