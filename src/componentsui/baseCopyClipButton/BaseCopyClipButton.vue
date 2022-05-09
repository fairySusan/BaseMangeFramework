<script setup lang="ts">
/* 
组件说明：复制文本的按钮组件
组件使用：
<BaseCopyClipButton
  copyText="要复制的文字"
></BaseCopyClipButton>
 */
import { ElMessage } from 'element-plus';
import { useSlots } from 'vue';

const props = withDefaults(defineProps<{
  type?: string;
  copyText: string;
}>(), {
  type: 'text',
})
const slots = useSlots()

const onCopy = () => {
  navigator.clipboard.writeText(props.copyText).then(() => {
    ElMessage({
      message: '复制成功!',
      type: 'success',
    })
  }).catch(() => {
    ElMessage({
      message: '复制失败!',
      type: 'error',
    })
  })
}
</script>

<template>
  <el-button
    :type="type"
    @click="onCopy"
  >
    {{ slots.default ? slots.default() : '复制' }}
  </el-button>
</template>

<style lang="scss">
  
</style>