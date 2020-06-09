<template>
  <div>
    <!-- title -->
    <div class="fixedTitle">
      非车险产品方案
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
            <p>产品编码</p>
            <el-input size="small" v-model="productCode" placeholder="请输入产品编码"></el-input>
          </li>
          <li>
            <p>产品名称</p>
            <el-input size="small" v-model="productName" placeholder="请输入产品名称"></el-input>
          </li>
          <li>
            <p>产品状态</p>
            <el-select size="small" style="width:100%" v-model="productEdition" placeholder="请选择产品状态">
              <el-option
                v-for="item in state"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </li>
          <li>
            <p>操作人</p>
            <el-input size="small" v-model="operator" placeholder="请输入操作人"></el-input>
          </li>
          <li>
            <p>起售时间</p>
            <el-date-picker 
              size="small" 
              format="yyyy 年 MM 月 dd 日" 
              value-format="yyyy-MM-dd"  
              style="width:100%" 
              v-model="ruleDate" 
              type="date" 
              placeholder="请选择起售时间"> 
            </el-date-picker>
          </li>
          <li>
            <p>当前版本</p>
            <el-input size="small" v-model="edition" placeholder="请输入当前版本"></el-input>
          </li>
          <li>
            <p>销售渠道</p>
            <el-select size="small" style="width:100%" v-model="saleChannel" placeholder="请选择销售渠道">
              <el-option
                v-for="item in channel"
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
    <div v-show="recordList">
      <p class="basic"> </p>
      <div class="factorTable">
        <el-table size="mini" :data="tableData" border style="width: 100%; margin-bottom: 10px; ">
          <el-table-column prop="numbers" label="理赔单号" > </el-table-column>
          <el-table-column prop="code" label="规则编码" > </el-table-column>
          <el-table-column prop="version" label="规则版本"> </el-table-column>
          <el-table-column prop="name" label="规则名称"> </el-table-column>
          <el-table-column prop="startDate" width="200" label="执行时间" > </el-table-column>
          <el-table-column prop="endDate" label="有效止期" > </el-table-column>
          <el-table-column prop="state" label="执行状态" > </el-table-column>
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
      productCode:"", //产品编码
      productName:"",//产品名称
      productEdition:"",//产品状态
      operator:"",//操作人
      edition:"",//版本
      ruleDate:"",//规则执行时间
      saleChannel:"",//销售渠道
      recordList:false,//列表
      currentPage4: 4, //分页
      tableData: [{ //配置因子表格数据
        id : 1,
        numbers:'00001',
        code: 'R000001',
        version : 'V01',
        name:'佣金费用规则001',
        startDate:'2020-1-22',
        endDate:'2022-2-20',
        state:'成功'
        },{
        id : 2,
        numbers:'100001',
        code: 'R000002',
        version : 'V01',
        name:'计价规则002',
        startDate:'2020-2-23',
        endDate:'2023-1-22',
        state:'失败'
        },{
        id : 3,
        numbers:'100001',
        code: 'R000003',
        version : 'V01',
        name:'计价规则003',
        startDate:'2020-1-24',
        endDate:'2024-1-22',
        state:'成功'
      }],
      state:[{//产品状态
        label:"未配置",
        id:1,
        },{
        label:"配置中",
        id:2
        },{
        label:"已完成",
        id:3
      }],
      channel:[{//销售渠道
        label:"网售",
        id:1
        },{
        label:"电话销售",
        id:2
        },{
        label:"线下",
        id:3
      }]
    };
    
  },
  methods: {
    Query(){//查询
      this.recordList = true
    },
    reset(){//重置
      this.productCode="", //产品编码
      this.productName="",//产品名称
      this.productEdition="",//产品状态
      this.operator="",//操作人
      this.edition="",//版本
      this.ruleDate="",//规则执行时间
      this.saleChannel="",//销售渠道
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