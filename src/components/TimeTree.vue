<template>
  <!--每一个标签就是一个time-->
  <div class="arrow"></div>
  <time-comp v-for="timeItem in timeList" :key="timeItem" :time="timeItem">{{timeItem}}</time-comp>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import type { TimeProps } from '@/components/Time.vue'
// 导入时"Time"无法用作组件名，奇怪
import TimeComp from './Time.vue'
import useTimeListByDate from '@/hooks/useTimeListByDate'
// eslint-disable-next-line no-unused-vars,no-undef
const props = defineProps({
  timeList: {
    type: Array as PropType<TimeProps[]>,
    required: true
  }
})
console.log(useTimeListByDate(props.timeList))

</script>

<style scoped>

</style>
