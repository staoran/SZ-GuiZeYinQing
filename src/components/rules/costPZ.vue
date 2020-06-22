<template>
  <div>
    <!-- title -->
    <div class="fixedTitle">
      费用规则配置
      <div class="floatRight">
        <el-button size="mini" @click="retu()" >返回</el-button>
        <el-button size="mini" @click="storage()" type="primary">暂存</el-button>
        <el-button size="mini" @click="Submit()" type="primary">提交</el-button>
        <el-button size="mini" @click="details()" type="primary">审批详情</el-button>
      </div>
    </div>
    <!-- 基础信息 -->
    <div>
      <p class="basic">基础信息
      </p>
      <div class="">
        <ul class="condition">
          <li>
            <p>规则编码</p>
            <el-input size="small" :disabled="bianma" v-model="ruleCode" placeholder="请输入规则编码"></el-input>
          </li>
          <li>
            <p>规则名称</p>
            <el-input size="small" v-model="ruleName" placeholder="请输入规则名称"></el-input>
          </li>
          <li>
            <p>规则类型</p>
            <el-select size="small" style="width:100%" v-model="ruleType" placeholder="请选择规则类型">
              <el-option
                v-for="item in Type"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
          <li>
            <p>当前版本号</p>
            <el-input size="small" v-model="edition" placeholder="请输入当前版本号"></el-input>
          </li>
          <li>
            <p>规则有效起期</p>
            <el-date-picker 
              size="small" 
              format="yyyy 年 MM 月 dd 日" 
              value-format="yyyy-MM-dd" 
              style="width:100%" 
              v-model="startDate" 
              type="date" 
              placeholder="请选择生效日期"> 
            </el-date-picker>
          </li>
          <li>
            <p>规则有效止期</p>
            <el-date-picker 
              size="small" 
              format="yyyy 年 MM 月 dd 日" 
              value-format="yyyy-MM-dd" 
              style="width:100%" 
              v-model="endDate" 
              type="date" 
              placeholder="请选择失效日期"> 
            </el-date-picker>
          </li>
          <li>
            <p>规则状态</p>
            <el-select size="small" style="width:100%" v-model="ruleState" placeholder="请选择规则状态">
              <el-option
                v-for="item in rule"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
          <li>
            <p>当前版本状态</p>
            <el-select size="small" style="width:100%" v-model="editionState" placeholder="请选择版本状态">
              <el-option
                v-for="item in State"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
        </ul>
      </div>
    </div>
    <!-- 配置影响因子 -->
    <div>
      <p class="basic">配置影响因子 </p>
      <div class="factorTable">
        <span class="Btngroup">
          <el-button @click="addFactord" size="mini" type="primary">添加因子</el-button>
          <el-button size="mini" type="primary">创建配置表</el-button>
        </span>
        <div v-show="Factor">
          <el-table size="mini" :data="FactorTable" border  stripe >
            <el-table-column prop="id"  label="序号" width="100"> </el-table-column>
            <el-table-column label="因子名称"> 
              <template slot-scope="scope">
                <el-select size='mini' v-model="scope.row.name" placeholder="请选择因子名称">
                  <el-option
                    v-for="item in factorname"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="type" label="取值类型"> 
              <template slot-scope="scope">
                <el-select size='mini' v-model="scope.row.type" placeholder="请选择取值类型">
                  <el-option
                    v-for="item in typeVale"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="是否输出值"> 
              <!-- <template slot-scope="scope">
                <el-input size="mini" v-model="scope.row.rate" > </el-input>
              </template> -->
              <template slot-scope="scope">
                <el-checkbox 
                  v-model="scope.row.checked" 
                  @change="onchange(scope.row)" 
                  label="输出值" 
                  name="type">
                </el-checkbox>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button @click="(scope.row)" type="text" size="small">配置限定值</el-button>
                <el-button @click="deleFactor(scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <!-- 规则配置表 -->
    <div>
      <p class="basic">规则配置表 </p>
      <div class="factorTable">
        <span class="Btngroup">
          <el-button @click="addLine" size="mini" type="primary">添加行</el-button>
        </span>
        <div v-show="RuleTable">
          <el-table size="mini" :data="ruleTable" border  stripe >
            <!-- <el-table-column prop="id"  label="ID" width="100"> </el-table-column> -->
            <el-table-column label="被保人职业类别"> 
              <template slot-scope="scope">
                <el-select size='mini' v-model="scope.row.careers" placeholder="请选择被保人职业类别">
                  <el-option
                    v-for="item in careersType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="type" label="被保人年龄"> 
              <template slot-scope="scope">
                <el-select size='mini' v-model="scope.row.age" placeholder="请选择被保人年龄">
                  <el-option
                    v-for="item in insuredAge"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="佣金率"> 
              <template slot-scope="scope">
                <el-input size="mini" v-model="scope.row.rate" > </el-input>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button @click="deleData(scope.row)" type="text" size="small">删除</el-button>
                <el-button @click="copyLine(scope.row)" type="text" size="small">复制</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "costPZ",
  data() {
    return {
      ruleCode:"", //适用渠道
      editionState:"", //费用类型
      startDate:"", //日期起
      endDate:"", // 日期止
      ruleState:"", //规则状态
      edition:"", //规则编码
      ruleName:"",//规则名称
      ruleType:"", //规则类型
      bianma:false,
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
      State:[{ // 版本状态数据
        value: 'kaifa',
        label: '开发中'
        }, {
        value: 'shengxiao',
        label: '已生效'
        }, {
        value: 'shixiao',
        label: '已失效'
      }],
      Type:[{ // 规则类型数据
        value: 'zdy',
        label: '自定义'
        }, {
        value: 'gd',
        label: '固定'
      }],
      Factor:false,//配置影响因子 列表隐藏
      FactorTable:[],//配置影响因子数据
      factorname:[{//因子名称数据
        label:"被保人年龄"
        },{
        label:"是否有社保"
        },{
        label:"保险期限(天)"
        },{
        label:"旅游天数"
        },{
        label:"被保人性别"
        },{
        label:"是否续保"
        },{
        label:"体检类型"
        },{
        label:"佣金率"
      }],
      typeVale:[{//取值类型
        label:"区间枚举值"
        },{
        label:"布尔值"
        },{
        label:"文本枚举值"
        },{
        label:"数值型"
      }],
      RuleTable:false,//规则配置表隐藏
      ruleTable: [],//规则配置表数据
      careersType:[{//选择职业类型
        label:"一类"
        },{
        label:"二类或者三类"
        },{
        label:"(非一类)且(非二类)且(非三类)"
      }],
      insuredAge:[{ // 规则状态数据
        label: '≤35'
        },{ 
        label: '＞35'
      }],
    };
    
  },
  created(){
    // modify 1详情 2修改
    if(this.$route.query.modify){
      let row = this.$route.query.row
      this.ruleCode = row.code
      this.startDate = row.startDate
      this.endDate = row.endDate
      this.ruleState = row.state
      console.log(this.$route.query.row)
    }
  },
  methods: {
    retu(){// 返回
       this.$router.go(-1)
    },
    reset(){//重置
      this.ruleCode="", //适用渠道
      this.editionState="", //费用类型
      this.startDate="", //日期起
      this.endDate="", // 日期止
      this.ruleState="", //规则状态
      this.edition="", //规则编码
      this.ruleName="",//规则名称
      this.ruleType="" //规则类型
    },
    addFactord(){//配置影响因子 添加因子
      let factor = {
        id : this.FactorTable.length+1,
        name : "",
        type : ""
      }
      this.FactorTable.push(factor)
      this.Factor=true
    },
    deleFactor(row){//配置影响因子 删除因子
      this.FactorTable.forEach((item,k) => {
        if(row.id === item.id){
          this.FactorTable.splice(k,1)
        }
      })
      // 删光之后列表隐藏
      if(this.FactorTable.length == 0){
        this.Factor=false
      }
    },

    addLine(){//规则配置表添加行
      this.RuleTable = true
      let line = {
        id:this.ruleTable.length+1,
        careers: '',
        age:"",
        rate:''
      }
      this.ruleTable.push(line)
    },
    deleData(row){//删除配置表的某一行
      this.ruleTable.forEach((item,k) => {
        if(row.id === item.id){
          this.ruleTable.splice(k,1)
        }
      })
      // 删光之后列表隐藏
      if(this.ruleTable.length == 0){
        this.RuleTable = false
      }
    },
    copyLine(row){//复制行
      let copy = {
        id : this.ruleTable.length+1,
        careers: row.careers,
        age:row.age,
        rate:row.rate
      }
      this.ruleTable.push(copy)
    },
    onchange(row){

    },
    storage(){//暂存
      this.$message({
        message: '已暂存至草稿，下次进入可直接编辑',
        type: 'warning',
        center: true,
        duration: 2000
      });
    },
    Submit(){//提交
      this.$message({
        message: '提交成功',
        type: 'success',
        center: true,
        duration: 2000
      });
    },
    details(){//审批详情
      this.$router.push({name:'approval'})
    },
  },
};
</script>
<style lang="less" scoped>
.fixedTitle {
  height: 50px;
  line-height: 50px;
  color: #fff;
  font-size: 20px;
  font-weight: 800;
  background-color: #aaaaaa;
  padding: 0 30px 0 20px;
}
.condition{
  padding: 15px 0 0 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #f2f2f2;
  font-size: 14px;
}
.condition li{
  width: 23%;
  margin: 0 18px 18px 0;
}
.condition li p {
  margin: 0;
  margin-bottom: 10px;
}
.addFormula{
  float: right;
  margin-right: 30px;
}
.factorTable{
  background-color: #f2f2f2;
  overflow: hidden;
  padding: 20px 30px 20px ;
  .Btngroup{
    float:right;
    margin-bottom: 10px;
  }
}
.paging{
  float: right;
  margin-top: 20px;
  margin-right: 30px;
}
</style>