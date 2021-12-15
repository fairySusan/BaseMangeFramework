<script setup lang="ts">
import BaseHeader from '../baseHeader/BaseHeader.vue';
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

</script>

<template>
  <el-container direction="vertical">
    <BaseHeader></BaseHeader>
    <el-scrollbar>
      <el-config-provider :locale="zhCn">
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-config-provider>
    </el-scrollbar>
  </el-container>
</template>

<style lang="scss" scoped src="./BaseContainer.scss"></style>