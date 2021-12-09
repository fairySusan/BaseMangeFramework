<script setup lang="ts">
import LeftSider from '../leftSider/LeftSider.vue';

</script>

<template>
  <el-container class="container">
    <LeftSider></LeftSider>
    <router-view></router-view>
  </el-container>
</template>

<style lang="scss" scoped>
.container {
  height: 100vh
}
</style>