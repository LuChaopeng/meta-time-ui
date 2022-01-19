<template>
  <div class="login">
    <header>
      <h1>元时光</h1>
      <img src="../assets/logo.jpg" alt="logo">
    </header>
    <input type="text" v-model="userName" placeholder="输入用户名">
    <input type="password" v-model="userPwd" placeholder="输入密码">
    <div class="submit" @click="login">登 录</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import service from '@/utils/request'
import router from '@/router'

const userName = ref('')
const userPwd = ref('')
const login = () => {
  service.post('/usrapi/login', { uid: userName.value, pwd: userPwd.value })
    .then((res) => {
      if (res.data === 'success') {
        router.push('/')
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<style scoped lang="less">
.login{
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background: #efefef;
  head{
    display: flex;
    margin-top: 17vh;
    margin-bottom: 8vh;
    img{
      height: 40px;
      width: 40px;
      border-radius: 30%;
      align-self: center;
      margin-left: 10px;
    }
  }
  input{
    height: 50px;
    width: 280px;
    font-size: 1.3rem;
    border: 1px solid #afb8c1;
    border-radius: 10px;
    margin-bottom: 30px;
    padding: 0 10px;
  }
  input:focus{
    border-color: #0969da;
    outline: none;
    box-shadow: 0 0 0 3px rgba(9,105,218,0.3);
  }
  .submit {
    text-align: center;
    line-height: 45px;
    font-size: 1.2rem;
    color: #ffffff;
    width: 100px;
    height: 45px;
    border-radius: 5px;
    background: #21a44f;
  }
}
</style>
