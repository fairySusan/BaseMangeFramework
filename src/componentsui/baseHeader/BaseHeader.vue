<script setup lang="ts">
import userPoto from '@/assets/images/head-girl.png'
import { useStore } from '@/store';

const store = useStore()
const userInfo = store.state.user.userInfo

</script>

<template>
  <el-header>
    <div class="header flexRowBetweenCenter paddingLeftRight">
      <el-icon><more-filled /></el-icon>
      <div class="flexRowAlignItemCenter">
        <el-avatar :src="userPoto" class="marginRight"></el-avatar>
        <el-dropdown>
          <span class="whiteFontColor">
            {{userInfo?.name}}({{userInfo?.account}})
            <el-icon class="verticalAlignMid">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <el-icon><avatar /></el-icon>
                个人中心
              </el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </el-header>
</template>

<style src="./BaseHeader.scss" scoped></style>