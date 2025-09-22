import type { Ref } from 'vue'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, getCurrentInstance, h, nextTick } from 'vue'
import { mount } from '../../.test'
import { useMounted } from './index'

describe('useMounted', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should be defined', () => {
    expect(useMounted).toBeDefined()
  })

  it('should return a ref with initial value false', () => {
    const isMounted = useMounted()

    expect(isMounted.value).toBe(false)
    expect(isMounted).toHaveProperty('value')
  })

  it('should return false when no instance is available', () => {
    // Test outside of component context
    const isMounted = useMounted()

    expect(isMounted.value).toBe(false)
  })

  it('should set to true after component is mounted with getCurrentInstance', async () => {
    const vm = mount(defineComponent({
      setup() {
        const isMounted = useMounted()

        return {
          isMounted,
        }
      },
      render() {
        return null
      },
    }))

    // Component is already mounted when created, so should be true
    expect(vm.isMounted).toBe(true)
  })

  it('should set to true after component is mounted with custom target instance', async () => {
    const vm = mount(defineComponent({
      setup() {
        // Get the current instance and pass it as target
        const instance = getCurrentInstance()
        const isMounted = useMounted(instance)

        return {
          isMounted,
        }
      },
      render() {
        return null
      },
    }))

    // Component is already mounted when created, so should be true
    expect(vm.isMounted).toBe(true)
  })

  it('should work with multiple instances', async () => {
    const vm = mount(defineComponent({
      setup() {
        const instance = getCurrentInstance()
        const isMounted1 = useMounted(instance)
        const isMounted2 = useMounted(instance)
        const isMounted3 = useMounted() // uses getCurrentInstance

        return {
          isMounted1,
          isMounted2,
          isMounted3,
        }
      },
      render() {
        return null
      },
    }))

    // All should be true since component is already mounted
    expect(vm.isMounted1).toBe(true)
    expect(vm.isMounted2).toBe(true)
    expect(vm.isMounted3).toBe(true)
  })

  it('should be reactive and update when value changes', async () => {
    const vm = mount(defineComponent({
      setup() {
        const instance = getCurrentInstance()
        const isMounted = useMounted(instance)

        return {
          isMounted,
        }
      },
      render() {
        return null
      },
    }))

    // Test reactivity by watching the value
    let valueChanges = 0
    const stopWatcher = vm.$watch('isMounted', () => {
      valueChanges++
    })

    // Component is already mounted, so should be true
    expect(vm.isMounted).toBe(true)
    expect(valueChanges).toBe(0) // Watcher was set up after mounting

    stopWatcher()
  })

  it('should handle undefined target parameter', async () => {
    const vm = mount(defineComponent({
      setup() {
        const isMounted = useMounted(undefined)

        return {
          isMounted,
        }
      },
      render() {
        return null
      },
    }))

    // Should be true since getCurrentInstance() will be used as fallback
    expect(vm.isMounted).toBe(true)
  })

  it('should work in nested components', async () => {
    const ChildComponent = defineComponent({
      setup() {
        const isMounted = useMounted()

        return {
          isMounted,
        }
      },
      render() {
        return null
      },
    })

    const vm = mount(defineComponent({
      components: { ChildComponent },
      setup() {
        const isMounted = useMounted()

        return {
          isMounted,
        }
      },
      render() {
        return h(ChildComponent)
      },
    }))

    // Parent should be mounted
    expect(vm.isMounted).toBe(true)
  })

  it('should maintain ref reference across re-renders', async () => {
    let mountedRef: Ref<boolean> | null = null

    const vm = mount(defineComponent({
      setup() {
        const instance = getCurrentInstance()
        mountedRef = useMounted(instance)

        return {
          isMounted: mountedRef,
        }
      },
      render() {
        return null
      },
    }))

    // Force re-render
    vm.$forceUpdate()
    await nextTick()

    // Should still be the same ref instance
    expect(vm.isMounted).toBe(mountedRef!.value)
    expect(vm.isMounted).toBe(true)
  })
})
