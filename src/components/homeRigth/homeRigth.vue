<template>
  <div>
    <div class="Step1">
      <span>第一步--></span>
      请选择直属机构
      <el-cascader class="directly" :options="options" clearable v-model="Step"></el-cascader>
      <el-button class="floatRight" type="primary" size="small" round @click="Step1()">下一步</el-button>
    </div>
    <div class="Step2" v-show="Step2">
      <div>第二步--></div>
      <div class="Input">
        <el-input style="flex:1"  placeholder="请输入承保地" v-model="Under" clearable></el-input>
        <el-input style="flex:1; margin: 0 20px;" placeholder="请输入出险地" v-model="region" clearable></el-input>
        <el-input style="flex:1" placeholder="请输入人员所属机构" v-model="personnel" clearable></el-input>
      </div>
      <div  style="float: right;">
        <el-button type="primary" size="small" round @click="StepUp()">上一步</el-button>
        <el-select v-model="NextStep" placeholder="请选择下一步操作">
          <el-option
            v-for="item in opt"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" size="small" round @click="StepDown()">下一步</el-button>
      </div>
    </div>
    <div class="Step2" v-show="Step3">
      
      <div>筛选-->
        <el-button class="Query" type="primary" size="small" round @click="query()">查 询</el-button>
        <el-button class="floatRight" type="primary" size="small" round @click="Reset()">重 置</el-button>
      </div>
      <div class="Input">
        <el-input style="flex:1"  placeholder="请输入规则名称" v-model="ruleName" clearable></el-input>
        <el-input style="flex:1; margin: 0 20px;" placeholder="请输入规则编码" v-model="ruleCode" clearable></el-input>
        <el-date-picker style="flex:1" v-model="startDate" type="date" placeholder="请选择生效日期"> </el-date-picker>
        <el-date-picker style="flex:1; margin: 0 20px;" v-model="endDate" type="date" placeholder="请选择失效日期"> </el-date-picker>
        <el-select style="flex:1" v-model="ruleState" placeholder="请选择规则状态">
          <el-option
            v-for="item in rule"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <el-table :data="tableData" border stripe class="elTable">
      <el-table-column fixed prop="name" label="核赔规则名称" width="150"></el-table-column>
      <el-table-column prop="remarks" label="规则备注" width="200"></el-table-column>
      <el-table-column prop="cVersion" label="当前上架版本" width="110"></el-table-column>
      <el-table-column prop="date" label="上架时间" width="200"></el-table-column>
      <el-table-column prop="lVersion" label="最新产品版本" width="110"></el-table-column>
      <el-table-column prop="state" label="版本状态" width="100"></el-table-column>
      <el-table-column prop="Operator" label="操作人" width="100"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
        <el-button type="text" size="small">失效</el-button>
      </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      Step2: false,//第二步
      Step3: false,//第三步
      Step: "",//直属机构
      Under: "", //承保地
      region: "", // 出险地
      personnel: "", //所属机构
      NextStep:"", //选择下一步搜索框绑定值
      ruleState: "", //规则状态绑定值
      ruleName:"", //规则名称
      ruleCode:"", // 规则编码
      startDate:"", // 生效日期
      endDate:"", // 失效日期
      options: [ // 直属机构信息
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
      tableData: [ // 表格数据
        {
          name: "调度规则003",
          remarks: "Driver's Liability Insurance",
          cVersion: "V01",
          date: "2020-01-29 12:21:00",
          lVersion: "V03",
          state: "配置中",
          Operator:"张三"
        },
        {
          name: "自动理算规则002",
          remarks: "Third-party Liability Insurance",
          cVersion: "V01",
          date: "2020-01-29 12:21:00",
          lVersion: "V03",
          state: "配置中",
          Operator:"张三"
        },
        {
          name: "自动核赔规则003",
          remarks: "Vehicle Damage Insurance",
          cVersion: "V01",
          date: "2020-01-29 12:21:00",
          lVersion: "V03",
          state: "配置中",
          Operator:"张三"
        }
      ],
      opt: [{ // 下一步操作数据
        value: '1',
        label: '筛选'
        }, {
        value: '2',
        label: '新增自定义规则'
        }, {
        value: '3',
        label: '新增固定规则'
      }],
      rule:[{ // 规则状态数据
        value: '1',
        label: '生效'
        }, {
        value: '2',
        label: '无效'
        }, {
        value: '3',
        label: '审核中'
        }, {
        value: '4',
        label: '测试中'
        }, {
        value: '5',
        label: '发布中'
      }],
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
        this.Under = "";
        this.region = "";
        this.personnel = "";
      }
    },
    // 上一步
    StepUp() { 
      this.$confirm("此操作将修改直属机构, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        this.Step = "";
        this.Step2 = false;
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消修改"
        });
      });
    },
    //下一步 用来判断是跳转还是筛选
    StepDown(){
      // console.log(this.cscs)
      if (!this.Under) {
        this.$message({
          message: "请输入承保地",
          type: "error",
          center: true,
          duration: 2000
        });
      } else if (!this.region) {
        this.$message({
          message: "请输入出险地",
          type: "error",
          center: true,
          duration: 2000
        });
      } else if (!this.personnel) {
        this.$message({
          message: "请输入人员所属机构",
          type: "error",
          center: true,
          duration: 2000
        });
      } else if (!this.NextStep){
        this.$message({
          message: "请选择下一步操作",
          type: "error",
          center: true,
          duration: 2000
        });
      }else if(this.NextStep == 1){
        this.Step3= true
      }else if(this.NextStep == 2){
        this.$router.push('custom')
      }else if(this.NextStep == 3){
        alert("跳转固定规则")
      }
    },
    query(){ //查询
      if(!this.ruleState && !this.ruleName && !this.ruleCode && !this.startDate && !this.endDate){
        this.$message({
          message: "请输入查询条件",
          type: "error",
          center: true,
          duration: 2000
        });
      }else{
        alert(";adgf")
      }
    },
    Reset(){ //重置
      
      this.ruleState= "", //规则状态绑定值
      this.ruleName="", //规则名称
      this.ruleCode="", // 规则编码
      this.startDate="", // 生效日期
      this.endDate="" // 失效日期
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
.Step2 {
  overflow: hidden;
}
.Input {
  display: flex;
  margin: 20px 0;
}
.elTable{
  width: 100%; 
  margin: 20px 0;
}
.floatRight{
  float: right;
}
.Query{
  float: right;
  margin-left: 10px;
}
</style>