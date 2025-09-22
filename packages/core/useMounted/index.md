---
category: Component
---

# useMounted

Reactive mounted state of a component.

## Basic Usage

```ts
import { useMounted } from '@vueuse/core'

const isMounted = useMounted()

console.log(isMounted.value) // false initially
// After component is mounted, isMounted.value becomes true
```

## With Custom Target Instance

You can also pass a specific component instance as the target:

```ts
import { useMounted } from '@vueuse/core'
import { getCurrentInstance } from 'vue'

const instance = getCurrentInstance()
const isMounted = useMounted(instance)
```

## Use Cases

### Conditional Rendering Based on Mount State

```vue
<script setup lang="ts">
import { useMounted } from '@vueuse/core'

const isMounted = useMounted()
</script>

<template>
  <div>
    <div v-if="isMounted">
      This content only renders after the component is mounted
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>
```
