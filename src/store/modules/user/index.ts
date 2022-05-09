import { ActionTree, Module, MutationTree } from 'vuex';
import { UserStateI } from './Type';
import { RootState } from '../../type'
import { UserI } from '@/https/login/Type';
import { BasePowerItemI } from '@/https/setting/power/Type';

const state: UserStateI = {
  userInfo: null,
  authList: []
}

const mutations:MutationTree<UserStateI> = {
  setUserInfo: (state: UserStateI, data:UserI) => {
    state.userInfo = data;
  },
  setUserAuthList: (state: UserStateI, data:BasePowerItemI[]) => {
    state.authList = data
  }
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