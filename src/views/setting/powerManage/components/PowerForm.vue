<script setup lang="ts">
import {reactive,watch, ref} from 'vue'
import {powerFormRule} from '../Type'
import {addCurMenuPower, changeCurMenuPower} from '@/https/setting/power/Power'
import {BasePowerItemI,AllPowersResultI, ModifyPowerItemI, AddPowerItemI} from '@/https/setting/power/Type'
import { useFormSubmit, useRequest } from '@/mixins/Hooks'
import FunctionTable from './FunctionTable.vue'

interface FormDataI {
  id?: string,
  menuId: string,
  name: string,
  buttonName: string,
  buttonKey: string,
  functionIds: string[],
  isDefault: boolean,
  remark: string
}


const props = defineProps<{
  isEdit: boolean,
  modelValue: boolean,
  data: BasePowerItemI | null
}>()
const emit = defineEmits<{
  (event: 'update:modelValue', visible: false):void,
  (event: 'update:isEdit', isEdit: boolean):void,
  (event: 'refresh'):void
}>()

const powerForm = ref<any>(null)
const functions = ref<AllPowersResultI[]>([])
const showDrawer = ref(false)
const loading = ref(false)
const formData = reactive<FormDataI>({
  id: undefined,
  menuId: '',
  name: '',
  buttonName: '',
  buttonKey: '',
  functionIds: [],
  isDefault: false,
  remark: ''
})

const {submit: addPowerSubmit} = useFormSubmit<string, AddPowerItemI>(addCurMenuPower)
const {submit: changePowerSubmit} = useFormSubmit<string, ModifyPowerItemI>(changeCurMenuPower)

const initFormData = () => {
  if (props.data && props.isEdit) {
    (formData as ModifyPowerItemI).id = props.data.id
    formData.name = props.data.name
    formData.buttonName = props.data.buttonName
    formData.buttonKey = props.data.buttonKey
    formData.isDefault = props.data.isDefault
    formData.remark = props.data.remark
    functions.value = props.data.functions
  }
}

const resetForm = () => {
  powerForm.value.clearValidate() // 去除验证信息
  formData.id = undefined
  formData.menuId = ''
  formData.name = '',
  formData.buttonName = '',
  formData.buttonKey = '',
  formData.functionIds = [],
  formData.isDefault = false,
  formData.remark = ''
}

watch(() => props.isEdit, () => {
  if (props.data) {
    formData.menuId = props.data && props.data.menuId
  }
  initFormData()
}, {immediate: true})

const onSubmit = () => {
  powerForm.value.validate(async (valid: boolean) => {
    if (valid) {
       try {
        loading.value = true
        if (props.isEdit) {
          await changePowerSubmit(formData as ModifyPowerItemI)
        } else {
          await addPowerSubmit(formData as AddPowerItemI)
        }
        onClose()
        emit('refresh')
      } catch(e) {}
      loading.value = false
    }
  })
}

const onClose = () => {
  resetForm()
  emit('update:isEdit', !props.isEdit)
  emit('update:modelValue', false)
}

const onConfirmSelect = (val: AllPowersResultI[]) => {
  formData.functionIds = val.map(item => item.id)
  functions.value = val
  showDrawer.value = false
}

const onSelectFunction = () => {
  showDrawer.value = true
  functions.value = props.data!.functions
}

defineExpose({
  onClose,
  onSubmit
})
</script>

<template>
<el-form v-loading="loading" :model="formData" ref="powerForm" :rules="powerFormRule" label-width="110px">
  <el-form-item prop="name" label="权限名称">
    <el-input v-model="formData.name"></el-input>
  </el-form-item>
  <el-form-item prop="buttonName" label="按钮名称">
    <el-input v-model="formData.buttonName"></el-input>
  </el-form-item>
  <el-form-item prop="key" label="权限key值">
    <el-input v-model="formData.buttonKey"></el-input>
  </el-form-item>
  <el-form-item prop="functionIds" label="选择function">
    <el-tag v-for="item in functions">{{item.name}}</el-tag>
    <el-button type="text" @click="onSelectFunction">选择</el-button>
  </el-form-item>
  <el-form-item prop="isDefault" label="默认权限">
    <el-switch
      inline-prompt
      v-model="formData.isDefault"
      active-text="是"
      inactive-text="否"
    ></el-switch>
  </el-form-item>
  <el-form-item prop="remark" label="备注">
    <el-input v-model="formData.remark"></el-input>
  </el-form-item>
</el-form>
<el-drawer
  append-to-body
  v-model="showDrawer"
  title="选择指定的function"
  direction="rtl"
  size="60%"
>
  <el-scrollbar height="87vh">
    <FunctionTable
      v-model:functions="functions"
      @update:functions="onConfirmSelect"
    ></FunctionTable>
  </el-scrollbar>
</el-drawer>
</template>

<style lang="scss">
.el-drawer__header {
  margin-bottom: 0;
}
</style>
