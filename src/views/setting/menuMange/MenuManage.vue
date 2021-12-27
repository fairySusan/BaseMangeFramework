<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRequest,useOptionRequest } from '@/mixins/Hooks';
import {getAllMenuList,changeMenuItem, deleteMenuItem} from '@/https/setting/menu/Menu'
import { MenuItemI } from '@/https/setting/menu/Type';
import MenuFormModal from './components/MenuFormModal.vue';
import {BaseConfirmPopButton} from '@/componentsui'

const {data, run: getList, loading} = useRequest<MenuItemI[]>(getAllMenuList, [])
const {submit: deleteSubmit} = useOptionRequest<string, {id:number}>(deleteMenuItem)
const currTable = ref<MenuItemI[]>([])
const currItem = ref<MenuItemI | null>(null)
const menuModalVisible = ref(false)
const isEdit = ref(false)
const deletePopVisible = ref(false)

watch(() => data.value, () => {
  currTable.value = [data.value[0]]
})

const onNodeClick = (item: MenuItemI) => {
  currTable.value = [item]
}

const onClickEdit = (item: MenuItemI) => {
  currItem.value = item
  isEdit.value = true
  menuModalVisible.value = true
}

const allowDrop = (draggingNode: any, dropNode: any, type: any) => {
  return true
}

const allowDrag = (draggingNode: any) => {
  return true
}
const handleDragEnd = async (draggingNode: any, dropNode: any, dropType: any, ev:any) => {
  const dragMenu = draggingNode.data
  if (dropType === 'before') {
    dragMenu.parentId = dropNode.data.parentId
    dragMenu.indexOrder = dropNode.data.indexOrder
  } else if (dropType === 'after') {
    dragMenu.parentId = dropNode.data.parentId
    dragMenu.indexOrder = dropNode.data.indexOrder
  } else if (dropType === 'inner') {
    dragMenu.parentId = dropNode.data.id
    dragMenu.indexOrder = 0
  }
  await changeMenuItem(dragMenu)
  getList()
}

const onDelete = async (id: number) => {
  try {
    await deleteSubmit({id})
    getList()
  } catch(e){}
}
</script>

<template>
  <el-container direction="vertical">
    <div class="baseTableSearchForm">
      <el-button style="width:100px" type="primary" @click="menuModalVisible = true; isEdit=false">新增菜单</el-button>
    </div>
    <el-container class="menuMainContainer" direction="horizontal">
      <el-aside v-loading="loading">
        <el-tree
          :data="data"
          node-key="id"
          :props="{
            label: 'name',
            children: 'children',
          }"
          :draggable="true"
          :allow-drop="allowDrop"
          :allow-drag="allowDrag"
          @node-click="onNodeClick"
          @node-drop="handleDragEnd"
          highlight-current
        >
          <template #default="{node}">
            <span class="fontSizeBase">
              <el-icon size="16px">
                <component :is="node.data.icon"></component>
              </el-icon>
              {{node.data.name}}
            </span>
          </template>
        </el-tree>
      </el-aside>
      <el-main>
        <el-table
          :data="currTable"
          size="medium"
         style="flex: 1; height:100%"
        >
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="icon" label="图标">
            <template #default="{row}">
              <el-icon size="16px">
                <component :is="row.icon"></component>
              </el-icon>
            </template>
          </el-table-column>
          <el-table-column prop="url" label="路径"></el-table-column>
          <el-table-column prop="action" label="操作">
            <template #default="{row}">
              <el-button type="text" class="tableActionBtn" @click="onClickEdit(row)">编辑</el-button>
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
    <MenuFormModal
      v-model="menuModalVisible"
      v-model:isEdit="isEdit"
      :data="currItem"
      @refresh="getList"
    ></MenuFormModal>
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

.baseTableSearchForm {
  background-color: white;
  padding: 10px;
  display: flex;
  justify-content: flex-end;
}
</style>