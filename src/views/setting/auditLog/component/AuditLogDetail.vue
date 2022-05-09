<script setup lang="ts">
import {reactive, watch,ref} from 'vue'
import { useRequest } from '@/mixins/Hooks'
import {getAuditLogInfo} from '@/https/setting/auditLog/AuditLog'
import {AuditLogDetailI} from '@/https/setting/auditLog/Type'

enum ChangeTypeEnum {
  '创建',
  '修改',
  '删除'
}

const props = defineProps<{
  id?: string
}>()
const queryId = reactive({
  guid:props.id
})
const activeNames = ref([1])
const {data, run:getDtail} = useRequest<AuditLogDetailI>(getAuditLogInfo, null, queryId, false)

watch(() => props.id, () => {
  if (props.id) {
    queryId.guid = props.id
    getDtail()
  }
}, {immediate: true})
</script>

<template>
  <el-collapse v-model="activeNames">
    <el-collapse-item title="审计动作" name="1">
      <el-table
        :data="data ? data.actions : []"
      >
        <el-table-column prop="serviceName" label="服务名称"></el-table-column>
        <el-table-column prop="methodName" label="方法名"></el-table-column>
        <el-table-column prop="executionTime" label="执行时间"></el-table-column>
        <el-table-column prop="executionDuration" label="执行时长"></el-table-column>
        <el-table-column prop="parameters" label="参数"></el-table-column>
      </el-table>
    </el-collapse-item>
    <el-collapse-item title="数据审计信息" name="2">
      <el-table
        :data="data ? data.entityChanges : []"
      >
        <el-table-column prop="entityTypeFullName" label="实体类型"></el-table-column>
        <el-table-column prop="changeType" label="变更类型">
          <template #default="{row}">
            <span>{{ ChangeTypeEnum[row.changeType] }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="changeTime" label="变更时间"></el-table-column>
        <el-table-column prop="entityId" label="实体主键"></el-table-column>
      </el-table>
    </el-collapse-item>
    <el-collapse-item title="异常信息" name="3">
      <span>{{ data?.exceptions }}</span>
    </el-collapse-item>
    <el-collapse-item title="自定义信息" name="4">
      <span>{{ data?.comments }}</span>
    </el-collapse-item>
  </el-collapse>
</template>

<style lang="scss">
  
</style>