<script setup lang="ts">import { BaseTableResponse } from '@/mixins/Interface';

defineProps<{
  data: BaseTableResponse<any>,
  loading: boolean,
}>()

const emit  = defineEmits<{
  (event: 'currentChange', pageIndex:number): void,
  (event: 'sizeChange', pageSize: number): void
}>()
</script>

<template>
  <div>
    <el-table 
      style="width: 100%"
      :data="data.data"
      v-loading="loading"
      size="medium"
    >
      <slot></slot>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        layout="sizes, prev, pager, next"
        :page-sizes="[10, 15, 20, 25]"
        :page-size="10"
        :total="data.totalCount"
        @size-change="(pageSize: number) => emit('sizeChange', pageSize)"
        @current-change="(pageIndex: number) => emit('currentChange', pageIndex)"
      ></el-pagination>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep.el-table--scrollable-x .el-table__body-wrapper{
  @extend .scrollBarStyle;
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>