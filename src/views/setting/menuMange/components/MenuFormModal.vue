<script setup lang="ts">
import { useFormSubmit } from '@/mixins/Hooks'
import {ref, reactive, watch} from 'vue'
import {MenuFormI, menuFormRules} from '../Type'
import {addNewMenu, changeMenuItem} from "@/https/setting/menu/Menu"
import {AddMenuParamI, ChangeMenuParamI,MenuItemI} from  "@/https/setting/menu/Type"
import {BaseModalButton} from "@/componentsui"
import {VELIconForm} from '@/components'

const props = defineProps<{ 
  isEdit: boolean,
  modelValue: boolean,
  data: MenuItemI | null
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', visible:boolean): void,
  (event: 'update:isEdit', isEdit:boolean): void,
  (event: 'refresh'):void
}>()
const visible = ref(false)
const iconModalVisible = ref(false)
const menuForm = ref<any>(null)
const formData = reactive<MenuFormI>({
  parentId: null,
  id: null,
  name: '',
  icon: '',
  url: ''
})

const {submit: editSubmit, loading:editLoading} = useFormSubmit<string, ChangeMenuParamI>(changeMenuItem)
const {submit: addSubmit, loading: addLoading} = useFormSubmit<string, AddMenuParamI>(addNewMenu)

const onClose = () => {
  resetForm()
  emit('update:isEdit', !props.isEdit)
  emit('update:modelValue', false)
}

watch(() => props.modelValue, () => {
  visible.value = props.modelValue
})

watch(() => props.isEdit, () => {
  if (props.data && props.isEdit) {
    formData.parentId = props.data.parentId
    formData.id = props.data.id
    formData.name = props.data.name
    formData.icon = props.data.icon
    formData.url = props.data.url
  }
})

const onSubmit = async () => {
  try {
    if (props.isEdit) {
      await editSubmit(formData)
    } else {
      await addSubmit(formData)
    }
    emit('update:modelValue', false)
    emit('refresh')
  }catch(e) {}
}

const resetForm = () => {
  menuForm.value.clearValidate() // 去除验证信息
  formData.name = ''
  formData.icon = ''
  formData.url = ''
}

const onSelectIcon = (iconName: string) => {
  formData.icon = iconName
  iconModalVisible.value = false
}

</script>

<template>
  <el-dialog
    append-to-body
    v-model="visible"
    :title="isEdit?'编辑': '新增'"
    width="30vw"
    center
    @close="emit('update:modelValue', false)"
  >
    <el-form ref="menuForm" v-loading="editLoading || addLoading" :model="formData" label-width="80px" :rules="menuFormRules">
      <el-form-item prop="name" label="名称">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item prop="url" label="路径">
        <el-input v-model="formData.url"></el-input>
      </el-form-item>
      <el-form-item prop="url" label="图标">
        <el-icon size="24px" class="verticalAlignMid marginRight">
          <component :is="formData.icon"></component>
        </el-icon>
        <BaseModalButton
          v-model="iconModalVisible"
          title="选择图标"
          type="text"
        >
          {{formData.icon ? '重新选择' :'选择'}}
          <template #content>
            <VELIconForm @select="onSelectIcon"></VELIconForm>
          </template>
        </BaseModalButton>
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
        :loading="editLoading || addLoading"
      >
        提交
      </el-button>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
</style>