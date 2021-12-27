<script setup lang="ts">
import {reactive,watch, ref, onMounted, nextTick} from 'vue'
import {BaseTable} from '@/componentsui'
import { useRequest } from '@/mixins/Hooks';
import {getAllFunctionPower} from '@/https/setting/power/Power'
import {BaseTableResponse} from '@/mixins/Interface'
import {AllPowersResultI} from '@/https/setting/power/Type'
import { useStore } from '@/store';

const props = defineProps<{
  functions: AllPowersResultI[] | null
}>()
const emit = defineEmits<{
  (event: 'update:functions', val: AllPowersResultI[]):void
}>()

const {data:totalData, loading, run:getList} = useRequest<AllPowersResultI[]>(getAllFunctionPower,[], undefined, false)

const store = useStore()
const selectFunctions = ref<AllPowersResultI[]>([])
const tableRef = ref<any>(null)
const searchWord = ref('')
const data = reactive<BaseTableResponse<AllPowersResultI[]>>({
  pageIndex: 1,
  pageSize: 10,
  totalCount: 0,
  pageCount: 0,
  startRecordIndex: 0,
  endRecordIndex: 0,
  data: []
})

onMounted(() => {
  getList().then(() => {
    data.totalCount = totalData.value.length
    data.pageSize = store.state.common.defaultPageSize
    data.data = totalData.value.slice(0, store.state.common.defaultPageSize)
  })
})

watch(() => data.data, () => {
  selectDefaultRow()
})

const selectDefaultRow = () => {
  if (props.functions) {
    props.functions!.forEach(fun => {
      const i = data.data.findIndex(row => row.id === fun.id)
      console.log(i)
      if (i>-1) {
        nextTick().then(() => {
          tableRef.value.toggleRowSelection(data.data[i], true)
        })
      }
    })
  }
}



const onCurrentChange = (pageIndex: number) => {
  data.pageIndex = pageIndex
  const startIndex = (pageIndex-1)*data.pageSize
  data.data = totalData.value.slice(startIndex,startIndex+data.pageSize)
}

const onSizeChange = (pageSize: number) => {
  data.pageSize = pageSize
  data.data = totalData.value.slice(0, data.pageSize)
}

const onAllSelect = () => {
  tableRef.value.toggleAllSelection()
  selectFunctions.value = totalData.value
}

const onSearch = (value:string) => {
  if (!value) {
    data.data = totalData.value
  } else {
    data.data = totalData.value.filter(item => {
      if (item.name) return item.name.indexOf(value) !== -1
    })
  }
  data.pageIndex = 1
  data.totalCount = data.data.length
}
</script>

<template>
  <el-form inline>
    <el-form-item>
      <el-input
        placeholder="输入关键词搜索"
        v-model="searchWord"
        @input="onSearch"
        clearable
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onAllSelect">全选</el-button>
      <el-button type="primary" @click="emit('update:functions',selectFunctions)">确认</el-button>
    </el-form-item>
  </el-form>
  <BaseTable
    :data="data"
    :loading="loading"
    ref="tableRef"
    @currentChange="onCurrentChange"
    @sizeChange="onSizeChange"
    @selectionChange="(val: any) => selectFunctions = val"
  >
    <el-table-column type="selection"></el-table-column>
    <el-table-column prop="name" label="名称"></el-table-column>
    <!-- <el-table-column prop="area" label="区域"></el-table-column> -->
    <el-table-column prop="controller" label="控制器"></el-table-column>
    <el-table-column prop="action" label="action"></el-table-column>
  </BaseTable>
</template>

<style lang="scss">
</style>