<template>
  <div>
    <input type="text" />
    <button>1111</button>
    <span>批量删除</span>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="ID" width="180"></el-table-column>
      <el-table-column prop="name" label="标题" width="180"></el-table-column>
      <el-table-column prop="address" label="作者"></el-table-column>
      <el-table-column prop="address" label="年份"></el-table-column>
      <el-table-column prop="address" label="机构"></el-table-column>
      <el-table-column prop="address" label="关键词"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template>
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