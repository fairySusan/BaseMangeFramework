<script setup lang="ts">
import {ref} from 'vue'
import { useRequest } from '@/mixins/Hooks';
import {GetAllRolesList} from '@/https/roles/Roles'
import { RolesItemI } from '@/https/roles/Type';
defineProps<{
  modelValue: any[]
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', selectRoles: any[]): void
}>()

const selectRoleIds = ref<number[]>([])
const {data, loading} = useRequest<RolesItemI[]>(GetAllRolesList, [])

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