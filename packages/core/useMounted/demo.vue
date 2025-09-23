<script setup lang="ts">
import type { ComponentInternalInstance } from 'vue'
import { useMounted, useToggle } from '@vueuse/core'
import { defineComponent, getCurrentInstance, h } from 'vue'

const [toggle] = useToggle(false)

let customInstance = null as ComponentInternalInstance | null

const Comp1 = defineComponent({

  setup() {
    const instance = getCurrentInstance()

    customInstance = instance

    return {}
  },

  render() {
    return h('div', 'Component 1')
  },
})

const isMounted = useMounted(customInstance)
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
