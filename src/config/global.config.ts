import { App } from 'vue'
import moment from 'moment'
import ToolUtil from '@/mixins/ToolUtil'
import * as ElementIcons from '@element-plus/icons'

export default {
  install: (app: App) => {
    app.config.globalProperties.$ELEMENT = {
      size: 'small',
    },
    app.config.globalProperties.$moment = moment
    //app.config.globalProperties.$ToolUtil = new ToolUtil()

    // 全局注册element的icons,页面里无需引入，直接使用
    for (let iconName in ElementIcons) {
      app.component(iconName, ElementIcons[iconName])
    }
  }
}