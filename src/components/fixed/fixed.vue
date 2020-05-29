<template>
  <div>
    <!-- title -->
    <div class="fixedTitle">
      核赔规则编辑（固定式规则）
      <div class="floatRight">
        <el-button size="mini" @click="retu()" >返回</el-button>
        <el-button size="mini" type="primary">暂存</el-button>
        <el-button size="mini" type="primary">提交</el-button>
        <el-button size="mini" type="primary">审批详情</el-button>
      </div>
    </div>
    <!-- 基础信息 -->
    <div>
      <p class="basic">基础信息</p>
      <div class="">
        <ul class="condition">
          <li>
            <p>规则编码</p>
            <el-input size="small " v-model="ruleCode" placeholder="请输入规则编码"></el-input>
          </li>
          <li>
            <p>规则名称</p>
            <el-input size="small " v-model="ruleName" placeholder="请输入规则名称"></el-input>
          </li>
          <li>
            <p>规则类型</p>
            <el-select size="small " style="width:100%" v-model="ruleType" placeholder="请选择规则类型">
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
            <el-input size="small " v-model="edition" placeholder="请输入当前版本号"></el-input>
          </li>
          <li>
            <p>规则有效起期</p>
            <el-date-picker size="small " style="width:100%" v-model="startDate" type="date" placeholder="请选择生效日期"> </el-date-picker>
          </li>
          <li>
            <p>规则有效止期</p>
            <el-date-picker size="small " style="width:100%" v-model="endDate" type="date" placeholder="请选择失效日期"> </el-date-picker>
          </li>
          <li>
            <p>规则状态</p>
            <el-select size="small " style="width:100%" v-model="ruleState" placeholder="请选择规则状态">
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
            <el-select size="small " style="width:100%" v-model="editionState" placeholder="请选择版本状态">
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
    <!-- 规则配置表 -->
    <div>
      <p class="basic">规则配置表
        <span class="addFormula"> 
          <el-button @click="addformula()" size="mini" type="primary">添加公式</el-button> 
        </span> 
      </p>
      <div class="factorTable" v-show="formulas">
        <!-- 公式 -->
        <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="70px" class="demo-dynamic">
          <el-form-item
            v-for="(domain, index) in dynamicValidateForm.domains"
            :key="domain.key"
            :label ="'公式'+(index+1)"
            :prop="'domains.' + index + '.value'"
          >
            <div class="satisfy" >
              <span style="font-size:14px" >满足条件</span>
              <div class="Btngroup" >
                <el-button @click.prevent="removeDomain(domain)" size="mini" type="primary" plain>删除公式</el-button>
                <el-select v-model="symbolValue" class="Symbol" size="mini" placeholder="选择符号">
                  <el-option
                    v-for="item in symbol"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label">
                  </el-option>
                </el-select>
                <el-select v-model="factorValue" class="Symbol" size="mini" placeholder="选择因子">
                  <el-option
                    v-for="item in factor"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label">
                  </el-option>
                </el-select>
                <el-select v-model="fixedValue" style="width:120px" size="mini" placeholder="选择固定值">
                  <el-option
                    v-for="item in fixed"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label">
                  </el-option>
                </el-select>
                <el-button @click="addCondition()" size="mini" type="primary">添加</el-button>
              </div>
              <div class="formula" >
                <el-input
                  type="textarea"
                  style="color:cyan"
                  disabled="disabled"
                  :rows="1"
                  v-model="textarea">
                </el-input>
              </div>
              <span class="result">核赔结果</span>
              <div class="formula" style="margin-top :0;">
              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "fixed",
  data() {
    return {
      dynamicValidateForm: {//动态添加
        domains: [],
      },
      ruleCode:"", //规则编码
      ruleName:"", //规则名称
      startDate:"", //日期起
      endDate:"", // 日期止
      ruleState:"", //规则状态
      edition:"", //版本号
      editionState:"", //版本状态
      ruleType:"", //规则类型
      textarea: '',
      formulas:false,
      arr:[],
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
      symbol: [{ //逻辑数据
        label: '('
        }, {
          label: ')'
        }, {
          label: '>'
        }, {
          label: '<'
        }, {
        label: '或'
      }],
      factor: [{// 因子
        label: '事故类型'
        }, {
        label: '出险原因'
        }, {
        label: '案件属性'
        }, {
        label: '事故责任'
      }],
      fixed:[{ //固定值
        label: '2020-01-27'
        }, {
        label: '火灾或自燃'
        }, {
        label: '否'
        }, {
        label: '10万'
      }],
      symbolValue: '', //逻辑
      factorValue: '', //因子
      fixedValue:"", //固定值
    };
  },
  methods: {
    retu(){// 返回
       this.$router.go(-1)
    },
    addformula(){//添加公式
      this.formulas = true
        this.dynamicValidateForm.domains.push({
          value: '',
          key: Date.now()
        });
    },
    removeDomain(item) { //删除公式
      var index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },
    addCondition(){ // 添加条件
    if(!this.symbolValue && !this.factorValue && !this.fixedValue){
      this.$message({
          message: "请选择条件",
          type: "error",
          center: true,
          duration: 2000
        });
      }else{
        this.arr.push(this.symbolValue)
        this.arr.push(this.factorValue)
        this.arr.push(this.fixedValue)
        this.textarea=this.arr.join(" ")
        this.symbolValue=""
        this.factorValue=""
        this.fixedValue=""
      }
    }
  }
};
</script>
<style scoped>
.fixedTitle {
  height: 50px;
  line-height: 50px;
  color: #fff;
  font-size: 20px;
  font-weight: 800;
  background-color: #aaaaaa;
  padding: 0 30px 0 20px;
}
.basic{
  font-weight: 800;
  margin-left: 20px;
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
  margin: 0 20px 20px 0;
}
.condition li p {
  margin: 0;
  margin-bottom: 10px;
}
.factorTable{
  overflow: hidden;
  background-color: #f2f2f2;
  padding: 30px 30px 0 0;
}
.satisfy{
  background-color: #fff;
  padding: 10px;
  border: 1px solid #333;
}

.Btngroup{
  float: right;
}
.addFormula{
  float: right;
  margin-right: 30px;
}
.formula{
  /* background-color: #f2f2f2; */
  /* height: 300px; */
  margin: 20px 10px 0;
  /* padding: 10px; */
}
.result{
  font-size: 14px;
  margin: 10px 0px;
  display: inline-block;
}
.Symbol{
  width: 100px;
}
input[disabled]{color:red;opacity:1}
</style>