<template>
  <div>
    <!-- title -->
    <div class="fixedTitle">
      核保规则编辑
      <div class="floatRight">
        <el-button size="mini" @click="retu()" >返回</el-button>
        <el-button size="mini" @click="storage()" type="primary">暂存</el-button>
        <el-button size="mini" @click="Submit()" type="primary">提交</el-button>
        <el-button size="mini" @click="details()" type="primary">审批详情</el-button>
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
            <el-date-picker 
              size="small" 
              style="width:100%" 
              format="yyyy 年 MM 月 dd 日" 
              value-format="yyyy-MM-dd"
              v-model="startDate" 
              type="date" 
              placeholder="请选择生效日期"> 
            </el-date-picker>
          </li>
          <li>
            <p>规则有效止期</p>
            <el-date-picker 
              size="small" 
              style="width:100%" 
              format="yyyy 年 MM 月 dd 日" 
              value-format="yyyy-MM-dd" 
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
                :value="item.label">
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
            <template slot-scope="scope">
              <el-checkbox 
                v-model="scope.row.checked" 
                @change="onchange(scope.row)" 
                label="输出值" 
                name="type">
              </el-checkbox>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" >
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">配置限定值</el-button>
              <el-button @click="deleData(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button style="float: right;" @click="addfactor()" size="mini" type="primary">添加因子</el-button> 
      </div>
    </div>
    <!-- 规则配置表 -->
    <div>
      <p class="basic">规则配置表
        <span class="addFormula"> 
          <el-button @click="addformula()" size="mini" type="primary">添加公式</el-button> 
        </span> 
        </p>
        <!-- 条件div -->
      <div class="factorTable"  style="padding: 30px 30px 0 0;">
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
                <el-select v-model="symbolValue" class="Symbol" size="mini" clearable placeholder="选择符号">
                  <el-option
                    v-for="item in symbol"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label">
                  </el-option>
                </el-select>
                <el-select 
                  v-model="factorValue" 
                  class="Symbol" 
                  size="mini" 
                  clearable 
                  style="width:120px"
                  placeholder="选择因子">
                  <el-option
                    v-for="item in factor"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label">
                  </el-option>
                </el-select>
                <el-select 
                  v-model="fixedValue" 
                  @visible-change="FixedValue" 
                  clearable style="width:120px"  
                  size="mini" 
                  placeholder="选择固定值">
                  <el-option
                    v-for="item in fixed"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label">
                  </el-option>
                </el-select>
                <el-button @click="addCondition()" size="mini" type="primary">添加</el-button>
                <el-button @click="deleteADD()" size="mini" type="primary">撤销</el-button>
              </div>
              <div class="formula" >
                <el-input
                  type="textarea"
                  style="color:cyan"
                  :disabled="true"
                  :rows="1"
                  v-model="textarea">
                </el-input>
              </div>
              <span class="result">核赔结果</span>
              <div class="Btngroup" style="margin-top: 5px;">
                <el-select 
                  v-model="getValue" 
                  class="Symbol" 
                  clearable 
                  size="mini" 
                  style="width:120px"
                  placeholder="选择因子">
                  <el-option
                    v-for="item in resultFactor"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label">
                  </el-option>
                </el-select>
                <el-select 
                  v-model="getFixed" 
                  @visible-change="resultFixed" 
                  clearable 
                  style="width:120px" 
                  size="mini" 
                  placeholder="选择固定值">
                  <el-option
                    v-for="item in resultfixed"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label">
                  </el-option>
                </el-select>
                <el-button @click="get()" size="mini" type="primary">获取结果</el-button>
                <el-button @click="resultUndo()" size="mini" type="primary">撤销</el-button>
              </div>
              <div style="margin: 0 10px;">
                <el-input
                  type="textarea"
                  :disabled="true"
                  :rows="1"
                  v-model="result">
                </el-input>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 添加因子模态框 -->
    <el-dialog title="添加因子" :visible.sync="addFactor" width="30%">
      <div>
        因子名称
      <el-cascader style="width:100%" :options="options" ref="teer" v-model="addName" clearable></el-cascader>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFactor = false">取 消</el-button>
        <el-button type="primary" @click="ent()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 配置限定值 -->
    <el-dialog title="配置限定值" :visible.sync="LimitValue">
      <div class="buttons">
        <el-button type="primary" plain @click="addline()"  size="mini" >添加行</el-button>
        <el-select 
          v-model="Operator" 
          class="Symbol" 
          size="mini" 
          clearable 
          style="margin: 0 20px;"
          placeholder="选择符号">
          <el-option
            v-for="item in symbol"
            :key="item.value"
            :label="item.label"
            :value="item.label">
          </el-option>
        </el-select>
        <el-input 
          size="mini" 
          v-model="inputValue" 
          class="input-with-select"
          style="width:180px"
          placeholder="输入因子值"
          >
        </el-input>
        <el-button type="primary" plain @click="addData()" style="margin: 0 10px 0 20px;" size="mini">添加数据</el-button>
        <el-button type="primary" plain @click="deleline()" size="mini">置空</el-button>
      </div>
      <el-table size="mini" :data="configure" border style="width: 100%; margin-bottom: 10px; ">
        <el-table-column prop="name" label="因子名称" width="250"> </el-table-column>
        <el-table-column prop="index" label="限定值">
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope" >
            <el-button @click="deleDatass(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="LimitValue = false">取 消</el-button>
        <el-button type="primary" @click="LimitValueEnt()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "underwriting",
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
      // formulas:false, // 公式显示隐藏
      addName:"",  //新增因子名称
      textarea:"",//规则
      result:"",//结果
      Operator:"",//选择符号
      inputValue:"",//输入因子
      Stage:"",//暂存符号和因子
      getValue: "",//获取结果选择因子
      getFixed:"",//获取结果选择固定值
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
      tableData: [],//配置因子表格数据
      rows : {}, //配置限定值数据
      TotalData: [],//总数据
      configure: [], //配置限定值显示数据
      options: [{ //添加因子数据 
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
        },{
          value: "任务类型",
          label: "任务类型",
          id :4,
        },{
          value: "分公司代码",
          label: "分公司代码",
          id :5,
        }]
      }],
      dynamicValidateForm: {//动态添加
        domains: [],
      },
      arr:[],//添加条件所需要的
      undo:[],//添加 撤销结果
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
      symbol: [{ //逻辑数据
        label: ' ( '
        }, {
          label: ' ) '
        }, {
          label: ' > '
        }, {
          label: ' < '
        }, {
          label: ' = '
        }, {
          label: ' <= '
        }, {
          label: ' >= '
        }, {
          label: ' 且 '
        }, {
        label: ' 或 '
      }],
      factor: [],// 因子
      resultFactor: [],//结果因子框
      fixeds:[],// 存放所有固定值的数据框
      fixed:[],//固定值
      resultfixed:[],//获取结果固定值
      symbolValue: '', //逻辑
      factorValue: '', //因子
      fixedValue:"", //固定值
    };
    
  },
  methods: {
    retu(){ //返回
       this.$router.go(-1)
    },
    // 添加因子按钮
    addfactor(){
      this.addFactor=true
    },
    ent(){ //添加因子确认
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
          Valuetype : '文本值',//判断值 ，或者说是后台
          checked:false,//复选框默认状态
        }
        let arrs = addTable.name.split("/")
        let str = arrs.slice(-1)
        let labe = {
          label : str.toString(),
          id: addTable.id
        }
        this.factor.push(labe)
        this.tableData.push(addTable)
        this.addFactor = false
        this.addName = ""
      }
    },
    handleClick(row) { //配置限定值
      this.LimitValue = true
      this.rows = row
      // 根据不同的fatherID获取不同的数据
      this.configure = [] //先把用于展示的数组清空
      if(this.TotalData.length !== 0){ //判断是否有数据
        this.TotalData.forEach(item => { //循环数组中里面的数据
          if(item.fatherId === row.id){ //通过id查找当前行的数据
            this.configure.push(item) //添加到展示的数组里
          }
        })
      }
    },
    addData(){//添加数据
      // 先判断是否有数据
      if(this.configure.length !== 0){
        if(!this.Operator && !this.inputValue){
          this.$message({
            message: '请选择或输入需要添加的数据',
            type: 'error',
            center: true,
            duration: 2000
          });
        }else{
          // 每一次添加的时候存储一次
          this.Stage = this.Stage + this.Operator + this.inputValue
          this.configure.forEach(item => {
            if(item.id === this.configure.length){
              // 赋值
              item.index = this.Stage
            }
          })
          this.Operator =""
          this.inputValue = ""
        }
      }else{
        this.$message({
          message: '请先添加行',
          type: 'error',
          center: true,
          duration: 2000
        });
      }
    },
    deleData(row){ //删除因子
      this.tableData.forEach((item,k) => {
        if(row.id === item.id){
          this.tableData.splice(k,1)
        }
      })
      this.factor.forEach((item,k) => {
        if(row.id === item.id){
          this.factor.splice(k,1)
        }
      })
    },
    deleDatass(row){//删除限定值
      this.configure.forEach((item,k) => {
        if(row.id === item.id){
          this.configure.splice(k,1)
        }
      })
      // 在总数据里面也删除掉
      this.TotalData.forEach((item,k) => {
        if(row.fatherId === item.fatherId && row.index === item.index){
          this.TotalData.splice(k,1)
        }
      })
    },
    addline(){ // 配置限定值添加行
      // 清楚暂存区数据
      this.Stage = ""
      let configures = {
        name : this.rows.name,
        Valuetype : this.rows.Valuetype,
        id : this.configure.length+1,
        operator : '',
        index:'',
        fatherId : this.rows.id
      }
      this.configure.push(configures)//往展示的数组里添加数据
      this.TotalData.push(configures)//往存放所有数据的数组里添加数据
    },
    LimitValueEnt(){ //配置限定值确认按钮
      this.fixeds = this.TotalData.map(item => {
        return {
          label :   " " + item.index ,
          // label :  " "+item.operator+ " " + item.index ,
          index : item.fatherId,
          fatherName : item.name.split("/").slice(-1).toString()
        }
      })
      this.LimitValue = false
    },
    deleline(){//置空
      this.configure = []
    },
    addformula(){//添加公式
      // this.formulas = true
      this.dynamicValidateForm.domains.push({
        value: '',
        key: Date.now(),
        textarea:this.textarea
      });
    },
    removeDomain(item) { //删除公式
      var index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },
    FixedValue(){//选择固定值数据
      if(!this.factorValue){
        this.fixed = this.fixeds
      }else{
        this.fixed=[]
        this.fixeds.forEach(item => {
          if(this.factorValue === item.fatherName){
            this.fixed.push(item)
          }
        })
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
        let arrPush = []
        arrPush.push(this.symbolValue)
        arrPush.push(this.factorValue)
        arrPush.push(this.fixedValue)
        this.arr.push(arrPush.join(""))
        this.textarea=this.arr.join("")
        this.symbolValue=""
        this.factorValue=""
        this.fixedValue=""
      }
    },
    deleteADD(){//删除上一步添加
      if(!this.textarea){
        this.$message({
          message: '没有公式可删除',
          type: "error",
          center: true,
          duration: 2000
        });
      }else{
        this.arr.pop()
        this.textarea=this.arr.join("")
      }
    },
    onchange(row){//获取结果选择因子
      // 判断当前是否选中
      if(row.checked){
        // 选中 数组里面添加
        this.factor.forEach(item => {
          if(row.id === item.id){
            this.resultFactor.push(item)
          }
        })
      }else{
        // 没选中移除
        this.resultFactor.forEach((item,k) => {
          if(row.id === item.id){
            this.resultFactor.splice(k,1)
          }
        })
      }
    },
    resultFixed(){//获取结果选择固定值
      if(!this.getValue){
        this.resultfixed = this.fixeds
      }else{
        this.resultfixed=[]
        this.fixeds.forEach(item => {
          if(this.getValue === item.fatherName){
            this.resultfixed.push(item)
          }
        })
      }
    },
    get(){ //获取结果
      if(!this.getValue || !this.getFixed){
        this.$message({
          message: "请选择需要判断的因子值和固定值",
          type: "error",
          center: true,
          duration: 2000
        });
      }else{
        let undoPush = []
        undoPush.push(this.getValue)
        undoPush.push(this.getFixed)
        this.undo.push(undoPush.join(""))
        this.result = this.undo.join("")
      }
      this.getValue = ''
      this.getFixed = ''
    },
    resultUndo(){//核赔结果撤销
      if(!this.result){
        this.$message({
          message: '没有公式可删除',
          type: "error",
          center: true,
          duration: 2000
        });
      }else{
        this.undo.pop()
        this.result=this.undo.join("")
      }
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
      this.ruleCode="", //规则编码
      this.ruleName="", //规则名称
      this.startDate="", //日期起
      this.endDate="", // 日期止
      this.ruleState="", //规则状态
      this.edition="", //版本号
      this.editionState="", //版本状态
      this.ruleType="" //规则类型
    },
    details(){//审批详情
      this.$router.push({name:'approval'})
    },
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
  overflow: hidden;
  background-color: #f2f2f2;
  padding: 30px;
}
.buttons{
  margin-bottom:20px;
}
.satisfy{
  background-color: #fff;
  padding: 10px;
  border: 1px solid #333;
}
.Btngroup{
  float: right;
}
.formula{
  /* background-color: #f2f2f2; */
  margin: 20px 10px 0;
  /* padding: 10px; */
}
.result{
  font-size: 14px;
  /* margin: 10px 0px; */
  display: inline-block;
}
.Symbol{
  width: 100px;
}
</style>