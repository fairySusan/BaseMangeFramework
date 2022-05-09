<script setup lang="ts">
import {ref} from 'vue'
withDefaults(defineProps<{
  type?: string;
  success: boolean;
  percent: number
}>(), {
  type: 'primary'
})
const emit = defineEmits<{
  (event: 'confirm'):void
}>()

const visible = ref(false)

const onClose = () => {
  visible.value = false
}

</script>

<template>
  <el-button
    :type="type"
    @click="visible = true;emit('confirm')"
  >
    下载
  </el-button>
  <teleport to="body">
    <div v-if="visible" class="modelBack flexRowCenter">
      <el-icon @click="onClose" class="closeIcon" size="30" color="#ffffff"><close-bold /></el-icon>
      <div class="pregress">
        <span class="whiteFontColor">{{ success ? '下载完成' : '正在下载' }}</span>
        <el-progress :percentage="percent" :status="success ? 'success' : ''"></el-progress>
      </div>
    </div>
  </teleport>
</template>

<style lang="scss">
.modelBack {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vw;
  background-color: rgba($color: #000000, $alpha: 0.8);
}
.pregress {
  margin-top: 30px;
  width: 40%;
}
.closeIcon {
  position: absolute;
  right: 10px;
  top: 10px;
}
.closeIcon:hover {
  transform: rotateZ(360deg);
  transition: 0.5s transform ease-in-out;
}
</style>