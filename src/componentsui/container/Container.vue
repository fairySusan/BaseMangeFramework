<script setup lang="ts">
import LeftSider from '../leftSider/LeftSider.vue';
</script>

<template>
  <el-container class="container">
    <LeftSider></LeftSider>
    <el-container>
      <el-header>
        <div class="header flexRowSpaceBetween">
          <span class="primaryFontColor">kkkkkk</span>
          <span>hahahahahha</span>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped src="./Container.scss"></style>