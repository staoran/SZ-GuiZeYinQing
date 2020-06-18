<template>
  <div class="login">
    <div>
      <h1>登录页</h1>
    </div>
  </div>
  
</template>
<script>
  export default {
    name : "login",
    data(){
      return{

      }
    },
    mounteds:{

    }
  }
</script>
<style lang ='less' scoped>
  .login{
    height: 100%;
    width: 100%;
    background-image:url("../../../static/login-bg.jpg");
    background-repeat:no-repeat;
    background-size:100% 100%;
    -moz-background-size:100% 100%;
    h1 {
      margin: 0;
    }
  }
</style>