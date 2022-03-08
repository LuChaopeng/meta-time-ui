<template>
  <div class="add-time" >
    <div class="panel" v-show="showPanel" ref="panelRef">
      <form id="addTimeForm">
        <textarea name="addTimeForm" v-model="timeProps.description"></textarea>
        <div class="picture">
          <div class="choose-button" @click="uploadPicture">
            <span>选择一张&nbsp;</span>
            <img src="../../public/pic.png" alt="上传图片" class="upload-picture">
          </div>
          <div v-show="hasPic" class="preview-picture">
            <div class="delete-picture" @click="deletePicture">x</div>
            <img ref=picPreview alt="图片预览" >
          </div>
          <hr class="hr" />
        </div>
        <input type="file" accept="image/*" ref="inputRef" @change="choosePicture" style="display: none">
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
    <div class="pri-btn" @click="switchPanel" ref="btnRef"><span>{{btnSymbol}}</span></div>
  </div>
</template>

<script setup lang="ts">
import { reactive, PropType, ref, watch, toRaw } from 'vue'
import { TimeProps } from '@/interface'
import useClickInside from '@/hooks/useClickInside'
import usePictureCompressor from '@/hooks/usePictureCompressor'
import service from '@/utils/request.ts'

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
const timeProps = reactive<TimeProps>({
  activity: 'note',
  description: '',
  timestamp: new Date(),
  _id: 'null'
})

const showPanel = ref(false)
const btnSymbol = ref('+')
const panelRef = ref<HTMLElement|null>(null)
const btnRef = ref<HTMLElement|null>(null)
const picPreview = ref<HTMLImageElement | null>(null)
const isClickInside = useClickInside([panelRef, btnRef])
const hasPic = ref(false)
// eslint-disable-next-line no-unused-vars
let picCompressed: string = ''
// 用于选择图片的<input>元素的引用
const inputRef = ref<HTMLInputElement | null>(null)

watch(isClickInside, () => {
  if (!isClickInside.value) {
    showPanel.value = false
    btnSymbol.value = '+'
  }
})

const addTime = (): void => {
  timeProps.timestamp = new Date()
  const rawTag = toRaw(timeProps)
  service.post('/mtapi/submit-tag', { ...rawTag, picture: picCompressed })
    .then((res) => {
      console.log(res)
      timeProps._id = res.data._id
      emit('addToHome', timeProps)
      timeProps.description = ''
      picCompressed = ''
      hasPic.value = false
    })
    .catch((err) => {
      console.log(err)
    })
}
const cancel = (): void => {
  // 效果等同于点击元素外
  isClickInside.value = false
}
const switchPanel = () => {
  showPanel.value = !showPanel.value
  btnSymbol.value = showPanel.value ? '-' : '+'
}

// 上传图片事件处理函数
const uploadPicture = () => {
  (inputRef.value as HTMLInputElement).click()
}
// <input>选中图片，触发@change事件时的处理函数
const choosePicture = async (e: InputEvent) => {
  // 找不到类似InputChangeEvent的TS类型，所以多用了些断言
  // 从e中获取input的file: File文件
  const picFile: File = ((e.target as HTMLInputElement).files as FileList)[0]
  // 使用URL.createObjectURL为File对象创建一个对象URL
  const picURL = URL.createObjectURL(picFile)
  let width:number, height:number;
  // 已声明的变量解构赋值，加括号
  ({ compressedPicture: picCompressed, width, height } = await usePictureCompressor(picURL))
  hasPic.value = true;
  (picPreview.value as HTMLImageElement).src = picCompressed;
  (picPreview.value as HTMLImageElement).width = (width > height) ? 150 : 100
}
const deletePicture = () => {
  picCompressed = ''
  hasPic.value = false
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
    @form-width: 100%;
    @form-border: 2px solid #797979;
    @form-border-radius: 8px;
    width: 100%;
    textarea{
      position: relative;
      color: #333333;
      background: #ffffff;
      padding:10px;
      width: @form-width;
      height: 100px;
      border: @form-border;
      border-radius: @form-border-radius;
      font-size: inherit;
      opacity: 0.7;
    }
    .picture{
      .choose-button{
        @height: 30px;
        width: @form-width;
        border: @form-border;
        border-radius: @form-border-radius;
        height: @height;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .upload-picture{
        width: 28px;
        height: 21px;
      }
      .preview-picture{
        margin-top: 5px;
        display: flex;
        justify-content: center;
        .delete-picture{
          position: relative;
          color: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 20px;
          height: 20px;
          background: rgba(100,100,100,0.7);
          margin-right: -20px;
        }
      }
      .hr{
        margin: 5px;
      }
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
