<template>
  <el-container>
    <el-header class="title">
      规则管理系统
    </el-header>
    <el-container>
      <el-aside class="left">
        <el-row class="tac" style="height :100%">
          <el-col style="height :100%">
            <el-menu
              default-active="homeRigth"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
              style="height :100%"
              :unique-opened="true"
              :router="true"
            >
              <el-menu-item index="homeRigth">
                <i class="el-icon-menu"></i>
                <span slot="title">主页</span>
              </el-menu-item>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>非车险规则管理</span>
                </template>
                <el-menu-item
                  v-for="(item,k) in NoCarInsurance"
                  :key="k"
                  :index="(2+k*10).toString()"
                >{{item}}</el-menu-item>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>车险规则管理</span>
                </template>
                <el-menu-item
                  v-for="(item,k) in CarInsurance"
                  :key="k"
                  :index="(3-k*100).toString()"
                >{{item}}</el-menu-item>
              </el-submenu>
              <el-menu-item index="4">
                <i class="el-icon-menu"></i>
                <span slot="title">费用规则管理</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main class="rigth">
        <!-- 当前页面信息是否需要被缓存 -->
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      Step: "",
      Step2:false,
      CarInsurance: [
        "报案",
        "调度",
        "查勘",
        "车易赔",
        "定损",
        "人伤",
        "修理厂",
        "核价",
        "核算",
        "理算",
        "核赔"
      ],
      NoCarInsurance: ["核保规则", "计价规则", "其他规则"],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  }
};
</script>

<style scoped>
.el-container{
  height :100%
}
.el-main{
  padding: 0 ;
}
.title {
  width: 100%;
  height: 50px !important;
  background-color: rgb(58, 136, 253);
  color: #fff;
  line-height: 50px;
  padding-left: 20px;
  font-size: 26px;
  font-weight: 800;
  text-align: center;
}
.content {
  display: flex;
  height: 100%;
}
.left {
  width: 250px !important;
  height: 100%;
  float: left;
}
.rigth {
  margin-bottom: 50px;
}
</style>