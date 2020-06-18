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
        <!-- 左侧 -->
        <el-aside width="200px" class="left">
          <el-input size="mini" placeholder="请输入内容" v-model="search" class="input-with-select">
            <el-button slot="append" @click="Search()" icon="el-icon-search"></el-button>
          </el-input>
        </el-aside>
        <!-- 右侧 -->
        <el-main class="right">
          <!-- 计价类型 -->
          <div class="type">
            <p>选择计价类型</p>
            <el-radio-group v-model="meter">
              <el-radio :label="1">固定费率</el-radio>
              <el-radio :label="2">固定保费</el-radio>
              <el-radio :label="3">自主费率</el-radio>
              <el-radio :label="4">关联费率</el-radio>
            </el-radio-group>
          </div>
          <!-- 基础信息 -->
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
          <!-- 基础保费 -->
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
          <!-- 调整系数 -->
          <div class="type">
            <p>调整系数
              <span class="addFormula"> 
                <el-button @click="Query()" size="mini" type="primary">添加调整系数</el-button>
              </span> 
            </p>
            <!-- 加form表单实现动态添加 -->
            <el-form 
              :model="dynamicValidateForm" 
              ref="dynamicValidateForm" 
              class="demo-dynamic">
               <el-form-item
                v-for="(domain, index) in dynamicValidateForm.domains"
                :key="domain.key"
                :prop="'domains.' + index + '.value'"
                size="mini">
                <div class="coefficient">
                  <p>调整系数 : 
                    <el-input 
                      size="mini" 
                      v-model="domain.index" 
                      style="width:200px" 
                      placeholder="请输入调整系数"> </el-input>
                    <span class="addFormula">
                      <el-button @click.prevent="pzyxyz(domain)" size="mini" type="primary">配置影响因子</el-button>
                      <el-button @click.prevent="removeDomain(domain)" size="mini" type="primary">删除调整系数</el-button>
                    </span>
                  </p>
                  <div v-show="AdjustTable">
                    <el-table  class="rateTitle" size="mini" :data="adjustData" border stripe>
                      <template v-for="item in addAdjustData">
                        <el-table-column 
                          :prop="item.dataItem"
                          :label="item.name.slice(-1).toString()"
                          :key="item.id">
                        </el-table-column>
                      </template>
                      <el-table-column label="调整系数">
                        <template slot-scope="scope">
                          <el-input size="mini" v-model="scope.row.premium" > </el-input>
                        </template>
                      </el-table-column>
                      <el-table-column label="操作" >
                        <template slot-scope="scope">
                          <el-button @click="adjustDelete(scope.row)" type="text" size="small">删除</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
              </el-form-item>
            </el-form>
          </div>
          <!-- 保费公式 -->
          <div class="type">
            <p>保费公式
              <span class="addFormula"> 
                <el-button @click="addFormula" size="mini" type="primary">添加保费公式</el-button>
              </span> 
            </p>
            <el-form 
              :model="premiumFormula" 
              ref="premiumFormula" 
              class="demo-dynamic">
              <el-form-item
                v-for="(domain, index) in premiumFormula.domains"
                :key="domain.key"
                :prop="'domains.' + index + '.value'"
                size="mini">
                <div class="coefficient">
                  <span style="font-size:14px" >满足条件</span>
                  <div class="Btngroup" >
                    <el-button 
                      @click.prevent="deleFormula(domain)" 
                      size="mini" 
                      type="primary" 
                      plain>删除公式</el-button>
                    <el-select 
                      v-model="symbolValue" 
                      style="width:120px" 
                      class="Symbol" 
                      size="mini" 
                      clearable 
                      placeholder="选择符号">
                      <el-option
                        v-for="item in symbol"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label">
                      </el-option>
                    </el-select>
                    <el-select 
                      v-model="factorValue" 
                      class="Symbol" 
                      size="mini" 
                      clearable 
                      style="width:120px"
                      placeholder="选择因子">
                      <el-option
                        v-for="item in factor"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label">
                      </el-option>
                    </el-select>
                    <el-select 
                      v-model="fixedValue" 
                      clearable style="width:120px"  
                      size="mini" 
                      placeholder="选择固定值">
                      <el-option
                        v-for="item in fixed"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label">
                      </el-option>
                    </el-select>
                    <el-select 
                      v-model="adjustment" 
                      clearable style="width:120px"  
                      size="mini" 
                      placeholder="选择系数">
                      <el-option
                        v-for="item in fixed"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label">
                      </el-option>
                    </el-select>
                    <el-button @click="addCondition(domain)" size="mini" type="primary">添加</el-button>
                    <el-button @click="deleteADD(domain)" size="mini" type="primary">撤销</el-button>
                  </div>
                  <div class="formula" >
                    <el-input
                      type="textarea"
                      :disabled="true"
                      :rows="1"
                      v-model="domain.satisfy"
                      >
                    </el-input>
                  </div>
                  <span style="font-size:14px" >保费公式</span>
                  <div class="formula" >
                    <el-input
                      type="textarea"
                      :disabled="true"
                      :rows="1"
                      v-model="domain.formula"
                      >
                    </el-input>
                  </div>
                </div>
              </el-form-item>
            </el-form >
          </div>
        </el-main>
      </el-container>
    </el-container>
    <!-- 模态框部分 -->
    <!-- 配置影响因子模态框 -->
    <el-dialog  
      title="配置影响因子" 
      :visible.sync="influenceFactor" 
      width="80%" 
      style="padding-bottom: 20px;">
      <span  class="btn">
        <el-button size="mini" @click="influenceFactor = false">返回</el-button>
        <el-button size="mini" type="primary" @click="preservation()">创建表格</el-button>
      </span>
      <el-input 
        size="mini" 
        placeholder="请输入因子名称搜索" 
        v-model="nameSearch" 
        class="input-with-select namesearch">
        <el-button slot="append" @click="Search()" icon="el-icon-search"></el-button>
      </el-input>
      <div style="margin: 10px 0;">
        <el-button size="mini" type="primary" @click="addFactor()">添加因子</el-button>
      </div>
      <el-table size="mini" border stripe :data="gridData">
        <el-table-column property="id" label="序号" width="80"></el-table-column>
        <el-table-column label="因子名称">
          <template slot-scope="scope">
            <el-cascader 
              style="width:100%" 
              size="mini" 
              :options="options" 
              ref="teer" 
              v-model="scope.row.name" 
              clearable></el-cascader>
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
    <!-- 调整系数配置因子模态框 -->
    <el-dialog  
      title="配置影响因子" 
      :visible.sync="adjustFactor" 
      width="80%" 
      style="padding-bottom: 20px;">
      <span  class="btn">
        <el-button size="mini" @click="adjustFactor = false">返回</el-button>
        <el-button size="mini" type="primary" @click="adjustTable()">创建表格</el-button>
      </span>
      <el-input 
        size="mini" 
        placeholder="请输入因子名称搜索" 
        v-model="nameSearch" 
        class="input-with-select namesearch">
        <el-button slot="append" @click="Search()" icon="el-icon-search"></el-button>
      </el-input>
      <div style="margin: 10px 0;">
        <el-button size="mini" type="primary" @click="addAdjust()">添加因子</el-button>
      </div>
      <el-table size="mini" border stripe :data="addAdjustData">
        <el-table-column property="id" label="序号" width="80"></el-table-column>
        <el-table-column label="因子名称">
          <template slot-scope="scope">
            <el-cascader 
              style="width:100%" 
              size="mini" 
              :options="options" 
              ref="teer" 
              v-model="scope.row.name" 
              clearable></el-cascader>
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
            <el-button @click="delAdjust(scope.row)" type="text" size="small">删除</el-button>
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
      adjustFactor:false,//调整系数配置因子模态框
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
            index: "name"
          },{
            value: "年龄",
            label: "年龄",
            index: "age"
          }]
        }]
      }],
      rates:false,
      premiums:true,
      Table:false,//显示隐藏基础费率/保费内表格
      AdjustTable:false,//显示隐藏调整系数内表格
      State:[{
        label:"开发中",
        },{
        label:"已生效"
        },{
        label:'已失效'
      }],
      dynamicValidateForm: {//调整系数
        domains: [],
      },
      premiumFormula:{ // 保费公式
        domains:[]
      },
      
      symbol: [{ //fuhao
        label: ' > '
        }, {
        label: ' < '
        }, {
        label: ' = '
        }, {
        label: ' <= '
        }, {
        label: ' >= '
        }, {
        label: ' 且 '
      }],
      symbolValue:"",//符号
      factorValue:"",//因子绑定
      factor: [],// 因子数据
      fixedValue:"", //固定值
      adjustment:"",//选择调整系数
      fixed:[],//固定值数据
      addr:[],//添加公式 过渡

      premium:"",
      rate:"",
      meter:1,//选择器默认
      choice:2,//保费选择默认
      factorData: [],// 基础保费表格数据
      adjustData: [],//调整系数表格数据
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
      limitValues:[],
      addAdjustData:[],//调整系数模态框数据展示
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
      if(this.factorData.length !==0){
        this.$confirm('此操作将重置表格, 是否修改?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 重置添加表格
          this.gridData =[]
          // 重置显示表格
          this.factorData = []
          // 重置选择因子数据
          this.factor = []
          this.influenceFactor = true
          if(this.factorData.length == 0){
            this.Table = false
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改',
            center: true,
            duration: 2000
          });          
        });
      }else{
        this.gridData =[]
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
      if(this.factorData.length == 0){
        this.Table = false
      }
    },
    adjustDelete(row){//调整系数删除
      this.adjustData.forEach((item,k) => {
        if(row.id === item.id){
          this.adjustData.splice(k,1)
        }
      })
      if(this.factorData.length == 0){
        this.AdjustTable = false
      }
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
      if(this.gridData.length >= 5){
        this.$message({
          message: '数据添加过多',
          type: 'warning',
            center: true,
            duration: 2000
        });
      }else{
        this.gridData.push(add)
      }
    },
    addAdjust(){//调整系数配置影响因子
      let add =  {
        id: this.addAdjustData.length+1,
        name: "",
        type:"",
        dataItem:"limitValue",
        limitValue:"",
        // limit:"",
      }
      if(this.addAdjustData.length >= 5){
        this.$message({
          message: '数据添加过多',
          type: 'warning',
            center: true,
            duration: 2000
        });
      }else{
        this.addAdjustData.push(add)
      }
    },
    preservation(){//模态框保存(创建表格)
      // 判断有几行数据
      if(this.gridData.length > 1){
        let gridDataT = this.gridData.slice(-1)//最后一项
        let gridDataO = [this.gridData[0]]//第一项
        gridDataO.forEach((item,k) => {
          gridDataT.forEach(items => {
            this.limitValues = items.limitValue.split(";")//限定值字符转数组 split
          })
          let limitValue = item.limitValue.split(";")//限定值字符转数组 split
          limitValue.forEach( index => {
            this.limitValues.forEach( indexs => {
              let apl = {
                id : this.factorData.length+1,
                name : item.name.slice(-1).toString(),//只要数组的最后一项slice
                limitValue : index,
                limit : indexs,
                premium:"",//保费
                rate:""//费率
              }
              this.factorData.push(apl)
            })
          })
        })
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
      // 将当前选择的因子push进选择因子数据里
      this.gridData.map(item => {
        return item.name.slice(-1).toString()
      }).forEach(items => {
        let factorName = {
          id : this.factor.length+1,
          label : items,
          index : '',
        }
        this.factor.push(factorName)
      })
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
    delAdjust(row){// 调整系数 配置影响因子 删除
      this.addAdjustData.forEach((item,k) => {
        if(row.id === item.id){
          this.addAdjustData.splice(k,1)
        }
      })
    },
    Query(){//添加调整系数
      this.dynamicValidateForm.domains.push({
        id:this.dynamicValidateForm.domains.length+1,
        value: '',
        index:"",
        key: Date.now()
      });
    },
    pzyxyz(item){
      this.adjustFactor=true
    },
    adjustTable(){//调整系数创建表格
      // alert("调整系数创建表格")
      if(this.addAdjustData.length > 1){
        let addAdjustDataT = this.addAdjustData.slice(-1)//最后一项
        let addAdjustDataO = [this.addAdjustData[0]]//第一项
        addAdjustDataO.forEach((item,k) => {
          addAdjustDataT.forEach(items => {
            this.limitValues = items.limitValue.split(";")//限定值字符转数组 split
          })
          let limitValue = item.limitValue.split(";")//限定值字符转数组 split
          limitValue.forEach( index => {
            this.limitValues.forEach( indexs => {
              let apl = {
                id : this.adjustData.length+1,
                name : item.name.slice(-1).toString(),//只要数组的最后一项slice
                limitValue : index,
                limit : indexs,
                premium:"",//保费
                rate:""//费率
              }
              this.adjustData.push(apl)
            })
          })
        })
      }else{
        this.addAdjustData.forEach(item => {
        let limitValue = item.limitValue.split(";")//限定值字符转数组 split
        limitValue.forEach( items => {
            let apl = {
              id : this.adjustData.length+1,
              name : item.name.slice(-1).toString(),//只要数组的最后一项slice
              limitValue : items,
              premium:"",//保费
              rate:""//费率
            }
            this.adjustData.push(apl)
          })
        })
      }
      // 将当前选择的因子push进选择因子数据里
      this.addAdjustData.map(item => {
        return item.name.slice(-1).toString()
      }).forEach(items => {
        let factorName = {
          id : this.factor.length+1,
          label : items,
          index : '',
        }
        this.factor.push(factorName)
      })
      this.adjustFactor = false
      this.AdjustTable=true
    },
    removeDomain(item) {//删除调整系数
      var index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },
    addFormula(){//添加保费公式
      this.premiumFormula.domains.push({
        id:this.premiumFormula.domains.length+1,
        value: '',
        satisfy:"",
        formula:"",
        key: Date.now()
      });
    },
    deleFormula(item){//删除保费公式
      var index = this.premiumFormula.domains.indexOf(item)
      if (index !== -1) {
        this.premiumFormula.domains.splice(index, 1)
      }
    },
    addCondition(index){//添加保费公式添加
      if(!this.symbolValue && !this.factorValue && !this.fixedValue && !this.adjustment){
        this.$message({
          message: "请选择条件",
          type: "error",
          center: true,
          duration: 2000
        });
      }else{
        let adds = []
        adds.push(this.symbolValue)
        adds.push(this.factorValue)
        adds.push(this.fixedValue )
        adds.push(this.adjustment )
        this.addr.push(adds.join(""))
        this.premiumFormula.domains.forEach(item => {
          if(index.id === item.id){
            item.satisfy = this.addr.join("")
          }
        })
        this.symbolValue = ""
        this.factorValue = ""
        this.fixedValue  = ""
        this.adjustment  = ""
      }
    },
    deleteADD(index){//添加保费公式撤销
      this.premiumFormula.domains.forEach(item => {
        if(index.id === item.id){
          if(!item.satisfy){
            this.$message({
              message: '没有公式可删除',
              type: "error",
              center: true,
              duration: 2000
            });
          }else{
            this.addr.pop()
            item.satisfy=this.addr.join("")
          }
        }
      })
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
        .coefficient{
          border: 1px solid #333;
          padding: 5px;
          background-color: #fff;
          overflow: hidden;
          p{
            font-size: 14px;
          }
          .Btngroup{
            float: right;
          }
          .formula{
            margin: 10px 10px 0;
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