<script setup lang="ts">
import {reactive, ref} from 'vue'
import {BaseTableSearchForm, BaseTable, BaseModalButton, BaseConfirmPopButton, BaseConfirmButton} from '@/componentsui'
import { useFormSubmit, useTableRequest } from '@/mixins/Hooks'
import {getAllUsers, changeUserIsLocked} from '@/https/userManage/UserManage'
import {UserManageItemI} from '@/https/userManage/Type'
import {SexEnum} from './Type'
import ToolUtil from '@/mixins/ToolUtil'
import UserFormModal from './components/userForm/UserFormModal.vue'
import ResetPasswordModal from './components/resetPassword/ResetPasswordModal.vue'

const visibleUserModal = ref(false)
const visiblePasswordModal = ref(false)
const isEdit = ref(false)
const currItem = ref<UserManageItemI | null>(null)
const confirmDelete = ref(false)

let queryData = reactive({
  StartCreatedTime: '',
  EndCreatedTime: '',
  Key: '',
  PageIndex: 1,
  PageSize: 10
})

const {data, loading, getList,onCurrentChange,onSizeChange} = useTableRequest<UserManageItemI[]>(getAllUsers,queryData);
const {submit: changeLock, loading:lockLoding} = useFormSubmit(changeUserIsLocked, {
  success: '操作成功！',
  error: '操作失败！'
})

const reset = () => {
  queryData.StartCreatedTime = ''
  queryData.EndCreatedTime = ''
  queryData.Key = ''
  queryData.PageIndex = 1
  getList()
}

const onClickEdit = (data: UserManageItemI) => {
  visibleUserModal.value = true
  isEdit.value = true
  currItem.value = data
}

const onChangeLock = async (isLocked: boolean, id: number) => {
  await changeLock({isLocked, id})
}

</script>

<template>
<div>
  <div>
    <BaseTableSearchForm :model="queryData" @search="getList" @reset="reset">
      <el-form-item label="开始日期">
        <el-date-picker
          value-format="YYYY-MM-DD"
          v-model="queryData.StartCreatedTime"
          :disabled-date="ToolUtil.disabledAfeterTodayDate"
          placeholder="开始日期"
        />
      </el-form-item>
      <el-form-item label="结束日期">
        <el-date-picker  
          value-format="YYYY-MM-DD"
          v-model="queryData.EndCreatedTime"
          :disabled-date="ToolUtil.disabledAfeterTodayDate"
          placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item label="关键字">
        <el-input v-model="queryData.Key" placeholder="关键字搜索"></el-input>
      </el-form-item>
      <template #button>
        <el-button type="primary" @click="visibleUserModal = true; isEdit = false">新增</el-button>
      </template>
    </BaseTableSearchForm>
    <BaseTable
      :data="data"
      :loading="loading"
      @currentChange="onCurrentChange"
      @sizeChange="onSizeChange"
    >
      <el-table-column prop="account" label="账号" width="100" />
      <el-table-column prop="isLocked" label="锁定" width="100">
        <template #default="{row}">
          <el-switch
            v-model="row.isLocked"
            @change="(isLocked: boolean) => onChangeLock(isLocked, row.id)"
            inline-prompt
            active-text="是"
            inactive-text="否"
          ></el-switch>
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
      <el-table-column prop="action" label="操作" width="180" fixed="right">
        <template #default="{row}">
          <el-button
            type="text"
            @click="onClickEdit(row)"
            class="tableActionBtn"
          >
            编辑
          </el-button>
          <el-button
            type="text"
            @click="visiblePasswordModal = true"
            class="tableActionBtn"
          >
            重置密码
          </el-button>
           <el-button
            type="text"
            @click="confirmDelete = true"
            class="tableActionBtn"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </BaseTable>
  </div>

  <BaseConfirmButton
    :needButton="false"
    type="text"
    v-model="confirmDelete"
  >
    <template #content>
      <div style="text-align: center;">再次确认是否删除该用户？</div>
    </template>
  </BaseConfirmButton>

  <UserFormModal
    v-model="visibleUserModal"
    v-model:isEdit="isEdit"
    :data="currItem"
    @refresh="getList"
  ></UserFormModal>

  <ResetPasswordModal
    v-model="visiblePasswordModal"
    :data="currItem"
  ></ResetPasswordModal>
</div>
</template>

<style lang="scss" scoped>
</style>