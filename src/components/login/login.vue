<template>
  <div class="login">
    <img src="../../../static/logo.png" alt="" class="imgs">
    <div class="box">
      <p class="font">规则管理系统</p>
      <div class="content">
        <el-input
          placeholder="请输入账号"
          prefix-icon="el-icon-s-custom"
          v-model="userName">
        </el-input>
        <el-input
          style="margin:20px 0;"
          show-password
          placeholder="请输入密码"
          prefix-icon="el-icon-lock"
          v-model="password">
        </el-input>
        <el-button @click="logins" type="success">登录</el-button>
      </div>
    </div>
  </div>
  
</template>
<script>
  export default {
    name : "login",
    data(){
      return{
        userName:"szgzglxt",
        password:"123456"
      }
    },
    methods:{
      logins(){
        // console.log(this.userName,this.password)
        if(!this.userName){
          this.$message({
            message: '请输入用户名',
            type: 'error',
            center:true,
            duration:1500
          });
        }else if(!this.password){
          this.$message({
            message: '请输入密码',
            type: 'error',
            center:true,
            duration:1500
          });
        }else if(this.userName === "szgzglxt" && this.password === "123456"){
          this.$message({
            message: '登陆成功',
            type: 'success',
            center:true,
            duration:1500
          });
          this.$router.push({name:'homeRigth'})
        }else{
          this.$message({
            message: '用户名或密码错误',
            type: 'error',
            center:true,
            duration:1500
          });
        }
      }
    }
  }
</script>
<style lang ='less' scoped>
  .login{
    height: 100%;
    width: 100%;
    background-image:url("../../../static/login-bg.jpg");
    background-size:100% 100%;
    -moz-background-size:100% 100%;
    position: relative;
    .imgs{
      width: 200px;
      margin: 20px;
    }
    .box{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      border-radius:15px;
      .font{
        font-size: 30px;
        font-weight: 800;
        color: #fff;
        text-align: center;
        margin: 10px;
      }
      .content{
        width: 300px;
        padding: 20px;
        background-color: rgba(255,255,255,0.3);
        border-radius: 15px;
        /* overflow: hidden; */
        button{
          width: 100%;
        }
      }
    }
  }
</style>