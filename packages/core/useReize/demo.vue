<script setup lang="ts">
import { useCounter } from '@vueuse/core'

const { count, inc, dec } = useCounter()
</script>

<template>
  <div class="box" />
</template>

<style scoped lang="postcss">
.box {
  width: 200px;
  height: 200px;
  background-color: lightblue;
  position: relative;
}

.box::before {
  content: '';
  width: 10px;
  height: 10px;
  background-color: gray;
  position: absolute;
  top: 0;
  left: 0;
}

.box::before::before {
  content: '';
  width: 10px;
  height: 10px;
  background-color: gray;
  position: absolute;
  top: 0;
  left: calc(100% - 10px);
}

.box::after {
  content: '';
  width: 10px;
  height: 10px;
  background-color: gray;
  position: absolute;
  bottom: 0;
  left: 0;
}

.box::after::after {
  content: '';
  width: 10px;
  height: 10px;
  background-color: gray;
  position: absolute;
  bottom: 0;
  left: calc(100% - 10px);
}
</style>
