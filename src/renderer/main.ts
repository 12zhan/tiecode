import { createApp } from 'vue'
import App from './App.vue'
import IndexRouter from './router/index'
import { createPinia } from 'pinia';

import './style.css';
import 'mdui/mdui.css';
import 'mdui';

// import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';


const app = createApp(App);
const pinia = createPinia();
const vuetify = createVuetify({
    components,
    directives,
});
app.use(IndexRouter);
app.use(pinia as any);
app.use(vuetify);
app.mount('#app');
