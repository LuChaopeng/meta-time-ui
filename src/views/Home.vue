<template>
  <div class="home">
    <time-tree class="time-tree" :time-list="timeList" ></time-tree>
    <add-time class="add-time" :tags="tagList" @addToHome="onAddToHome"></add-time>
  </div>
</template>

<script lang="ts" setup>
import { shallowReactive, onMounted } from 'vue'
import TimeTree from '@/components/TimeTree.vue'
import type { TimeProps } from '@/interface'
import AddTime from '@/components/AddTime.vue'
import type { Tag } from '@/components/AddTime.vue'
import service from '@/utils/request.ts'

// Tip：这里确实没有代理深层，若这里使用reactive代理深层，由于Date的原因，需要在reactive后面加泛型，如 const timeList = reactive<TimeProps[]>([])
const timeList: TimeProps[] = shallowReactive([
  { activity: 'note', description: '开始记录吧！', timestamp: new Date(Date.UTC(2021, 0, 1, 0, 1, 0)), _id: 'demoID' }])

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
    timestamp: e.timestamp,
    _id: e._id
  }
  timeList.push(temTime)
}

onMounted(() => {
  service.get('/mtapi/init')
    .then((res) => {
      for (const timeProps of res.data as TimeProps[]) {
        const date: string = timeProps.timestamp.toString()
        timeProps.timestamp = new Date(Date.UTC(
          Number(date.slice(0, 4)),
          Number(date.slice(5, 7)) - 1,
          Number(date.slice(8, 10)),
          Number(date.slice(11, 13)),
          Number(date.slice(14, 16)),
          Number(date.slice(17, 19)),
          Number(date.slice(20, 23))
        ))
        timeList.push(timeProps)
      }
    })
    .catch((err) => {
      console.error(err)
    })
})
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
