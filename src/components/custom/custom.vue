<template>
  <div>
    <!-- title -->
    <div class="fixedTitle">
      核赔规则编辑（自定义规则）
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
            <el-input size="small" v-model="ruleCode" placeholder="请输入规则编码"></el-input>
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
            <el-date-picker size="small" style="width:100%" v-model="startDate" type="date" placeholder="请选择生效日期"> </el-date-picker>
          </li>
          <li>
            <p>规则有效止期</p>
            <el-date-picker size="small" style="width:100%" v-model="endDate" type="date" placeholder="请选择失效日期"> </el-date-picker>
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
        <el-table size="mini" :data="tableData" border style="width: 100%; margin-bottom: 10px; ">
          <el-table-column prop="id" label="序号"  width="80"> </el-table-column>
          <el-table-column prop="name" label="因子名称" width="300"> </el-table-column>
          <el-table-column prop="Valuetype" label="取值类型" width="180"> </el-table-column>
          <el-table-column label="是否输出"  width="180">
            <el-checkbox label="输出值" name="type"></el-checkbox>
          </el-table-column>
          <el-table-column fixed="right" label="操作" >
            <!-- <template> -->
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">配置限定值</el-button>
              <el-button @click="deleData(scope.row)" type="text" size="small">删除</el-button>
              <!-- <el-button type="text" size="small">配置限定值</el-button>
              <el-button type="text" size="small">删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>
        <el-button style="float: right;" @click="addfactor()" size="mini" type="primary">添加因子</el-button> 
      </div>
    </div>
    <!-- 规则配置表 -->
    <div>
      <p class="basic">规则配置表
        <span class="addFactor"> 
          <el-button @click="addformula()" size="mini" type="primary">添加公式</el-button> 
        </span> 
        </p>
      <div class="factorTable">
        <div>

        </div>
      </div>
    </div>
    <!-- 添加因子模态框 -->
    <el-dialog title="添加因子" :visible.sync="addFactor">
      <el-form>
        <el-form-item label="因子名称" :label-width="formLabelWidth">
          <el-cascader style="width:100%" :options="options" ref="teer" v-model="addName" clearable></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFactor = false">取 消</el-button>
        <el-button type="primary" @click="ent()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 配置限定值 -->
    <el-dialog title="配置限定值" :visible.sync="LimitValue">
      <div class="buttons">
        <el-button style="margin: 0 20px;" size="mini" type="warning">选择编辑符号</el-button>
        <el-button style="margin: 0 20px;" size="mini" type="primary" plain>填写因子值</el-button>
        <el-button @click="addline()" style="margin: 0 20px;" size="mini" type="info">添加行</el-button>
        <el-button style="margin: 0 20px;" size="mini" type="info">置空</el-button>
        <el-button style="margin: 0 20px;" size="mini" type="primary">保存</el-button>
      </div>
      <el-table size="mini" :data="configure" border style="width: 100%; margin-bottom: 10px; ">
        <el-table-column prop="name" label="因子名称" width="300"> </el-table-column>
        <el-table-column label="限定值" width="200">
          <input type="text">
        </el-table-column>
        <el-table-column fixed="right" label="操作" >
          <!-- <template> -->
          <template slot-scope="scope">
            <el-button @click="deleDatass(scope.row)" type="text" size="small">删除</el-button>
            <!-- <el-button type="text" size="small">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="LimitValue = false">取 消</el-button>
        <el-button type="primary" @click="LimitValue = false">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "fixed",
  data() {
    return {
      ruleCode:"", //规则编码
      ruleName:"", //规则名称
      startDate:"", //日期起
      endDate:"", // 日期止
      ruleState:"", //规则状态
      edition:"", //版本号
      editionState:"", //版本状态
      ruleType:"", //规则类型
      addFactor: false, // 添加因子模态框
      LimitValue:false, //限定值模态框
      checked: true,
      addName:"",
      condate:"",
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
      tableData: [{ //配置因子表格数据
        id : 1,
        name: '核赔单/自动理赔单/是否水淹车',
        Valuetype : '布尔值',
      }],
      configure: [], //配置限定值数据
      options: [{
        value: "核赔单",
        label: "核赔单",
        id : 1,
        children: [{
          value: "自动理算单",
          label: "自动理算单",
          id :1.1,
          children: [{
            value: "事故类型",
            label: "事故类型",
            id : 1.11,
          },{
            value: "出险原因",
            label: "出险原因",
            id : 1.12,
          },{
            value: "案件属性",
            label: "案件属性",
            id : 1.13,
          },{
            value: "事故责任",
            label: "事故责任",
            id : 1.14,
          }]
        },{
          value: "自动核赔单",
          label: "自动核赔单",
          id :2,
          children: [{
            value: "防渗漏分值",
            label: "防渗漏分值",
            id : 2.1,
          },{
            value: "防渗漏数值",
            label: "防渗漏数值",
            id : 2.2,
          }]
        },{
          value: "报案号",
          label: "报案号",
          id:3,
          // children: []
        },{
          value: "任务类型",
          label: "任务类型",
          id :4,
          // children: []
        },{
          value: "分公司代码",
          label: "分公司代码",
          id :5,
          // children: []
        }]
      }],
      formLabelWidth: '100px'
    };
    
  },
  methods: {
    retu(){
       this.$router.go(-1)
    },
    // 添加因子按钮
    addfactor(){
      this.addFactor=true
    },
    ent(){ //添加因子确认
      // console.log(this.$refs['teer']);
      if(!this.addName){
        this.$message({
          message: "请输入因子名称",
          type: "error",
          center: true,
          duration: 2000
        });
      }else{ 
        let addTable = {
          name : this.addName.join("/"),
          id : this.tableData.length+1,
          Valuetype : '布尔值',
        }
        this.tableData.push(addTable)
        this.addFactor = false
        this.addName = ""
      }
    },
    handleClick(row) { //配置限定值
      this.LimitValue = true
      let configures = {
        name : row.name,
        Valuetype : row.Valuetype,
        id : row.id
      }
      this.configure.push(configures)
      // console.log(row);
    },
    deleData(row){ //删除因子
      this.tableData.forEach((item,k) => {
        if(row.id === item.id){
          this.tableData.splice(k,1)
        }
      })
    },
    deleDatass(row){
      console.log(row)
    },
    addline(){
      // console.log("ahvft")
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
  padding-left: 20px;
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
.addFactor{
  float: right;
  margin-right: 25px;
}
.factorTable{
  overflow: hidden;
  background-color: #f2f2f2;
  padding: 30px;
}
.buttons{
  margin-bottom:20px;
}
</style>