import { BasePowerItemI } from '@/https/setting/power/Type';
import store from '@/store';
import { App } from 'vue'


export default {
  install: (app: App) => {
    /**
     * 权限指令，用于控制元素的显示和隐藏
     */
    app.directive('auth', {
      mounted(el,binding) {
        // 当前用户所拥有的权限列表
        const authList:BasePowerItemI[] = store.state.user.authList
        const result = authList.some((val) => {
          if(val.buttonKey === binding.value){
            return true
          }
        });
        if(!result){
          el.style.display='none'        
        }
      }
    })
  }
}