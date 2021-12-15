<script setup lang="ts">
import {ref, watch} from 'vue'
const props = withDefaults(defineProps<{
  modelValue: boolean,
  // 弹窗的属性
  title?: string, // 弹窗标题
  width?: string, // 弹窗宽度
  //按钮的属性
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text',
  plain?: boolean,
  round?: boolean,
  circle?: boolean,
  loading?: boolean,
  disabled?: boolean,
  icon?: string,
  autoInsertSpace?: boolean
}>(), {
  title: '新增',
  width: '50vw',
  type: 'primary'
})

const emit = defineEmits<{
  (event: 'update:modelValue', visible: boolean): void
}>()

const visible = ref(false)

watch(() => props.modelValue, () => {
  visible.value = props.modelValue
})
</script>

<template>
  <el-button
    :class="type==='text' && 'tableActionBtn'"
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
    v-model="visible"
    :title="title"
    :width="width"
    center
    @close="emit('update:modelValue', false)"
  >
    <slot name="content"></slot>
    <!-- <template #footer>
      <el-button style="width: 100px;" auto-insert-space @click="emit('update:modelValue', false)">取消</el-button>
      <el-button style="width: 100px;" type="primary" auto-insert-space>提交</el-button>
    </template> -->
  </el-dialog>
</template>

<style lang="scss" scoped>
.tableActionBtn::after {
	content: "|";
	display: inline-block;
	margin: 0 5px;
	vertical-align: text-top;
}
.tableActionBtn:last-of-type::after {
	display: none;
}
</style>