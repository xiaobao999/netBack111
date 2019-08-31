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
      ></el-tree>
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
</style>
<script>
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
          label: "数据输入",
          children: [
            {
              id: 4,
              label: "手动输入"
            },
            {
              id: 4,
              label: "文件导入"
            }
          ]
        },
        {
          id: 2,
          label: "数据输出",
          children: [
            {
              id: 5,
              label: "Excel导出"
            }
          ]
        },
        {
          id: 3,
          label: "知识抽取",
          children: [
            {
              id: 7,
              label: "实体抽取"
            },
            {
              id: 8,
              label: "关系抽取"
            }
          ]
        },
        {
          id: 4,
          label: "知识融合",
          children: [
            {
              id: 9,
              label: "数据融合"
            }
          ]
        },
        {
          id: 4,
          label: "非结构化工具",
          children: [
            {
              id: 9,
              label: "Excel转JSON"
            },
            {
              id: 10,
              label: "WORD转JSON"
            },
            {
              id: 10,
              label: "HTML转JSON"
            }
          ]
        },
        {
          id: 5,
          label: "结构化数据工具",
          children: [
            {
              id: 9,
              label: "工具1"
            },
            {
              id: 10,
              label: "工具2"
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
  mounted() {
    this.drawLine();
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    drawLine() {
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      let renderData = {
        edges: [
          {
            target: "数据输入",
            source: "手动输入"
          },
          {
            target: "数据输入",
            source: "文件导入"
          },
          {
            target: "文件导入",
            source: "数据输出"
          },
          {
            target: "手动输入",
            source: "数据输出"
          },
          {
            target: "数据输出",
            source: "Excel导出"
          },
          {
            target: "Excel导出",
            source: "知识抽取"
          },
          {
            target: "知识抽取",
            source: "实体抽取"
          },
          {
            target: "知识抽取",
            source: "关系抽取"
          },
          {
            target: "实体抽取",
            source: "知识融合"
          },
          {
            target: "关系抽取",
            source: "知识融合"
          },
          {
            target: "知识融合",
            source: "数据融合"
          },
          {
            target: "数据融合",
            source: "非结构化工具"
          },
          {
            target: "非结构化工具",
            source: "Excel转JSON"
          },
          {
            target: "非结构化工具",
            source: "WORD转JSON"
          },
          {
            target: "非结构化工具",
            source: "HTML转JSON"
          },
          {
            target: "HTML转JSON",
            source: "结构化数据工具"
          },
          {
            target: "WORD转JSON",
            source: "结构化数据工具"
          },
          {
            target: "Excel转JSON",
            source: "结构化数据工具"
          },
          {
            target: "结构化数据工具",
            source: "工具1"
          },
          {
            target: "结构化数据工具",
            source: "工具2"
          }
        ],
        nodes: [
          {
            name: "数据输入"
          },
          {
            name: "手动输入"
          },
          {
            name: "文件导入"
          },
          {
            name: "数据输出"
          },
          {
            name: "Excel导出"
          },
          {
            name: "知识抽取"
          },
          {
            name: "关系抽取"
          },
          {
            name: "实体抽取"
          },
          {
            name: "知识融合"
          },
          {
            name: "数据融合"
          },
          {
            name: "非结构化工具"
          },
          {
            name: "Excel转JSON"
          },
          {
            name: "WORD转JSON"
          },
          {
            name: "HTML转JSON"
          },
          {
            name: "结构化数据工具"
          },
          {
            name: "工具1"
          },
          {
            name: "工具2"
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
            symbol:
              "path://M19.300,3.300 L253.300,3.300 C262.136,3.300 269.300,10.463 269.300,19.300 L269.300,21.300 C269.300,30.137 262.136,37.300 253.300,37.300 L19.300,37.300 C10.463,37.300 3.300,30.137 3.300,21.300 L3.300,19.300 C3.300,10.463 10.463,3.300 19.300,3.300 Z",
            symbolSize: [150, 30],
            symbolRotate: 0,
            legendHoverLink: true,
            roam: true,
            draggable: true,
            hoverAnimation: true,
            focusNodeAdjacency: true,
            edgeSymbol: ["arrow", "arrow"],
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
              //curveness: 0.5,
              color: "#19be6b"
            },
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
              repulsion: 800
            },
            nodes: renderData.nodes,
            edges: renderData.edges
          }
        ]
      };
      myChart.setOption(option);
    }
  }
};
</script>