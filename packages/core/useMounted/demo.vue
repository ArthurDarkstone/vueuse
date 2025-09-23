<script setup lang="ts">
import { useMounted } from '@vueuse/core'
import { defineComponent, h, useTemplateRef } from 'vue'

const component = useTemplateRef('component')

const isMounted = useMounted(component.value?.$)

const Comp1 = defineComponent({
  render() {
    return h('div', 'Component 1')
  },
})
</script>

<template>
  <Comp1 ref="component" />

  <button @click="isMounted = !isMounted">
    Toggle Mounted
  </button>
</template>
