<script setup lang="ts">
import {reactive, ref} from 'vue'
import {BaseTableSearchForm} from '@/componentsui'
import { useOptionRequest, useTableRequest } from '@/mixins/Hooks';
import {getSystemLogList, deleteSystemLog} from '@/https/setting/systemLog/SystemLog'
import {SystemLogItemI} from '@/https/setting/systemLog/Type'
import {BaseTable} from '@/componentsui'

const queryData = reactive({
  StartTime:'',
  EndTime:'',
  Keyword: '',
  PageIndex:1,
  PageSize:10,
})
const {data, getList, loading, onCurrentChange, onSizeChange} = useTableRequest<SystemLogItemI[]>(getSystemLogList,queryData)
const {submit: onDeleteSubmit, loading:deleteLoading} = useOptionRequest<string, {idArr:number[]}>(deleteSystemLog)

const selectRows = ref<SystemLogItemI[]>([])

// 格式化属性信息
const formatterProperty = (property:any) => {
  if(typeof property === 'string'){
    return JSON.parse(property)
  }else{
    return property;
  }
}

const onDelete = async () => {
  try{
    const idArr = selectRows.value.map(item => item.id)
    await onDeleteSubmit({idArr})
    getList()
  }catch(e){
    console.log(e)
  }
}

const onReset = () => {
  queryData.StartTime = ''
  queryData.EndTime = ''
  queryData.Keyword = ''
  queryData.PageIndex = 1
  getList()
}

const onSearch = () => {
  getList()
}
</script>

<template>
  <div>
    <BaseTableSearchForm
      :model="queryData"
      @search="onSearch"
      @reset="onReset"
    >
      <el-form-item label="开始日期">
        <el-date-picker
          v-model="queryData.StartTime"
          type="date"
          placeholder="开始日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束日期">
        <el-date-picker
          v-model="queryData.EndTime"
          type="date"
          placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="关键词">
        <el-input v-model="queryData.Keyword" placeholder="请输入关键词"></el-input>
      </el-form-item>
      <template #button>
        <el-button type="danger" @click="onDelete" :loading="deleteLoading">删除</el-button>
      </template>
    </BaseTableSearchForm>
    <BaseTable
      :data="data"
      :loading="loading"
      @currentChange="onCurrentChange"
      @sizeChange="onSizeChange"
      @selection-change="(vals) => selectRows = vals"
    >
      <el-table-column type="expand">
        <template #default="{row}">
          <div class="flexRow">
            <span class="flexNone fontWeightBold">异常信息：</span>
            <div>
              {{ row.exception }}
            </div>
          </div>
          <div class="flexRow marginTop">
            <span class="flexNone fontWeightBold">属性信息：</span>
            <div>
              <div v-for="(value, key) in formatterProperty(row.properties)">
                <span class="fontWeightBold">{{ key }}：</span>
                <span>{{ value }}</span>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column type="selection" width="55" />
      <el-table-column prop="level" label="日志等级" width="100px"></el-table-column>
      <el-table-column prop="timeStamp" label="记录时间" width="180px"></el-table-column>
      <el-table-column prop="message" label="日志消息" width="1200px"></el-table-column>
    </BaseTable>
  </div>
</template>

<style lang="scss">
  
</style>