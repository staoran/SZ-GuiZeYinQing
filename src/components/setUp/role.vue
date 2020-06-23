<template>
  <div>
    <div class="fixedTitle">
      角色权限
      <div class="floatRight">
        <el-button size="mini" @click="empower()" type="primary">授权</el-button>
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
      <el-table size="mini" :data="factorData" border  stripe  @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id"  label="ID" width="100"> </el-table-column>
        <el-table-column label="姓名"> 
          <template slot-scope="scope">
            <el-select size='mini' v-model="scope.row.name" placeholder="请选择姓名">
              <el-option
                v-for="item in selectName"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="机构"> 
          <template slot-scope="scope">
            <el-select size='mini' v-model="scope.row.company" placeholder="请选择机构">
              <el-option
                v-for="item in approvalGrade"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="角色类型">
          <template slot-scope="scope">
            <el-select size='mini' v-model="scope.row.roleType" placeholder="请选择角色类型">
              <el-option
                v-for="item in role"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
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
            <el-input size="mini" v-model="scope.row.remark" > </el-input>
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
        selectName:[{//选择姓名
          label:"张三"
          },{
          label:"李四"
          },{
          label:"王麻子"
        }],
        role:[{//角色类型
          label:"测试"
          },{
          label:"审核"
          },{
          label:'发布'
        }],
        factorData: [{
          id: 1,
          name: '',
          company:"",
          roleType:"",
          remark:'',
          date: ''
        }],
        Select:[] // 用来存选中的值
      }
    },
    methods:{
      addFactor(){//新增枚举
        let arr = {
          id : this.factorData.length+1,
          name : "",
          company:"",
          roleType:"",
          remark:'',
          date: ''
        }
        this.factorData.push(arr)
      },
      empower(){
        if(!this.Select.length == 0){
          this.$message({
            message: '该角色授权成功',
            type: 'success',
            center:'true',
            duration:2000
          });
        }else{
          this.$message({
            message: '你还没选择角色',
            type: 'warning',
            center:'true',
            duration:2000
          });
        }
      },
      handleSelectionChange(val) {
        if(!val.length == 0){
          this.Select = val.map(item => {
            return item.id
          });
        }
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