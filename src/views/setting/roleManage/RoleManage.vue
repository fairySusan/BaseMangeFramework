<script setup lang="ts">
import {reactive,ref, onMounted} from 'vue'
import { useRequest } from '@/mixins/Hooks';
import {getAllRolesList} from '@/https/roles/Roles'
import {RolesItemI} from '@/https/roles/Type'
import {BaseTableSearchForm, BaseConfirmButton} from '@/componentsui'
import RoleForm from './component/RoleForm.vue'
import BaseModalButton from '../../../componentsui/baseModalButton/BaseModalButton.vue'

const queryData = reactive({
  Name: ''
})
const roleFormModalVisible = ref(false)
const isEdit = ref(false)
const deleteVisible = ref(false)
const currRole = ref<RolesItemI | null>(null)
const roleForm = ref<any>(null)
const {data, loading, run:getList} = useRequest<RolesItemI[]>(getAllRolesList,[], queryData)

const onClickEdit = (role: RolesItemI) => {
  currRole.value = role
  isEdit.value = true
  roleFormModalVisible.value = true
}

const onDelete = (role: RolesItemI) => {
  currRole.value = role
  deleteVisible.value = true;
}

</script>

<template>
  <div>
    <BaseTableSearchForm :model="queryData">
      <template #button>
        <el-button type="primary" @click="roleFormModalVisible = true; isEdit=false;">新增</el-button>
      </template>
    </BaseTableSearchForm>
    <el-table
      :data="data"
      size="medium"
      v-loading="loading"
    >
      <el-table-column prop="name" label="角色名称"></el-table-column>
      <el-table-column prop="isDefault" label="默认角色">
        <template #default="{row}">
          <el-switch
            inline-prompt
            v-model="row.isDefault"
            active-text="是"
            inactive-text="否"
          ></el-switch>
        </template>
      </el-table-column>

      <el-table-column prop="isLocked" label="锁定">
        <template #default="{row}">
          <el-switch
            inline-prompt
            v-model="row.isLocked"
            active-text="是"
            inactive-text="否"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column prop="action" label="操作">
        <template #default="{row}">
          <el-button type="text" class="tableActionBtn">菜单权限</el-button>
          <el-button
            type="text"
            class="tableActionBtn"
            @click="onClickEdit(row)"
          >
            编辑
          </el-button>
          <el-button type="text" class="tableActionBtn" @click="onDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <BaseModalButton
      v-model="roleFormModalVisible"
      :need-button="false"
      @cancel="roleForm?.onClose()"
      @confirm="roleForm?.onSubmit()"
      width="30vw"
    >
      <template #content>
        <RoleForm
          ref="roleForm"
          v-model="roleFormModalVisible"
          :data="currRole"
          v-model:isEdit="isEdit"
          @refresh="getList"
        ></RoleForm>
      </template>
    </BaseModalButton>

    <BaseConfirmButton
      v-model="deleteVisible"
      :need-button="false"
    >
      <template #content>
        <div style="text-align: center;">再次确认是否删除该角色？</div>
      </template>
    </BaseConfirmButton>
  </div>
</template>

<style lang="scss" scoped>
.tableActionBtn {
  @include tableActionBtn
}
</style>