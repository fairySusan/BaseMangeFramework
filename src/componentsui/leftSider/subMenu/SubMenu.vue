<script setup lang="ts">
import { MenuItemI } from '../Type'

defineProps<{
  menuItem: MenuItemI
}>()
</script>

<template>
  <el-sub-menu>
    <template #title>
      <el-icon>
        <component :is="menuItem.icon"></component>
      </el-icon>
      {{menuItem.name}}
    </template>
    <template v-for="menu in menuItem.children" :key="menu.name">
      <SubMenu v-if="menu.children" :menuItem="menu"></SubMenu>
      <el-menu-item v-else>
        <el-icon>
          <component :is="menu.icon"></component>
        </el-icon>
        {{menu.name}}
      </el-menu-item>
    </template>
  </el-sub-menu>
</template>