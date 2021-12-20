<script setup lang="ts">
/* 
组件说明：角色多选的Select组件
组件使用：<VRoleSelect v-model="roleIds"></VRoleSelect>
 */
import {ref} from 'vue'
import { useRequest } from '@/mixins/Hooks';
import {getAllRolesList} from '@/https/roles/Roles'
import { RolesItemI } from '@/https/roles/Type';
defineProps<{
  modelValue: any[]
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', selectRoles: any[]): void
}>()

const selectRoleIds = ref<number[]>([])
const {data, loading} = useRequest<RolesItemI[]>(getAllRolesList, [])

const onChange = (ids: number[]) => {
  selectRoleIds.value = ids;
  emit('update:modelValue', selectRoleIds.value)
}

</script>

<template>
  <el-select v-model="modelValue" multiple @change="onChange">
    <el-option
      v-for="item in data"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>

<style lang="scss" scoped>
.el-select {
  width: 100%;
}
</style>