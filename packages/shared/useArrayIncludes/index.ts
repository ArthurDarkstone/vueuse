import type { ComputedRef, MaybeRefOrGetter } from 'vue'
import { computed, toValue } from 'vue'
import { containsProp, isObject } from '../utils'

export type UseArrayIncludesComparatorFn<T, V> = ((element: T, value: V, index: number, array: MaybeRefOrGetter<T>[]) => boolean)

function isArrayIncludesOptions<T, V>(obj: any): obj is UseArrayIncludesOptions<T, V> {
  return isObject(obj) && containsProp(obj, 'formIndex', 'comparator')
}

export interface UseArrayIncludesOptions<T, V> {
  fromIndex?: number
  comparator?: UseArrayIncludesComparatorFn<T, V> | keyof T
}

export type UseArrayIncludesReturn = ComputedRef<boolean>

/**
 * Reactive `Array.includes`
 *
 * @see https://vueuse.org/useArrayIncludes
 *
 * @returns true if the `value` is found in the array. Otherwise, false.
 *
 * @__NO_SIDE_EFFECTS__
 */
export function useArrayIncludes<T, V = any>(
  list: MaybeRefOrGetter<MaybeRefOrGetter<T>[]>,
  value: MaybeRefOrGetter<V>,
  comparator?: UseArrayIncludesComparatorFn<T, V>,
): UseArrayIncludesReturn
export function useArrayIncludes<T, V = any>(
  list: MaybeRefOrGetter<MaybeRefOrGetter<T>[]>,
  value: MaybeRefOrGetter<V>,
  comparator?: keyof T,
): UseArrayIncludesReturn
export function useArrayIncludes<T, V = any>(
  list: MaybeRefOrGetter<MaybeRefOrGetter<T>[]>,
  value: MaybeRefOrGetter<V>,
  options?: UseArrayIncludesOptions<T, V>,
): UseArrayIncludesReturn

/**
 * Reactive `Array.includes`
 *
 * @see https://vueuse.org/useArrayIncludes
 *
 * @returns true if the `value` is found in the array. Otherwise, false.
 *
 * @__NO_SIDE_EFFECTS__
 */
export function useArrayIncludes<T, V = any>(
  ...args: any[]
): UseArrayIncludesReturn {
  const list: MaybeRefOrGetter<MaybeRefOrGetter<T>[]> = args[0]
  const value: MaybeRefOrGetter<V> = args[1]

  let comparator: UseArrayIncludesComparatorFn<T, V> = args[2]
  let formIndex = 0

  if (isArrayIncludesOptions(comparator)) {
    formIndex = comparator.fromIndex ?? 0
    comparator = comparator.comparator!
  }

  if (typeof comparator === 'string') {
    const key = comparator as keyof T
    comparator = (element: T, value: V) => element[key] === toValue(value)
  }

  comparator = comparator ?? ((element: T, value: T) => element === toValue(value))

  return computed(() =>
    toValue(list)
      .slice(formIndex)
      .some((element, index, array) => comparator(
        toValue(element),
        toValue(value),
        index,
        toValue(array),
      )))
}
