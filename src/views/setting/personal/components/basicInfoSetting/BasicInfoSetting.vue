<script setup lang="ts">
import { UserInfoHandler } from '@/mixins/UserUtil';
import {onMounted, reactive,ref} from 'vue'
import {useFormSubmit } from '@/mixins/Hooks';
import {rules} from './Type'
import {RegisterUserInfoResultI,ChangeUserInfoParamI} from '@/https/login/Type'
import {ChangeUserInfo} from '@/https/login/Login'

const formData = reactive({
  name: '',
  nickName: '',
  sex: 0,
  phone: '',
  eMail: ''
})
const personalForm = ref<any>(null)

onMounted(() => {
 getFormInfo()
})

// 提交方法
const {submit: submitFun, loading: btnLoading} = useFormSubmit<RegisterUserInfoResultI, ChangeUserInfoParamI>(ChangeUserInfo)

const getFormInfo = () => {
  const userInfo = UserInfoHandler.getUserInfo()
  if (userInfo) {
    formData.name = userInfo.name
    formData.nickName = userInfo.nickName
    formData.sex = userInfo.sex
    formData.phone = userInfo.phone
    formData.eMail = userInfo.eMail
  }
}

const submit = () => {
  personalForm.value!.validate().then(async (valid:boolean) => {
    if (valid) {
      await submitFun(formData)
    }
  })
}
</script>

<template>
  <el-container direction="vertical">
    <div class="settingTitle">个人基本信息设置</div>
    <el-form ref="personalForm" :model="formData" label-position="left"  label-width="80px" :rules="rules">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="别名" prop="nickName">
        <el-input v-model="formData.nickName"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio v-model="formData.sex" :label="0">男</el-radio>
        <el-radio v-model="formData.sex" :label="1">女</el-radio>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="formData.phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="eMail">
        <el-input v-model="formData.eMail"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100px;" @click="submit" auto-insert-space :loading="btnLoading">保存</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<style lang="scss" scoped>
.el-form {
  width: 20vw;
}
.settingTitle {
 @extend .marginTopBottom;
 @extend .fontSizeM;
}
</style>