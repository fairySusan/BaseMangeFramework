<script setup lang="ts">
import {FormControlI, ControlEnum} from './index'
defineProps<{
  formControls: FormControlI[],
  model: {[k:string]: any},
  formAttributes?: any // 参见element Form组件的属性
}>()
</script>

<template>
  <el-form
    :model="model"
    :label-position="formAttributes?.labelPosition" 
    :label-width="formAttributes?.labelWidth"
    :label-suffix="formAttributes?.labelSuffix"
    :hide-required-asterisk="formAttributes?.hideRequiredAsterisk"
    :show-message="formAttributes?.hideRequiredAsterisk"
    :inline-message="formAttributes?.inlineMessage"
    :status-icon="formAttributes?.statusIcon"
    :validate-on-rule-change="formAttributes?.validateOnRuleChange"
    :size="formAttributes.size"
    :disabled="formAttributes.disabled"
  >
    <el-form-item
      v-for="item in formControls"
      :prop="item.prop"
      :label="item.label"
      :label-width="item.labelWidth"
      :required="item.required"
      :rules="item.rules"
      :error="item.error"
      :show-message="item.showMessage"
      :inline-message="item.inlineMessage"
      :size="item.size"
    >
      <el-input
        v-if="item.control===ControlEnum['Input']"
        :type="item.type"
        v-model="model[item.prop]"
        :maxlength="item.maxlength"
        :minlength="item.minlength"
        :show-word-limit="item.showWordLimit"
        :placeholder="item.placeholder"
        :clearable="item.clearable"
        :show-password="item.showPassword"
        :disabled="item.disabled"
        :size="item.size"
        :prefix-icon="item.prefixIcon"
        :suffix-icon="item.suffixIcon"
        :rows="item.rows"
        :autosize="item.autosize"
        :autocomplete="item.autocomplete"
        :name="item.name"
        :readonly="item.readonly"
        :max="item.max"
        :min="item.min"
        :step="item.step"
        :resize="item.resize"
        :autofocus="item.autofocus"
        :label="item.label"
        :tabindex="item.tabindex"
        :validate-event="item.validateEvent"
        :input-style="item.inputStyle"
      ></el-input>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped></style>