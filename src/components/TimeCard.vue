<template>
  <div id="time-card">
    <form method="post" class="form">
      <textarea :name="formName" class="textarea" v-model="detail" ></textarea>
      <div class="options">
        <time-card-option
            v-for="option in optionList"
            :key="option"
            :id="option.id"
            :content="option.content"
            :name="formName"
            v-model:id="checkedOption"
        ></time-card-option>
      </div>
      <div class="submit" @click="submit">
        提交
      </div>
    </form>
  </div>
</template>

<script>
import TimeCardOption from "@/components/TimeCardOption";
import axios from "axios";
export default {
  name: "TimeCard",
  data(){
    return{
      optionList:[
          {id:'sleep',content:'早睡打卡'},
          {id:'workout',content:'运动打卡'},
          {id:'note',content:'小日记'}],
      formName:'timeCard',
      checkedOption:'',
      detail:''
    }
  },
  components: {TimeCardOption},
  methods:{
    submit(){
      axios.post('/api/tag-controller',{
        type:this.checkedOption,
        detail:this.detail,
        date:new Date().toLocaleTimeString(),
      })
          .then((res)=>{
            if(res.data === 'success'){
              console.log('服务器已接收标签')
            }
          })
          .catch(()=>{
          })
    }
  }
}
</script>

<style scoped>
*,::before,::after{
  box-sizing: border-box;
}
.form{
  width: 100%;
}
#time-card{
  width: 83vw;
  padding: 3vw 5vw;
  border: 2px solid #777777;
  border-radius: 2vw;
  display: flex;
  flex-direction: column;
  align-items: center;

}
.textarea{
  margin-bottom: 3vw;
  padding:3vw;
  width: 100%;
  height: 30vw;
  border: 2px solid #797979;
  border-radius: 2vw;
  font-size: inherit;
  opacity: 0.7;
}
.options{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.submit{
  width: 10vw;
  height: 5vw;

}
</style>