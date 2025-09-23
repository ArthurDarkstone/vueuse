<script setup lang="ts">
import type { ComponentInternalInstance } from 'vue'
import { useMounted } from '@vueuse/core'
import { defineComponent, getCurrentInstance, h, shallowRef, useTemplateRef } from 'vue'

const component = useTemplateRef<typeof Comp1>('component')

const customInstance = shallowRef<ComponentInternalInstance | null>(null)

const Comp1 = defineComponent({

  setup() {
    const instance = getCurrentInstance()

    customInstance.value = instance

    return {}
  },

  render() {
    return h('div', 'Component 1')
  },
})

const isMounted = useMounted(customInstance.value)
</script>

<template>
  <Comp1 ref="component" />

  <button @click="isMounted = !isMounted">
    Toggle Mounted
  </button>
</template>
