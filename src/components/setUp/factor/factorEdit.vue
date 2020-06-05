<template>
  <div>
    <div class="fixedTitle">
      <div class="floatRight">
        <el-button size="mini" @click="retu()" >返回</el-button>
        <el-button size="mini" @click="testResult()" type="primary">暂存</el-button>
        <el-button size="mini" @click="submit()" type="primary">提交</el-button>
      </div>
    </div>
    <div>
      <p class="basic">编辑因子</p> 
      <ul class="condition">
        <li>
          <p>请输入因子编码</p>
          <el-input size='mini' placeholder="请输入因子编码" v-model="factorCode" clearable></el-input>
        </li>
        <li>
          <p> 请输入因子名称 </p>
          <el-input size='mini' placeholder="请输入因子名称" v-model="factorName" clearable></el-input>
        </li>
        <li>
          <p>请选择因子类型</p>
          <el-select size='mini' v-model="factorState" placeholder="请选择因子类型">
            <el-option
              v-for="item in factor"
              :key="item.value"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
          </li>
        <li>
          <p>因子路径</p>
          <el-input size='mini' placeholder="请输入因子路径" v-model="factorRoute" clearable></el-input>
        </li>
        <li>
          <p>备注</p>
          <el-input size='mini' placeholder="请输入备注" v-model="factorRemark" clearable></el-input>
        </li>
      </ul>
    </div>
     <div class="factorList">
      <span class="addFormula" style="margin-bottom:20px;"> 
        <el-button type="primary" @click="addFactor()" size="mini">新增因子</el-button> 
      </span> 
      <el-table size="mini" :data="factorData" border  stripe>
          <el-table-column prop="id" label="序号"> </el-table-column>
          <el-table-column label="枚举名称"> 
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.name" > </el-input>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="枚举值类型"> </el-table-column>
          <el-table-column label="枚举值">
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.value" > </el-input>
            </template>
          </el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "factorEdit",
    data(){
      return{
        factorCode:"", //因子编码
        factorName:"", //因子名称
        factorState:"", //因子类型
        factorRoute:"", //因子路径
        factorRemark:"",//备注
        factor:[{ // 规则状态数据
          label: '文本类型'
          },{ 
          label: '固定数值'
          }, {
          label: '数值区间'
          }, {
          label: '枚举值'
        }],
        factorData: [{
          id: 1,
          name: '未成年',
          type: '区间枚举值',
          value:'[0,17]'
        }]
      }
    },
    methods:{
      retu(){//返回
       this.$router.go(-1)
      },
      addFactor(){//新增枚举
        let arr = {
          name : "",
          id : this.factorData.length+1,
          type : "区间枚举值" ,
          value: ""
        }
        this.factorData.push(arr)
      },
      edit(row){//删除枚举
        this.factorData.forEach((item,k) => {
          if(row.id === item.id){
            this.factorData.splice(k,1)
          }
        })
      }
    }
  };
</script>
<style scoped>
  .addFormula{
    float: right;
    margin-right: 30px;
  }
  .fixedTitle {
    height: 50px;
    line-height: 50px;
    color: #fff;
    font-size: 20px;
    font-weight: 800;
    background-color: #aaaaaa;
    padding: 0 30px 0 20px;
  }
  .condition li{
    width: 19%;
    margin: 0 10px 20px 0;
  }
  .factorList{
    margin: 0 20px 30px 20px;
  }
</style>