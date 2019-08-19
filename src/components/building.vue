<template>
  <div class="building">
    <div class="building_left">
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>
    <div class="building_right">
      <div>
        <span>概念名：{{}}</span>
        <span>描述：{{}}</span>
      </div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="date" label="属性名" width="200"></el-table-column>
        <el-table-column prop="name" label="属性别名" width="200"></el-table-column>
        <el-table-column prop="address" label="属性类型" width="200"></el-table-column>
        <el-table-column prop="address" label="单位" width="200"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">删除</el-button>
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
      ],
      data: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1"
            }
          ]
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1"
            },
            {
              label: "二级 2-2"
            }
          ]
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1"
            },
            {
              label: "二级 3-2"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    handleNodeClick() {
    },
    handleClick() {
    }
  }
};
</script>
<style scoped lang="less">
.building {
  display: flex;
  .building_left {
    width: 150px;
  }
}
</style>