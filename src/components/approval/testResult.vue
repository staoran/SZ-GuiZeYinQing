<template>
  <div>
    <div class="fixedTitle">规则测试详情
      <div class="floatRight">
        <el-button size="mini" @click="retu()" >返回</el-button>
        <el-button size="mini" @click="execute()" type="primary">执行测试</el-button>
        <el-button size="mini" @click="add()" type="primary">添加行</el-button>
        <el-button size="mini" @click="dele()" type="primary">删除行</el-button>
        <el-button size="mini" @click="lookup()" >查看规则</el-button>
      </div>
    </div>
    <div>
      <p class="basic"></p>
      <div class="condition" style=" padding: 15px 15px 15px 30px;">
        <el-table 
          :data="tableData" 
          border 
          :stripe="true" 
          size="mini" 
          ref="multipleTable"
          style="width: 100%">
          <el-table-column prop="id" type="selection" width="55"> </el-table-column>
          <el-table-column label="出险时间">
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.time" > </el-input>
            </template>
          </el-table-column>
          <el-table-column label="是否现场报案">
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.scene" > </el-input>
            </template>
          </el-table-column>
          <el-table-column label="出险原因" >
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.reason" > </el-input>
            </template>
          </el-table-column>
          <el-table-column label="有无人伤" >
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.injured" > </el-input>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="state" label="原值"  > </el-table-column> -->
          <!-- <el-table-column label="测试值">
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.test" > </el-input>
            </template>
          </el-table-column> -->
          <el-table-column prop="test" label="自动核赔"></el-table-column>
          <el-table-column prop="result" label="测试结果"  > </el-table-column>
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
        id : 1,
        reason: "火灾或自燃",
        injured: "无",
        time: "2020-05-05",
        scene:"是",
        test:"成立",
        result:"正确",//结果
      },{
        id : 2,
        reason: "倾覆",
        injured: "有",
        time: "2020-05-06",
        scene:"否",
        test:"不成立",
        result:"错误",//结果
      },{
        id : 3,
        reason: "盗抢",
        injured: "无",
        time: "2020-04-28",
        scene:"是",
        test:"不成立",
        result:"正确",//结果
      }]
      }
    },
    methods:{
      // 通过this.$refs.multipleTable.selection获取当前选中状态
      retu(){//返回
       this.$router.go(-1)
      },
      execute(){//执行
      let selection = this.$refs.multipleTable.selection
      if(selection.length !==0){
        selection.forEach(item => {
          this.tableData.forEach( index => {
            if(item.id === index.id){
              index.test = "成立"
              index.result = "正确"
            }
          });
        })
      }else{
        this.$message({
          message: "请选择需要执行的数据",
          type: "error",
          center: true,
          duration: 2000
        });
      }
      },
      add(){//添加行
        let addRow = {
          id:this.tableData.length+1,
          reason: "",
          injured: "",
          time: "",
          scene:"",
          test:"",
          result:"",//结果
        }
        this.tableData.push(addRow)
      },
      dele(){//删除行
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