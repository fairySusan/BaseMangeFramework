<script setup lang="ts">
/* 
组件说明：element ui的icons选择面板
组件使用：<VELIconForm @select="onSelectIcon"></VELIconForm>
 */
import {ref} from 'vue'
import * as ElementIcons from '@element-plus/icons'
const emit = defineEmits<{
  (event: 'select', iconName:string):void
}>()

const elIconNames = Object.keys(ElementIcons)
const keyWord = ref('')
const IconNames = ref<string[]>(elIconNames)

const onInput = (value: string) => {
  if (!value) {
    IconNames.value = elIconNames
  } else {
    IconNames.value = IconNames.value.filter(name => {
      return name.toLowerCase().includes(value.toLowerCase()) ||
      value.toLowerCase().includes(name.toLowerCase())
    })
  }
}
</script>

<template>
  <div height="40vh">
    <el-input v-model="keyWord" @input="onInput" placeholder="搜索图标" clearable></el-input>
    <el-scrollbar height="50vh">
      <div class="marginTop flexRowWrap">
        <div class="iconWrap" v-for="iconName in IconNames" @click="emit('select', iconName)">
          <el-icon size="24px">
            <component :is="iconName"></component>
          </el-icon>
          <span class="fontSizeMini">{{iconName}}</span>
        </div>
      </div>
     </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.iconWrap {
  width: 100px;
  margin-bottom: 10px;
  display: flex;
	flex-direction: column;
	align-items: center;
  &:hover, &:active {
    color: $color-primary;
    cursor: default;
  };
}
</style>