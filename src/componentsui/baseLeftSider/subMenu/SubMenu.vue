<script setup lang="ts">
import { MenuItemI } from '@/https/setting/menu/Type'

defineProps<{
  menuItem: MenuItemI
}>()
</script>

<template>
  <el-sub-menu :index="menuItem.id">
    <template #title>
      <el-icon>
        <component :is="menuItem.icon"></component>
      </el-icon>
      {{ menuItem.name }}
    </template>
    <template v-for="menu in menuItem.children" :key="menu.name">
      <SubMenu v-if="menu.children.length>0" :menuItem="menu"></SubMenu>
      <el-menu-item v-else :index="menu.id" :route="{path: menu.url}">
        <el-icon>
          <component :is="menu.icon"></component>
        </el-icon>
        {{ menu.name }}
      </el-menu-item>
    </template>
  </el-sub-menu>
</template>