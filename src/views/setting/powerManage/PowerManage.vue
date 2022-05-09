<script setup lang="ts">
import {ref,reactive} from 'vue'
import {BaseTableSearchForm, BaseConfirmPopButton, BaseModalButton} from '@/componentsui'
import PowerForm from './components/PowerForm.vue'
import {useRequest, useFormSubmit} from '@/mixins/Hooks'
import { MenuItemI } from '@/https/setting/menu/Type'
import {BasePowerItemI} from '@/https/setting/power/Type'
import {getCurMenuPowerList, deletePowerList} from '@/https/setting/power/Power'
import {getAllMenuList} from '@/https/setting/menu/Menu'

const powerModalVisible = ref(false)
const deletePopVisible = ref(false)
const isEdit = ref(false)
const powerForm = ref<any>(null)
const currPowerData = ref<BasePowerItemI | null>(null)
const queryPower = reactive<{menuid:null | string}>({
  menuid: null
})

const {data} = useRequest<MenuItemI[]>(getAllMenuList, [])
const {data:powerList, run:getPowerList, loading: tableLoading} = useRequest<BasePowerItemI[]>(getCurMenuPowerList, [], queryPower, false)
const {submit: onDeletePower} = useFormSubmit<string, string>(deletePowerList,{
  success: '操作成功！',
  error: '操作失败！'
})

// const {submit: onChangeDefault} = useFormSubmit(changeRolesDefaultStatus, {
//   success: '操作成功！',
//   error: '操作失败！'
// })

const onNodeClick = async (item: MenuItemI) => {
  queryPower.menuid = item.id
  try {
    await getPowerList()
  } catch(e){
    console.log(e)
  }
}

const onClickEdit = (item: BasePowerItemI) => {
  isEdit.value = true
  currPowerData.value = item
  powerModalVisible.value = true
}

const onDelete = async (id: string) => {
  try {
    await onDeletePower(id)
    getPowerList()
  } catch (e) {
    console.log(e)
  }
}

</script>

<template>
  <el-container direction="vertical">
    <BaseTableSearchForm :model="{}" :is-search-form="false">
      <template #button>
        <!-- <el-button type="primary" @click="powerModalVisible = true; isEdit=false;">新增菜单权限</el-button> -->
        <el-button type="primary" @click="onClickEdit">新增菜单权限</el-button>
      </template>
    </BaseTableSearchForm>
    <el-container class="menuMainContainer" direction="horizontal">
      <el-aside>
        <el-tree
          :data="data"
          node-key="id"
          :props="{
            label: 'name',
            children: 'children',
          }"
          :draggable="true"
          @node-click="onNodeClick"
        >
        </el-tree>
      </el-aside>
      <el-main>
        <el-table
          :data="powerList"
          size="medium"
          style="flex: 1; height:100%"
          v-loading="tableLoading"
        >
          <el-table-column prop="name" label="权限名称"></el-table-column>
          <el-table-column prop="buttonName" label="按钮名称"></el-table-column>
          <el-table-column prop="isDefault" label="默认权限">
            <template #default="{row}">
              <el-switch
                inline-prompt
                v-model="row.isDefault"
                active-text="是"
                inactive-text="否"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
          <el-table-column prop="action" label="操作">
            <template #default="{row}">
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
      </el-main>
    </el-container>
    <BaseModalButton 
      v-model="powerModalVisible"
      :need-button="false"
      @cancel="powerForm?.onClose()"
      @confirm="powerForm?.onSubmit()"
      width="30vw"
    >
      <template #content>
        <PowerForm
          ref="powerForm"
          :data="currPowerData"
          v-model="powerModalVisible"
          v-model:isEdit="isEdit"
          @refresh="getPowerList"
        ></PowerForm>
      </template>
    </BaseModalButton>
  </el-container>
</template>

<style lang="scss" scoped>
.el-main {
  padding-top: 0;
  padding-right: 0;
  padding-bottom: 0;
}
.menuMainContainer {
  margin-top: 10px;
}
.tableActionBtn {
  @include tableActionBtn
}
</style>