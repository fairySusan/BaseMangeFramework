<script setup lang="ts">
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

const locale = zhCn
</script>

<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<style lang="scss">
body, html {
  padding: 0;
  margin: 0;
  background-color: $backgroundColor;
  color: map-get($text-color, 'primary')
}
</style>

