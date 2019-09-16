<template>
  <div class="progress">
    <el-button type="primary" plain @click="getdata">刷 新</el-button>
    <div class="progress_main">
      <el-table :data="tableData" stripe style="width: 100%" border>
        <el-table-column prop="date" label="Task ID"></el-table-column>
        <el-table-column prop="name" label="进度条">
          <template slot-scope="scope">
            <div :class="scope.row.startup?'dynamic':''">
              <el-progress
                :percentage="scope.row.name"
                :stroke-width="16"
                :text-inside="true"
                :color="customColorMethod"
              ></el-progress>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="工作状态"></el-table-column>
        <el-table-column prop="mechanism" label="机构"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="startup(scope.row)">启动</el-button>
            <el-button type="text" size="small" @click="stopit(scope.row)">停止</el-button>
            <el-button type="text" size="small" @click="open(scope.row)">日志</el-button>
            <el-button type="text" size="small" @click="deleteprogress(scope.row)">删除</el-button>
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
    customColorMethod(percentage) {
      if (percentage == 100) {
        return "#67c23a";
      } else if (percentage < 100) {
        return "#e6a23c";
      }
    },
    startup(e) {
      e.startup = true;
      e.state = "启动";
    },
    stopit(e) {
      e.startup = false;
      e.state = "停止";
    },
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
      const res = await this.$http.get(`progress`);
      this.tableData = res.data;
      console.log(res.data);
    },
    openanimation() {},
    closeanimation() {}
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
@keyframes myfirst {
  0% {
    // transform: translateX(-100%);
    background-color: rgb(0, 228, 245);
    background-position: 0px 0px;
  }
  50% {
    // transform: translateX(-100%);
    background-color: rgb(75, 165, 255);
    background-position: 100px 0px;
  }
  100% {
    // transform: translateX(0);
    background-color: rgb(0, 228, 245);
    background-position: 200px 0px;
  }
}
.dynamic /deep/.el-progress-bar__inner {
  background: url(../assets/progress.png) repeat;
  background-size: 200px 20px;
  animation: myfirst 5s infinite linear;
}
</style>