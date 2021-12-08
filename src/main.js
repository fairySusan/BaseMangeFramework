import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store, {key} from './store'
// import './assets/styles/element/index.scss'
import 'element-plus/es/components/message/style/css'
import GlobalConfig from './config/global.config'

createApp(App)
.use(router)
.use(store, key)
.use(GlobalConfig)
.mount('#app')
