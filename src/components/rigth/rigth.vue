<template>
  <div>
    <div class="Step1">
      <span>第一步--></span>
      请选择直属机构
      <el-cascader class="directly" :options="options" clearable v-model="Step"></el-cascader>
      <el-button type="primary" round @click="Step1()">下一步</el-button>
    </div>
    <div class="Step2" v-show="Step2">
      <div>第二步--></div>
      <div class="Input">
        <el-input style="flex:1" placeholder="请输入承保地" v-model="Under" clearable></el-input>
        <el-input style="flex:1 ;  margin: 0 20px;" placeholder="请输入出险地" v-model="region" clearable></el-input>
        <el-input style="flex:1" placeholder="请输入人员所属机构" v-model="personnel" clearable></el-input>
      </div>
      <el-button type="primary" style="float: right;" round @click="StepUp()">上一步</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      Step: "",
      Step2: false,
      Under:"",
      region:"",
      personnel:"",
      options: [
        {
          value: "shanghai",
          label: "上海分公司",
          children: [
            {
              value: "shanghaishi",
              label: "上海市",
              children: [
                {
                  value: "pudongxinqu",
                  label: "浦东新区"
                },
                {
                  value: "minhang",
                  label: "闵行"
                },
                {
                  value: "huangpu",
                  label: "黄浦"
                },
                {
                  value: "xuhui",
                  label: "徐汇"
                }
              ]
            }
          ]
        },
        {
          value: "beijing",
          label: "北京分公司",
          children: [
            {
              value: "beijingshi",
              label: "北京市",
              children: [
                {
                  value: "chaoyang",
                  label: "朝阳区"
                },
                {
                  value: "shunyi",
                  label: "顺义区"
                }
              ]
            }
          ]
        },
        {
          value: "hebei",
          label: "河北分公司",
          children: [
            {
              value: "shijiazhuang",
              label: "石家庄市",
              children: [
                {
                  value: "changan",
                  label: "长安区"
                },
                {
                  value: "yuhua",
                  label: "裕华区"
                },
                {
                  value: "luancheng",
                  label: "栾城县"
                }
              ]
            },
            {
              value: "tangshan",
              label: "唐山市",
              children: [
                {
                  value: "caofeidian",
                  label: "曹妃甸区"
                },
                {
                  value: "qianxi",
                  label: "迁西县"
                }
              ]
            },
            {
              value: "qinhuangdao",
              label: "秦皇岛市",
              children: [
                {
                  value: "beidaihe",
                  label: "北戴河区"
                },
                {
                  value: "shanhaiguan",
                  label: "山海关区"
                }
              ]
            }
          ]
        },
        {
          value: "shanxi",
          label: "山西分公司",
          children: [
            {
              value: "changzhi",
              label: "长治市",
              children: [
                {
                  value: "shangdang",
                  label: "上党区"
                },
                {
                  value: "luzhou",
                  label: "潞州区"
                }
              ]
            },
            {
              value: "datong",
              label: "大同市",
              children: [
                {
                  value: "caofeidian",
                  label: "曹妃甸区"
                },
                {
                  value: "qianxi",
                  label: "迁西县"
                }
              ]
            },
            {
              value: "datong",
              label: "大同市",
              children: []
            }
          ]
        }
      ],
    };
  },
  methods: {
    // 第一步下一步按钮
    Step1() {
      if (!this.Step) {
        this.$message({
          message: "请选择直属机构",
          type: "error",
          center: true,
          duration: 2000
        });
      } else {
        this.Step2 = true; 
        this.Under=""
        this.region=""
        this.personnel=""
      }
    },
    // 第二步
    StepUp(){
      if(!this.Under){
        this.$message({
          message: "请输入承保地",
          type: "error",
          center: true,
          duration: 2000
        });
      }else if(!this.region){
        this.$message({
          message: "请输入出险地",
          type: "error",
          center: true,
          duration: 2000
        });
      }else if(!this.personnel){
        this.$message({
          message: "请输入人员所属机构",
          type: "error",
          center: true,
          duration: 2000
        });
      }else{
        this.$confirm('此操作将修改直属机构, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
          this.Step=""
          this.Step2 = false;
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          });          
        });
      }
    }
  }
};
</script>

<style scoped>
.Step1,
.Step2 {
  padding: 20px;
  border-bottom: 1px dashed #000;
}
.directly {
  width: 280px;
  text-align: center !important;
}
.Step2{
  overflow: hidden;
}
.Input{
  display: flex;
  margin: 20px 0;
}
</style>