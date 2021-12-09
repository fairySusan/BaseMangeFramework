
<script setup lang="ts">
import SubMenu from './subMenu/SubMenu.vue';
import { useRequest } from '@/mixins/Hooks';
import { GetCureentUserMenus } from '@/https/menu/Menu'
import { MenuItemI } from '@/https/menu/Type'

const {data: menus} = useRequest<MenuItemI[]>(GetCureentUserMenus,[])

const onClickMenu = (index: number, indexPath: string, item:MenuItemI, routeResult: any) => {
  console.log(item)
}

</script>

<template>
  <el-aside width="200px">
    <div class="title">This is Title</div>
    <el-scrollbar>
      <el-menu @select="onClickMenu" :router="true">
        <template v-for="menu in menus" :key="menu.name">
          <SubMenu v-if="menu.children.length>0" :menuItem="menu"></SubMenu>
          <el-menu-item v-else :index="menu.id" :route="{path:menu.url}">
            <el-icon>
              <component :is="menu.icon"></component>
            </el-icon>
            {{menu.name}}
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<style lang="scss" scoped>
.el-aside {
  background-color: $background-color-base;
}
.title {
  height: map-get( $header,'height');
  line-height: map-get( $header,'height');
  text-align: center;
  color:white;
  font-weight: bold;
  background-color: map-get($colors,'primary', 'light-3');
}
.el-scrollbar {
  height: calc(100% - map-get( $header,'height'));
}
</style>
