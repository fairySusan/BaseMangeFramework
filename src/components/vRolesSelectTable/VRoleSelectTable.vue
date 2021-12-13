<script setup lang="ts">
import {ref} from 'vue'
import { useRequest } from '@/mixins/Hooks';
import {GetAllRolesList} from '@/https/roles/Roles'
import { RolesItemI } from '@/https/roles/Type';
defineProps<{
  modelValue: any[]
}>()

const emit = defineEmits<{
  (event: 'update', selectRoles: any[]): void
}>()

const selectRoles = ref([])
const {data, loading} = useRequest<RolesItemI[]>(GetAllRolesList, [])

const onChange = (val: any) => {
  selectRoles.value = val;
  emit('update', selectRoles.value)
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