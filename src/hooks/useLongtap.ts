/**
 * 一个自定义的长按指令
 * 判断元素是否被长按，当前只支持触摸长按，不支持鼠标长按
 */
// 先引入 Directive
import { Directive } from 'vue'

// 单文件组件中的自定义指令定义方式
const vLongtap: Directive = {
  created (el, binding) {
    if (typeof binding.value !== 'function') {
      console.warn('指令[longpress]需要一个函数表达式')
    }
    let timer: number | null = null
    const handler = (e: TouchEvent) => {
      binding.value(e)
    }
    const startTap = (e: TouchEvent) => {
      if (timer === null) {
        timer = setTimeout(() => {
          handler(e)
        }, 250)
      }
    }
    const cancelTap = () => {
      if (timer !== null) {
        clearTimeout(timer)
        timer = null
      }
    }
    el.addEventListener('click', (e: MouseEvent) => {
      e.preventDefault()
    })
    el.addEventListener('touchstart', startTap)
    el.addEventListener('touchend', cancelTap)
    el.addEventListener('touchcancel', cancelTap)
  }
}
export default vLongtap
