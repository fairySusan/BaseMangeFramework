<script setup lang="ts">
import {defineProps} from 'vue'
defineProps<{
  model: {[key:string]:any}
}>()

const emit = defineEmits<{
  (event: 'search'): void,
  (event: 'reset'): void
}>()
</script>

<template>
  <el-form
    class="baseTableSearchForm"
    :model="model"
    :inline="true"
    label-width="100px"
  >
    <slot></slot>
    <el-form-item>
      <el-button type="primary" @click="emit('search')">查询</el-button>
      <el-button @click="emit('reset')">重置</el-button>
      <slot name="button"></slot>
    </el-form-item>
  </el-form>
</template>

<style lang="scss">
.baseTableSearchForm {
  background-color: white;
  margin-bottom: 10px;
  padding-top: 10px;
  .el-form-item--small.el-form-item{
    margin-bottom: 10px;
  }
  .el-input {
    width:200px
  }
}

</style>