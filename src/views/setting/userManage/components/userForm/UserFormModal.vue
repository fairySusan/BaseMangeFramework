<script setup lang="ts">
import {reactive, ref,watch} from 'vue'
import {VRoleSelectTable} from '@/components'
import { userFormRules } from '../../Type'

const props = defineProps<{
  modelValue: boolean,
  title: string
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', visible: boolean): void
}>()

const visible = ref(false)

const formData = reactive({
  account: '',
  nickName: '',
  phone: '',
  jobNumber:'',
  eMail: '',
  sex: '',
  roles: []
})

watch(() => props.modelValue, () => {
  visible.value = props.modelValue
})
</script>

<template>
  <el-dialog
    append-to-body
    v-model="visible"
    :title="title"
    width="40vw"
    center
    @close="emit('update:modelValue', false)"
  >
    <el-form label-width="80px" inline :rules="userFormRules">
      <el-form-item prop="account" label="账户名">
        <el-input placeholder="请输入账户名" v-model="formData.account"></el-input>
      </el-form-item>
      <el-form-item prop="account" label="别名">
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
      <el-form-item required style="width: 97%" prop="roles" label="角色">
        <VRoleSelectTable v-model="formData.roles"></VRoleSelectTable>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button style="width: 100px;" :auto-insert-space="true" @click="emit('update:modelValue', false)">取消</el-button>
      <el-button style="width: 100px;" type="primary" :auto-insert-space="true">提交</el-button>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.btnGroup {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
</style>