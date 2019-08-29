<template>
  <div style="position:relative">
    <div class="version_table">
      <div style="margin-bottom:15px">
        <el-button type="primary" size="small" class="">保存当前版本</el-button>
        <el-button type="primary" size="small" class="">导出</el-button>
      </div>
      
      <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column prop="date" label="版本名称" width="180"></el-table-column>
        <el-table-column prop="name" label="时间" width="180"></el-table-column>
        <el-table-column prop="address" label="创建人"></el-table-column>
        <el-table-column prop="address" label="版本说明"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <!-- <el-button type="text" size="small">导出</el-button> -->
            <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="deleteRow(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
     <div class="version_form" style="display:none">
            <div style="border-bottom:1px solid #d1d4d1;padding:10px 5px;margin-bottom:15px">
              <span>版本设置</span>
              <span style="float:right;cursor: pointer;" @click="closeForm('version_form')">X</span>
            </div>
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="版本名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="时间">
                <el-input v-model="form.date"></el-input>
              </el-form-item>
              <el-form-item label="创建人">
                <el-input v-model="form.person"></el-input>
              </el-form-item>
              <el-form-item label="版本说明">
                <el-input v-model="form.explain"></el-input>
              </el-form-item>
              
              <el-form-item>
                <el-button type="primary" @click="onSubmit">确定</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
        </div>
  </div>
  
</template>

<style scoped lang="less">
.version_form{
  width:300px;
  height:100%;
  position: absolute;
  left:0px;
  top:0px
}
.version_table{
  width:100%;
  height:100%;
  position: absolute;
  left:0px;
  top:0px
}
</style>
<script>
import $ from 'jquery'
let tableWidth =0;
let tableWidthS = 0;

export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],//
      form:{
        name:'',
        date:'',
        person:'',
        explain:''
      }
    };
  },
  methods: {
    handleClick(){
      $('.version_form').show();
      tableWidthS = document.body.clientWidth -250- 320+'px';
      $('.version_table').css('width',tableWidthS);
      $('.version_table').css('left','320px');
    },
    deleteRow(){},
    onSubmit() {
        
    },
    closeForm(ele){
      $('.' +ele).hide();
      tableWidth = document.body.clientWidth-250  +'px';
      $('.version_table').css('width',tableWidth);
      $('.version_table').css('left','0px');
    },
  }
};
</script>