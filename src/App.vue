<script setup lang="ts">
</script>

<template>
 <router-view></router-view>
</template>

<style lang="scss">
body, html {
  padding: 0;
  margin: 0;
  background-color: $backgroundColor;
  color: map-get($text-color, 'primary')
}
</style>

