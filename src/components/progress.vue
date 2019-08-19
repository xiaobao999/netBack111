<template>
  <div>
    <span>刷新</span>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="task Id"></el-table-column>
      <el-table-column prop="name" label="进度条"></el-table-column>
      <el-table-column prop="address" label="工作状态"></el-table-column>
      <el-table-column prop="address" label="机构"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template>
          <el-button type="text" size="small">启动</el-button>
          <el-button type="text" size="small">停止</el-button>
          <el-button type="text" size="small">日志</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  }
};
</script>
<style scoped lang="less">
</style>