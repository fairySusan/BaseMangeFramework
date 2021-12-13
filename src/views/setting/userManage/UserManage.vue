<script setup lang="ts">
import {reactive, ref} from 'vue'
import {BaseTableSearchForm, BaseTable, BaseModalButton} from '@/componentsui'
import { useRequest } from '@/mixins/Hooks'
import {getAllUsers} from '@/https/userManage/UserManage'
import {UserManageItemI} from '@/https/userManage/Type'
import {SexEnum} from './Type'
import UserFormModal from './components/userForm/UserFormModal.vue'

const visibleUserModal = ref(false)
const visibleReset = ref(false)

const queryData = reactive({
  StartCreatedTime: '',
  EndCreatedTime: '',
  Key: '',
  PageIndex: 1,
  PageSize: 10
})
const {data, loading} = useRequest<UserManageItemI[]>(getAllUsers, [], queryData)

</script>

<template>
<div>
  <div>
    <BaseTableSearchForm :model="queryData">
      <el-form-item label="开始日期">
        <el-date-picker v-model="queryData.StartCreatedTime"></el-date-picker>
      </el-form-item>
      <el-form-item label="结束日期">
        <el-date-picker v-model="queryData.EndCreatedTime"></el-date-picker>
      </el-form-item>
      <el-form-item label="关键字">
        <el-input v-model="queryData.Key"></el-input>
      </el-form-item>
      <template #button>
        <el-button type="primary" @click="visibleUserModal = true">新增</el-button>
      </template>
    </BaseTableSearchForm>
    <BaseTable
      :data="data"
      :loading="loading"
    >
      <el-table-column prop="account" label="账号" width="100" />
      <el-table-column prop="isLocked" label="锁定" width="100">
        <template #default="scope">
          <el-switch slot-scope={row,column,$index} v-model="scope.row.isLocked"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="150" />
      <el-table-column prop="nickName" label="别名" width="150" />
      <el-table-column prop="roles" label="角色" width="100">
        <template #default="{row}">
          <el-tag v-for="role in row.roles">{{role.name}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="sex" label="性别" width="100">
        <template #default="{row}">
          <span>{{SexEnum[row.sex]}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="jobNumber" label="工号" width="100" />
      <el-table-column prop="phone" label="手机号" width="120" />
      <el-table-column prop="eMail" label="邮箱" width="180" />
      <el-table-column prop="creationTime" label="创建日期" width="180" />
      <el-table-column prop="action" label="操作" width="180">
        <el-button type="text" @click="visibleUserModal = true" class="tableActionBtn">编辑</el-button>
      </el-table-column>
    </BaseTable>
  </div>

  <UserFormModal v-model="visibleUserModal" title="新增"></UserFormModal>
</div>
</template>

<style lang="scss" scoped>
</style>