<template>
  <div class="guration">
    <div class="mytree">
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
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
  data() {
    return {
      data: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1"
                }
              ]
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1"
                }
              ]
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1"
                }
              ]
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
    handleNodeClick(data) {
      console.log(data);
    },
    drawLine() {
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      var allData = {
        citys: [
          {
            name: "数据表A",
            value: [112, 215],
            symbol: "rect",
            symbolSize: [80, 25],
            itemStyle: {
              normal: {
                color: "#337ab7"
              }
            }
          },
          {
            name: "数据表B",
            value: [112, 375, 4],
            symbol: "rect",
            symbolSize: [80, 25],
            itemStyle: {
              normal: {
                color: "#337ab7"
              }
            }
          },
          {
            name: "数据表C",
            value: [112, 535, 4],
            symbol: "rect",
            symbolSize: [80, 25],
            itemStyle: {
              normal: {
                color: "#337ab7"
              }
            }
          },
          {
            name: "数据表AA",
            value: [232, 215, 4],
            symbol: "rect",
            symbolSize: [80, 25],
            itemStyle: {
              normal: {
                color: "#8a33b7"
              }
            }
          },
          {
            name: "数据表BB",
            value: [232, 375, 4],
            symbol: "rect",
            symbolSize: [80, 25],
            itemStyle: {
              normal: {
                color: "#8a33b7"
              }
            }
          },
          {
            name: "数据表CC",
            value: [232, 535, 4],
            symbol: "rect",
            symbolSize: [80, 25],
            itemStyle: {
              normal: {
                color: "#8a33b7"
              }
            }
          },
          {
            name: "表a",
            value: [492, 335, 4],
            symbol: "rect",
            symbolSize: [80, 25],
            itemStyle: {
              normal: {
                color: "#ebdf4a"
              }
            }
          },
          {
            name: "表b",
            value: [492, 415, 4],
            symbol: "rect",
            symbolSize: [80, 25],
            itemStyle: {
              normal: {
                color: "#ebdf4a"
              }
            }
          },
          {
            name: "表c",
            value: [492, 175, 4],
            symbol: "rect",
            symbolSize: [80, 25],
            itemStyle: {
              normal: {
                color: "#ebdf4a"
              }
            }
          },
          {
            name: "表d",
            value: [492, 255, 4],
            symbol: "rect",
            symbolSize: [80, 25],
            itemStyle: {
              normal: {
                color: "#ebdf4a"
              }
            }
          },
          {
            name: "表e",
            value: [492, 495, 4],
            symbol: "rect",
            symbolSize: [80, 25],
            itemStyle: {
              normal: {
                color: "#ebdf4a"
              }
            }
          },
          {
            name: "表f",
            value: [492, 575, 4],
            symbol: "rect",
            symbolSize: [80, 25],
            itemStyle: {
              normal: {
                color: "#ebdf4a"
              }
            }
          },
          {
            name: "子表A",
            value: [622, 375, 4],
            symbol: "rect",
            symbolSize: [80, 25],
            itemStyle: {
              normal: {
                color: "#F58158"
              }
            }
          },
          {
            name: "子表B",
            value: [712, 445, 4],
            symbol: "rect",
            symbolSize: [80, 25],
            itemStyle: {
              normal: {
                color: "#F58158"
              }
            }
          },
          {
            name: "子表C",
            value: [712, 305, 4],
            symbol: "rect",
            symbolSize: [80, 25],
            itemStyle: {
              normal: {
                color: "#F58158"
              }
            }
          },
          {
            name: "子表D",
            value: [622, 215, 4],
            symbol: "rect",
            symbolSize: [80, 25],
            itemStyle: {
              normal: {
                color: "#F58158"
              }
            }
          },
          {
            name: "表1",
            value: [352, 175, 4],
            symbol: "rect",
            symbolSize: [80, 25],
            itemStyle: {
              normal: {
                color: "#F58158"
              }
            }
          },
          {
            name: "表2",
            value: [352, 335, 4],
            symbol: "rect",
            symbolSize: [80, 25],
            itemStyle: {
              normal: {
                color: "#F58158"
              }
            }
          },
          {
            name: "表3",
            value: [352, 575, 4],
            symbol: "rect",
            symbolSize: [80, 25],
            itemStyle: {
              normal: {
                color: "#F58158"
              }
            }
          },
          {
            name: "表3",
            value: [352, 255, 4],
            symbol: "rect",
            symbolSize: [80, 25],
            itemStyle: {
              normal: {
                color: "#F58158"
              }
            }
          },
          {
            name: "表4",
            value: [352, 415, 4],
            symbol: "rect",
            symbolSize: [80, 25],
            itemStyle: {
              normal: {
                color: "#F58158"
              }
            }
          },
          {
            name: "表5",
            value: [352, 495, 4],
            symbol: "rect",
            symbolSize: [80, 25],
            itemStyle: {
              normal: {
                color: "#F58158"
              }
            }
          }
        ],

        moveLines: [
          {
            fromName: "数据表A",
            toName: "数据表AA",
            coords: [[112, 215], [232, 215]]
          },
          {
            fromName: "数据表A",
            toName: "数据表AA",
            coords: [[112, 375], [232, 375]]
          },
          {
            coords: [[112, 535], [232, 535]]
          },
          {
            coords: [[352, 255], [492, 255]]
          },
          {
            coords: [[232, 375], [352, 335]]
          },
          {
            coords: [[232, 375], [352, 415]]
          },
          {
            coords: [[232, 535], [352, 495]]
          },
          {
            coords: [[232, 535], [352, 575]]
          },
          {
            coords: [[352, 335], [492, 335]]
          },
          {
            coords: [[352, 415], [492, 415]]
          },
          {
            coords: [[352, 175], [492, 175]]
          },
          {
            coords: [[492, 175], [622, 215]]
          },
          {
            coords: [[492, 495], [622, 215]]
          },
          {
            coords: [[232, 215], [352, 255]]
          },
          {
            coords: [[622, 375], [712, 445]]
          },
          {
            coords: [[622, 375], [712, 305]]
          }
        ],

        newLines: [
          {
            coords: [[232, 215], [352, 175]]
          },
          {
            coords: [[352, 495], [492, 495]]
          },
          {
            coords: [[352, 575], [492, 575]]
          },
          {
            coords: [[492, 335], [622, 215]]
          },
          {
            coords: [[492, 415], [622, 375]]
          },
          {
            coords: [[492, 255], [622, 375]]
          },
          {
            coords: [[492, 575], [622, 375]]
          }
        ]
      };

      let option = {
        tooltip: {
          trigger: "item",
          show: true,
          formatter: function(params, ticket, callback) {
            console.log(params);
            if (params.componentSubType === "scatter") {
              return params.name;
            }
          }
        },
        geo: {
          label: {
            emphasis: {
              show: false
            }
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: "#323c48",
              borderColor: "#404a59"
            },
            emphasis: {
              areaColor: "#2a333d"
            }
          }
        },
        series: [
          {
            //type: 'effectScatter',
            type: "scatter",
            coordinateSystem: "geo",
            zlevel: 2,
            rippleEffect: {
              brushType: "stroke",
              period: 7,
              scale: 26
            },
            label: {
              normal: {
                show: true,
                //   position:'top',
                formatter: "{b}",
                color: "#000"
              },
              emphasis: {
                show: true,
                // position: 'right',
                formatter: "{b}"
              }
            },
            symbolSize: 2,
            showEffectOn: "render",
            itemStyle: {
              normal: {
                color: "#46bee9"
              }
            },
            data: allData.citys
          },
          {
            name: "线路",
            type: "lines",
            coordinateSystem: "geo",
            zlevel: 2,
            large: true,
            effect: {
              show: true,
              constantSpeed: 30,
              symbol: "arrow", //ECharts 提供的标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
              symbolSize: 6,
              trailLength: 0
            },

            lineStyle: {
              normal: {
                color: "green",
                width: 2,
                opacity: 0.6,
                curveness: 0.1
              }
            },
            data: allData.moveLines
          },
          {
            name: "线路",
            type: "lines",
            coordinateSystem: "geo",
            zlevel: 2,
            large: true,
            effect: {
              show: true,
              constantSpeed: 30,
              symbol: "arrow", //ECharts 提供的标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
              symbolSize: 6,
              trailLength: 0
            },

            lineStyle: {
              normal: {
                color: "red",
                width: 2,
                opacity: 1,
                curveness: 0.2
              }
            },
            data: allData.newLines
          }
        ]
      };
      myChart.setOption(option);
    }
  }
};
</script>