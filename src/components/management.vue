<template>
  <div class="management">
    <div class="btngroup">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <el-button type="primary">搜索</el-button>
      <el-button type="danger">批量删除</el-button>
    </div>
    <div class="management_main">
      <div class="form" v-show="formshow">
        <div class="tittle">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>详细日志</span>
              <el-button
                icon="el-icon-close"
                style="float: right; padding: 5px"
                circle
                @click="close"
              ></el-button>
            </div>
          </el-card>
        </div>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="ID" width="120"></el-table-column>
        <el-table-column prop="title" label="标题" show-overflow-tooltip></el-table-column>
        <el-table-column prop="author" label="作者" show-overflow-tooltip></el-table-column>
        <el-table-column prop="year" label="年份" show-overflow-tooltip></el-table-column>
        <el-table-column prop="mechanism" label="机构" show-overflow-tooltip></el-table-column>
        <el-table-column prop="keyword" label="关键词" show-overflow-tooltip></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template>
            <el-button type="text" size="small" @click="open">编辑</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style scoped lang="less">
</style>
<script>
export default {
  data() {
    return {
      input: "",
      formshow: true,
      tableData: [
        {
          id: "001",
          title: "标题1",
          author: "作者1",
          year: "2019",
          mechanism: "",
          keyword: ""
        }
      ]
    };
  },
  methods: {
    open() {
      this.formshow = true;
    },
    close() {
      this.formshow = false;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>
<style lang="less">
.management {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.btngroup {
  width: 100%;
  .el-input {
    width: 500px;
  }
}
.management_main {
  width: 100%;
  height: 100%;
  display: flex;
  .form {
    width: 400px;
  }
}
</style>