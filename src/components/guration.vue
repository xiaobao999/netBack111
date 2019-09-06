<template>
  <div class="guration">
    <div class="gurationtree" style="width:200px">
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
          <span v-if="(data.pid)">
            <el-button icon="el-icon-plus" circle size="mini" @click="() => append(data)"></el-button>
            <el-button icon="el-icon-minus" circle size="mini" @click="() => remove(data)"></el-button>
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
.gurationtree {
  overflow-x: scroll;
  overflow-y: auto;
  height: 100%;
  .el-tree > .el-tree-node {
    min-width: 100%;
    display: inline-block !important;
  }
}

#myChart {
  flex: 1;
  overflow: hidden;
}
.el-button--mini.is-circle {
  padding: 2px;
}
</style>
<script>
let edgesarr = [];
let edges = [
  {
    target: "导入数据",
    source: "导出数据"
  }
];
let nodes = [
  {
    name: "导入数据"
  },
  {
    name: "导出数据"
  }
];

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
      draggable: true,
      hoverAnimation: true,
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
        repulsion: 3000
      },
      nodes: nodes,
      edges: edges
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
      for (let i = 0, l = nodes.length; i < l; i++) {
        if (nodes[i].name == data.label) {
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
        nodes = [...nodes, { name: data.label }];
      }
      edgesarr.push(data.label);
      this.getedges(edgesarr);
      option.series[0].nodes = nodes;
      option.series[0].edges = edges;
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      myChart.setOption(option);
    },
    remove(data) {
      const lablenode = data.label;

      const lablestate = nodes.findIndex(item => {
        return item.name == lablenode;
      });
      if (lablestate == -1) {
        this.$message.error({
          showClose: true,
          message: "未添加流程不可移除",
          type: "error"
        });
        return;
      }
      nodes.splice(lablestate, 1);
      const edgesIndex = edgesarr.findIndex(item => {
        return item == lablenode;
      });
      edgesarr.splice(edgesIndex, 1);
      this.getedges(edgesarr);
      option.series[0].nodes = nodes;
      option.series[0].edges = edges;
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      myChart.setOption(option);
      // nodes.
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleNodeClick() {},
    drawLine() {
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      myChart.setOption(option);
    },
    getedges(edgesarr) {
      if (edgesarr.length == 0) {
        edges = [
          {
            target: "导入数据",
            source: "导出数据"
          }
        ];
      } else if (edgesarr.length == 1) {
        edges = [
          {
            target: "导入数据",
            source: edgesarr[0]
          },
          {
            target: edgesarr[0],
            source: "导出数据"
          }
        ];
      } else {
        edges = [
          {
            target: "导入数据",
            source: edgesarr[0]
          },
          {
            target: edgesarr[edgesarr.length - 1],
            source: "导出数据"
          }
        ];
        for (let i = 0, l = edgesarr.length; i < l; i++) {
          // if (i - 1 < 0) continue;
          edges.push({
            target: edgesarr[i],
            source: edgesarr[i + 1]
          });
        }
      }
      return edges;
    }
  }
};
</script>