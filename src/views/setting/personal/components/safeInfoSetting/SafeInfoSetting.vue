<script setup lang="ts">
import { useFormSubmit,useEncrypt } from '@/mixins/Hooks'
import { reactive, ref } from 'vue'
import ToolUtil from '@/mixins/ToolUtil'
import {ChangeSelfPasswordParamI} from '@/https/login/Type'
import {ChangePasswordByUser} from '@/https/login/Login'

const rules = {
  oldPassword: [
    {required: true, message: '请输入旧密码'}
  ],
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

const formData = reactive({
  oldPassword: '',
  newPassword: '',
  newPasswordConfirm: ''
})
const safeForm = ref<any>(null)

const {submit: submitFun, loading: btnLoading} = useFormSubmit<string, ChangeSelfPasswordParamI>(ChangePasswordByUser) 


const submit = () => {
  safeForm.value!.validate(async (valid:boolean) => {
    if (valid) {
      try {
        const {encryptPassword: encryptOldPassword} = await useEncrypt(formData.oldPassword)
        const result = await Promise.all([useEncrypt(formData.newPassword), useEncrypt(formData.newPasswordConfirm)])
        await submitFun({
          oldPassword: encryptOldPassword.value,
          newPassword: result[0].encryptPassword.value,
          newPasswordConfirm: result[1].encryptPassword.value
        })
      } catch(e){}
    }
  })
}
</script>

<template>
  <el-container direction="vertical">
    <div class="settingTitle">安全设置</div>
    <el-form ref="safeForm" :model="formData" label-position="left"  label-width="120px" :rules="rules">
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input v-model="formData.oldPassword" show-password></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="formData.newPassword" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="newPasswordConfirm">
        <el-input v-model="formData.newPasswordConfirm" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100px;" @click="submit" auto-insert-space>提交</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<style lang="scss" scoped>
.el-form {
  width: 20vw;
}
.settingTitle {
 @extend .marginBottomL;
 @extend .fontSizeM;
}
</style>