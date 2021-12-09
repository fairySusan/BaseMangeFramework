<script setup lang="ts">
import Header from '../header/Header.vue';
</script>

<template>
  <el-container direction="vertical">
    <Header></Header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped src="./Container.scss"></style>