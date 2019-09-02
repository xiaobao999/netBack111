<template>
  <div class="guration">
    <div class="mytree">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>

      <el-tree
        class="filter-tree"
        :data="data"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        ref="tree"
        :expand-on-click-node="false"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
            <el-button icon="el-icon-plus" circle size="mini" @click="() => append(data)"></el-button>
            <el-button icon="el-icon-minus" circle size="mini" @click="() => remove(node, data)"></el-button>
          </span>
        </span>
      </el-tree>
    </div>
    <div id="myChart"></div>
  </div>
</template>
<style scoped lang="less">
.guration {
  width: 100%;
  height: 100%;
  display: flex;
}
.mytree {
  height: 100%;
}
#myChart {
  width: 100%;
  height: 100%;
}
.el-button--mini.is-circle {
  padding: 2px;
}
</style>
<script>
let renderData = {
  edges: [
    {
      target: "导入数据",
      source: "导出数据"
    }
  ],
  nodes: [
    {
      name: "导入数据"
    },
    {
      name: "导出数据"
    }
  ]
};
let option = {
  tooltip: {
    show: false
  },
  series: [
    {
      type: "graph",
      layout: "force",
      coordinateSystem: null,
      symbol:
        "path://M19.300,3.300 L253.300,3.300 C262.136,3.300 269.300,10.463 269.300,19.300 L269.300,21.300 C269.300,30.137 262.136,37.300 253.300,37.300 L19.300,37.300 C10.463,37.300 3.300,30.137 3.300,21.300 L3.300,19.300 C3.300,10.463 10.463,3.300 19.300,3.300 Z",
      symbolSize: [150, 30],
      symbolRotate: 0,
      legendHoverLink: true,
      roam: false,
      //draggable: true,
      //hoverAnimation: true,
      focusNodeAdjacency: true,
      edgeSymbol: ["arrow", "none"],
      edgeSymbolSize: [8, 8],
      markPoint: {
        symbol: "triangle",
        symbolSize: 120
      },
      itemStyle: {
        normal: {
          color: "#2d8cf0"
        }
      },
      lineStyle: {
        type: "solid",
        opacity: 1,
        width: 2,
        curveness: 0.5,
        color: "#19be6b"
      },
      cursor: "pointer",
      // 圆圈内的文字
      label: {
        normal: {
          show: true,
          textStyle: {
            color: "#fff"
          }
        }
      },
      force: {
        repulsion: 5000
      },
      nodes: renderData.nodes,
      edges: renderData.edges
    }
  ]
};
export default {
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  data() {
    return {
      filterText: "",
      data: [
        {
          id: 1,
          label: "导入数据",
          pid: 0,
          children: [
            {
              id: 4,
              label: "数据清洗1",
              pid: 1
            },
            {
              id: 5,
              label: "数据清洗2",
              pid: 1
            },
            {
              id: 6,
              label: "数据清洗3",
              pid: 1
            }
          ]
        },
        {
          id: 2,
          pid: 0,
          label: "数据处理",
          children: [
            {
              id: 7,
              label: "数据加工1",
              pid: 2
            },
            {
              id: 8,
              label: "数据加工2",
              pid: 2
            }
          ]
        },
        {
          id: 3,
          pid: 0,
          label: "导出数据"
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    append(data) {
      let behavior = true;
      for (let i = 0, l = renderData.nodes.length; i < l; i++) {
        if (renderData.nodes[i].name == data.label) {
          this.$message.error({
            showClose: true,
            message: "流程添加重复",
            type: "error"
          });
          behavior = false;
          return behavior;
        }
      }
      if (behavior) {
        renderData.nodes = [...renderData.nodes, { name: data.label }];
      }
      option.series[0].nodes = renderData.nodes;
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      myChart.setOption(option);
    },
    remove(node, data) {},
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleNodeClick(data) {},
    drawLine() {
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      myChart.setOption(option);
    }
  }
};
</script>