<template>
  <div>
    <div class="fixedTitle">规则测试详情
      <div class="floatRight">
        <el-button size="mini" @click="retu()" >返回</el-button>
        <el-button size="mini" type="primary">执行测试</el-button>
        <el-button size="mini" @click="lookup()" >查看规则</el-button>
      </div>
    </div>
    <div>
      <p class="basic"></p>
      <div class="condition" style=" padding: 15px 15px 15px 30px;">
        <el-table :data="tableData" border :stripe="true" size="mini" style="width: 100%">
          <el-table-column prop="id" type="selection" width="55"> </el-table-column>
          <el-table-column prop="name" label="因子1" > </el-table-column>
          <el-table-column prop="result" label="因子2" > </el-table-column>
          <el-table-column prop="opinion" label="因子3" > </el-table-column>
          <el-table-column prop="state" label="原值"  > </el-table-column>
          <el-table-column prop="state" label="测试值"  > </el-table-column>
          <el-table-column prop="state" label="测试结果"  > </el-table-column>
          <el-table-column label="备注"> 
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.remarks" > </el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
</template>

<script>
  export default {
    name: "testResult",
    data(){
      return{
      endDate:"", // 审核时间
      editionState:"", //审核人
      ruleState:"", //审核结论
      textarea:"", // 意见
      currentPage4: 4, //分页
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        result: '退回',
        opinion:'信息不完整',
        state:'草稿',
        remarks:""
      }]
      }
    },
    methods:{
      retu(){//返回
       this.$router.go(-1)
      },
      submit(){//提交
        let sub = {
          date : this.endDate,
          name : this.editionState,
          result : this.ruleState,
          opinion : this.textarea
        }
        console.log(this.tableData,sub)
        this.tableData.push(sub),
        console.log(this.tableData)
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      lookup(){//查看规则
        this.$router.push({name:'custom'})
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

.condition{
  padding: 15px 0 0 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #f2f2f2;
  font-size: 14px;
}
.condition li{
  width: 30%;
  margin: 0 20px 20px 0;
}
.condition li p {
  margin: 0;
  margin-bottom: 10px;
}
.paging{
  float: right;
  margin-top: 20px;
  margin-right: 30px;
}
</style>