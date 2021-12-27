<script setup lang="ts">
import { useFormSubmit,useEncrypt } from '@/mixins/Hooks'
import { reactive, ref, watch } from 'vue'
import {ChangePasswordAdminI} from '@/https/login/Type'
import {ChangeUserPasswordAdmin} from '@/https/login/Login'
import ToolUtil from '@/mixins/ToolUtil'
import { UserManageItemI } from '@/https/setting/userManage/Type'
const props = defineProps<{
  modelValue: boolean,
  data: UserManageItemI | null
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', visible: boolean): void,
}>()


const formData = reactive({
  newPassword: '',
  newPasswordConfirm: ''
})

const rules = {
  newPassword: [
    {required: true, message: '请输入新密码'},
    {validator: ToolUtil.validatePassword, }
  ],
  newPasswordConfirm: [
    {required: true, message: '请确认新密码'},
    {validator: (rule:any, value:string, callback:Function) => {
      if (value === formData.newPassword) {
        callback()
      } else {
        callback('两次密码输入不一致')
      }
    }, trigger: 'blur'}
  ]
}
const visible = ref(false)
const passwordForm = ref<any>(null)
const {submit: submitFun, loading: btnLoading} = useFormSubmit<string, ChangePasswordAdminI>(ChangeUserPasswordAdmin) 

watch(() => props.modelValue, () => {
  visible.value = props.modelValue
})

const onSubmit = () => {
  passwordForm.value!.validate(async (valid:boolean) => {
    if (valid) {
      try {
        const {encryptPassword} = await useEncrypt(formData.newPassword)
        await submitFun({
          id: props.data!.id,
          password: encryptPassword.value
        })
      } catch(e){}
    }
  })
}

const onClose = () => {
  resetForm()
  emit('update:modelValue', false)
}

const resetForm = () => {
  passwordForm.value.clearValidate()
  formData.newPassword = ''
  formData.newPasswordConfirm = ''
}

</script>

<template>
  <el-dialog
    append-to-body
    v-model="visible"
    title="重置密码"
    width="28vw"
    center
    @close="emit('update:modelValue', false)"
  >
    <el-form ref="passwordForm" :model="formData" label-position="left"  label-width="120px" :rules="rules">
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="formData.newPassword" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="newPasswordConfirm">
        <el-input v-model="formData.newPasswordConfirm" show-password></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
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
        @click="onSubmit"
        :loading="btnLoading"
      >
        提交
      </el-button>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped></style>