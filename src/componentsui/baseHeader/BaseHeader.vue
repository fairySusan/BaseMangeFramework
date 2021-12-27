<script setup lang="ts">
import userPoto from '@/assets/images/head-girl.png'
import { TokenHandler } from '@/mixins/TokenUtil';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';

const store = useStore()
const userInfo = store.state.user.userInfo
const router = useRouter()


const onClick = (command:string) => {
  if (command === 'loginout') {
    store.commit('user/setUserInfo', null)
    TokenHandler.removeToken()
    router.push('/login')
  }
}

</script>

<template>
  <el-header>
    <div class="header flexRowBetweenCenter paddingLeftRight">
      <el-icon><more-filled /></el-icon>
      <div class="flexRowAlignItemCenter">
        <el-avatar :src="userPoto" class="marginRight"></el-avatar>
        <el-dropdown @command="onClick">
          <span class="whiteFontColor">
            {{userInfo?.name}}({{userInfo?.account}})
            <el-icon class="verticalAlignMid">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <router-link :to="{path: '/personal'}">
                  <el-icon><avatar /></el-icon>
                  个人中心
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item command="loginout">
                <el-icon><switch-button /></el-icon>
                退出
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </el-header>
</template>

<style src="./BaseHeader.scss" scoped></style>