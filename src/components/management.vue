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
        height="100%"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="ID" width="100"></el-table-column>
        <el-table-column prop="title" label="标题" show-overflow-tooltip></el-table-column>
        <el-table-column prop="author" label="作者">
          <template slot-scope="scope">
            <el-tag v-for="(item,i) in scope.row.author" :key="i">{{item[0]}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubyear" label="年份" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="affiliation" label="机构">
          <template slot-scope="scope">
            <el-tag v-for="(item,i) in scope.row.affiliation" :key="i">{{item[0]}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="topic" label="关键词">
          <template slot-scope="scope">
            <el-tag v-for="(item,i) in scope.row.topic" :key="i">{{item[0]}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="90">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="deleteRow(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="form" v-if="formshow">
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
                <!-- 扔一个组件减少变量 -->
                <form-tag :list="form.author" ref="author"></form-tag>
              </el-form-item>
              <el-form-item label="年份">
                <el-input v-model="form.pubyear"></el-input>
              </el-form-item>
              <el-form-item label="机构">
                <!-- 扔一个组件减少变量 -->
                <form-tag :list="form.affiliation" ref="affiliation"></form-tag>
              </el-form-item>
              <el-form-item label="关键词">
                <!-- 扔一个组件减少变量 -->
                <form-tag :list="form.topic" ref="topic"></form-tag>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button @click="close">取消</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </div>
      </div>
      <!-- 分页 -->
      <!-- <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="Pagingtotal"
      ></el-pagination>-->
    </div>
  </div>
</template>
<script>
import FormTag from "./formtag";
export default {
  components: { FormTag },
  data() {
    return {
      input: "",
      formshow: false,
      tableData: [],
      form: {
        id: "",
        title: "",
        author: [],
        pubyear: "",
        affiliation: [],
        topic: []
      },
      inputValue: "",
      inputVisible: false,
      timer: "",
      currentPage4: 1,
      Pagingtotal: 1
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    // 分页相关
    // handleSizeChange(val) {
    //   console.log(`每页 ${val} 条`);
    // },
    // handleCurrentChange(val) {
    //   console.log(`当前页: ${val}`);
    // },
    async getdata() {
      const res = await this.$http.get("management");
      // console.log(res);
      const { data } = res;
      this.Pagingtotal = data.length;
      this.tableData = data;
    },
    async handleClick(e) {
      const id = e.id;
      const res = await this.$http.get(`management/${id}`);
      const { data } = res;
      this.form = data;
      this.formshow = true;
      //tudo抽组件最好
    },
    async onSubmit() {
      let id = this.form.id;
      // 获取组件里面的数据
      let author = this.$refs.author.list,
        affiliation = this.$refs.affiliation.list,
        topic = this.$refs.topic.list;
      await this.$http.put(`management/${id}`, {
        id: this.form.id,
        title: this.form.title,
        author: author,
        pubyear: this.form.pubyear,
        affiliation: affiliation,
        topic: topic
      });
      // console.log(author, affiliation, topic);
      this.formshow = false;
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
  position: relative;
  width: 100%;
  height: 100%;
  margin-top: 20px;
  display: flex;
  .el-pagination {
    position: absolute;
    bottom: 0;
  }
  .form {
    flex: 1.5;
    min-width: 200px;
    margin-left: 10px;
    .tittle {
      width: 100%;
      height: 100%;
      .el-card__body {
        height: 100%;
        overflow: auto;
      }
    }
    .el-card {
      box-shadow: none;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  }
  .el-table {
    flex: 4;
    width: 100%;
  }
}
</style>