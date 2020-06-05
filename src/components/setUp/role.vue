<template>
  <div>
    <div class="fixedTitle">
      角色权限
      <div class="floatRight">
        <el-button size="mini" @click="testResult()" type="primary">授权</el-button>
      </div>
    </div>
    <div>
      <p class="basic"></p> 
      <ul class="condition">
        <li>
          <p>ID</p>
          <el-input size='mini' placeholder="请输入ID" v-model="ID" clearable></el-input>
        </li>
        <li>
          <p> 姓名 </p>
          <el-input size='mini' placeholder="请输入姓名" v-model="Name" clearable></el-input>
        </li>
        <li>
          <p>审核等级</p>
          <el-select size='mini' v-model="Grade" placeholder="请选择审核等级">
            <el-option
              v-for="item in approvalGrade"
              :key="item.value"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
          </li>
      </ul>
    </div>
     <div class="factorList">
      <span class="addFormula" style="margin-bottom:20px;"> 
        <el-button type="primary" @click="addFactor()" size="mini">添加角色</el-button> 
      </span> 
      <el-table size="mini" :data="factorData" border  stripe>
          <el-table-column prop="id"  label="ID" width="100"> </el-table-column>
          <el-table-column label="姓名"> 
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.name" > </el-input>
              <!-- <el-option
                v-for="item in approvalGrade"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option> -->
            </template>
          </el-table-column>
          <el-table-column prop="type" label="机构"> </el-table-column>
          <el-table-column label="角色类型">
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.value" > </el-input>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="角色期限"> 
            <template slot-scope="scope">
              <el-date-picker 
                size="mini" 
                format="yyyy 年 MM 月 dd 日" 
                value-format="yyyy-MM-dd" 
                style="width:100%" 
                v-model="scope.row.date" 
                type="date" 
                placeholder="请选择角色期限"> 
              </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column label="备注"> 
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.value" > </el-input>
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
        ID:"", //ID
        Name:"", //因子名称
        Grade:"", //因子类型
        approvalGrade:[{ // 规则状态数据
          label: '总公司'
          },{ 
          label: '上海分公司'
          }, {
          label: '山东分公司'
          }, {
          label: '浙江分公司'
        }],
        factorData: [{
          id: 1,
          name: '',
          type: '区间枚举值',
          value:'[0,17]',
          date: ''
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
          type : (this.factorState == '枚举值')? "区间枚举值" : this.factorState,
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
    width: 30%;
    margin: 0 10px 20px 0;
  }
  .factorList{
    margin: 0 20px 30px 20px;
  }
</style>