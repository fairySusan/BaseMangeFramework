<script setup lang="ts">
import {reactive, ref,watch} from 'vue'
import {VRoleSelect} from '@/components'
import { userFormRules,UserFormI } from '../../Type'
import { UserManageItemI,ModifyUserInfoParamsI, AddUserInfoParamsI } from '@/https/setting/userManage/Type'
import { useFormSubmit } from '@/mixins/Hooks'
import {addUserInfo, changeUserInfo} from '@/https/setting/userManage/UserManage'

const props = defineProps<{
  modelValue: boolean,
  isEdit: boolean // 是编辑弹窗还是新增弹窗
  data: UserManageItemI | null
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', visible: boolean): void,
  (event: 'update:isEdit', isEdit: boolean): void,
  (event: 'refresh'): void
}>()

const visible = ref(false)
const userform = ref<any>(null)
const loading = ref(false)

const formData = reactive<UserFormI>({
  account: '',
  name: '',
  nickName: '',
  phone: '',
  jobNumber:'',
  eMail: '',
  sex: 0,
  roleIds: []
})

const {submit:editUserSubmit} = useFormSubmit<boolean, ModifyUserInfoParamsI>(changeUserInfo)
const {submit: addUserSubmit} = useFormSubmit<boolean, AddUserInfoParamsI>(addUserInfo)

watch(() => props.modelValue, () => {
  visible.value = props.modelValue
})

watch(() => props.isEdit, () => {
  if (props.data && props.isEdit) {
    formData.id = props.data.id
    formData.account = props.data.account
    formData.name = props.data.name
    formData.nickName = props.data.nickName
    formData.phone = props.data.phone
    formData.jobNumber = props.data.jobNumber
    formData.eMail = props.data.eMail
    formData.sex = props.data.sex
    formData.roleIds = props.data.roles.map(item => item.id)
  }
})

const onClose = () => {
  resetForm()
  emit('update:isEdit', false)
  emit('update:modelValue', false)
}

const resetForm = () => {
  userform.value.clearValidate() // 去除验证信息
  formData.account = ''
  formData.name = ''
  formData.nickName = ''
  formData.phone = ''
  formData.jobNumber = ''
  formData.eMail = ''
  formData.sex = 0
  formData.roleIds = []
}

const onSubmit = () => {
  userform.value.validate(async (valid: boolean) => {
    if (valid) {
      try {
        loading.value = true
        if (props.isEdit) {
          await editUserSubmit(formData as ModifyUserInfoParamsI)
        } else {
          await addUserSubmit(formData as AddUserInfoParamsI)
        }
        onClose()
        emit('refresh')
      } catch(e) {}
      loading.value = false
    }
  })
}

</script>

<template>
  <el-dialog
    append-to-body
    v-model="visible"
    :title="isEdit?'编辑': '新增'"
    width="40vw"
    center
    @close="emit('update:modelValue', false)"
  >
    <el-form ref="userform" v-loading="loading" :model="formData" label-width="80px" inline :rules="userFormRules">
      <el-form-item prop="account" label="账号">
        <el-input :disabled="isEdit" placeholder="请输入账号" v-model="formData.account"></el-input>
      </el-form-item>
      <el-form-item prop="name" label="姓名">
        <el-input placeholder="请输入姓名" v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item prop="nickName" label="别名">
        <el-input placeholder="请输入别名" v-model="formData.nickName"></el-input>
      </el-form-item>
      <el-form-item prop="phone" label="手机号">
        <el-input placeholder="请输入手机号" v-model="formData.phone"></el-input>
      </el-form-item>
      <el-form-item prop="jobNumber" label="工号">
        <el-input placeholder="请输入工号" v-model="formData.jobNumber"></el-input>
      </el-form-item>
      <el-form-item prop="eMail" label="邮箱">
        <el-input placeholder="请输入邮箱" v-model="formData.eMail"></el-input>
      </el-form-item>
      <el-form-item prop="sex" label="性别">
        <el-radio :label="0" v-model="formData.sex">男</el-radio>
        <el-radio :label="1" v-model="formData.sex">女</el-radio>
      </el-form-item>
      <el-form-item style="width: 97%" prop="roleIds" label="角色">
        <VRoleSelect v-model="formData.roleIds"></VRoleSelect>
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
        :loading="loading"
      >
        提交
      </el-button>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
</style>