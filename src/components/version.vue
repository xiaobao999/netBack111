<template>
  <div>
    <div class="version_table">
      <div style="margin-bottom:15px">
        <el-button type="primary" size="small" class>保存当前版本</el-button>
        <el-button type="primary" size="small" class>导出</el-button>
      </div>
      <div class="version_main">
        <div class="version_form" v-show="formshow">
          <div class="tittle">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>版本设置</span>
                <el-button
                  icon="el-icon-close"
                  style="float: right; padding: 5px"
                  circle
                  @click="close"
                ></el-button>
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
                  <el-button @click="close">取消</el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </div>
        </div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          border
          style="width: 100%"
          tooltip-effect="dark"
        >
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
    </div>
  </div>
</template>

<style scoped lang="less">
.version_form {
  width: 300px;
  height: 100%;
  margin-right: 10px;
}
.version_table {
  width: 100%;
  height: 100%;
}
.version_main {
  display: flex;
  .version_form {
    width: 400px;
    height: 100%;
  }
}
</style>
<script>
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
      ], //
      form: {
        name: "",
        date: "",
        person: "",
        explain: ""
      },
      formshow: true
    };
  },
  methods: {
    handleClick() {
      this.formshow = true;
    },
    close() {
      this.formshow = false;
    },
    deleteRow() {},
    onSubmit() {
      this.formshow = false;
    }
  }
};
</script>