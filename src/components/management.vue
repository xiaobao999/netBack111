<template>
  <div class="management">
    <div class="btngroup">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <el-button type="primary">搜索</el-button>
      <el-button type="danger" @click="batchDelete">批量删除</el-button>
    </div>
    <div class="management_main">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="ID" width="100"></el-table-column>
        <el-table-column prop="title" label="标题" show-overflow-tooltip></el-table-column>
        <el-table-column prop="author" label="作者" show-overflow-tooltip></el-table-column>
        <el-table-column prop="pubyear" label="年份" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="affiliation" label="机构" show-overflow-tooltip></el-table-column>
        <el-table-column prop="topic" label="关键词" show-overflow-tooltip></el-table-column>
        <el-table-column fixed="right" label="操作" width="90">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="deleteRow(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
                <el-input v-model="form.pubyear"></el-input>
              </el-form-item>
              <el-form-item label="机构">
                <el-input v-model="form.affiliation"></el-input>
              </el-form-item>
              <el-form-item label="关键词">
                <el-input v-model="form.topic"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button @click="close">取消</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </div>
      </div>
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
        title: "",
        author: "",
        pubyear: "",
        affiliation: [],
        topic: []
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
      await this.$http.put(`management/${id}`, this.form);
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
          await this.$http.delete(`management/${id}`);
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
    },
    // todo 批量删除假的
    async batchDelete() {
      const deleteArr = this.multipleSelection;
      if (
        deleteArr == undefined ||
        deleteArr.length == 0 ||
        deleteArr.length == undefined ||
        deleteArr.length == null
      ) {
        this.$message({
          type: "info",
          message: "请选择要删除的对象"
        });
        return;
      }
      for (let i = 0, l = deleteArr.length; i < l; i++) {
        await this.$http.delete(`management/${deleteArr[i]}`);
      }
      this.getdata();
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
    min-width: 200px;
    margin-left: 10px;
    .tittle {
      width: 100%;
      height: 100%;
      .el-card__body {
        height: 100%;
      }
    }
    .el-card {
      box-shadow: none;
      width: 100%;
      height: 100%;
    }
  }
  .el-table {
    flex: 4;
    width: 100%;
  }
}
</style>