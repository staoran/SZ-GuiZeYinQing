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
      <div>筛选--> </div>
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
          <el-date-picker 
            v-model="startDate" 
            format="yyyy 年 MM 月 dd 日" 
            value-format="yyyy-MM-dd" 
            type="date" 
            placeholder="请选择生效日期"> 
          </el-date-picker>
        </li>
        <li>
          <p>请选择失效日期</p>
          <el-date-picker 
            v-model="endDate" 
            format="yyyy 年 MM 月 dd 日" 
            value-format="yyyy-MM-dd" 
            type="date" 
            placeholder="请选择失效日期"> 
          </el-date-picker>
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
    <div v-show="screen">
      <div class="elTable">
        <el-button size="small" type="primary" @click="effect()" plain>生效</el-button>
        <el-button size="small" type="primary" @click="invalid()" plain>失效</el-button>
        <el-button size="small" type="primary" @click="copy()" plain>复制</el-button>
        <el-button size="small" type="primary" @click="Delete()" plain>删除</el-button>
      </div>
      <el-table :data="tableData" border stripe   ref="multipleTable">
        <el-table-column type="selection" width="45"> </el-table-column>
        <el-table-column prop="code" label="规则编码" width="90"></el-table-column>
        <el-table-column prop="name" label="规则名称" width="130"></el-table-column>
        <el-table-column prop="type" label="规则类型" ></el-table-column>
        <el-table-column prop="VERSION" label="当前版本号" ></el-table-column>
        <el-table-column prop="startdate" label="有效起期"></el-table-column>
        <el-table-column prop="enddate" label="有效止期"></el-table-column>
        <el-table-column prop="state" label="规则状态" width="90"></el-table-column>
        <el-table-column prop="Current" label="当前版本状态"></el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button @click="details(scope.row)" type="text" size="small">详情</el-button>
            <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
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
    <!-- 复制模态框 -->
    <el-dialog title="复制规则" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="选择直属机构">
          <el-cascader class="directly" :options="options" :clearable="true" v-model="institution"></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="assign">确 定</el-button>
      </div>
    </el-dialog>
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
      screen:false,//筛选
      dialogFormVisible: false,//复制模态框
      institution:"",//模态框的机构
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      options: [ // 直属机构信息
        {
          value: "shanghai",
          label: "总公司",
          children: [{
            value: "chengdu",
            label: "成都电话中心",
          },{
            value: "shanghaiDH",
            label: "上海电话中心",
          },{
            value: "wuhanDH",
            label: "武汉电话中心",
          },{
            value: "shanghaishi",
            label: "上海分公司",
            children: [{
              value: "pudongxinqu",
              label: "上海分公司"
            }]
          },{
            value: "beijishi",
            label:"北京分公司",
            children: [{
              value: "dongcheng",
              label: "东城营业部"
              },{
              value: "huairou",
              label: "怀柔支公司"
              },{
              value: "sjs",
              label: "石景山支公司"
            }]
          },{
            value: "shenz",
            label: "深圳分公司",
            children: [{
              value: "szdx",
              label: "深圳分公司电话销售业务部"
            }]
          },{
            value: "wz",
            label: "温州分公司",
            children: [{
              value: "ruian",
              label: "瑞安支公司"
            }]
          }]
        },
      ],
      tableData: [ // 表格数据
        {
          id:1,
          code: "R0000001",
          type: "渠道",
          name: "佣金费用规则001",
          VERSION:"V02",
          startdate: "2020-01-29",
          enddate: "2020-02-20",
          state: "有效",
          Current:"配置中"
        },
        {
          id:2,
          code: "R0000002",
          type: "计价",
          name: "计价规则002",
          VERSION:"V03",
          startdate: "2020-02-22",
          enddate: "2020-03-29",
          state: "草稿",
          Current:"开发中"
        },
        {
          id : 3,
          code: "R0000003",
          type: "核保",
          name: "核保规则003",
          VERSION:"V01",
          startdate: "2020-01-29",
          enddate: "2024-02-19",
          state: "无效",
          Current:"已生效"
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
    // 通过this.$refs.multipleTable.selection获取当前选中状态
    Step1() {// 第一步下一步按钮
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
    StepUp() { // 上一步
      this.$confirm("此操作将修改直属机构, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.Step = "";
        this.Step2 = false;
        this.Step3 = false;
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消修改"
        });
      });
    },
    StepDown(){ //下一步 用来判断是跳转还是筛选
      if(!this.Under) {
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
        this.screen=true
    },
    Reset(){ //重置
      this.ruleState= "", //规则状态绑定值
      this.ruleName="", //规则名称
      this.ruleCode="", // 规则编码
      this.startDate="", // 生效日期
      this.endDate="" // 失效日期
      this.screen = false
    },
    effect(){//生效
      let selection = this.$refs.multipleTable.selection
      if(selection.length !==0){
        selection.forEach(item => {
          this.tableData.forEach( index => {
            if(item.id === index.id){
              index.state = "生效"
            }
          });
        })
      }else{
        this.$message({
          message: "请选择需要修改的数据",
          type: "error",
          center: true,
          duration: 2000
        });
      }
    },
    invalid(){//失效
      let selection = this.$refs.multipleTable.selection
      if(selection.length !==0){
        selection.forEach(item => {
          this.tableData.forEach( index => {
            if(item.id === index.id){
              index.state = "失效"
            }
          });
        })
      }else{
        this.$message({
          message: "请选择需要修改的数据",
          type: "error",
          center: true,
          duration: 2000
        });
      }
    },
    copy(){//复制
      let selection = this.$refs.multipleTable.selection
      if(selection.length !==0){
        this.dialogFormVisible =true
      }else{
        this.$message({
          message: "请选择需要复制的数据",
          type: "error",
          center: true,
          duration: 2000
        });
      }
    },
    assign(){//复制模态框确定
      if(!this.institution){
        this.$message({
          message: "请选择需要复制到的机构",
          type: "error",
          center: true,
          duration: 2000
        });
      }else{
        let selection = this.$refs.multipleTable.selection
        selection.forEach(item => {
          this.tableData.forEach( index => {
            if(item.id === index.id){
              let copy = {
                id:this.tableData.length+1,
                code: item.code,
                type: item.type,
                name: item.name,
                startdate: item.startdate,
                enddate: item.enddate,
                state: item.state
              }
              this.tableData.push(copy)
            }
          });
        })
        this.dialogFormVisible = false
      }
    },
    Delete(){//删除
      let selection = this.$refs.multipleTable.selection
      if(selection.length !==0){
        selection.forEach(item => {
          this.tableData.forEach( (index ,k) => {
            if(item.id === index.id){
              this.tableData.splice(k,1)
            }
          });
        })
      }else{
        this.$message({
          message: "请选择需要删除的数据",
          type: "error",
          center: true,
          duration: 2000
        });
      }
    },
    details(row){//详情
      this.$router.push({name:'customs' ,query:{id:row.id,modify:1,row:row}})
    },
    edit(row){
      this.$router.push({name:'custom',query:{id:row.id,modify:2,row:row}})
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // handleClick(row) {
    //   console.log(row);
    // }
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
.el-cascader{
  width: 400px !important;
}
</style>