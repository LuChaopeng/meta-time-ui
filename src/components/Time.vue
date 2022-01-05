<template>
  <div class="time"
       :class="time.activity"
  >{{time.description}}</div>

</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { TimeProps } from '@/interface'

// eslint-disable-next-line no-unused-vars,no-undef
const props = defineProps({
  time: {
    type: Object as PropType<TimeProps>
  }
})
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
</style>
