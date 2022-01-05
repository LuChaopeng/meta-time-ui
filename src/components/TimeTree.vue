<template>
  <div class="time-tree">
    <div class="trunk"></div>
    <div class="time-list">
      <div v-for="group in timeListByDate" :key="group" class="time-group">
        <time-comp v-for="timeItem in group" :key="timeItem" :time="timeItem" class="time-item"></time-comp>
        <div class="split-line">{{splitDate(group)}}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, watch } from 'vue'
import { TimeProps } from '@/interface'
// 导入时"Time"无法用作组件名，奇怪
import TimeComp from './Time.vue'
import useTimeListByDate from '@/hooks/useTimeListByDate'
// eslint-disable-next-line no-undef
const props = defineProps({
  timeList: {
    type: Array as PropType<TimeProps[]>,
    required: true
  }
})

// 先总结下watch的deep，再试试曲线救国解决一下
watch(() => props.timeList, () => {
  console.log('改变了')
  console.log(timeListByDate.value)
}, { deep: true })
// eslint-disable-next-line prefer-const
let timeListByDate = ref(useTimeListByDate(props.timeList))

// 分割线上的时间
const splitDate = (group: TimeProps[]): string => {
  const date = group[0].timestamp.getDate()
  const month = group[0].timestamp.getMonth()
  const year = group[0].timestamp.getUTCFullYear()
  const currentDate = new Date()
  const nowDate = currentDate.getDate()
  const nowMonth = currentDate.getMonth()
  const nowYear = currentDate.getUTCFullYear()
  let dateStr: string = `${month + 1}月${date}日`
  if (year === nowYear && month === nowMonth && date === nowDate) {
    dateStr = '今天'
  }
  return dateStr
}

</script>

<style lang="less" scoped>
@trunkColor: #fafafa;
@arrowHeight: 20px;
.time-tree {
  display: flex;
  padding-top: @arrowHeight;
  .trunk {
    width: 10px;
    background: @trunkColor;
    position: relative;
  }
  // 利用伪元素添加一个箭头
  .trunk::before {
    content: "";
    position: absolute;
    left: -(2 * @arrowHeight - 10)/2;
    top: -3 * @arrowHeight;
    width: 2 * @arrowHeight;
    height: 3 * @arrowHeight;
    border-right: @arrowHeight solid transparent;
    border-left: @arrowHeight solid transparent;
    border-bottom: @arrowHeight solid @trunkColor;
  }
  .time-list {
    margin-top: 30px;
    .time-group {
      margin-bottom: 25px;
      .time-item {
        margin-left: 8px;
        margin-bottom: 10px;
      }
      .split-line {
        width: 100px;
        display: inline-block;
        text-align: center;
        padding-bottom: 2px;
        border-bottom: 4px solid #fafafa;
      }
    }
  }
}
</style>
