import { App } from 'vue'
import moment from 'moment'
import * as ElementIcons from '@element-plus/icons'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

export default {
  install: (app: App) => {
    app.config.globalProperties.$ELEMENT = {
      size: 'small',
      locale: zhCn
    },
    app.config.globalProperties.$moment = moment
    //app.config.globalProperties.$ToolUtil = new ToolUtil()

    // 全局注册element的icons,页面里无需引入，直接使用
    for (const iconName in ElementIcons) {
      app.component(iconName, ElementIcons[iconName])
    }
  }
}