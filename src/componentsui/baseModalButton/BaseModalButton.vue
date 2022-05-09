<script setup lang="ts">
/*
组件说明：一个可以带有弹窗的按钮
组件用法：
<BaseModalButton v-model="visible">
  新增
  <template #content>
    ....
  </template>
</BaseModalButton>
插槽:
#default: 自定义按钮
#content: 自定义弹窗的内容
*/
const props = withDefaults(defineProps<{
  modelValue: boolean,
  // 弹窗的属性，参照element plus的dialog组件属性
  title?: string, // 弹窗标题
  width?: string, // 弹窗宽度
  //按钮的属性，参照element plus的button组件属性
  needButton?: boolean, // 是否需要按钮
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text',
  plain?: boolean,
  round?: boolean,
  circle?: boolean,
  loading?: boolean,
  disabled?: boolean,
  icon?: string,
  autoInsertSpace?: boolean
}>(), {
  needButton: true,
  title: '新增',
  width: '50vw',
  type: 'primary'
})

const emit = defineEmits<{
  (event: 'update:modelValue', visible: boolean): void,
  (event: 'confirm'): void,
  (event: 'cancel'): void
}>()

const onCancel = () => {
  if (props.modelValue) {
    emit('cancel')
    emit('update:modelValue', false)
  }
}
</script>

<template>
  <el-button
    v-if="needButton"
    @click="emit('update:modelValue', true)"
    :type="type"
    :plain="plain"
    :round="round"
    :circle="circle"
    :loading="loading"
    :disabled="disabled"
    :icon="icon"
    :auto-insert-space="autoInsertSpace"
  >
    <slot></slot>
  </el-button>
  <el-dialog
    append-to-body
    :model-value="modelValue"
    :title="title"
    :width="width"
    center
    @close="onCancel"
  >
    <slot name="content"></slot>
    <template #footer>
      <el-button
        style="width: 100px;"
        :auto-insert-space="true"
        @click="onCancel"
      >
        取消
      </el-button>
      <el-button
        style="width: 100px;"
        type="primary"
        :auto-insert-space="true"
        @click="emit('confirm')"
      >
        提交
      </el-button>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
</style>