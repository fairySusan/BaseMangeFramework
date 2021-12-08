import { ActionTree, Module, MutationTree } from 'vuex';
import { CommonStateI } from './Type';
import { RootState } from '../../type'

const state: CommonStateI = {
}


const mutations:MutationTree<CommonStateI> = {
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