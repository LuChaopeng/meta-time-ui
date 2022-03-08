<template>
  <div v-if="showOperation" class="time operation">
    <div class="delete" @touchend="deleteTime">删除</div>
    <div class="cancel" @touchend="switchOperate">取消</div>
  </div>
  <div v-else-if="showDetail"
       @click="switchDetail"
       class="time time-col"
       :class="time.activity" >
    <div class="description">{{time.description}}</div>
    <div v-show="pictureLoaded"><img class="picture" :src="picture" alt="图片预览"></div>
    <div class="activity">{{activity}}</div>
    <div class="time-stamp">{{timeStamp}}</div>
  </div>
  <div v-else
       class="time"
       :class="time.activity"
       v-longtap="switchOperate"
       @click="switchDetail"
  >{{time.description}}</div>
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
const showDetail = ref(false)
const activity = timeDefined.activity === 'sleep' ? '睡眠打卡' : (timeDefined.activity === 'note' ? '小日记' : '运动打卡')
const timeStamp = `${timeDefined.timestamp.getFullYear() % 100}-${timeDefined.timestamp.getMonth() + 1}-${timeDefined.timestamp.getDate()}  ${timeDefined.timestamp.getHours()}:${timeDefined.timestamp.getMinutes()}`
const pictureLoaded = ref(false)
const picture = ref<String|null>(null)
const switchOperate = () => {
  // 不可对初始的示例行进行操作
  if (timeDefined._id !== 'demoID') {
    showOperation.value = !showOperation.value
  }
}
const switchDetail = () => {
  showDetail.value = !showDetail.value
  if (showDetail.value && picture.value === null) {
    service.post('/mtapi/get-picture', { id: timeDefined._id })
      .then((res) => {
        picture.value = 'data:image/jpeg;base64,' + res.data
        if (res.data !== '') {
          pictureLoaded.value = true
        }
      })
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
  min-height: 32px;
  display: flex;
  justify-content: center;
  border: 1px solid #797979;
  border-radius: 1vw;
  padding: 0.3rem 0.5rem;
}
.time-col{
  flex-direction: column;
  .description{
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .picture{
    width: 100%;
    border-radius: 5%;
  }
  .activity{
    color: #eeeeee;
    align-self: flex-end;
  }
  .time-stamp{
    align-self: flex-end;
    color: #e5e5e5;
    padding-bottom: 2px;
    border-bottom: solid 1px #dddddd;
  }
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
