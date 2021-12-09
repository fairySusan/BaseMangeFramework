<script setup lang="ts">
import {reactive} from 'vue'
import BaseForm from '@/componentsui/baseForm/BaseForm.vue';
import {formControls} from './Type'
const formData = reactive({
  name: '',
  sex: ''
})
</script>

<template>
  <el-container direction="vertical">
    <div class="settingTitle">个人基本信息设置</div>
    <BaseForm
      :form-controls="formControls"
      :model="formData"
      :formAttributes="{
      }"
    ></BaseForm>
    <!-- <el-form :model="formData" label-position="left"  label-width="60px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="别名" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-input v-model="formData.sex"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="sex">
        <el-input v-model="formData.sex"></el-input>
      </el-form-item>
       <el-form-item label="邮箱" prop="sex">
        <el-input v-model="formData.sex"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100px;" auto-insert-space>保存</el-button>
      </el-form-item>
    </el-form> -->
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