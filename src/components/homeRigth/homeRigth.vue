<template>
  <div>
    <div class="Step1">
      <span>第一步--></span>
      请选择直属机构
      <el-cascader class="directly" :options="options" :clearable="true" v-model="Step"></el-cascader>
      <el-button class="floatRight" type="primary" size="small" round @click="Step1()">下一步</el-button>
    </div>
    <div class="Step2" v-show="Step2">
      <div>第二步--></div>
        <ul class="Inputtwo"> 
          <li>
            <p>请输入承保地</p>
            <el-input  placeholder="请输入承保地" v-model="Under" clearable></el-input>
          </li>
          <li>
            <p>请输入出险地</p>
            <el-input placeholder="请输入出险地" v-model="region" clearable></el-input>
          </li>
          <li>
            <p>请输入人员所属机构</p>
            <el-input placeholder="请输入人员所属机构" v-model="personnel" clearable></el-input>
          </li>
        </ul>
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
      </div>
      <ul class="Input">
        <li>
          <p> 请输入规则名称 </p>
          <el-input placeholder="请输入规则名称" v-model="ruleName" clearable></el-input>
        </li>
        <li>
          <p>请输入规则编码</p>
          <el-input placeholder="请输入规则编码" v-model="ruleCode" clearable></el-input>
        </li>
        <li>
          <p>请选择生效日期</p>
          <el-date-picker v-model="startDate" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="date" placeholder="请选择生效日期"> </el-date-picker>
        </li>
        <li>
          <p>请选择失效日期</p>
          <el-date-picker v-model="endDate" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="date" placeholder="请选择失效日期"> </el-date-picker>
        </li>
        <li>
          <p>请选择规则状态</p>
        <el-select v-model="ruleState" placeholder="请选择规则状态">
          <el-option
            v-for="item in rule"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </li>
      </ul>
      <div style="margin-top: 20px;">
        <el-button class="Query" type="primary" size="small" round @click="query()">查 询</el-button>
        <el-button class="floatRight" type="primary" size="small" round @click="Reset()">重 置</el-button>
      </div>
    </div>
    <!-- 筛选 -->
    <div>
      <div class="elTable">
        <el-button size="small" type="primary" @click="effect()" plain>生效</el-button>
        <el-button size="small" type="primary" plain>失效</el-button>
        <el-button size="small" type="primary" plain>复制</el-button>
        <el-button size="small" type="primary" plain>删除</el-button>
      </div>
      <el-table :data="tableData" border stripe>
        <el-table-column prop="id" type="selection" width="55"> </el-table-column>
        <el-table-column fixed prop="code" label="规则编码" width="150"></el-table-column>
        <el-table-column prop="type" label="规则类型" width="100"></el-table-column>
        <el-table-column prop="name" label="规则名称" width="200"></el-table-column>
        <el-table-column prop="startdate" label="有效起期" width="150"></el-table-column>
        <el-table-column prop="enddate" label="有效止期" width="150"></el-table-column>
        <el-table-column prop="state" label="状态" width="100"></el-table-column>
        <el-table-column fixed="right" label="操作" >
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
          <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
          <!-- <el-button type="text" size="small">详情</el-button>
          <el-button type="text" size="small">修改</el-button> -->
        </template>
        </el-table-column>
      </el-table>
      <el-pagination
      class="paging"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="109">
    </el-pagination>

    </div>
  </div>
</template>

<script>
export default {
  name: "homeRigth",
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
      currentPage4: 4, //分页
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
          id:1,
          code: "R0000001",
          type: "渠道",
          name: "佣金费用规则001",
          startdate: "2020-01-29",
          enddate: "2020-02-20",
          state: "有效"
        },
        {
          id:2,
          code: "R0000002",
          type: "计价",
          name: "计价规则002",
          startdate: "2020-02-22",
          enddate: "2020-03-29",
          state: "草稿"
        },
        {
          id : 3,
          code: "R0000003",
          type: "核保",
          name: "核保规则003",
          startdate: "2020-01-29",
          enddate: "2024-02-19",
          state: "无效"
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
        value: '0',
        label: '草稿'
        },{ // 规则状态数据
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
        this.Step3 = false;
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
        this.$router.push('fixed')
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
        // alert(";adgf")
      }
    },
    Reset(){ //重置
      this.ruleState= "", //规则状态绑定值
      this.ruleName="", //规则名称
      this.ruleCode="", // 规则编码
      this.startDate="", // 生效日期
      this.endDate="" // 失效日期
    },
    effect(){
      this.tableData.forEach( item => {
        console.log(item.id)
      });
      // console.log(id)
    },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleClick(row) {
        console.log(row);
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
.Input,
.Inputtwo
{
  display: flex;
  margin: 0;
  padding: 0;
  font-size: 14px;
}
.Inputtwo li{
  width: 33%;
  margin: 0 20px 20px 0;
}
.Input li{
  width: 30%;
  margin-right:20px;
}
.elTable{
  float: right;
  margin: 20px;
}
.Query{
  float: right;
  margin-left: 10px;
}
.paging{
  float: right;
  margin-top: 20px;
  margin-right: 30px;
}
.el-table__fixed-header-wrapper th{
  background-color: #d7d7d7;
  text-align: center;
}
</style>