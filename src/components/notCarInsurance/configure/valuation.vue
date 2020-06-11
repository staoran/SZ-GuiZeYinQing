<template>
  <div>
    <el-container >
      <el-header style="height:60;padding: 0;">
        <div class="fixedTitle">
        保费规则配置
          <div class="floatRight">
            <el-button size="mini" @click="retu()" >返回</el-button>
            <el-button size="mini" @click="storage()" type="primary">暂存</el-button>
            <el-button size="mini" @click="Submit()" type="primary">提交</el-button>
            <el-button size="mini" @click="details()" type="primary">审批详情</el-button>
          </div>
        </div>
        <div class="generalize">
          <p class="title">产品概述</p>
          <p class="name">{{this.$route.query.name}}</p>
          <ul class="condition">
            <li>
              <p>当前版本号</p>
              <el-input size="small" v-model="editionId" placeholder="请输入当前版本号"></el-input>
            </li>
            <li>
              <p>当前版本状态</p>
              <el-select size="small" style="width:100%" v-model="editionState" placeholder="请选择版本状态">
                <el-option
                  v-for="item in State"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
                </el-option>
              </el-select>
            </li>
            <li>
              <p>版本描述</p>
              <el-input size="small" v-model="describe" placeholder="请输入版本描述"></el-input>
            </li>
          </ul>
          <div :class="zs"> 在售 </div>
        </div>
      </el-header>
      <el-container class="content">
        <el-aside width="200px" class="left">
          <el-input size="mini" placeholder="请输入内容" v-model="search" class="input-with-select">
            <el-button slot="append" @click="Search()" icon="el-icon-search"></el-button>
          </el-input>
        </el-aside>
        <el-main class="right">
          <div class="type">
            <p>选择计价类型</p>
            <el-radio-group v-model="meter">
              <el-radio :label="1">固定费率</el-radio>
              <el-radio :label="2">固定保费</el-radio>
              <el-radio :label="3">自主费率</el-radio>
              <el-radio :label="4">关联费率</el-radio>
            </el-radio-group>
          </div>
          <div class="type">
            <p>基础信息</p>
            <ul class="condition">
              <li>
                <p>规则编码</p>
                <el-input size="mini" v-model="code" placeholder="请输入规则编码"></el-input>
              </li>
              <li>
                <p>描述</p>
                <el-input size="mini" type="textarea" autosize placeholder="请输入描述" v-model="describe"></el-input>
              </li>
            </ul>
          </div>
          <div class="type">
            <p>基础费率/保费
              <span class="addFormula"> 
                <el-button @click="influence()" size="mini" type="primary">配置影响因子</el-button>
              </span> 
            </p>
            <el-radio-group v-model="choice" @change="judge">
              <el-radio :label="1">基础费率</el-radio>
              <el-radio :label="2">基础保费</el-radio>
            </el-radio-group>
            <div v-show="Table">
              <el-table height="218" class="rateTitle" size="mini" :data="factorData" border stripe>
                <template v-for="item in gridData">
                  <el-table-column 
                    :prop="item.dataItem"
                    :label="item.name.slice(-1).toString()"
                    :key="item.id">
                  </el-table-column>
                </template>
                <el-table-column label="基础费率" v-if="rates">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.rate" > </el-input>
                  </template>
                </el-table-column>
                <el-table-column label="基础保费" v-if="premiums">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.premium" > </el-input>
                  </template>
                </el-table-column>
                <el-table-column label="操作" >
                  <template slot-scope="scope">
                    <el-button @click="Delete(scope.row)" type="text" size="small">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="type">
            <p>调整系数
              <span class="addFormula"> 
                <el-button @click="Query()" size="mini" type="primary">添加调整系数</el-button>
              </span> 
            </p>
          </div>
          <div class="type">
            <p>保费公式
              <span class="addFormula"> 
                <el-button  size="mini" type="primary">添加保费公式</el-button>
              </span> 
            </p>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <!-- 模态框部分 -->
    <!-- 配置影响因子模态框 -->
    <el-dialog  title="配置影响因子" :visible.sync="influenceFactor" width="80%" style="padding-bottom: 20px;">
      <span  class="btn">
        <el-button size="mini" @click="influenceFactor = false">返回</el-button>
        <el-button size="mini" type="primary" @click="preservation()">创建表格</el-button>
      </span>
      <el-input size="mini" placeholder="请输入因子名称搜索" v-model="nameSearch" class="input-with-select namesearch">
        <el-button slot="append" @click="Search()" icon="el-icon-search"></el-button>
      </el-input>
      <div style="margin: 10px 0;">
        <el-button size="mini" type="primary" @click="addFactor()">添加因子</el-button>
      </div>
      <el-table size="mini" border stripe :data="gridData">
        <el-table-column property="id" label="序号" width="80"></el-table-column>
        <el-table-column label="因子名称">
          <template slot-scope="scope">
            <el-cascader style="width:100%" size="mini" :options="options" ref="teer" v-model="scope.row.name" clearable></el-cascader>
          </template>
        </el-table-column>
        <el-table-column label="限定类型">
          <template slot-scope="scope">
            <el-select size="mini" v-model="scope.row.type" placeholder="请选择">
              <el-option
                v-for="item in limitType"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="限定值">
          <template slot-scope="scope">
            <el-input placeholder="请输入限定值" size="mini" v-model="scope.row.limitValue" clearable> </el-input>
          </template>
        </el-table-column>
        <el-table-column width="100" label="操作" >
          <template slot-scope="scope">
            <el-button @click="delFactor(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "valuation",
  data(){
    return{
      editionId:"",//版本号
      editionState:"",//版本状态
      describe:"",//版本描述
      search:"",//搜索框内容
      code:"",//规则编码
      describe:"",//描述
      influenceFactor:false,//配置影响因子模态框
      nameSearch:"",//因子名称搜索
      zs: "zs",//在售
      options: [{ //添加因子数据 
        value: "核赔单",
        label: "核赔单",
        children: [{
          value: "自动理算单",
          label: "自动理算单",
          children: [{
            value: "名字",
            label: "名字",
          },{
            value: "年龄",
            label: "年龄",
          }]
        }]
      }],
      rates:false,
      premiums:true,
      Table:false,//显示隐藏表格
      State:[{
        label:"开发中",
        },{
        label:"已生效"
        },{
        label:'已失效'
      }],
      premium:"",
      rate:"",
      meter:1,//选择器默认
      choice:2,//保费选择默认
      factorData: [],// 表格数据
      limitType:[{ // 限定类型
        label:"固定值",
        id: 1,
        },{
        label:"布尔值",
        id: 2,
        },{
        label:"文本枚举值",
        id: 3,
        },{
        label:"区间枚举值",
        id: 4,
      }],
      gridData: [],//模态框用于展示因子数据
    }
  },
  methods: {
    retu(){ //返回
      this.$router.go(-1)
    },
    details(){//审批详情
      this.$router.push({name:'approval'})
    },
    Search(){//查询
      alert(this.search)
    },
    influence(){//配置影响因子按钮
      if(this.gridData.length !==0){
        this.$confirm('此操作将重置表格, 是否修改?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 重置添加表格
          this.gridData =[]
          // 重置显示表格
          this.factorData = []
          this.influenceFactor = true
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改',
            center: true,
            duration: 2000
          });          
        });
      }else{
        this.influenceFactor = true
      }
    },
    judge(){//展示费率
      if(this.choice == 1){
        this.rates=true,
        this.premiums=false
      }else{
        this.rates=false,
        this.premiums=true
      }
    },
    Delete(row){//基础保费/费率删除
      this.factorData.forEach((item,k) => {
        if(row.id === item.id){
          this.factorData.splice(k,1)
        }
      })
    },
    addFactor(){//模态框添加因子
      let add =  {
        id: this.gridData.length+1,
        name: "",
        type:"",
        dataItem:"limitValue",
        limitValue:"",
        // limit:"",
      }
      this.gridData.push(add)
    },
    preservation(){//模态框保存(创建表格)
      if(this.gridData.length > 1){
      //   this.gridData.forEach(item => {
      //     let limitValue = item.limitValue.split(";")//限定值字符转数组 split
      //     let limit = ["是","否"] //基础保费类型
      //     limitValue.forEach( items => {
      //       limit.forEach( index => {
      //         let apl = {
      //           id : this.factorData.length+1,
      //           name : item.name.slice(-1).toString(),//只要数组的最后一项slice
      //           limitValue : items,
      //           limit : index,
      //           premium:"",//保费
      //           rate:""//费率
      //         }
      //         this.factorData.push(apl)
      //       })
      //     })
      //   })
      }else{
        this.gridData.forEach(item => {
        let limitValue = item.limitValue.split(";")//限定值字符转数组 split
        limitValue.forEach( items => {
            let apl = {
              id : this.factorData.length+1,
              name : item.name.slice(-1).toString(),//只要数组的最后一项slice
              limitValue : items,
              premium:"",//保费
              rate:""//费率
            }
            this.factorData.push(apl)
          })
        })
      }
      this.influenceFactor = false
      this.Table=true
    },
    delFactor(row){// 配置影响因子 删除
      this.gridData.forEach((item,k) => {
        if(row.id === item.id){
          this.gridData.splice(k,1)
        }
      })
    },
    NewTable(){//创建表格显示表格
    },
    Query(){//调整系数
      // console.log("133")
    },
    storage(){//暂存
      this.$message({
        message: '已暂存至草稿，下次进入可直接编辑',
        type: 'warning',
        center: true,
        duration: 2000
      });
    },
    Submit(){//提交
      this.$message({
        message: '提交成功',
        type: 'success',
        center: true,
        duration: 2000
      });
    },
  }
}
</script>>
<style lang="less" scoped>
  .fixedTitle {
    height: 50px;
    line-height: 50px;
    color: #fff;
    font-size: 20px;
    font-weight: 800;
    background-color: #aaaaaa;
    padding: 0 30px 0 20px;
  }
  .generalize{
    border: 1px solid #333;
    margin: 10px 0;
    padding:0 15px;
    position: relative;
    .title{
      font-size: 16px;
      font-weight: 800;
      margin: 10px 0;
    }
    .name{
      font-size: 14px;
      margin: 10px 0;
    }
    .condition{ 
      background-color: #ffffff;
      padding: 0;
      li{
        width: 31%;
        margin-right:20px;
      }
    }
    .zs{
      width: 50px;
      height: 36px;
      line-height: 36px;
      font-size: 14px;
      text-align: center;
      position: absolute;
      top: 10px;
      left: 140px;
      background-color:yellow;
      box-shadow: 6px 6px 5px #888;
    }
  }
  .content{
    height: 100%;
    .left{
      border: 1px solid #333;
      padding:5px;
      .input-with-select{
        background-color: #fff;
      }
    }
    .right{
      padding: 10px;
      .type{
        background-color: #f2f2f2;
        padding:5px;
        margin-bottom: 20px;
        p{
          margin-top:0px;
        }
        .el-radio-group{
          display: flex;
          margin-bottom: 10px;
          .el-radio{
            margin-right:100px;
          }
        }
        .condition{
          padding: 0 0 0 16px;
          li{
            width: 45%;
            margin: 0 20px 0 0;
          }
        }
        
        .addFormula{
          float: right;
          margin-right: 30px;
        }
        .rateTitle{
          margin-top: 20px;
        }
      }
    }
  }
  .btn{
    float: right;
    margin-bottom:10px;
  }
  .namesearch{
    width: 300px;
  }
  .el-dialog__body {
    padding-top: 0 !important;
  }
</style>