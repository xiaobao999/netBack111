<template>
  <div class="progress">
    <el-button type="primary" plain @click="getdata">刷 新</el-button>
    <div class="progress_main">
      <el-table :data="tableData" stripe style="width: 100%" border>
        <el-table-column prop="date" label="Task ID"></el-table-column>
        <el-table-column prop="name" label="进度条">
          <template slot-scope="scope">
            <el-progress :percentage="scope.row.name"></el-progress>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="工作状态"></el-table-column>
        <el-table-column prop="mechanism" label="机构"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small">启动</el-button>
            <el-button type="text" size="small">停止</el-button>
            <el-button type="text" size="small" @click="open(scope.row)">日志</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="log" v-show="logshow">
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
            <div v-for="(item,i) in progresslog" :key="i" class="text item">{{item}}</div>
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
      logshow: false,
      tableData: [],
      progresslog: []
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    handleClose() {},
    async open(e) {
      this.logshow = true;
      const id = e.id;
      const res = await this.$http.get(`progresslog/${id}`);
      //console.log(res);
      this.progresslog = res.data.log;
      //console.log(this.progresslog);
    },
    close() {
      this.logshow = false;
    },
    async getdata() {
      console.log(JSON.stringify(this.progresslog));
      const res = await this.$http.get(`progress`);
      this.tableData = res.data;
    }
  }
};
</script>
<style scoped lang="less">
.progress {
  display: flex;
  height: 100%;
  flex-direction: column;
}
.progress_main {
  margin-top: 20px;
  display: flex;
  height: 100%;
  .log {
    flex: 1;
    width: 100%;
    margin-left: 10px;
    .box-card {
      width: 100%;
    }
    .tittle {
      height: 100%;
      .el-card {
        height: 100%;
        box-shadow: none;
      }
    }
  }
  .el-table {
    width: 100%;
    flex: 4;
  }
}
</style>