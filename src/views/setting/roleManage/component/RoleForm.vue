<script setup lang="ts">
import {reactive, watch, ref, onMounted} from 'vue'
import {RoleRules} from '../Type'
import {RolesItemI} from '@/https/roles/Type'
import {addNewRole, changeRoles} from '@/https/roles/Roles'
import {AddRolesParamI, ModifyRolesParamI} from '@/https/roles/Type'
import { useFormSubmit } from '@/mixins/Hooks'

const props = defineProps<{
  isEdit: boolean,
  modelValue: boolean,
  data: RolesItemI | null
}>()
const emit = defineEmits<{
  (event: 'update:modelValue', visible: false):void,
  (event: 'update:isEdit', isEdit: false):void,
  (event: 'refresh'):void
}>()

const isVisible = ref(false)
const roleForm = ref<any>(null)
const loading = ref(false)
const formData = reactive<AddRolesParamI | ModifyRolesParamI>({
  id: undefined,
  name: '',
  isDefault: false,
  isLocked: false,
  remark: ''
})

const {submit: addRoleSubmit} = useFormSubmit<string, AddRolesParamI>(addNewRole)
const {submit: changeRoleSubmit} = useFormSubmit<string, ModifyRolesParamI>(changeRoles)

onMounted(() => {
  initFormData()
})

watch(() => props.modelValue, () => {
  isVisible.value = props.modelValue
})

watch(() => props.isEdit, () => {
  initFormData()
})

const initFormData = () => {
  if (props.data && props.isEdit) {
    (formData as ModifyRolesParamI).id = props.data.id
    formData.name = props.data.name
    formData.isDefault = props.data.isDefault
    formData.isLocked = props.data.isLocked
    formData.remark = props.data.remark
  }
}

const onSubmit = () => {
  roleForm.value.validate(async (valid: boolean) => {
    if (valid) {
       try {
        loading.value = true
        if (props.isEdit) {
          await changeRoleSubmit(formData as ModifyRolesParamI)
        } else {
          await addRoleSubmit(formData as AddRolesParamI)
        }
        onClose()
        emit('refresh')
      } catch(e) {}
      loading.value = false
    }
  })
}

const resetForm = () => {
  roleForm.value.clearValidate() // 去除验证信息
  formData.name = ''
  formData.isDefault = false
  formData.isLocked = false
  formData.remark = ''
}

const onClose = () => {
  resetForm()
  emit('update:isEdit', false)
  emit('update:modelValue', false)
}

defineExpose({
  onClose,
  onSubmit
})
</script>

<template>
  <!-- <el-dialog
    append-to-body
    center
    v-model="isVisible"
    width="30vw"
    :title="isEdit?'编辑': '新增'"
    > -->
    <el-form v-loading="loading" ref="roleForm" :model="formData" :rules="RoleRules" label-width="80px">
      <el-form-item prop="name" label="角色名">
        <el-input v-model="formData.name" placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item required prop="isDefault" label="默认">
        <el-radio v-model="formData.isDefault" :label="true">是</el-radio>
        <el-radio v-model="formData.isDefault" :label="false">否</el-radio>
      </el-form-item>
      <el-form-item required prop="isLocked" label="锁定">
        <el-radio v-model="formData.isLocked" :label="true">是</el-radio>
        <el-radio v-model="formData.isLocked" :label="false">否</el-radio>
      </el-form-item>
      <el-form-item prop="remark" label="备注">
        <el-input v-model="formData.remark" placeholder="备注"></el-input>
      </el-form-item>
    </el-form>
    <!-- <div class="flexRowCenter footer">
      <el-button
        style="width: 100px;"
        :auto-insert-space="true"
        @click="onClose"
      >
        取消
      </el-button>
      <el-button
        style="width: 100px;"
        type="primary"
        :auto-insert-space="true"
      >
        提交
      </el-button>
    </div> -->
    <!-- <template #footer>
      <el-button
        style="width: 100px;"
        :auto-insert-space="true"
        @click="onClose"
      >
        取消
      </el-button>
      <el-button
        style="width: 100px;"
        type="primary"
        :auto-insert-space="true"
      >
        提交
      </el-button>
    </template>
  </el-dialog> -->
</template>

<style lang="scss" scoped>
.footer {
  margin-top: 40px;
}
</style>