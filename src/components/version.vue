<template>
  <div class="version">
    <div>
      <el-button type="primary" size="small" class @click="addEdition">保存当前版本</el-button>
      <el-button type="primary" size="small" class>导出</el-button>
    </div>
    <div class="version_main">
      <div class="version_form" v-show="formshow">
        <el-card class="box-card tittle">
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
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        style="width: 100%"
        tooltip-effect="dark"
      >
        <el-table-column prop="name" label="版本名称" width="180"></el-table-column>
        <el-table-column prop="date" label="时间" width="180"></el-table-column>
        <el-table-column prop="person" label="创建人"></el-table-column>
        <el-table-column prop="explain" label="版本说明"></el-table-column>
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
</template>

<style scoped lang="less">
.version {
  display: flex;
  height: 100%;
  flex-direction: column;
}
.version_main {
  margin-top: 10px;
  height: 100%;
  display: flex;
  .version_form {
    height: 100%;
    width: 400px;
    height: 100%;
    margin-right: 10px;
  }
  .el-card {
    height: 100%;
    box-shadow: none;
  }
}
</style>
<script>
import { setTimeout } from "timers";
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          name: "v-0.0.10",
          date: "2019.9.2",
          person: "小虎",
          explain: "首次版本"
        }
      ], //
      form: {
        id: "",
        name: "",
        date: "",
        person: "",
        explain: ""
      },
      formshow: false
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    async addEdition() {
      this.formshow = true;
      this.form = {};
    },
    async handleClick(e) {
      this.formshow = true;
      const id = e.id;
      const res = await this.$http.get(`version/${id}`);
      const { data } = res;
      this.form = data;
    },
    close() {
      this.formshow = false;
    },
    deleteRow(e) {
      this.$confirm("是否确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const id = e.id;
          const res = await this.$http.delete(`version/${id}`);
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
    async onSubmit() {
      this.formshow = false;
      let id = this.form.id;
      if (id == undefined) {
        this.form.id = this.tableData.length + 1;
        const res = await this.$http.post(`version`, this.form);
        this.getdata();
      } else {
        const res = await this.$http.put(`version/${id}`, this.form);
        this.getdata();
      }
    },
    async getdata() {
      const res = await this.$http.get("version");
      // console.log(res);
      const { data } = res;
      this.tableData = data;
    }
  }
};
</script>