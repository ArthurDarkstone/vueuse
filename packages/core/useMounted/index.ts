import type {
  ComponentInternalInstance,
} from 'vue'
import {
  getCurrentInstance,
  // eslint-disable-next-line no-restricted-imports
  onMounted,
  shallowRef,
} from 'vue'

/**
 * Mounted state in ref.
 *
 * @see https://vueuse.org/useMounted
 *
 * @__NO_SIDE_EFFECTS__
 */
export function useMounted(target?: ComponentInternalInstance | undefined | null) {
  const isMounted = shallowRef(false)

  const instance = target || getCurrentInstance()

  if (instance) {
    onMounted(() => {
      isMounted.value = true
    }, instance)
  }

  return isMounted
}
