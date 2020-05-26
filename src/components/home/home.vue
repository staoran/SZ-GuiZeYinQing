<template>
  <div style="height : 100%">
    <div class="title">规则管理系统</div>
    <div class="content">
      <div class="left">
        <el-row class="tac" style="height :100%">
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
            >
              <el-menu-item index="1">
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
                  :index="(2-k).toString()"
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
                  :index="(3-k).toString()"
                >{{item}}</el-menu-item>
              </el-submenu>
              <el-menu-item index="4">
                <i class="el-icon-menu"></i>
                <span slot="title">费用规则管理</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </div>
      <div class="rigth">
        <div class="Step1">
          <span>第一步--> </span>
            请选择直属机构
          <el-cascader class="directly" :options="options" clearable v-model="Step"></el-cascader>
          <el-button type="primary" round @click="Step1()" >下一步</el-button>
        </div>
        <div class="Step2" v-show="Step2">
          <span>第二步--> </span>
            请选择直属机构
          <el-cascader class="directly" :options="options" clearable v-model="Step"></el-cascader>
          <el-button type="primary" round @click="Step1()" >下一步</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
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
      options: [{
        value: 'shanghai',
        label: '上海分公司',
          children: [{
            value: 'shanghaishi',
            label: '上海市',
            children: [{
              value: 'pudongxinqu',
              label: '浦东新区'
            }, {
              value: 'minhang',
              label: '闵行'
            }, {
              value: 'huangpu',
              label: '黄浦'
            }, {
              value: 'xuhui',
              label: '徐汇'
            }]
          }]
        },{
          value: 'beijing',
          label: '北京分公司',
          children: [{
            value: 'beijingshi',
            label: '北京市',
            children: [{
              value: 'chaoyang',
              label: '朝阳区'
            }, {
              value: 'shunyi',
              label: '顺义区'
            }]
          }]
          },{
          value: 'hebei',
          label: '河北分公司',
          children: [{
            value: 'shijiazhuang',
            label: '石家庄市',
            children: [{
              value: 'changan',
              label: '长安区'
            }, {
              value: 'yuhua',
              label: '裕华区'
            }, {
              value: 'luancheng',
              label: '栾城县'
            }]
          }, {
            value: 'tangshan',
            label: '唐山市',
            children: [{
              value: 'caofeidian',
              label: '曹妃甸区'
            }, {
              value: 'qianxi',
              label: '迁西县'
            }]
          }, {
            value: 'qinhuangdao',
            label: '秦皇岛市',
            children: [{
              value: 'beidaihe',
              label: '北戴河区'
            }, {
              value: 'shanhaiguan',
              label: '山海关区'
            }]
          }]
        },{
          value: 'shanxi',
          label: '山西分公司',
          children: [{
            value: 'changzhi',
            label: '长治市',
            children: [{
              value: 'shangdang',
              label: '上党区'
            }, {
              value: 'luzhou',
              label: '潞州区'
            }]
          }, {
            value: 'datong',
            label: '大同市',
            children: [{
              value: 'caofeidian',
              label: '曹妃甸区'
            }, {
              value: 'qianxi',
              label: '迁西县'
            }]
          }, {
            value: 'datong',
            label: '大同市',
            children: []
          }]
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
    // 第一步下一步按钮
    Step1(){
      console.log(!this.Step)
      if(!this.Step){
        this.$message({
          message: '请选择直属机构',
          type: 'error',
          center : true,
          duration: 2000
        });
      }else{
        this.Step2 = true
      }
    }
  }
};
</script>

<style scoped>
.title {
  width: 100%;
  height: 50px;
  background-color: rgb(58, 136, 253);
  color: #fff;
  line-height: 50px;
  padding-left: 20px;
  font-size: 20px;
  font-weight: 800;
}
.content {
  display: flex;
  height: 100%;
}
.left {
  width: 300px;
  height: 100%;
  float: left;
}
.rigth {
  flex: 1;
  background-color: rgb(242, 242, 242);
}
.Step1,
.Step2{
  padding:20px;
  border-bottom : 1px dashed #000
}
.directly{
  width: 280px;
  text-align: center !important;
}
</style>