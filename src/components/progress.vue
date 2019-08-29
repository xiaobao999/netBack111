<template>
  <div>
    <span>刷新</span>
    <div class="progress">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="date" label="Task ID"></el-table-column>
        <el-table-column prop="name" label="进度条">
          <template slot-scope="scope">
            <el-progress :percentage="scope.row.name"></el-progress>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="工作状态"></el-table-column>
        <el-table-column prop="address" label="机构"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template>
            <el-button type="text" size="small">启动</el-button>
            <el-button type="text" size="small">停止</el-button>
            <el-button type="text" size="small" @click="open">日志</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="log">
        111111
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {
      drawer: false,
      tableData: [
        {
          date: "2016-05-02",
          name: 30,
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: 50,
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: 70,
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: 100,
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    handleClose() {},
    open() {
      $(".log").css({ display: "block" });
    }
  }
};
</script>
<style scoped lang="less">
.progress {
  display: flex;
  .log {
    width: 500px;
    display: none;
  }
}
</style>