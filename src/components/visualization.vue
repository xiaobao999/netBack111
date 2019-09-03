<template>
  <div class="visualization">
    <div style="background: #FFF;">
      <div class="leftnav">
        <el-tag
          :key="tag"
          v-for="tag in dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >{{tag}}</el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          :clearable="true"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        ></el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">请输入搜索内容</el-button>
      </div>
      <div class="mytree">
        <el-tree
          :data="data"
          :props="defaultProps"
          @node-click="handleNodeClick"
          @node-expand="handleNodeExpand"
          node-key="id"
          ref="tree"
          :default-expanded-keys="arr"
        ></el-tree>
      </div>
    </div>
    <div id="myChart" :style="{width: '100%', height: '100%'}"></div>
    <el-dialog :visible.sync="dialogTableVisible" width="30%">
      <h2 class="bluesize">作者</h2>
      <div>生活是创作的源泉，在教书育人的工作和生活中，在领略岭南的文化和饱尝南粤风土人情的过程中，激发和推动了老师们的创作热情。</div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="属性信息" name="first">
          <el-table :data="gridData">
            <el-table-column property="date" label="属性" width="130"></el-table-column>
            <el-table-column property="name" label="值" width="280"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="关系信息" name="second">
          <el-table :data="gridData1">
            <el-table-column property="date" label="关系" width="130"></el-table-column>
            <el-table-column property="name" label="客体对象" width="280"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>
<style lang="less">
// tag样式
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  // width: 300px;
  overflow-x: auto;
  vertical-align: bottom;
}
.leftnav {
  margin: 10px 0;
  display: flex;
  flex-direction: column;
}
// 滚动条代码  html多套了个盒子要注意
//
.mytree {
  overflow-x: scroll;
  overflow-y: auto;
  height: 100%;
  width: 200px;
}

.el-tree > .el-tree-node {
  min-width: 100%;
  display: inline-block !important;
}

.visualization {
  display: flex;
  height: 100%;
  margin: 0 auto;
  > div {
    display: flex;
    flex-direction: column;
  }
}
.bluesize {
  font-size: 20px;
  color: #0e6f90;
}
.el-dialog {
  position: relative;
  margin: 0 0 0 auto !important;
}
.el-tabs {
  margin-top: 30px;
}
.el-tabs__item.is-active {
  color: #0e6f90 !important;
}
.el-tabs__item.is-active:hover {
  color: #0e6f90 !important;
}
.el-tabs__active-bar {
  background-color: #0e6f90 !important;
}
</style>

