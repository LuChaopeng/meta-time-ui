<template>
  <div v-if="!showOperation"
       class="time"
       :class="time.activity"
       v-longtap="switchOperate"
  >{{time.description}}</div>
  <div v-else
       class="time operation"
  >
    <div class="delete" @touchend="deleteTime">删除</div>
    <div class="cancel" @touchend="switchOperate">取消</div>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue'
import { TimeProps } from '@/interface'
import vLongtap from '@/hooks/useLongtap'
import service from '@/utils/request'

// eslint-disable-next-line no-unused-vars,no-undef
const props = defineProps({
  time: {
    type: Object as PropType<TimeProps>
  }
})
// time可能是undefined
const timeDefined = props.time as TimeProps
const showOperation = ref(false)
const switchOperate = () => {
  // 不可对初始的示例行进行操作
  if (timeDefined._id !== 'demoID') {
    showOperation.value = !showOperation.value
  }
}
const deleteTime = () => {
  service.post('/mtapi/delete-tag', { id: timeDefined._id })
    .then(() => {
      location.reload()
    })
}
</script>

<style lang="less" scoped>
.time{
  font-size: 14px;
  width: fit-content;
  min-width: 15vw;
  max-width: 42vw;
  display: flex;
  justify-content: center;
  border: 1px solid #797979;
  border-radius: 1vw;
  padding: 0.3rem 0.5rem;
}
.sleep{
  background-color: #F7B836;
}
.workout{
  background-color: #2ED274;
}
.note{
  background-color: #5AD0DA;
}
.operation{
  padding: 0;
  display: flex;
  color: #fefefe;
  .delete{
    padding: 7px 20px;
    background: #ff5500;
    border-right: solid 2px #555555;
  }
  .cancel{
    padding: 7px 20px;
    background: #999999;
  }
}
</style>
