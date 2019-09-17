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
    <el-button type="primary" class="diatelyrun" size="small" @click="goprogress">立即运行</el-button>
    <div v-if="dialogTableVisible" width="30%" class="storage">
      <h2 class="bluesize">知识存储</h2>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="运行环境">
          <el-select v-model="form.region" placeholder="运行环境">
            <el-option label="运行环境1" value="1"></el-option>
            <el-option label="运行环境2" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="运行参数"></el-form-item>
        <el-form-item>
          <el-button type="primary" @click="close">确定</el-button>
          <el-button @click="close">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style scoped lang="less">
.guration {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  .el-dialog {
    position: absolute;
    margin: 0;
    top: 0;
    right: 0;
  }
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
.el-dialog {
  width: 100%;
  height: 100%;
}
.diatelyrun {
  height: 30px;
}
.storage {
  margin-left: 20px;
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
    name: "导入数据",
    pid: 0
  },
  {
    name: "导出数据",
    pid: 0
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
      legendHoverLink: false,
      roam: true,
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
        repulsion: 5000,
        edgeLength: [5, 10]
        //layoutAnimation: true
      },
      nodes: nodes,
      edges: edges
      //animation: true
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
      form: {},
      filterText: "",
      dialogTableVisible: false,
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
    async goprogress() {
      var arr = new Array(1);
      arr[0] = this.form;
      await this.$http
        .post(`progress`, {
          date: "52156321258",
          mechanism: "北京大学",
          name: 0,
          startup: true,
          state: "启动"
        })
        .then(function(response) {
          arr[0].id = response.data.id;
        });
      this.$router.push({
        name: "progress"
      });
    },
    close() {
      this.dialogTableVisible = false;
    },
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
        nodes = [...nodes, { name: data.label, value: 1 }];
      }
      edgesarr.push(data);
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
        return item.label == lablenode;
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
      myChart.on("click", () => {
        this.dialogTableVisible = true;
      });
    },
    getedges(edgesarr) {
      //      {
      //   target: "导入数据",
      //   source: "导出数据"
      // }
      // 1.先通过pid把数组分成两个
      if (edgesarr.length == 0) {
        return (edges = [
          {
            target: "导入数据",
            source: "导出数据"
          }
        ]);
      }
      const pid1arr = [];
      const pid2arr = [];
      edges = [];
      for (let i = 0, l = edgesarr.length; i < l; i++) {
        if (edgesarr[i].pid == 1) {
          pid1arr.push(edgesarr[i]);
        } else if (edgesarr[i].pid == 2) {
          pid2arr.push(edgesarr[i]);
        }
      }
      // console.log(pid1arr, 11111111, pid2arr);
      if (pid1arr.length == 0) {
        for (let i = 0, l = pid2arr.length; i < l; i++) {
          edges = edges.concat(
            {
              target: "导入数据",
              source: pid2arr[i].label
            },
            {
              target: pid2arr[i].label,
              source: "导出数据"
            }
          );
        }
      } else if (pid2arr.length == 0) {
        for (let i = 0, l = pid1arr.length; i < l; i++) {
          edges = edges.concat(
            {
              target: "导入数据",
              source: pid1arr[i].label
            },
            {
              target: pid1arr[i].label,
              source: "导出数据"
            }
          );
        }
      } else {
        for (let i = 0, l = pid1arr.length; i < l; i++) {
          edges = edges.concat({
            target: "导入数据",
            source: pid1arr[i].label
          });
          for (let k = 0, kl = pid2arr.length; k < kl; k++) {
            edges = edges.concat({
              target: pid1arr[i].label,
              source: pid2arr[k].label
            });
          }
        }
        for (let i = 0, l = pid2arr.length; i < l; i++) {
          edges = edges.concat({
            target: pid2arr[i].label,
            source: "导出数据"
          });
        }
      }
      return edges;
    }
  }
};
</script>