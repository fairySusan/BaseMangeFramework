<script setup lang="ts">
import { useTableRequest } from '@/mixins/Hooks'
import {reactive, ref} from 'vue'
import moment, { Moment } from 'moment'
import {getAuditLogList} from '@/https/setting/auditLog/AuditLog'
import {AuditListItemI} from '@/https/setting/auditLog/Type'
import {BaseTableSearchForm, BaseTable} from '@/componentsui'
import AuditLogDetail from './component/AuditLogDetail.vue'

const queryData = reactive({
  StartTime:'',
  EndTime:'',
  Keyword:'',
  PageIndex:1,
  PageSize:10
})
const  {data, loading, getList, onCurrentChange, onSizeChange} = useTableRequest<AuditListItemI[]>(getAuditLogList, queryData)
const currItem = ref<AuditListItemI | null>(null)
const drawerVisible = ref(false)

const onReset = () => {
  queryData.StartTime = ''
  queryData.EndTime = ''
  queryData.Keyword = ''
  queryData.PageIndex = 1
  getList()
}

const onViewDetail = (row: AuditListItemI) => {
  currItem.value = row
  drawerVisible.value = true
}

</script>

<template>
<div>
 <BaseTableSearchForm
    :model="queryData"
    @search="getList"
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
  </BaseTableSearchForm>
   <BaseTable
    :data="data"
    :loading="loading"
    @currentChange="onCurrentChange"
    @sizeChange="onSizeChange"
  >
    <el-table-column prop="applicationName" label="应用名称"></el-table-column>
    <el-table-column prop="userName" label="审计用户"></el-table-column>
    <el-table-column prop="executionTime" label="审计时间" width="180px">
      <template #default="{row}">
        {{moment(row.executionTime).format('YYYY-MM-DD HH:mm:ss')}}
      </template>
    </el-table-column>
    <el-table-column prop="executionDuration" label="执行时长"></el-table-column>
    <el-table-column prop="httpMethod" label="请求类型"></el-table-column>
    <el-table-column prop="clientIpAddress" label="客户端IP"></el-table-column>
    <el-table-column prop="browserInfo" label="浏览器信息" show-overflow-tooltip></el-table-column>
    <el-table-column prop="httpStatusCode" label="响应码"></el-table-column>
    <el-table-column prop="url" label="请求url" show-overflow-tooltip></el-table-column>
    <el-table-column prop="action" label="操作">
      <template #default="{row}">
        <el-button type="text" @click="onViewDetail(row)">查看详情</el-button>
      </template>
    </el-table-column>
  </BaseTable>

  <el-drawer
    v-model="drawerVisible"
    direction="rtl"
    title="日志详情"
    size="50%"
  >
    <AuditLogDetail
      :id="currItem?.id"
    >
    </AuditLogDetail>
  </el-drawer>
</div>
</template>

<style lang="scss">
  
</style>