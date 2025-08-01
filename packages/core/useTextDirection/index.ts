import type { ConfigurableDocument } from '../_configurable'
import type { MaybeElement } from '../unrefElement'
import { tryOnMounted } from '@vueuse/shared'

import { computed, ref as deepRef } from 'vue'
import { defaultDocument } from '../_configurable'
import { useMutationObserver } from '../useMutationObserver'

export type UseTextDirectionValue = 'ltr' | 'rtl' | 'auto'

export interface UseTextDirectionOptions extends ConfigurableDocument {
  /**
   * CSS Selector for the target element applying to
   *
   * @default 'html'
   */
  selector?: string
  /**
   * Observe `document.querySelector(selector)` changes using MutationObserve
   *
   * @default false
   */
  observe?: boolean
  /**
   * Initial value
   *
   * @default 'ltr'
   */
  initialValue?: UseTextDirectionValue
}

/**
 * Reactive dir of the element's text.
 *
 * @see https://vueuse.org/useTextDirection
 *
 * @__NO_SIDE_EFFECTS__
 */
export function useTextDirection(options: UseTextDirectionOptions = {}) {
  const {
    document = defaultDocument,
    selector = 'html',
    observe = false,
    initialValue = 'ltr',
  } = options

  function getValue() {
    return document?.querySelector(selector)?.getAttribute('dir') as UseTextDirectionValue ?? initialValue
  }

  const dir = deepRef<UseTextDirectionValue>(getValue())

  tryOnMounted(() => dir.value = getValue())

  if (observe && document) {
    useMutationObserver(
      document.querySelector(selector) as MaybeElement,
      () => dir.value = getValue(),
      { attributes: true },
    )
  }

  return computed<UseTextDirectionValue>({
    get() {
      return dir.value
    },
    set(v) {
      dir.value = v
      if (!document)
        return
      if (dir.value)
        document.querySelector(selector)?.setAttribute('dir', dir.value)
      else
        document.querySelector(selector)?.removeAttribute('dir')
    },
  })
}
