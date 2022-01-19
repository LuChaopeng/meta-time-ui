<template>
<router-view></router-view>
</template>

<script setup>
import router from '@/router'
import service from '@/utils/request'

/**
 * 响应拦截
 * 拦截所有响应，如果服务器返回的是"login"则跳转登录页，否则放行。return的内容即为交由其他处理的response
 */
service.interceptors.response.use((res) => {
  console.log(`响应内容${JSON.stringify(res)}`)
  if (res.data === 'login') {
    router.push('login')
  } else {
    return res
  }
})

</script>

<style lang="less">
*,::before,::after {
  box-sizing: border-box;
}
body{
  margin:0;
}
</style>
