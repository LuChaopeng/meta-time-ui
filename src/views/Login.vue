<template>
  <div class="login">
    <div class="user mihray" @click="selectUser(users[0])">Mihray</div>
    <div class="user ming" @click="selectUser(users[1])">Ming</div>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";

export default {
  name: "Login",
  data(){
    return{
      users:['mihray','ming'],
    }
  },
  methods:{
    selectUser(name){
      axios.post('/api/',{
        userName:name
      })
          .then((res)=>{
            if(res.data === 'success'){
              router.push('/home')
            }
          })
          .catch((err)=>{
            console.log(err)
          })
    }
  }
}
</script>

<style scoped>
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