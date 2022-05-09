<script setup lang="ts">
import { useStore } from './store';
import {onMounted} from 'vue'
const store = useStore()

onMounted(() => {
  store.commit('common/setPageSize')
})
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="el-fade-in-linear">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style lang="scss" src="./App.scss"></style>
 
