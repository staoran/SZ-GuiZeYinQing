<template>
  <div>
    <div class="fixedTitle">审核规则
      <div class="floatRight">
        <el-button size="mini" @click="retu()" >返回</el-button>
        <el-button size="mini" @click="empower()" type="primary">角色授权</el-button>
        <el-button size="mini" @click="lookRule()" type="primary">查看规则详情</el-button>
        <el-button size="mini" @click="testResult()" type="primary">查看测试结果</el-button>
        <el-button size="mini" @click="submit()" type="primary">提交</el-button>
      </div>
    </div>
    <div>
      <p class="basic">审核信息</p> 
      <ul class="condition">
        <li>
          <p>审核结论</p>
          <el-select size="small" style="width:100%" v-model="ruleState" placeholder="请选择审核结论">
            <el-option
              v-for="item in rule"
              :key="item.value"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </li>
        <li>
          <p>审核人</p>
          <el-select size="small" style="width:100%" v-model="editionState" placeholder="请选择审核人">
            <el-option
              v-for="item in State"
              :key="item.value"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </li>
        <li>
          <p>审核时间</p>
          <el-date-picker 
            size="small"  
            format="yyyy 年 MM 月 dd 日" 
            value-format="yyyy-MM-dd" 
            style="width:100%" 
            v-model="endDate" 
            type="date" 
            placeholder="请选择审核时间">
          </el-date-picker>
        </li>
        <li style="flex: 0.87;">
          <p>审核意见</p>
          <el-input  type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input>
        </li>
      </ul>
    </div>
    <div>
      <p class="basic">历史审核意见</p>
      <div class="condition" style=" padding: 15px 15px 15px 30px;">
        <el-table :data="tableData" border :stripe="true" size="mini" style="width: 100%">
          <el-table-column prop="date" label="日期"> </el-table-column>
          <el-table-column prop="name" label="姓名" > </el-table-column>
          <el-table-column prop="result" label="审核结论" > </el-table-column>
          <el-table-column prop="opinion" label="审核意见" > </el-table-column>
          <el-table-column prop="state" label="审核后状态"  > </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "approval",
    data(){
      return{
      endDate:"", // 审核时间
      editionState:"", //审核人
      ruleState:"", //审核结论
      textarea:"", // 意见
      rule:[{ // 规则状态数据
        label: '审核通过'
        },{ // 规则状态数据
        label: '审核不通过'
        }, {
        label: '退回'
        }, {
        label: '待审核'
      }],
      State:[{ // 版本状态数据
        label: '张三'
        }, {
        label: '李四'
        }, {
        label: '王麻子'
      }],
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        result: '退回',
        opinion:'信息不完整',
        state:'草稿'
      }]
      }
    },
    methods:{
      retu(){//返回
       this.$router.go(-1)
      },
      submit(){//提交
        if(!this.endDate && !this.editionState && !this.ruleState && !this.textarea){
          this.$message({
            message: '请输入审核信息',
            type: 'warning'
          });
        }else{
          let sub = {
            date : this.endDate,
            name : this.editionState,
            result : this.ruleState,
            opinion : this.textarea
          }
          this.tableData.push(sub),
          this.endDate = "",
          this.editionState="",
          this.ruleState="",
          this.textarea=""
        }
      },
      empower(){
        this.$router.push({name:"role"})
      },
      testResult(){// 查看测试结果
        this.$router.push({name:'testResult'})
      },
      lookRule(){//查看规则  跳转假页面
        this.$router.push({name:'customs'})
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
  .condition li{
    width: 30%;
    margin: 0 20px 20px 0;
  }
</style>