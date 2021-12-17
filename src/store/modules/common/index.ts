import { ActionTree, Module, MutationTree } from 'vuex';
import { CommonStateI, mediaHeightAdpter } from './Type';
import { RootState } from '../../type'

const state: CommonStateI = {
  defaultPageSize: 10,
}


const mutations:MutationTree<CommonStateI> = {
  setPageSize: (state: CommonStateI) => {
    for (let item of mediaHeightAdpter) {
      if (item.device.matches) {
        state.defaultPageSize = item.pageSize
        break
      } 
    }
  }
}

const actions: ActionTree<CommonStateI, RootState> = {
  
}
// 导出模块
const home: Module<CommonStateI, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions
}

export default home;