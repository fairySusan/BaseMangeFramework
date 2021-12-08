
<script setup lang="ts">
import { reactive} from 'vue'
import { MenuItemI } from './Type'
import SubMenu from './subMenu/SubMenu.vue';
 const menus = reactive<MenuItemI[]>([
    {
      name: "首页",
      icon: "takeaway-box",
      url: "/home"
    },
    {
      name: "列表",
      icon: "Tools",
      url: "/record"
    },
    {
      name: "个人中心",
      icon: "Sunset",
      url: "/personal",
      children: [
        {
          name: "重置密码",
          icon: "Sugar",
          url: "/personal",
        }
      ]
    }
  ])
</script>

<template>
  <el-aside width="200px">
    <el-menu>
      <template v-for="menu in menus" :key="menu.name">
        <SubMenu v-if="menu.children" :menuItem="menu"></SubMenu>
        <el-menu-item v-else>
          <el-icon>
            <component :is="menu.icon"></component>
          </el-icon>
          {{menu.name}}
        </el-menu-item>
      </template>
    </el-menu>
  </el-aside>
</template>
