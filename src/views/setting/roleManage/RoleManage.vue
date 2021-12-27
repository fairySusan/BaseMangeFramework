<script setup lang="ts">
import {reactive,ref} from 'vue'
import { useOptionRequest, useRequest } from '@/mixins/Hooks'
import MenuPowerTree from './component/MenuPowerTree.vue'
import {getAllRolesList, deleteRoles, changeRolesLockedStatus} from '@/https/setting/roles/Roles'
import {RolesItemI} from '@/https/setting/roles/Type'
import {BaseTableSearchForm, BaseConfirmPopButton, BaseModalButton} from '@/componentsui'
import RoleForm from './component/RoleForm.vue'

const queryData = reactive({
  Name: ''
})
const roleFormModalVisible = ref(false)
const isEdit = ref(false)
const deletePopVisible = ref(false)
const powerVisible = ref(false)
const currRole = ref<RolesItemI | null>(null)
const roleForm = ref<any>(null)

const {submit: onChangeLock} = useOptionRequest(changeRolesLockedStatus)
const {data, loading, run:getList} = useRequest<RolesItemI[]>(getAllRolesList,[], queryData)
const {submit: onDelectRole} = useOptionRequest(deleteRoles)

const onClickEdit = (role: RolesItemI) => {
  currRole.value = role
  isEdit.value = true
  roleFormModalVisible.value = true
}

const onClickMenuPower = (role: RolesItemI) => {
  powerVisible.value = true
  currRole.value = role
}

const onDelete = async (role: RolesItemI) => {
  try {
    await onDelectRole(role.id)
    getList()
  }catch(e){}
}

</script>

<template>
  <div>
    <BaseTableSearchForm :model="queryData" :is-search-form="false">
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
            @change="(isLocked: boolean) => onChangeLock({isLocked, id:row.id})"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column prop="action" label="操作">
        <template #default="{row}">
          <el-button type="text" class="tableActionBtn"  @click="onClickMenuPower(row)">菜单权限</el-button>
          <el-button
            type="text"
            class="tableActionBtn"
            @click="onClickEdit(row)"
          >
            编辑
          </el-button>
          <BaseConfirmPopButton
            v-model="deletePopVisible" 
            type="text"
            class="tableActionBtn"
            @confirm="onDelete(row.id)"
          >
            删除
          </BaseConfirmPopButton>
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

    <el-drawer
      v-model="powerVisible"
      title="菜单权限"
      direction="rtl"
    >
      <el-scrollbar height="89vh">
        <MenuPowerTree
          :id="currRole?.id"
          @refersh="getList"
          v-model="powerVisible"
        ></MenuPowerTree>
      </el-scrollbar>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
.tableActionBtn {
  @include tableActionBtn
}
</style>