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
          <el-table-column prop="productName" width="110" label="产品名称" > </el-table-column>
          <el-table-column prop="productCode" width="110" label="产品编码" > </el-table-column>
          <el-table-column prop="editionState" width="100" label="版本状态"> </el-table-column>
          <el-table-column prop="name" width="90" label="操作人"> </el-table-column>
          <el-table-column prop="listingDate" width="180" label="上架时间" > </el-table-column>
          <el-table-column prop="edition" width="90" label="上架版本" > </el-table-column>
          <el-table-column prop="cpbb" width="90" label="产品版本" > </el-table-column>
          <el-table-column label="配置操作" >
            <template slot-scope="scope">
              <el-button @click="details(scope.row)" type="text" size="small">产品</el-button>
              <el-button @click="details(scope.row)" type="text" size="small">核保规则</el-button>
              <el-button @click="custom(scope.row)" type="text" size="small">核赔规则</el-button>
              <el-button @click="premium(scope.row)" type="text" size="small">保费规则</el-button>
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
      productName:"",//产品名称
      productCode:"", //产品编码
      productEdition:"",//产品状态
      operator:"",//操作人
      edition:"",//版本
      ruleDate:"",//规则执行时间
      saleChannel:"",//销售渠道
      recordList:false,//列表
      currentPage4: 4, //分页
      tableData: [{ //配置因子表格数据
        id : 1,
        productName:'雇主责任险',
        productCode: 'P0202022',
        editionState : '配置中',
        name:'张三',
        listingDate:'2020-1-29 12:21:00',
        edition:'V01',
        cpbb:'V03'
        },{
        id : 2,
        productName:'旅游意外险',
        productCode: 'P0202033',
        editionState : '配置中',
        name:'李四',
        listingDate:'2020-01-29 12:21:00',
        edition:'V01',
        cpbb:'V03'
        },{
        id : 3,
        productName:'家庭财产险',
        productCode: 'P0202021',
        editionState : '配置中',
        name:'王麻子',
        listingDate:'2020-01-29 12:21:00',
        edition:'V01',
        cpbb:'V03'
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
    custom(row){//核赔规则
      this.$router.push({name:'customs',query:{id:row.id}})
    },
    premium(row){//保费规则
      this.$router.push({name:'valuation',query:{id:row.id,name:row.productName}})
    },
    details(row){},
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