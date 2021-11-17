<template>
  <div id="app">
    <!-- 记得加这个元素，之前没写一直不跳转，我还不明白。 -->
    <router-view />
  </div>
</template>

<script>
import axios from "axios"
import router from "@/router";

export default {
  created() {
    axios.post('/api/',{
      req:'init'
    })
        .then((res)=>{
          const nextPage = res.data === 'select-user' ? '/login' : '/home'
          console.log('跳转到'+ nextPage)
          router.push(nextPage)
        })
        .catch((err)=>{
          console.log(err)
        })
  },
  name: 'App'
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

</style>
