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
          <li>
            <p>选择机构</p>
            <el-cascader 
              size="mini"  
              class="directly" 
              :options="options" 
              :clearable="true" 
              v-model="Step">
            </el-cascader>
          </li>
      </ul>
    </div>
     <div class="factorList">
      <span class="addFormula" style="margin-bottom:20px;"> 
        <el-button type="primary" @click="addFactor()" size="mini">新增因子</el-button> 
      </span> 
      <el-table size="mini" :data="factorData" border  stripe>
          <el-table-column prop="id" label="序号" width="195"> </el-table-column>
          <el-table-column label="枚举名称" width="200"> 
            <template slot-scope="scope" >
              <el-input size="mini" v-model="scope.row.name" > </el-input>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="枚举值类型" width="195"> </el-table-column>
          <el-table-column label="枚举值" width="200">
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.value" > </el-input>
            </template>
          </el-table-column>
        <el-table-column label="操作" width="195">
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
        Step: "",//直属机构
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
      testResult(){//暂存
        this.$message({
          message: '已暂存至草稿，下次进入可直接编辑',
          type: 'warning',
          center: true,
          duration: 2000
        });
      },
      submit(){//提交
        this.$message({
          message: '提交成功',
          type: 'success',
          center: true,
          duration: 2000
        });
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
    width: 31%;
    margin: 0 10px 20px 0;
  }
  .factorList{
    margin: 0 20px 30px 20px;
  }
</style>