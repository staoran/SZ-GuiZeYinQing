<template>
  <div>
    <!-- title -->
    <div class="fixedTitle">
      费用规则查询
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
            <p>适用渠道</p>
            <el-input size="small" v-model="ruleCode" placeholder="请输入适用渠道"></el-input>
          </li>
          <li>
            <p>费用类型</p>
            <el-input size="small" v-model="editionState" placeholder="请输入费用类型"></el-input>
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
            <p>规则编码</p>
            <el-input size="small" v-model="edition" placeholder="请输入规则编码"></el-input>
          </li>
          <li>
            <p>规则名称</p>
            <el-input size="small" v-model="ruleName" placeholder="请输入规则名称"></el-input>
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
        </ul>
      </div>
    </div>
    <!-- 列表 -->
    <div v-show="list">
      <p class="basic">列表 </p>
      <div class="factorTable">
        <el-button style="float: right; margin-bottom: 10px;" @click="addfactor()" size="mini" type="primary">新增规则</el-button>
        <el-table size="mini" :data="tableData" border style="width: 100%; margin-bottom: 10px; ">
          <el-table-column prop="code" label="规则编码" > </el-table-column>
          <el-table-column prop="channel" label="渠道类型"> </el-table-column>
          <el-table-column prop="cost" label="费用类型"> </el-table-column>
          <el-table-column prop="startDate" label="有效起期" > </el-table-column>
          <el-table-column prop="endDate" label="有效止期" > </el-table-column>
          <el-table-column prop="state" label="状态" > </el-table-column>
          <el-table-column fixed="right" label="操作" width="200px">
            <template slot-scope="scope">
              <el-button @click="modify(scope.row)" type="text" size="small">修改</el-button>
              <el-button @click="details(scope.row)" type="text" size="small">详情</el-button>
              <el-button @click="invalid(scope.row)" type="text" size="small">失效</el-button>
              <el-button @click="copy(scope.row)" type="text" size="small">复制</el-button>
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
      ruleCode:"", //适用渠道
      editionState:"", //费用类型
      startDate:"", //日期起
      endDate:"", // 日期止
      ruleState:"", //规则状态
      edition:"", //规则编码
      ruleName:"",//规则名称
      ruleType:"", //规则类型
      currentPage4: 4, //分页
      list:false,
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
      Type:[{ // 规则类型数据
        value: 'zdy',
        label: '自定义'
        }, {
        value: 'gd',
        label: '固定'
      }],
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
    Query(){  
      this.list = true
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
      this.list = false
    },
    addfactor(){//新增规则
      this.$router.push({name:'costPZ'})
    },
    modify(row){//修改
      this.$router.push({name:'costPZ',query:{id:row.id}})
    },
    details(row){//详情
      this.$router.push({name:'costPZ',query:{id:row.id}})
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
        channel : row.channel,
        cost: row.cost,
        startDate: row.startDate,
        endDate: row.endDate,
        state:row.state
      }
      this.tableData.push(copy)
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