<script setup lang="ts">
import BaseHeader from '../baseHeader/BaseHeader.vue';
</script>

<template>
  <el-container direction="vertical">
    <BaseHeader></BaseHeader>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped src="./BaseContainer.scss"></style>