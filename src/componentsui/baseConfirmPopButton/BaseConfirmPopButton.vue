<script setup lang="ts">
/* 
组件说明：在<BaseModalButton></BaseModalButton>组件的基础上更加的具体的，确认confirmPop按钮组件
组件使用:
<BaseConfirmPopButton
  v-model="visible"
  @confirm="onConfirm"
  @cancel="onCancel"
></BaseConfirmPopButton>
插槽：
#default: 按钮的文本
 */
import {ref, watch} from 'vue'
const props = withDefaults(defineProps<{
  modelValue: boolean,
  // popconfirm的属性，参照element plus的popconfirm组件属性
  confirmButtonText?: string,
  cancelButtonText?: string,
  title?: string,
  titleIcon?: string,
  titleIconColor?: string,
  //按钮的属性，参照element plus的button组件属性
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text',
  plain?: boolean,
  round?: boolean,
  circle?: boolean,
  loading?: boolean,
  disabled?: boolean,
  icon?: string,
  autoInsertSpace?: boolean
}>(), {
  type: 'primary',
  confirmButtonText: '确认',
  cancelButtonText: '取消',
  title: '确认删除？',
  titleIcon: 'InfoFilled',
  titleIconColor: 'red'
})
const emit = defineEmits<{
  (event: 'update:modelValue', visible: boolean): void,
  (event: 'confirm'):void,
  (event: 'cancel'):void
}>()

const visible = ref(false)

watch(() => props.modelValue, () => {
  visible.value = props.modelValue
})
</script>

<template>
<el-popconfirm
  :confirm-button-text="confirmButtonText"
  :cancel-button-text="cancelButtonText"
  :icon="titleIcon"
  :icon-color="titleIconColor"
  :title="title"
  @confirm="emit('confirm')"
  @cancel="emit('cancel')"
>
  <template #reference>
    <el-button
      @click="emit('update:modelValue', true)"
      :type="type"
      :plain="plain"
      :round="round"
      :circle="circle"
      :loading="loading"
      :disabled="disabled"
      :icon="icon"
      :auto-insert-space="autoInsertSpace"
      class="defaultConfirmButton"
    >
      <slot>删除</slot>
    </el-button>
  </template>
</el-popconfirm>
</template>

<style lang="scss" scoped>
.defaultConfirmButton {
  margin-left: 0;
}
</style>