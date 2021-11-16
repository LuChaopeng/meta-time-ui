<template>
  <div id="app">
    <div v-if="hasCookie" class="main-page">
      <meta-tag></meta-tag>
    </div>
    <div v-else class="login">
      <div class="user mihray" @click="selectUser(users[0])">Mihray</div>
      <div class="user ming" @click="selectUser(users[1])">Ming</div>
    </div>
  </div>
</template>

<script>
import MetaTag from "@/components/MetaTag"
import axios from "axios";

export default {
  name: 'App',
  components: {
    MetaTag
  },
  data(){
    return{
      eventList:[],
      users:['mihray','ming'],
      hasCookie:false
    }
  },
  methods:{
    selectUser(name){
      axios.post('/api/',{
        userName:name
      })
          .then((res)=>{
            if(res.data === 'success'){
              this.hasCookie = true
            }
          })
          .catch((err)=>{
            console.log(err)
          })
    }
  },
  created() {
    axios.post('/api/',{
      req:'init'
    })
    .then((res)=>{
      if(res.data !== 'select-user'){
        this.hasCookie = true
      }
    })
    .catch((err)=>{
      console.log(err)
    })
  }
}
</script>

<style>
#app {

  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.login {
  height: 100vh;
  background-color: #efefef;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.user {
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3rem;
  border-radius: 0.8rem;
  color: #ffffff;
  width: 66vw;
  height: 5rem;
  cursor: pointer;
}
.mihray{
  background-color: darkorange;
}
.ming{
  background-color: darkmagenta;
}

</style>
