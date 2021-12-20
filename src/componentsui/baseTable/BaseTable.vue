<script setup lang="ts">
/* 
组件说明： 封装了翻页组件的表格组件
组件使用：
data的数据类型是：BaseTableResponse<T>
const {data, loading, getList,onCurrentChange,onSizeChange} = useTableRequest<UserManageItemI[]>(getAllUsers,queryData);
<BaseTable
  :data="data"
  :loading="loading"
  @currentChange="onCurrentChange"
  @sizeChange="onSizeChange"
></BaseTable>
 */
import { BaseTableResponse } from '@/mixins/Interface';
import { useStore } from '@/store';
import {PageSizeOptions} from '@/store/modules/common/Type'

defineProps<{
  data: BaseTableResponse<any>,
  loading: boolean,
}>()

const emit  = defineEmits<{
  (event: 'currentChange', pageIndex:number): void,
  (event: 'sizeChange', pageSize: number): void
}>()

const store = useStore()
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
        :page-sizes="PageSizeOptions"
        :default-page-size="store.state.common.defaultPageSize"
        :page-count="data.totalCount"
        @size-change="(pageSize: number) => emit('sizeChange', pageSize)"
        @current-change="(pageIndex: number) => emit('currentChange', pageIndex)"
      ></el-pagination>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-table--scrollable-x .el-table__body-wrapper){
  @include scrollBarStyle;
}
:deep(.el-table--medium .el-table__cell) {
  padding: 8px 0;
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>