<script>
export default {
  data() {
    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      arr: [1],
      selectedNodeID: "",
      option1: "",
      input: "",
      activeName: "first",
      gridData: [
        {
          date: "作者",
          name: "王小虎",
          id: 1
        },
        {
          date: "标题",
          name: "中国有56个民族，他们和谐共处",
          id: 2
        },
        {
          date: "摘要",
          name: "真的真的真的，真的真的真的，真的真的真的，真的真的真的...",
          id: 3
        },
        {
          date: "摘要",
          name: "真的真的真的，真的真的真的，真的真的真的，真的真的真的...",
          id: 4
        },
        {
          date: "摘要",
          name:
            "真的真的真的，真的真的真的，真的真的真的，真的真的真的...真的真的真的，真的真的真的，真的真的真的，真的真的真的...真的真的真的，真的真的真的，真的真的真的，真的真的真的...",
          id: 5
        }
      ],
      gridData1: [
        {
          date: "共同作者",
          name: "王小虎；张三；李四",
          id: 1
        },
        {
          date: "所属机构",
          name: "清华大学",
          id: 2
        },
        {
          date: "相关领域",
          name: "飞机；导弹；导航",
          id: 3
        }
      ],
      dialogTableVisible: false,
      dialogFormVisible: false,
      data: [
        {
          id: 1,
          label: "作者（机构/无机构）",
          type: "treenode",
          children: [
            {
              label: "A",
              type: "author",
              children: [{ label: "载入中.." }]
            },
            {
              label: "G",
              type: "author",
              children: [{ label: "载入中.." }]
            },
            {
              label: "S",
              type: "author",
              children: [{ label: "载入中.." }]
            },
            {
              label: "Y",
              type: "author",
              children: [{ label: "载入中.." }]
            }
          ]
        },
        {
          id: 2,
          label: "机构",
          type: "treenode",
          children: [
            {
              type: "affiliation",
              label: "A",
              children: [{ label: "载入中.." }]
            },
            {
              type: "affiliation",
              label: "M",
              children: [{ label: "载入中.." }]
            },
            {
              type: "affiliation",
              label: "G",
              children: [{ label: "载入中.." }]
            },
            {
              type: "affiliation",
              label: "U",
              children: [{ label: "载入中.." }]
            }
          ]
        },
        {
          id: 3,
          label: "出版物",
          type: "treenode",
          children: [
            {
              type: "publisher",
              label: "A",
              children: [{ label: "载入中.." }]
            },
            {
              type: "publisher",
              label: "N",
              children: [{ label: "载入中.." }]
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
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      // 检索
      var text = "";
      var i;
      for (i = 0; i < this.dynamicTags.length; i++) {
        text += "label_like=" + this.dynamicTags[i] + "&";
      }
      console.log(text);
      if (text.length === 0) {
        this.data = [
          {
            id: 1,
            label: "作者（机构/无机构）",
            type: "treenode",
            children: [
              {
                label: "A",
                type: "author",
                children: [{ label: "载入中.." }]
              },
              {
                label: "G",
                type: "author",
                children: [{ label: "载入中.." }]
              },
              {
                label: "S",
                type: "author",
                children: [{ label: "载入中.." }]
              },
              {
                label: "Y",
                type: "author",
                children: [{ label: "载入中.." }]
              }
            ]
          },
          {
            id: 2,
            label: "机构",
            type: "treenode",
            children: [
              {
                type: "affiliation",
                label: "A",
                children: [{ label: "载入中.." }]
              },
              {
                type: "affiliation",
                label: "M",
                children: [{ label: "载入中.." }]
              },
              {
                type: "affiliation",
                label: "G",
                children: [{ label: "载入中.." }]
              },
              {
                type: "affiliation",
                label: "U",
                children: [{ label: "载入中.." }]
              }
            ]
          },
          {
            id: 3,
            label: "出版物",
            type: "treenode",
            children: [
              {
                type: "publisher",
                label: "A",
                children: [{ label: "载入中.." }]
              },
              {
                type: "publisher",
                label: "N",
                children: [{ label: "载入中.." }]
              }
            ]
          }
        ];
      } else {
        this.$http.get("tree_author?" + text).then(res => {
          const data = res.data;
          if (data.length > 0) {
            this.$refs.tree.data[0].children = data;
          } else {
            this.$refs.tree.data[0].children = [{ label: "无数据" }];
          }
        });
        this.$http.get("tree_affiliation?" + text).then(res => {
          const data = res.data;
          if (data.length > 0) {
            this.$refs.tree.data[1].children = data;
          } else {
            this.$refs.tree.data[1].children = [{ label: "无数据" }];
          }
        });
        this.$http.get("tree_publisher?" + text).then(res => {
          const data = res.data;
          if (data.length > 0) {
            this.$refs.tree.data[2].children = data;
          } else {
            this.$refs.tree.data[2].children = [{ label: "无数据" }];
          }
        });
        // for (var i = 0; i < this.$refs.tree.store._getAllNodes().length; i++) {
        //   this.$refs.tree.store._getAllNodes()[i].expanded = true;
        // }
      }
    },

    showInput() {
      this.inputVisible = true;
      // console.log(this.$refs.tree.data)
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        if (this.dynamicTags.includes(inputValue) === false) {
          this.dynamicTags.push(inputValue);
        }
        // 检索
        var text = "";
        var i;
        for (i = 0; i < this.dynamicTags.length; i++) {
          text += "label_like=" + this.dynamicTags[i] + "&";
        }
        console.log(text);
        this.$http.get("tree_author?" + text).then(res => {
          const data = res.data;
          if (data.length > 0) {
            this.$refs.tree.data[0].children = data;
          } else {
            this.$refs.tree.data[0].children = [{ label: "无数据" }];
          }
        });
        this.$http.get("tree_affiliation?" + text).then(res => {
          const data = res.data;
          if (data.length > 0) {
            this.$refs.tree.data[1].children = data;
          } else {
            this.$refs.tree.data[1].children = [{ label: "无数据" }];
          }
        });
        this.$http.get("tree_publisher?" + text).then(res => {
          const data = res.data;
          console.log(data);
          if (data.length > 0) {
            this.$refs.tree.data[2].children = data;
          } else {
            this.$refs.tree.data[2].children = [{ label: "无数据" }];
          }
        });
        // for (var i = 0; i < this.$refs.tree.store._getAllNodes().length; i++) {
        //   this.$refs.tree.store._getAllNodes()[i].expanded = true;
        // }
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    handleNodeClick() {
      // 渲染球
      this.selectedNodeID = this.$refs.tree.getCurrentNode().id;
      this.drawLine();
    },
    handleNodeExpand(data) {
      //展开这边用的函数传参，没有用原声$res去获取dom元素，$res获取的dom元素是两个，一个是三角个人是sapn，三角里面没有你要的属性就报错，就是你那个载入中
      var indexname;
      if (data.type === "author") {
        indexname = data.label;
        //console.log(indexname);
        // let n = this.data[0].children.findIndex(function(value, index, arr) {
        //   if (value.label != indexname) {
        //     return index;
        //   }
        // });
        let n;
        for (let i = 0, l = this.data[0].children.length; i < l; i++) {
          // console.log(this.data[0].children[i].label, indexname);
          if (this.data[0].children[i].label == indexname) {
            n = i;
          }
        }

        // console.log(n);
        this.$http.get("tree_author?index=" + indexname).then(res => {
          const data = res.data;
          if (data.length > 0) {
            this.data[0].children[n].children = data;
          } else {
            this.data[0].children[n].children = [{ label: "无数据" }];
          }
        });
      }
      if (data.type === "publisher") {
        indexname = data.label;
        let n;
        for (let i = 0, l = this.data[2].children.length; i < l; i++) {
          // console.log(this.data[2].children[i].label, indexname);
          if (this.data[2].children[i].label == indexname) {
            n = i;
          }
        }
        this.$http.get("tree_publisher?index=" + indexname).then(res => {
          const data = res.data;
          if (data.length > 0) {
            this.data[2].children[n].children = data;
          } else {
            this.data[2].children[n].children = [{ label: "无数据" }];
          }
        });
      }
      if (data.type === "affiliation") {
        indexname = data.label;
        let n;
        for (let i = 0, l = this.data[1].children.length; i < l; i++) {
          // console.log(this.data[1].children[i].label, indexname);
          if (this.data[1].children[i].label == indexname) {
            n = i;
          }
        }
        this.$http.get("tree_affiliation?index=" + indexname).then(res => {
          const data = res.data;
          if (data.length > 0) {
            this.data[1].children[n].children = data;
          } else {
            this.data[1].children[n].children = [{ label: "无数据" }];
          }
        });
      }
    },
    handleClick() {},
    drawLine() {
      let categories = [
        {
          draggable: true,
          name: "作者",
          itemStyle: {
            color: {
              colorStops: [
                {
                  offset: 0,
                  color: "#B1ACEE" // 0% 处的颜色
                }
              ]
            },
            borderColor: "#7D39C0",
            borderWidth: "3"
          }
        },
        {
          draggable: true,
          name: "出版物",
          x: 650,
          y: 230,
          itemStyle: {
            color: {
              colorStops: [
                {
                  offset: 0,
                  color: "#F4B886" // 0% 处的颜色
                }
              ]
            },
            borderColor: "#EA7503",
            borderWidth: "3"
          }
        },
        {
          draggable: true,
          name: "主题词",
          x: 570,
          y: 370,
          itemStyle: {
            color: {
              colorStops: [
                {
                  offset: 0,
                  color: "#81CB80" // 0% 处的颜色
                }
              ]
            },
            borderColor: "#009E2C",
            borderWidth: "3"
          }
        },
        {
          draggable: true,
          name: "机构",
          x: 440,
          y: 400,
          itemStyle: {
            color: {
              colorStops: [
                {
                  offset: 0,
                  color: "#99A2A7" // 0% 处的颜色
                }
              ]
            },
            borderColor: "#8A9392",
            borderWidth: "3"
          }
        },
        {
          draggable: true,
          name: "文献",
          x: 550,
          y: 300,
          itemStyle: {
            color: {
              colorStops: [
                {
                  offset: 0,
                  color: "#7FBACA" // 0% 处的颜色
                }
              ]
            },
            borderColor: "#007697",
            borderWidth: "3"
          }
        }
      ];
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      let option = {
        legend: {
          show: true,
          left: "50%",
          selectedMode: true,
          top: 0,
          data: categories.map(function(a) {
            return a.name;
          })
        },
        tooltip: {},
        series: [
          {
            force: {
              repulsion: 1200
            },
            categories: categories,
            type: "graph",
            layout: "force",
            symbolSize: 50,
            roam: true, //开启缩放和平移***
            label: {
              position: "top",
              color: "#666",
              show: true,
              textStyle: {
                fontSize: 20
              }
            },
            draggable: true,
            edgeSymbol: ["circle", "arrow"],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
              normal: {
                textStyle: {
                  fontSize: 25
                }
              }
            },
            data: [
              {
                category: 0,
                name: "作者",
                value: 1,
                itemStyle: {
                  color: {
                    colorStops: [
                      {
                        offset: 0,
                        color: "#B1ACEE" // 0% 处的颜色
                      }
                    ]
                  },
                  borderColor: "#7D39C0",
                  borderWidth: "3"
                }
              },
              {
                category: 1,
                value: 2,
                name: "出版物",
                x: 650,
                y: 230,
                itemStyle: {
                  color: {
                    colorStops: [
                      {
                        offset: 0,
                        color: "#F4B886" // 0% 处的颜色
                      }
                    ]
                  },
                  borderColor: "#EA7503",
                  borderWidth: "3"
                }
              },
              {
                category: 2,
                value: 3,
                name: "主题词",
                x: 570,
                y: 370,
                itemStyle: {
                  color: {
                    colorStops: [
                      {
                        offset: 0,
                        color: "#81CB80" // 0% 处的颜色
                      }
                    ]
                  },
                  borderColor: "#009E2C",
                  borderWidth: "3"
                }
              },
              {
                value: 4,
                category: 3,
                name: "机构",
                x: 440,
                y: 400,
                itemStyle: {
                  color: {
                    colorStops: [
                      {
                        offset: 0,
                        color: "#99A2A7" // 0% 处的颜色
                      }
                    ]
                  },
                  borderColor: "#8A9392",
                  borderWidth: "3"
                }
              },
              {
                value: 5,
                category: 4,
                name: "文献",
                x: 550,
                y: 300,
                itemStyle: {
                  color: {
                    colorStops: [
                      {
                        offset: 0,
                        color: "#7FBACA" // 0% 处的颜色
                      }
                    ]
                  },
                  borderColor: "#007697",
                  borderWidth: "3"
                }
              }
            ],
            links: [
              {
                source: "文献",
                target: "作者",
                label: {
                  show: true,
                  formatter: "关系",
                  textStyle: {
                    fontSize: 18
                  }
                }
              },
              {
                source: "文献",
                target: "出版物",
                label: {
                  show: true,
                  formatter: "关系",
                  textStyle: {
                    fontSize: 18
                  }
                }
              },
              {
                source: "文献",
                target: "主题词",
                label: {
                  show: true,
                  formatter: "关系",
                  textStyle: {
                    fontSize: 18
                  }
                }
              },
              {
                source: "文献",
                target: "机构",
                label: {
                  show: true,
                  formatter: "关系",
                  textStyle: {
                    fontSize: 18
                  }
                }
              }
            ],
            focusNodeAdjacency: true,
            lineStyle: {
              normal: {
                width: 0.5,
                curveness: 0.3,
                opacity: 0.7
              }
            }
          }
        ]
      };
      var timer;
      myChart.setOption(option);
      myChart.on("click", () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          this.dialogTableVisible = true;
        }, 300);
      });
      myChart.on("dblclick", () => {
        clearTimeout(timer);
        let option1 = {
          legend: {
            show: true,
            left: "50%",
            selectedMode: true,
            top: 0,
            data: categories.map(function(a) {
              return a.name;
            })
          },
          tooltip: {},
          series: [
            {
              force: {
                repulsion: 1200
              },
              categories: categories,
              type: "graph",
              layout: "force",
              symbolSize: 50,
              roam: false,
              label: {
                position: "top",
                color: "#666",
                show: true,
                textStyle: {
                  fontSize: 20
                }
              },
              draggable: true,
              edgeSymbol: ["circle", "arrow"],
              edgeSymbolSize: [4, 10],
              edgeLabel: {
                normal: {
                  textStyle: {
                    fontSize: 25
                  }
                }
              },
              data: [
                {
                  category: 0,
                  draggable: true,
                  name: "作者3",
                  itemStyle: {
                    color: {
                      colorStops: [
                        {
                          offset: 0,
                          color: "#B1ACEE" // 0% 处的颜色
                        }
                      ]
                    },
                    borderColor: "#7D39C0",
                    borderWidth: "3"
                  }
                },
                {
                  category: 0,
                  draggable: true,
                  name: "作者2",
                  itemStyle: {
                    color: {
                      colorStops: [
                        {
                          offset: 0,
                          color: "#B1ACEE" // 0% 处的颜色
                        }
                      ]
                    },
                    borderColor: "#7D39C0",
                    borderWidth: "3"
                  }
                },
                {
                  category: 0,
                  draggable: true,
                  name: "作者1",
                  itemStyle: {
                    color: {
                      colorStops: [
                        {
                          offset: 0,
                          color: "#B1ACEE" // 0% 处的颜色
                        }
                      ]
                    },
                    borderColor: "#7D39C0",
                    borderWidth: "3"
                  }
                },
                {
                  category: 0,
                  value: 1,
                  draggable: true,
                  name: "作者",
                  x: 650,
                  y: 230,
                  itemStyle: {
                    color: {
                      colorStops: [
                        {
                          offset: 0,
                          color: "#B1ACEE" // 0% 处的颜色
                        }
                      ]
                    },
                    borderColor: "#7D39C0",
                    borderWidth: "3"
                  }
                },
                {
                  category: 1,
                  value: 2,
                  draggable: true,
                  name: "出版物",
                  x: 650,
                  y: 230,
                  itemStyle: {
                    color: {
                      colorStops: [
                        {
                          offset: 0,
                          color: "#F4B886" // 0% 处的颜色
                        }
                      ]
                    },
                    borderColor: "#EA7503",
                    borderWidth: "3"
                  }
                },
                {
                  category: 2,
                  value: 3,
                  draggable: true,
                  name: "主题词",
                  x: 570,
                  y: 370,
                  itemStyle: {
                    color: {
                      colorStops: [
                        {
                          offset: 0,
                          color: "#81CB80" // 0% 处的颜色
                        }
                      ]
                    },
                    borderColor: "#009E2C",
                    borderWidth: "3"
                  }
                },
                {
                  value: 4,
                  category: 3,
                  draggable: true,
                  name: "机构",
                  x: 440,
                  y: 400,
                  itemStyle: {
                    color: {
                      colorStops: [
                        {
                          offset: 0,
                          color: "#99A2A7" // 0% 处的颜色
                        }
                      ]
                    },
                    borderColor: "#8A9392",
                    borderWidth: "3"
                  }
                },
                {
                  value: 5,
                  category: 4,
                  draggable: true,
                  name: "文献",
                  x: 550,
                  y: 300,
                  itemStyle: {
                    color: {
                      colorStops: [
                        {
                          offset: 0,
                          color: "#7FBACA" // 0% 处的颜色
                        }
                      ]
                    },
                    borderColor: "#007697",
                    borderWidth: "3"
                  }
                }
              ],
              links: [
                {
                  source: "文献",
                  target: "作者",
                  label: {
                    show: true,
                    formatter: "协同",
                    textStyle: {
                      fontSize: 18
                    }
                  }
                },
                {
                  source: "文献",
                  target: "出版物",
                  label: {
                    show: true,
                    formatter: "协同",
                    textStyle: {
                      fontSize: 18
                    }
                  }
                },
                {
                  source: "文献",
                  target: "主题词",
                  label: {
                    show: true,
                    formatter: "协同",
                    textStyle: {
                      fontSize: 18
                    }
                  }
                },
                {
                  source: "文献",
                  target: "机构",
                  label: {
                    show: true,
                    formatter: "协同",
                    textStyle: {
                      fontSize: 18
                    }
                  }
                },
                {
                  source: "作者",
                  target: "作者1",
                  label: {
                    show: true,
                    formatter: "协同",
                    textStyle: {
                      fontSize: 18
                    }
                  }
                },
                {
                  source: "作者",
                  target: "作者2",
                  label: {
                    show: true,
                    formatter: "协同",
                    textStyle: {
                      fontSize: 18
                    }
                  }
                },
                {
                  source: "作者",
                  target: "作者3",
                  label: {
                    show: true,
                    formatter: "协同",
                    textStyle: {
                      fontSize: 18
                    }
                  }
                }
              ],
              focusNodeAdjacency: true,
              lineStyle: {
                normal: {
                  width: 0.5,
                  curveness: 0.3,
                  opacity: 0.7
                }
              }
            }
          ]
        };
        myChart.clear();
        myChart.setOption(option1);
      });
      //todo: 判断是否为作者，出版物，主题词，机构，文献
      //是否需要把json里每个数据都加上一个type属性，然后可以做if判断和小球双击查询判断
      this.$http.get("author1?id=" + this.selectedNodeID).then(res => {
        var data = res.data;
        console.log(data);
        if (data == "" || data == undefined) return;
        myChart.setOption({
          series: [
            {
              data: [
                {
                  category: 0,
                  name: data[0].name,
                  value: 1 //考虑把value做成圆的大小，表示总共边数
                },
                {
                  category: 0,
                  name: data[0].relation[0][2],
                  value: 1
                },
                {
                  category: 1,
                  value: 2,
                  draggable: true,
                  name: data[0].relation[2][2],
                  x: 650,
                  y: 230,
                  itemStyle: {
                    color: {
                      colorStops: [
                        {
                          offset: 0,
                          color: "#F4B886" // 0% 处的颜色
                        }
                      ]
                    },
                    borderColor: "#EA7503",
                    borderWidth: "3"
                  }
                },
                {
                  category: 2,
                  value: 3,
                  draggable: true,
                  name: "主题词",
                  x: 570,
                  y: 370,
                  itemStyle: {
                    color: {
                      colorStops: [
                        {
                          offset: 0,
                          color: "#81CB80" // 0% 处的颜色
                        }
                      ]
                    },
                    borderColor: "#009E2C",
                    borderWidth: "3"
                  }
                },
                {
                  value: 4,
                  category: 3,
                  draggable: true,
                  name: "机构",
                  x: 440,
                  y: 400,
                  itemStyle: {
                    color: {
                      colorStops: [
                        {
                          offset: 0,
                          color: "#99A2A7" // 0% 处的颜色
                        }
                      ]
                    },
                    borderColor: "#8A9392",
                    borderWidth: "3"
                  }
                },
                {
                  value: 5,
                  category: 4,
                  draggable: true,
                  name: "文献",
                  x: 550,
                  y: 300,
                  itemStyle: {
                    color: {
                      colorStops: [
                        {
                          offset: 0,
                          color: "#7FBACA" // 0% 处的颜色
                        }
                      ]
                    },
                    borderColor: "#007697",
                    borderWidth: "3"
                  }
                }
              ]
            }
          ]
        });
      });
    },
    f1() {
      this.arr = [1];
    }
  }
};
</script>
