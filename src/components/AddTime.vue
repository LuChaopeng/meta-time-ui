<template>
  <div class="add-time">
    <form method="" id="addTimeForm">
      <textarea name="addTimeForm" v-model="timeProps.description"></textarea>
      <div v-for="tag in tags" :key="tag">
        <label :for="tag.id">{{tag.content}}
          <input type="radio" :value="tag.value" :id="tag.id" name="addTimeForm" v-model="timeProps.activity">
        </label>
      </div>
      <button type="submit" @click.prevent="addTime">提交</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, PropType } from 'vue'
import { TimeProps } from '@/interface'

export interface Tag {
  id: string,
  content: string,
  value: string
}
// eslint-disable-next-line no-undef,no-unused-vars
const props = defineProps({
  tags: {
    type: Array as PropType<Tag[]>,
    required: true
  }
})
// eslint-disable-next-line no-undef,no-unused-vars
const emit = defineEmits(['addToHome'])
// 这里手动关闭了eslint的prefer-const检查
// eslint-disable-next-line prefer-const
let timeProps = reactive<TimeProps>({
  activity: 'note',
  description: '',
  timestamp: new Date()
})
const addTime = (): void => {
  emit('addToHome', timeProps)
}

</script>

<style lang="less" scoped>

</style>
