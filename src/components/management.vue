<template>
  <div class="management">
    <div class="btngroup">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <el-button type="primary">搜索</el-button>
      <el-button type="danger" @click="batchDelete">批量删除</el-button>
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
                <el-input v-model="form.uid"></el-input>
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
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="uid" label="ID" width="120"></el-table-column>
        <el-table-column prop="title" label="标题" show-overflow-tooltip></el-table-column>
        <el-table-column prop="author" label="作者" show-overflow-tooltip></el-table-column>
        <el-table-column prop="year" label="年份" show-overflow-tooltip></el-table-column>
        <el-table-column prop="mechanism" label="机构" show-overflow-tooltip></el-table-column>
        <el-table-column prop="keyword" label="关键词" show-overflow-tooltip></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="deleteRow(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input: "",
      formshow: false,
      tableData: [],
      form: {
        id: "",
        uid: "",
        title: "",
        author: "",
        year: "",
        mechanism: "",
        keyword: "",
        multipleSelection: []
      }
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    async getdata() {
      const res = await this.$http.get("management");
      // console.log(res);
      const { data } = res;
      this.tableData = data;
    },
    async handleClick(e) {
      this.formshow = true;
      const id = e.id;
      const res = await this.$http.get(`management/${id}`);
      const { data } = res;
      this.form = data;
    },
    async onSubmit() {
      this.formshow = false;
      let id = this.form.id;
      console.log(this.form);
      const res = await this.$http.put(`management/${id}`, this.form);
      this.getdata();
    },
    deleteRow(e) {
      this.$confirm("是否确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const id = e.id;
          const res = await this.$http.delete(`management/${id}`);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getdata();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    open() {
      this.formshow = true;
    },
    close() {
      this.formshow = false;
    },
    handleSelectionChange(val) {
      let arr = [];
      val.forEach(function(item) {
        arr.push(item.id);
      });
      this.multipleSelection = arr;
      console.log(this.multipleSelection);
    },
    batchDelete(){
      
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
    margin-right: 10px;
  }
}
.management_main {
  width: 100%;
  height: 100%;
  margin-top: 20px;
  display: flex;
  .form {
    flex: 1.5;
    margin-right: 10px;
    .tittle {
      height: 100%;
      .form {
        height: 100%;
        .el-card__body {
          height: 100%;
        }
      }
    }
    .el-card {
      box-shadow: none;
      height: 100%;
    }
  }
  .el-table {
    flex: 3;
  }
}
</style>