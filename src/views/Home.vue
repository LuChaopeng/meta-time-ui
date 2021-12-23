<template>
  <time-tree :time-list="timeList"></time-tree>
</template>

<script lang="ts" setup>
// import { reactive, Ref } from 'vue'
import TimeTree from '@/components/TimeTree.vue'
import type { TimeProps } from '@/components/Time.vue'
const timeList: TimeProps[] = [
  { activity: 'sleep', description: '我睡觉睡了好多', timestamp: new Date(Date.UTC(2021, 11, 2, 12, 53, 10)) },
  { activity: 'workout', description: '我睡觉睡了好多', timestamp: new Date(Date.UTC(2021, 11, 3, 12, 53, 10)) },
  { activity: 'note', description: '我睡觉睡了好多', timestamp: new Date(Date.UTC(2021, 11, 2, 12, 5, 10)) },
  { activity: 'sleep', description: '我睡觉睡了好多', timestamp: new Date(Date.UTC(2021, 11, 4, 12, 53, 10)) },
  { activity: 'workout', description: '我睡觉睡了好多', timestamp: new Date(Date.UTC(2021, 11, 5, 12, 53, 10)) },
  { activity: 'note', description: '我睡觉睡了好多', timestamp: new Date(Date.UTC(2021, 11, 4, 1, 5, 10)) }
]
</script>
