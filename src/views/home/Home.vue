<script setup lang="ts">
import { ref } from '@vue/reactivity';

const MyName = ref(0)
</script>

<template>
  <div>
    home home{{ MyName }}
  </div>
</template>