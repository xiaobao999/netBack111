<template>
  <div class="progress">
    <el-button type="primary" plain>刷 新</el-button>
    <div class="progress_main">
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
            <div v-for="o in 10" :key="o" class="text item">{{'列表内容 ' + o }}</div>
          </el-card>
        </div>
      </div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="date" label="Task ID"></el-table-column>
        <el-table-column prop="name" label="进度条">
          <template slot-scope="scope">
            <el-progress :percentage="scope.row.name"></el-progress>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="工作状态"></el-table-column>
        <el-table-column prop="mechanism" label="机构"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template>
            <el-button type="text" size="small">启动</el-button>
            <el-button type="text" size="small">停止</el-button>
            <el-button type="text" size="small" @click="open">日志</el-button>
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
      logshow: false,
      tableData: [
        {
          date: "52156321258",
          name: 30,
          state: "完好",
          mechanism: "北京大学"
        },
        {
          date: "52156321258",
          name: 30,
          state: "完好",
          mechanism: "北京大学"
        },
        {
          date: "52156321258",
          name: 30,
          state: "完好",
          mechanism: "北京大学"
        },
        {
          date: "52156321258",
          name: 30,
          state: "完好",
          mechanism: "北京大学"
        }
      ]
    };
  },
  methods: {
    handleClose() {},
    open() {
      this.logshow = true;
    },
    close() {
      this.logshow = false;
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
    width: 400px;
    margin-right: 10px;
    .tittle{
      height: 100%;
      .el-card{
        height: 100%;
        box-shadow: none;
      }
    }
  }
}
</style>