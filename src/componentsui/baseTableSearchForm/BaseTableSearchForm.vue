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
#more: 可收起展开的查询条件
#button：额外的按钮
*/
import { ref, useSlots } from "vue";

withDefaults(
  defineProps<{
    model: { [key: string]: any };
    labelWidth?: string | number;
  }>(),
  {
    labelWidth: "100px",
  }
);

const emit = defineEmits<{
  (event: "search"): void;
  (event: "reset"): void;
}>();

const isExpendMore = ref(false);
const slots = useSlots()
</script>

<template>
  <div class="baseTableSearchForm">
    <el-form :model="model" :inline="true" :label-width="labelWidth">
      <slot></slot>
      <el-collapse-transition>
        <div v-show="isExpendMore">
          <slot name="more"></slot>
        </div>
      </el-collapse-transition>
    </el-form>
    <div class="options">
      <el-button v-if="slots.more" type="text" @click="isExpendMore = !isExpendMore">
        {{isExpendMore ? "收起↑" : "展开更多筛选↓"}}
      </el-button>
      <el-button type="primary" @click="emit('search')">查询</el-button>
      <el-button @click="emit('reset')">重置</el-button>
      <slot name="button"></slot>
    </div>
  </div>
</template>

<style lang="scss">
.baseTableSearchForm {
  background-color: white;
  margin-bottom: 10px;
  padding: 10px 0;
  .el-form-item--small.el-form-item {
    margin-bottom: 10px;
  }
  .el-form-item {
    width: 20%;
    margin-right: 0;
    @media screen and (max-width: 1370px) {
      width: 25%;
    }
  }
  .el-input {
    width: 94%;
  }
}
.options {
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
}
</style>
