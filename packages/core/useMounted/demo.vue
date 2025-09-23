<script setup lang="ts">
import type { ComponentInternalInstance } from 'vue'
import { useMounted, useToggle } from '@vueuse/core'
import { defineComponent, getCurrentInstance, h, shallowRef } from 'vue'

const [toggle] = useToggle(false)

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
  <Comp1 />

  <button @click="toggle = !toggle">
    Toggle Mounted
  </button>

  <p>
    isMounted: {{ isMounted }}
  </p>
</template>
