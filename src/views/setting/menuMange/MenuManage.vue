<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRequest } from '@/mixins/Hooks';
import {getAllMenuList} from '@/https/menu/Menu'
import { MenuItemI } from '@/https/menu/Type';
import MenuFormModal from './components/MenuFormModal.vue';
import {BaseConfirmPopButton} from '@/componentsui'
import { MenuFormI } from './Type';

const {data} = useRequest<MenuItemI[]>(getAllMenuList, [])
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
</script>

<template>
  <el-container direction="vertical">
    <div class="baseTableSearchForm">
      <el-button style="width:100px" type="primary" @click="menuModalVisible = true; isEdit=false">新增菜单</el-button>
    </div>
    <el-container class="menuMainContainer" direction="horizontal">
      <el-aside>
        <el-tree
          :data="data"
          node-key="id"
          :props="{
            label: 'name',
          }"
          @node-click="onNodeClick"
        >
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
              <el-icon>
                <component :is="row.icon"></component>
              </el-icon>
            </template>
          </el-table-column>
          <el-table-column prop="url" label="路径"></el-table-column>
          <el-table-column prop="action" label="操作">
            <template #default="{row}">
              <el-button type="text" class="tableActionBtn" @click="onClickEdit(row)">编辑</el-button>
              <BaseConfirmPopButton v-model="deletePopVisible"  type="text" class="tableActionBtn">删除</BaseConfirmPopButton>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
    <MenuFormModal
      v-model="menuModalVisible"
      v-model:isEdit="isEdit"
      :data="currItem"
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