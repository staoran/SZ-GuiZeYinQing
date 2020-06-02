<template>
  <div>
    <!-- title -->
    <div class="fixedTitle">
      规则执行记录查询
    </div>
    <!-- 基础信息 -->
    <div>
      <p class="basic">基础信息
        <span class="addFormula"> 
          <el-button @click="Query()" size="mini" type="primary">查询</el-button> 
          <el-button @click="reset()" size="mini">重置</el-button> 
        </span> 
      </p>
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
            <p>规则版本</p>
            <el-input size="small" v-model="ruleEdition" placeholder="请输入规则版本"></el-input>
          </li>
          <li>
            <p>理赔单号</p>
            <el-input size="small" v-model="ruleNo" placeholder="请输入理赔单号"></el-input>
          </li>
          <li>
            <p>规则执行时间</p>
            <el-date-picker size="small" style="width:100%" v-model="ruleDate" type="date" placeholder="请选择规则执行时间"> </el-date-picker>
          </li>
        </ul>
      </div>
    </div>
    <!-- 列表 -->
    <div v-show="recordList">
      <p class="basic"> </p>
      <div class="factorTable">
        <el-table size="mini" :data="tableData" border style="width: 100%; margin-bottom: 10px; ">
          <el-table-column prop="code" label="规则编码" > </el-table-column>
          <el-table-column prop="channel" label="渠道类型"> </el-table-column>
          <el-table-column prop="cost" label="费用类型"> </el-table-column>
          <el-table-column prop="startDate" label="有效起期" > </el-table-column>
          <el-table-column prop="endDate" label="有效止期" > </el-table-column>
          <el-table-column prop="state" label="状态" > </el-table-column>
          <el-table-column fixed="right" label="操作" width="200px">
            <template slot-scope="scope">
              <el-button @click="(scope.row)" type="text" size="small">修改</el-button>
              <el-button type="text" size="small">详情</el-button>
              <el-button type="text" size="small">失效</el-button>
              <el-button type="text" size="small">复制</el-button>
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
  name: "record",
  data() {
    return {
      ruleCode:"", //规则编码
      ruleName:"",//规则名称
      ruleEdition:"",//规则版本
      ruleNo:"",//理赔单号
      ruleDate:"",//规则执行时间
      recordList:false,//列表
      currentPage4: 4, //分页
      tableData: [{ //配置因子表格数据
        id : 1,
        code: 'R000001',
        channel : '布尔值',
        cost:'佣金',
        startDate:'2020-1-22',
        endDate:'2022-2-20',
        state:'有效'
      }],
    };
    
  },
  methods: {
    Query(){//查询
      this.recordList = true
    },
    reset(){//重置
      this.ruleCode="", //规则编码
      this.ruleName="",//规则名称
      this.ruleEdition="",//规则版本
      this.ruleNo="",//理赔单号
      this.ruleDate=""//规则执行时间
      this.recordList = false
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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
.addFormula{
  float: right;
  margin-right: 30px;
}
.condition li{
  width: 23%;
  margin: 0 20px 20px 0;
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