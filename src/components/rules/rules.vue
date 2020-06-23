<template>
  <div>
    <!-- title -->
    <div class="fixedTitle">
      费用规则查询
    </div>
    <!-- 基础信息 -->
    <div>
      <p class="basic">查询条件
        <span class="addFormula"> 
          <el-button @click="Query()" size="mini" type="primary">查询</el-button> 
          <el-button @click="reset()" size="mini">重置</el-button> 
        </span> 
      </p>
      <div class="">
        <ul class="condition">
          <li>
            <p>规则编码</p>
            <el-input size="small" v-model="edition" placeholder="请输入规则编码"></el-input>
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
                :key="item.label"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </li>
          <li>
            <p>当前版本号</p>
            <el-input size="small" v-model="ruleCode" placeholder="请输入当前版本号"></el-input>
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
                :value="item.label">
              </el-option>
            </el-select>
          </li>
          <li>
            <p>当前版本状态</p>
            <el-select size="small" style="width:100%" v-model="edition" placeholder="请选择当前版本状态">
              <el-option
                v-for="item in State"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </li>
        </ul>
      </div>
    </div>
    <!-- 列表 -->
    <div v-show="list">
      <p class="basic">列表 </p>
      <div class="factorTable">
        <el-button style="float: right; margin-bottom: 10px;" @click="addfactor()" size="mini" type="primary">新增规则</el-button>
        <el-table size="mini" :data="tableData" border style="width: 100%; margin-bottom: 10px; ">
          <el-table-column prop="code" label="规则编码" width="80px"> </el-table-column>
          <el-table-column prop="name" label="规则名称" width="120px"> </el-table-column>
          <el-table-column prop="ruleType" label="规则类型" width="80px"> </el-table-column>
          <el-table-column prop="Version" label="当前版本号" width="90px"> </el-table-column>
          <el-table-column prop="startDate" label="有效起期" width="90px"> </el-table-column>
          <el-table-column prop="endDate" label="有效止期" width="90px"> </el-table-column>
          <el-table-column prop="state" label="规则状态" width="80px"> </el-table-column>
          <el-table-column prop="status" label="当前版本状态" width="100px"> </el-table-column>
          <el-table-column  label="操作" >
            <template slot-scope="scope">
              <el-button @click="modify(scope.row)" type="text" size="small">修改</el-button>
              <el-button @click="details(scope.row)" type="text" size="small">详情</el-button>
              <el-button @click="invalid(scope.row)" type="text" size="small">失效</el-button>
              <el-button @click="copy(scope.row)" type="text" size="small">复制</el-button>
              <el-button @click="dele(scope.row)" type="text" size="small">删除</el-button>
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
  </div>
</template>

<script>
export default {
  name: "rules",
  data() {
    return {
      edition:"", //规则编码
      ruleName:"",//规则名称
      ruleType:"", //规则类型
      ruleCode:"", //当前版本号
      startDate:"", //日期起
      endDate:"", // 日期止
      ruleState:"", //规则状态
      edition:"",//当前版本状态
      currentPage4: 4, //分页
      list:false,
      rule:[{ // 规则状态数据
        label: '草稿'
        },{ 
        label: '生效'
        }, {
        label: '无效'
        }, {
        label: '审核中'
        }, {
        label: '测试中'
        }, {
        label: '发布中'
      }],
      State:[{ // 版本状态数据
        label: '开发中'
        }, {
        label: '已生效'
        }, {
        label: '已失效'
      }], 
      Type:[{ // 规则类型数据
        label: '渠道规则'
        }, {
        label: '费用规则'
        }, {
        label: '计价规则'
        }, {
        label: '核保规则'
      }],
      tableData: [{ //配置因子表格数据
        id : 1,
        code: 'R000001',
        ruleType : '渠道规则',
        name:'佣金费用规则001',
        Version:"V01",
        startDate:'2020-1-22',
        endDate:'2022-2-20',
        state:'有效',
        status:"开发中"
        },{
        id : 2,
        code: 'R000002',
        ruleType : '计价规则',
        name:'计价规则002',
        Version:"V02",
        startDate:'2020-2-23',
        endDate:'2023-1-22',
        state:'草稿',
        status:"已生效"
        },{
        id : 3,
        code: 'R000003',
        ruleType : '核保规则',
        name:'核保规则001',
        Version:"V01",
        startDate:'2020-1-24',
        endDate:'2024-1-22',
        state:'无效',
        status:"已失效"
      }],
    };
    
  },
  methods: {
    Query(){  
      this.list = true
    },
    reset(){//重置
      this.edition="", //规则编码
      this.ruleName="",//规则名称
      this.ruleType="" //规则类型
      this.ruleCode="", //当前版本号
      this.startDate="", //日期起
      this.endDate="", // 日期止
      this.ruleState="", //规则状态
      this.edition="", //当前版本状态
      this.list = false
    },
    addfactor(){//新增规则
      this.$router.push({name:'costPZ'})
    },
    modify(row){//修改
      this.$router.push({name:'costPZ',query:{id:row.id,modify:2,row:row}})
    },
    details(row){//详情
      this.$router.push({name:'costPZ',query:{id:row.id,modify:1,row:row}})
    },
    invalid(row){//失效
      this.tableData.forEach(item => {
        if(row.id == item.id){
          item.state="失效"
        }
      })
    },
    copy(row){//复制
      let copy = {
        id : this.tableData.length+1,
        code: row.code,
        ruleType : row.ruleType,
        name: row.name,
        Version:row.Version,
        startDate: row.startDate,
        endDate: row.endDate,
        state:row.state,
        status:row.status
      }
      this.tableData.push(copy)
    },
    dele(row){//删除
      this.tableData.forEach((item,k) => {
        if(row.id === item.id){
          this.tableData.splice(k,1)
        }
      })
      // 删光之后列表隐藏
      if(this.tableData.length == 0){
        this.list = false
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
  created(){
    // this.fangfa()
  },
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
.addFormula{
  float: right;
  margin-right: 30px;
}
.condition li{
  width: 23%;
  margin: 0 18px 18px 0;
}
.factorTable{
  overflow: hidden;
  padding: 30px;
}
.paging{
  float: right;
  margin-top: 20px;
  margin-right: 30px;
}
</style>