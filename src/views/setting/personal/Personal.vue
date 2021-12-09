<script setup lang="ts">
import BasicInfoSetting from './components/basicInfoSetting/BasicInfoSetting.vue';
import SafeInfoSetting from './components/safeInfoSetting/SafeInfoSetting.vue';
const Tabs = [
  {
    name: '基本设置',
    componentName: BasicInfoSetting
  },
  {
    name: '安全设置',
    componentName: SafeInfoSetting
  }
]
</script>

<template>
  <el-tabs tab-position="left">
    <el-tab-pane v-for="tab in Tabs" :label="tab.name">
      <component :is="tab.componentName"></component>
    </el-tab-pane>
  </el-tabs>
</template>

<style lang="scss" scoped>
</style>
