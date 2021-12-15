<script setup lang="ts">
import BaseLeftSider from '../baseLeftSider/BaseLeftSider.vue';
</script>

<template>
  <el-container class="container">
    <BaseLeftSider></BaseLeftSider>
    <router-view></router-view>
  </el-container>
</template>

<style lang="scss" scoped>
.container {
  height: 100vh
}
</style>