<template>
  <div>
    <button>保存当前版本</button>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="版本名称" width="180"></el-table-column>
      <el-table-column prop="name" label="时间" width="180"></el-table-column>
      <el-table-column prop="address" label="创建人"></el-table-column>
      <el-table-column prop="address" label="版本说明"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template>
          <el-button type="text" size="small">导出</el-button>
          <el-button type="text" size="small">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped lang="less">
</style>
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