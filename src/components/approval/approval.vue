<template>
  <div>
    <div class="fixedTitle">
      核赔规则编辑（固定式规则）
      <div class="floatRight">
        <el-button size="mini" @click="retu()" >返回</el-button>
        <el-button size="mini" type="primary">角色授权</el-button>
        <el-button size="mini" type="primary">查看规则详情</el-button>
        <el-button size="mini" type="primary">查看测试结果</el-button>
        <el-button size="mini" type="primary">提交</el-button>
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
          <el-date-picker size="small" style="width:100%" v-model="endDate" type="date" placeholder="请选择审核时间"> </el-date-picker>
        </li>
        <li style="flex: 0.87;">
          <p>审核意见</p>
          <el-input  type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input>
          <!-- <el-date-picker size="small" style="width:100%" v-model="endDate" type="date" placeholder="请选择审核时间"> </el-date-picker> -->
        </li>
      </ul>
    </div>
    <div>
      <p class="basic">历史审核意见</p>
      <div class="condition">
        <el-table
          :data="tableData"
          border
          :stripe="true" 
          size="mini"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="审核结论"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="审核意见"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="审核后状态"
            width="180">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "home",
    data(){
      return{
      endDate:"", // 审核时间
      ruleState:"", //审核结论
      editionState:"", //审核人
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
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      }
    },
    methods:{}
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
</style>