<script setup lang="ts">
/* 
组件说明：表格页面的查询条件模块组件的封装，统一样式风格
组件使用: 
<BaseTableSearchForm 
  :model="queryData"
  @search="onSearch"
  @reset="onReset"
></BaseTableSearchForm>

插槽：
#default: 查询条件表单控件
#button：额外的按钮
*/
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