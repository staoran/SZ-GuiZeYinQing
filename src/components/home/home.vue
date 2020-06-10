<template>
  <el-container>
    <el-header class="title">
      <img src="../../../static/logo.png" alt="" style="width:110px;margin-right:20px;">
      <span>规则管理系统</span>
    </el-header>
    <el-container>
      <el-aside class="left">
        <el-row style="height :100%">
          <el-col style="height :100%">
            <el-menu
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
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-truck"></i>
                  <span>车险规则管理</span>
                </template>
                <el-menu-item
                  v-for="(item,k) in CarInsurance"
                  :key="k"
                  :index="item.index"
                >{{item.name}}</el-menu-item>
              </el-submenu>
              <el-menu-item index="notCarInsurance">
                <i class="el-icon-s-management"></i>
                <span slot="title">非车险规则管理</span>
              </el-menu-item>
              <el-menu-item index="rules">
                <i class="el-icon-coin"></i>
                <span slot="title">费用规则管理</span>
              </el-menu-item>
              <el-menu-item index="ruleQuery">
                <i class="el-icon-s-check"></i>
                <span slot="title">审批测试发布详情</span>
              </el-menu-item>
              <el-menu-item index="record">
                <i class="el-icon-edit-outline"></i>
                <span slot="title">规则执行记录</span>
              </el-menu-item>
              <el-menu-item index="processRun">
                <i class="el-icon-s-marketing"></i>
                <span slot="title">规则流程管理</span>
              </el-menu-item>
              <el-submenu index="xtsz">
                <template slot="title">
                  <i class="el-icon-setting"></i>
                  <span>系统设置</span>
                </template>
                <el-menu-item
                  v-for="(item,k) in setUp"
                  :key="k"
                  :index="item.index"
                >
                <i :class="item.icon"></i>
                  {{item.name}}
                </el-menu-item>
              </el-submenu>
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
      CarInsurance: [{
        name:'报案',
        index:'homeRigth'
        },{
        name:'调度',
        index:'homeRigth'
        },{
        name:'查勘',
        index:'homeRigth'
        },{
        name:'车易赔',
        index:'homeRigth'
        },{
        name:'定损',
        index:'homeRigth'
        },{
        name:'人伤',
        index:'homeRigth'
        },{
        name:'修理厂',
        index:'homeRigth'
        },{
        name:'核价',
        index:'homeRigth'
        },{
        name:'核算',
        index:'homeRigth'
        },{
        name:'理算',
        index:'homeRigth'
        },{
        name:'核赔',
        index:'homeRigth'
      }],
      NoCarInsurance: [{
        name:'核保规则',
        index : "valuation",
        icon:"el-icon-document-copy"
        },{
        name :'计价规则',
        index: 'valuation',
        icon:"el-icon-paperclip"
        },{
        name :'其他规则',
        index:'valuation',
        icon :"el-icon-s-order"
      }],
      setUp:[{
        name : '角色权限',
        index : 'role',
        icon :"el-icon-s-custom"
        },{
        name : '码表设置',
        index : 'homeRigth',
        icon:"el-icon-s-operation"
        },{
        name : '因子管理',
        index : 'factorQuery',
        icon : "el-icon-s-data"
      }]
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
}
.content {
  display: flex;
  height: 100%;
}
.left {
  width: 250px !important;
  /* height: 100%; */
}
.rigth {
  margin-bottom: 50px;
}
</style>