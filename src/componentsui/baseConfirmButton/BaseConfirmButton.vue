<script setup lang="ts">
/* 
组件说明：在<BaseModalButton></BaseModalButton>组件的基础上更加的具体的，确认弹窗按钮组件
组件使用:
<BaseConfirmButton
  v-model="visible"
  @confirm="onConfirm"
></BaseConfirmButton>
插槽：
#default: 按钮的文本
#title: 弹窗的标题
#content: 弹窗的内容
 */
import {ref, watch} from 'vue'
const props = withDefaults(defineProps<{
  modelValue: boolean,
  // 弹窗的属性，参照element plus的dialog组件属性
  title?: string, // 弹窗标题
  titleIcon?: string, // 弹窗标题的图标
  width?: string, // 弹窗宽度
  //按钮的属性，参照element plus的button组件属性
  needButton?: boolean, // 是否需要内置的默认按钮
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
  title: '确认弹窗',
  titleIcon: 'InfoFilled',
  titleIconColor: 'red',
  width: '28vw',
  type: 'primary'
})
const emit = defineEmits<{
  (event: 'update:modelValue', visible: boolean): void,
  (event: 'confirm'):void
}>()

const visible = ref(false)

watch(() => props.modelValue, () => {
  visible.value = props.modelValue
})
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
    <slot>删除</slot>
  </el-button>
  <el-dialog
    append-to-body
    v-model="visible"
    :title="title"
    :width="width"
    center
    @close="emit('update:modelValue', false)"
  >
    <template #title>
      <slot name="title">
        <div class="flexCenter">
          <el-icon>
            <component :is="titleIcon"></component>
          </el-icon>
          <div class="titleText">{{ title }}</div>
        </div>
      </slot>
    </template>
    <slot name="content"></slot>
    <template #footer>
      <el-button @click="emit('update:modelValue', false)">取消</el-button>
      <el-button type="danger" @click="emit('confirm')">确认</el-button>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.titleText {
  margin-left: 10px;
}
</style>