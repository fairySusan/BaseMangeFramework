<script setup lang="ts">
import {computed} from 'vue'
import userPoto from '@/assets/images/head-girl.png'
import { useStore } from '@/store';
import { UserInfoHandler } from '@/mixins/UserUtil';

const store = useStore()
const userInfo = UserInfoHandler.getUserInfo()

</script>

<template>
  <el-header>
    <div class="header flexRowBetweenCenter paddingLeftRight">
      <el-icon><more-filled /></el-icon>
      <div class="flexRowAlignItemCenter">
        <el-avatar :src="userPoto" class="marginRight"></el-avatar>
        <el-dropdown>
          <span>
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