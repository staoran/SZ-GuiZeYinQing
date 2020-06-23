<template>
  <div>
    <!-- title -->
    <div class="fixedTitle">
      规则测试查询
    </div>
    <!-- 基础信息 -->
    <div style="border-bottom:1px dashed #000">
      <p class="basic">查询条件
        
        <span class="addFormula"> 
          <el-button @click="Query()" size="mini" type="primary">查询</el-button> 
          <el-button @click="reset()" size="mini">重置</el-button> 
        </span> 
      </p>
      <div class="">
        <ul class="condition">
          <li>
            <p>规则编码</p>
            <el-input size="small " v-model="ruleCode" placeholder="请输入规则编码"></el-input>
          </li>
          <li>
            <p>规则名称</p>
            <el-input size="small " v-model="ruleName" placeholder="请输入规则名称"></el-input>
          </li>
          <li>
            <p>规则类型</p>
            <el-select size="small " style="width:100%" v-model="ruleType" placeholder="请选择规则类型">
              <el-option
                v-for="item in Type"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
          <li>
            <p>规则有效起期</p>
            <el-date-picker size="small " format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" style="width:100%" v-model="startDate" type="date" placeholder="请选择生效日期"> </el-date-picker>
          </li>
          <li>
            <p>规则有效止期</p>
            <el-date-picker size="small " format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" style="width:100%" v-model="endDate" type="date" placeholder="请选择失效日期"> </el-date-picker>
          </li>
          <li>
            <p>规则状态</p>
            <el-select size="small " style="width:100%" v-model="ruleState" placeholder="请选择规则状态">
              <el-option
                v-for="item in rule"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
          <li>
            <p>选择机构</p>
            <el-cascader 
              size="small"  
              class="directly" 
              :options="options" 
              :clearable="true" 
              v-model="Step">
            </el-cascader>
          </li>
        </ul>
      </div>
    </div>
    <!-- 列表 -->
    <div class="list" v-show="ruleList">
      <p class="basic">列表</p>
      <el-table :data="queryList" size="mini" border stripe>
        <el-table-column fixed prop="code" label="规则编码" width="150"></el-table-column>
        <el-table-column prop="type" label="规则类型" width="100"></el-table-column>
        <el-table-column prop="name" label="规则名称" width="200"></el-table-column>
        <el-table-column prop="startdate" label="有效起期" width="150"></el-table-column>
        <el-table-column prop="enddate" label="有效止期" width="150"></el-table-column>
        <el-table-column prop="state" label="状态" width="100"></el-table-column>
        <el-table-column fixed="right" label="操作" >
        <template slot-scope="scope">
          <el-button @click="approval(scope.row)" type="text" size="small">审批</el-button>
          <el-button @click="test(scope.row)" type="text" size="small">测试</el-button>
          <el-button @click="release(scope.row)" type="text" size="small">发布</el-button>
        </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="paging"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[3, 5, 10]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="109">
      </el-pagination>
    </div>
    <!-- 已发布 -->
    <div class="releaseList" v-show="releaselist">
      <p class="basic">已发布</p>
      <el-table :data="published" size="mini" border stripe>
        <el-table-column prop="code" label="规则编码" width="150"></el-table-column>
        <el-table-column prop="type" label="规则类型" width="100"></el-table-column>
        <el-table-column prop="name" label="规则名称" width="200"></el-table-column>
        <el-table-column prop="startdate" label="有效起期" width="150"></el-table-column>
        <el-table-column prop="enddate" label="有效止期" width="150"></el-table-column>
        <el-table-column prop="state" label="发布状态" width="100"></el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button @click="details(scope.row)" type="text" size="small">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 发布模态框 -->
    <el-dialog title="发布" :visible.sync="addFactor" width="40%">
      <div>
        <p>发布策略</p>
        <el-radio v-model="radio" @change="change" label="1">实时发布</el-radio>
        <el-radio v-model="radio" @change="change" label="2">
          定时发布
          <el-date-picker :disabled="disabled" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" size="mini" style="width:100%" v-model="timing" type="date" placeholder="请选择定时发布日期"> </el-date-picker>
        </el-radio>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFactor = false">撤销发布</el-button>
        <el-button type="primary" @click="ent()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ruleQuery",
  data() {
    return {
      ruleCode:"", //规则编码
      ruleName:"", //规则名称
      startDate:"", //日期起
      endDate:"", // 日期止
      ruleState:"", //规则状态
      Step: "",//直属机构
      ruleType:"", //规则类型
      currentPage4: 4, //分页
      addFactor: false, // 发布模态框
      ruleList:false,//列表
      releaselist:false,//已发布列表
      timing: "", //日期框
      disabled:true, // 默认禁用
      radio:'1', //默认按钮
      publishData: {}, //新增发布数据
      rule:[{ // 规则状态数据
        value: '0',
        label: '草稿'
        },{ // 规则状态数据
        value: '1',
        label: '生效'
        }, {
        value: '2',
        label: '无效'
        }, {
        value: '3',
        label: '审核中'
        }, {
        value: '4',
        label: '测试中'
        }, {
        value: '5',
        label: '发布中'
      }],
      queryList: [ // 表格数据
        {
          id:1,
          code: "R0000001",
          type: "渠道",
          name: "佣金费用规则001",
          startdate: "2020-01-29",
          enddate: "2020-02-20",
          state: "有效"
        }, {
          id:2,
          code: "R0000002",
          type: "计价",
          name: "计价规则002",
          startdate: "2020-02-22",
          enddate: "2020-03-29",
          state: "草稿"
        }, {
          id : 3,
          code: "R0000003",
          type: "核保",
          name: "核保规则003",
          startdate: "2020-01-29",
          enddate: "2024-02-19",
          state: "无效"
        }
      ], 
      published: [{//已发布数据
        id:1,
        code: "R0000001",
        type: "渠道",
        name: "佣金费用规则001",
        startdate: "2020-01-29",
        enddate: "2020-02-20",
        state: "已发布"
      }],
      Type:[{ // 规则类型数据
        value: 'zdy',
        label: '自定义'
        }, {
        value: 'gd',
        label: '固定'
      }],
      options: [ // 直属机构信息
        {
          value: "shanghai",
          label: "总公司",
          children: [{
            value: "chengdu",
            label: "成都电话中心",
          },{
            value: "shanghaiDH",
            label: "上海电话中心",
          },{
            value: "wuhanDH",
            label: "武汉电话中心",
          },{
            value: "shanghaishi",
            label: "上海分公司",
            children: [{
              value: "pudongxinqu",
              label: "上海分公司"
            }]
          },{
            value: "beijishi",
            label:"北京分公司",
            children: [{
              value: "dongcheng",
              label: "东城营业部"
              },{
              value: "huairou",
              label: "怀柔支公司"
              },{
              value: "sjs",
              label: "石景山支公司"
            }]
          },{
            value: "shenz",
            label: "深圳分公司",
            children: [{
              value: "szdx",
              label: "深圳分公司电话销售业务部"
            }]
          },{
            value: "wz",
            label: "温州分公司",
            children: [{
              value: "ruian",
              label: "瑞安支公司"
            }]
          }]
        },
      ],
    };
  },
  methods: {
    approval(row){//测试
      this.$router.push({name:'approval',query:{id:row.id}})
    },
    test(row){//审批
      this.$router.push({name:'testResult',query:{id:row.id}})
    },
    release(row){//发布
      this.addFactor = true;
      this.publishData = row
      this.publishData.id = this.published.length+1
    },
    change(){ // 动态实现 日期框禁用
      if(this.radio == 2){
        this.disabled=false
      }else{
        this.disabled = true
        this.timing = ""
      }
    },
    ent(){//模态框确定
      if(this.radio == 2){
        if(!this.timing){
          this.$message({
            message: '请选择定时发布日期',
            type: 'warning'
          });
        }else{
          this.published.push(this.publishData)
          this.publishData = {}
          this.addFactor = false
          this.radio = '1'
          this.releaselist = true
        }
      }else{
        this.published.push(this.publishData)
        this.publishData={}
        this.addFactor = false
          this.radio = '1'
        this.releaselist = true
      }
    },
    Query(){//查询
      this.ruleList = true
    },
    reset(){//重置
      this.ruleCode="", //规则编码
      this.ruleName="", //规则名称
      this.startDate="", //日期起
      this.endDate="", // 日期止
      this.ruleState="", //规则状态
      this.ruleType="" //规则类型
      this.Step = ""//机构
      this.ruleList = false
      this.releaselist = false
    },
    details(row){
      this.$router.push({name:'customs',query:{id:row.id}})
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleClick(row){//已发布详情
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
.basic{
  font-weight: 800;
  margin-left: 20px;
}
.condition{
  padding: 15px 0 0 30px;
  margin: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #f2f2f2;
  font-size: 14px;
}
.condition li{
  width: 22%;
  margin: 0 20px 20px 0;
}
.condition li p {
  margin: 0;
  margin-bottom: 10px;
}

.addFormula{
  float: right;
  margin-right: 30px;
}
.list{
  border-bottom:1px dashed #000;
  overflow: hidden;
}
.releaseList{
  margin-bottom: 20px;
}
.paging{
  float: right;
  margin: 20px 30px 20px 0;
}
</style>