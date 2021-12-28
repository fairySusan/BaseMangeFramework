<script setup lang="ts">
import {reactive} from 'vue'
import {BaseLoadButton} from '@/componentsui'
import { useDownLoad, useRequest } from '@/mixins/Hooks';
import {ExportOrder} from '@/https/login/Login'

const params = reactive({
  PageIndex:1,
  PageSize:10,
  ReportType:0,
  SortField: 'State,StartDate',
  SortType: 'asc,asc'
})
const {run:onDownload, loading} = useDownLoad(ExportOrder,params)
</script>

<template>
<div>
  home home
  <el-button @click="onDownload">下载</el-button>
</div>
</template>