/*
* 是否点到了元素的内部
* @param { Ref<HTMLElement|null>[] } elements 需判断的响应式HTML元素（或null）数组
* @return { Ref<Boolean> } isClickInside 是否点击到元素内部
*/
import { onMounted, onUnmounted, ref, Ref } from 'vue'

const useClickInside = (elements: Ref<HTMLElement|null>[]) => {
  const isClickInside = ref<Boolean>(false)
  const handler = (e: MouseEvent) => {
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].value) {
        if (elements[i].value?.contains(e.target as HTMLElement)) {
          isClickInside.value = true
          break
        }
        if (i === elements.length - 1) {
          isClickInside.value = false
        }
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
  return isClickInside
}

export default useClickInside
