import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './common/common.css'
import 'animate.css';
import VWave from 'v-wave'
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'
import { createPinia } from 'pinia'
import * as echarts from 'echarts';
// import naive from "naive-ui"
const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(pinia)  
app.use(VWave, {
  color: 'red',
  initialOpacity: 0.7,
  duration: 0.3,
  easing: 'ease-in'
})
// app.use(echarts)
// app.use(naive)
app.mount('#app')