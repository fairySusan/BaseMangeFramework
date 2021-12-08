import { createStore, Store, useStore as baseUseStore } from 'vuex'
import user from './modules/user'
import common from './modules/common'
import {RootState} from './Type'
import { InjectionKey } from 'vue'

export const key: InjectionKey<Store<RootState>> = Symbol();

export default createStore<RootState>({
  modules: {
    user,
    common
  }
});

// 定义自己的 `useStore` 组合式函数
export function useStore () {
  return baseUseStore(key)
}
