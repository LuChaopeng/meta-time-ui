<template>
  <div class="home">
    <time-tree class="time-tree" :time-list="timeList" ></time-tree>
    <add-time class="add-time" :tags="tagList" @addToHome="onAddToHome"></add-time>
  </div>
</template>

<script lang="ts" setup>
import { shallowReactive } from 'vue'
import TimeTree from '@/components/TimeTree.vue'
import type { TimeProps } from '@/interface'
import AddTime from '@/components/AddTime.vue'
import type { Tag } from '@/components/AddTime.vue'

// Tip：这里确实没有代理深层，若这里使用reactive代理深层，由于Date的原因，需要在reactive后面加泛型，如 const timeList = reactive<TimeProps[]>([])
const timeList: TimeProps[] = shallowReactive([
  { activity: 'sleep', description: '要睡午觉啦', timestamp: new Date(Date.UTC(2021, 11, 24, 12, 53, 10)) },
  { activity: 'sleep', description: '我睡觉睡了好多', timestamp: new Date(Date.UTC(2021, 11, 2, 12, 53, 10)) },
  { activity: 'workout', description: '跑路700km', timestamp: new Date(Date.UTC(2021, 11, 3, 12, 53, 10)) },
  { activity: 'note', description: '笑死，这个人又吃多了', timestamp: new Date(Date.UTC(2021, 11, 2, 12, 5, 10)) },
  { activity: 'sleep', description: '今日份早睡', timestamp: new Date(Date.UTC(2021, 11, 4, 12, 53, 10)) },
  { activity: 'workout', description: '骑行300米', timestamp: new Date(Date.UTC(2021, 11, 5, 12, 53, 10)) },
  { activity: 'note', description: '？？好奇怪', timestamp: new Date(Date.UTC(2021, 11, 4, 1, 5, 10)) }
])
// 添加time时表单内的标签列表
const tagList: Tag[] = [
  { id: 'sleep', value: 'sleep', content: '睡眠打卡' },
  { id: 'workout', value: 'workout', content: '运动打卡' },
  { id: 'note', value: 'note', content: '小事记' }
]

function onAddToHome (e: TimeProps) {
  const temTime: TimeProps = {
    activity: e.activity,
    description: e.description,
    timestamp: e.timestamp
  }
  timeList.push(temTime)
}

</script>

<style lang="less" scoped>
// 组件不能加class吗
.time-tree {
  margin-left: 20px;
}
.add-time{
  position: fixed;
  bottom: 30px;
  right: 40px;
}
.home {
  min-height: 100vh;
  background: #efefef;
}
</style>
