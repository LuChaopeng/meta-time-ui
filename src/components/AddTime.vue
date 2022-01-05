<template>
  <div class="add-time">
    <div class="panel" v-if="showPanel">
      <form method="" id="addTimeForm">
        <textarea name="addTimeForm" v-model="timeProps.description"></textarea>
        <div class="options">
          <label :for="tag.id" class="tag" :class="tag.value" v-for="tag in tags" :key="tag">
            <div class="content">{{tag.content}}</div>
            <div class="radio">
              <input type="radio" :value="tag.value" :id="tag.id" name="addTimeForm" v-model="timeProps.activity">
            </div>
          </label>
        </div>
        <div class="btn">
          <button class="cancel" @click.prevent="cancel">取消</button>
          <button class="add" type="submit" @click.prevent="addTime">提交</button>
        </div>
      </form>
    </div>
    <div class="pri-btn" @click="switchPanel"><span>{{btnSymbol}}</span></div>
  </div>
</template>

<script setup lang="ts">
import { reactive, PropType, ref } from 'vue'
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
/* eslint-disable prefer-const */
let showPanel = ref(false)
let btnSymbol = ref('+')
const addTime = (): void => {
  timeProps.timestamp = new Date()
  emit('addToHome', timeProps)
  timeProps.description = ''
}
const cancel = (): void => {
  showPanel.value = false
  btnSymbol.value = '+'
}
const switchPanel = (): void => {
  showPanel.value = !showPanel.value
  btnSymbol.value = showPanel.value ? '-' : '+'
}
</script>

<style lang="less" scoped>
.add-time{
  display: flex;
  flex-direction: column;
  width: 260px;
  .pri-btn{
    align-self: flex-end;
    width: 45px;
    height: 45px;
    margin-top: 10px;
    font-size: 30px;
    color: #eeeeee;
    border-radius: 50%;
    background: #0d8d3b;
    text-align: center;
    line-height: 45px;
  }
}
.panel{
  width: 100%;
  padding: 8px 15px;
  border: 2px solid #777777;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #d7d6ed;
  form{
    width: 100%;
    textarea{
      color: #333333;
      background: #ffffff;
      margin-bottom: 5px;
      padding:10px;
      width: 100%;
      height: 100px;
      border: 2px solid #797979;
      border-radius: 8px;
      font-size: inherit;
      opacity: 0.7;
    }
    .options{
      display: flex;
      width: 100%;
      flex-flow: wrap;
      justify-content: space-between;
      .tag{
        cursor: pointer;
        width: 105px;
        height: 30px;
        display: flex;
        border: 1px solid #797979;
        border-radius: 3px;
        background: #efefef;
        margin-bottom: 10px;
        .content, .radio{
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .content{
          flex-basis: 80px;
        }
        .radio{
          flex: 1 1 auto;
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
    }
    .btn{
      display: flex;
      padding: 0 20px;
      margin: 10px 0;
      justify-content: space-between;
      button {
        cursor: pointer;
        border: none;
        width: 50px;
        height: 30px;
        border-radius: 7px;
      }
      .cancel{
        background: #bbbbbb;
      }
      .add{
        background: #12c661;
      }
    }
  }
}

</style>
