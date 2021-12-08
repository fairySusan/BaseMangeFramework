import { ActionTree, Module, MutationTree } from 'vuex';
import { UserStateI } from './Type';
import { RootState } from '../../type'

const state: UserStateI = {
}


const mutations:MutationTree<UserStateI> = {
 }

const actions: ActionTree<UserStateI, RootState> = {
  
}
// 导出模块
const user: Module<UserStateI, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions
}

export default user;