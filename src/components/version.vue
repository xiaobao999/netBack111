<template>
  <div class="version">
    <div>
      <el-button type="primary" size="small" class @click="addEdition">保存当前版本</el-button>
    </div>
    <div class="version_main">
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
            <el-button type="text" size="small" @click="saveOrder">导出</el-button>
          </template>
        </el-table-column>
      </el-table>
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
              <el-date-picker
                v-model="form.date"
                type="datetime"
                placeholder="请选择时间"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
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
  width: 100%;
  display: flex;
  .el-table {
    flex: 4;
    width: 100%;
  }
  .version_form {
    margin-left: 10px;
    width: 100%;
    height: 100%;
    flex: 1;
    min-width: 300px;
  }
  .el-card {
    width: 100%;
    height: 100%;
    box-shadow: none;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
}
</style>
<script>
export default {
  data() {
    return {
      tableData: [], //
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
          await this.$http.delete(`version/${id}`);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          //tudo返回提示信息
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
      const id = this.form.id;
      if (id == undefined) {
        var arr = new Array(1);
        arr[0] = this.form;
        await this.$http
          .post(`version`, {
            name: this.form.name,
            date: this.form.date,
            person: this.form.person,
            explain: this.form.explain
          })
          .then(function(response) {
            arr[0].id = response.data.id;
          });
        this.getdata();
      } else {
        await this.$http.put(`version/${id}`, this.form);
        this.getdata();
      }
    },
    async getdata() {
      const res = await this.$http.get("version");
      // console.log(res);
      const { data } = res;
      this.tableData = data;
    },
    saveOrder() {}
  }
};
</script>