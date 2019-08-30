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
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="ID">
                <el-input v-model="form.id"></el-input>
              </el-form-item>
              <el-form-item label="标题">
                <el-input v-model="form.title"></el-input>
              </el-form-item>
              <el-form-item label="作者">
                <el-input v-model="form.author"></el-input>
              </el-form-item>
              <el-form-item label="年份">
                <el-input v-model="form.year"></el-input>
              </el-form-item>
              <el-form-item label="机构">
                <el-input v-model="form.mechanism"></el-input>
              </el-form-item>
              <el-form-item label="关键词">
                <el-input v-model="form.keyword"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button @click="close">取消</el-button>
              </el-form-item>
            </el-form>
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
      formshow: false,
      tableData: [
        {
          id: "001",
          title: "标题1",
          author: "作者1",
          year: "2019",
          mechanism: "北京大学",
          keyword: "很关键"
        },
        {
          id: "002",
          title: "标题1",
          author: "作者1",
          year: "2019",
          mechanism: "北京大学",
          keyword: "很关键"
        }
      ],
      form: {
        id: "",
        title: "",
        author: "",
        year: "",
        mechanism: "",
        keyword: ""
      }
    };
  },
  methods: {
    onSubmit() {
      this.formshow = false;
    },
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
  margin-top: 20px;
  display: flex;
  .form {
    width: 400px;
    margin-right: 10px;
    .el-card {
      box-shadow: none;
    }
  }
}
</style>