import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store, {key} from './store'
import 'element-plus/es/components/message/style/css'
import GlobalConfig from './config/global.config'
import Directive from './mixins/Directive'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

createApp(App)
.use(router)
.use(store, key)
.use(GlobalConfig)
.use(Directive)
.mount('#app')
