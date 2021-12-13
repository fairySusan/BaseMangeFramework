<script setup lang="ts">
defineProps<{
  data: any[],
  loading: boolean,

}>()
</script>

<template>
  <div>
    <el-table 
      :data="data"
      v-loading="loading"
      size="medium"
    >
      <slot></slot>
    </el-table>
    <div class="pagination">
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </div>
  </div>
</template>

<style lang="scss" scoped>
::v-deep.el-table--scrollable-x .el-table__body-wrapper{
  @extend .scrollBarStyle;
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>