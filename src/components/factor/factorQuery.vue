<template>
  <div>
    <div>
      <p class="basic">因子查询
      </p>
      <div class="cond">
        <ul class="condition">
          <li>
            <p>因子编码</p>
            <el-input size="small" v-model="coded" placeholder="请输入因子编码"></el-input>
          </li>
          <li>
            <p>因子名称</p>
            <el-input size="small" v-model="name" placeholder="请输入因子名称"></el-input>
          </li>
          <li>
            <p>因子类型</p>
            <el-select size="small" style="width:100%" v-model="type" placeholder="请选择因子类型">
              <el-option
                v-for="item in rule"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </li>
        </ul>
        <span class="addFormula"> 
          <el-button @click="Query()" size="mini" type="primary">查询</el-button> 
          <el-button @click="Reset()" size="mini">重置</el-button> 
        </span> 
      </div>
    </div>
    <div class="factorList" v-show="factorlist">
      <span class="addFormula" style="margin-bottom:20px;"> 
        <el-button type="primary" @click="addFactor()" size="mini">新增因子</el-button> 
      </span> 
      <el-table size="mini" :data="factorData" border  stripe>
        <el-table-column prop="code" label="因子编码"></el-table-column>
        <el-table-column prop="name" label="因子名称"></el-table-column>
        <el-table-column prop="type" label="因子类型"></el-table-column>
        <el-table-column prop="route" label="因子取值路径" width="280px"></el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
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
  </div>
</template>

<script>
export default {
  name: "factorQuery",
  data(){
    return {
      coded:"",//因子编码
      name : "",//因子名称
      type : "",//因子类型
      currentPage4: 4, //分页
      factorlist:false,//因子列表
      rule:[{//结论
        label:'文本类型',
        id : 1
        },{
        label:'固定数值',
        id : 2
        },{
        label:'数值区间',
        id : 3
        },{
        label:'枚举值',
        id : 4
      }],
      factorData: [{// 表格数据
        id:1,
        code: "XY000001",
        name: "被保人年龄",
        type: "区间枚举值",
        route: "核赔单 / 自动理算单 / 事故类型"
        }, {
        id:2,
        code: "XY000002",
        name: "是否有社保",
        type: "布尔值",
        route: "核赔单 / 自动核赔单 / 防渗漏数值"
        }, {
        id : 3,
        code: "XY000003",
        name: "保险期限（天）",
        type: "区间枚举值",
        route: "核赔单 / 自动理算单 / 事故责任"
      }],
    }
  },
  methods: {
    Query(){//查询
      this.factorlist=true
    },
    Reset(){//重置
      this.coded="",//因子编码
      this.name = "",//因子名称
      this.type = ""//因子类型
      this.factorlist=false
    },
    addFactor(){//新增因子跳转页面
      // alert('新增因子跳转页面')
      this.$router.push({name:"factorEdit"})
    },
    edit(row){
      // alert('编辑也跳转页面'+row.id)
      this.$router.push({name:"factorEdit",query:{id:row.id}})
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
}
</script> 
<style scoped>
.addFormula{
  float: right;
  margin-right: 30px;
}
.cond{
  background-color: #f2f2f2;
  overflow: hidden;
  padding-bottom: 15px;
}
.condition li{
  width: 31%;
  margin-right:20px;
}
.paging{
  float: right;
  margin-top: 20px;
  margin-right: 30px;
}
.factorList{
  margin: 30px 0;
}
</style>