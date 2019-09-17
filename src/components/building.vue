<template>
  <div class="building">
    <div class="bulid_lift">
      <el-tree
        :data="data"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        @node-click="handleNodeClick"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span v-if="!(data.pid)">
            <el-button icon="el-icon-plus" circle size="mini" @click.stop="() => append(data)"></el-button>
          </span>
          <span v-if="(data.pid)">
            <el-button icon="el-icon-minus" circle size="mini" @click.stop="() => remove(data)"></el-button>
            <el-button
              icon="el-icon-edit"
              circle
              size="mini"
              @click.stop="() => modifyconcept(data)"
              title="点击修改名称"
            ></el-button>
          </span>
        </span>
      </el-tree>
      <el-upload class="upload-demo" action>
        <el-button type="primary" size="small" class="concept_improt">概念导入</el-button>
      </el-upload>
    </div>
    <div class="bulid_right">
      <div class="building_title">
        <div>
          <span class="building_right_title_Icon"></span>
          <span>概念名</span>
        </div>
        <div class="concept_name">
          <span>概念名：</span>
          <el-input v-model="msg" :disabled="true"></el-input>
          <span style="margin-left:20px">描述：</span>
          <el-input v-model="describe" style="width:100%;">
            <el-button slot="suffix" icon="el-icon-edit" circle @click="editdescribe"></el-button>
          </el-input>
        </div>
      </div>
      <div class="build_main">
        <el-tabs v-model="activeName">
          <el-tab-pane label="属性信息" name="属性信息">
            <div class="btngroup">
              <el-button type="primary" size="small" @click="addformAttribute">新增</el-button>
              <span style="float:right">共{{tableData.length}}条属性信息</span>
            </div>
            <div class="build_content">
              <el-table :data="tableData" border stripe style="width: 100%" height="100%">
                <el-scrollbar style="height: 100%;">
                  <el-table-column prop="alias" label="属性别名"></el-table-column>
                  <el-table-column prop="name" label="属性名"></el-table-column>
                  <el-table-column prop="type" label="属性类型"></el-table-column>
                  <el-table-column prop="company" label="单位"></el-table-column>
                  <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                      <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                      <el-button type="text" size="small" @click="deleteAttribute(scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-scrollbar>
                <!-- /滚动条 -->
              </el-table>
              <div class="formAttribute" v-if="formAttributeshow">
                <div style="border-bottom:1px solid #d1d4d1;padding:10px 5px;margin-bottom:15px">
                  <span>属性设置</span>
                  <el-button
                    icon="el-icon-close"
                    style="float: right; padding: 5px"
                    circle
                    @click="closeform"
                  ></el-button>
                </div>
                <el-form ref="form" :model="form" label-width="80px">
                  <el-form-item label="属性名">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                  <el-form-item label="属性别名">
                    <el-input v-model="form.alias"></el-input>
                  </el-form-item>
                  <el-form-item label="单位">
                    <el-input v-model="form.company"></el-input>
                  </el-form-item>
                  <!-- 类型下拉框属性类型值 -->
                  <el-form-item label="属性类型">
                    <el-select v-model="form.type" placeholder="请选择类型">
                      <el-option label="数组型" value="数组型"></el-option>
                      <el-option label="计算类型" value="计算类型"></el-option>
                      <el-option label="日期" value="日期"></el-option>
                      <el-option label="浮点值" value="浮点值"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onSubmit()">确定</el-button>
                    <el-button @click="closeform">取消</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="关系信息" name="关系信息">
            <div class="btngroup">
              <el-button type="primary" size="small" @click="addrelation">新增</el-button>
              <span style="float:right">共{{relationTableData.length}}条属性信息</span>
            </div>
            <div class="build_content">
              <el-table :data="relationTableData" border stripe style="width: 100%" height="100%">
                <el-table-column prop="relationName" label="关系名"></el-table-column>
                <!-- <el-table-column prop="parentName" label="所属概念"></el-table-column> -->
                <el-table-column prop="relationOtherName" label="关系别名"></el-table-column>
                <el-table-column prop="objectName" label="对象概念" min-width="150">
                  <!-- 多个tag -->
                  <template slot-scope="scope">
                    <el-tag v-for="(item,i) in scope.row.objectName" :key="i">{{item}}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="relationType" label="类型"></el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                  <template slot-scope="scope">
                    <el-button @click="relationshipopen(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button type="text" size="small" @click="deleteship(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="formRelation" v-if="relationshipshow">
                <div style="padding:10px 5px;margin-bottom:15px">
                  <span>关系设置</span>
                  <el-button
                    icon="el-icon-close"
                    style="float: right; padding: 5px"
                    circle
                    @click="closeship"
                  ></el-button>
                </div>
                <el-form ref="form" :model="relationform" label-width="80px">
                  <el-form-item label="关系名">
                    <el-input v-model="relationform.relationName"></el-input>
                  </el-form-item>
                  <!-- <el-form-item label="所属概念">
                    <el-input v-model="relationform.parentName"></el-input>
                  </el-form-item>-->
                  <el-form-item label="关系别名">
                    <el-input v-model="relationform.relationOtherName"></el-input>
                  </el-form-item>
                  <el-form-item label="对象概念">
                    <div class="tagshow">
                      <el-tag
                        :key="tag"
                        v-for="tag in relationform.objectName"
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
                        @keyup.enter.native="handleInputConfirm"
                        @blur="handleInputConfirm"
                      ></el-input>
                      <el-button
                        v-else
                        class="button-new-tag"
                        size="small"
                        @click="showInput"
                      >+ New Tag</el-button>
                    </div>
                  </el-form-item>
                  <el-form-item label="类型">
                    <el-radio-group v-model="relationform.relationType">
                      <el-radio label="单值">单值</el-radio>
                      <el-radio label="非单值">非单值</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onSubmitship()">确定</el-button>
                    <el-button @click="closeship">取消</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          pid: 0,
          id: 999,
          label: "概念名",
          children: [
            {
              pid: 999,
              id: 1,
              label: "作者"
            },
            {
              pid: 999,
              id: 2,
              label: "机构"
            },
            {
              pid: 999,
              id: 3,
              label: "主题"
            },
            {
              pid: 999,
              id: 4,
              label: "文献"
            },
            {
              pid: 999,
              id: 5,
              label: "出版物"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      msg: "概念名",
      describe: "新概念",
      activeName: "属性信息",
      tableData: [],
      formAttributeshow: false,
      form: {
        name: "",
        type: "",
        Ename: "",
        othername: "",
        company: ""
      }, //关系信息form
      relationshipshow: false,
      relationTableData: [],
      relationform: {},
      inputVisible: false,
      inputValue: ""
    };
  },
  methods: {
    editdescribe() {
      this.$confirm("是否确定修改描述?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "修改成功!"
          });
          // tudo?
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消修改"
          });
          // tudo?
        });
    },
    modifyconcept(data) {
      this.$prompt(`请输入节点名称(${data.label})`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "修改成功"
          });
          this.msg = value;
          data.label = value;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消修改"
          });
        });
    },
    handleNodeClick(data) {
      const { label } = data;
      this.msg = label;
    },
    deleteship(e) {
      this.$confirm("是否确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const id = e.id;
          await this.$http.delete(`information/${id}`);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getdata();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    addrelation() {
      this.relationshipshow = true;
      this.relationform = {
        relationName: "",
        parentName: "",
        relationOtherName: "",
        objectName: [],
        relationType: ""
      };
    },
    closeship() {
      this.relationshipshow = false;
    },
    async relationshipopen(e) {
      this.relationshipshow = true;
      const id = e.id;
      const res = await this.$http.get(`information/${id}`);
      const { data } = res;
      this.relationform = data;
    },
    // tabClick(e) {
    //   console.log(e);
    // },
    async onSubmitship() {
      let id = this.relationform.id;
      if (id == undefined) {
        var arr = new Array(1);
        arr[0] = this.form;
        await this.$http
          .post(`information`, {
            objectName: this.relationform.objectName,
            parentName: this.relationform.parentName,
            relationName: this.relationform.relationName,
            relationOtherName: this.relationform.relationOtherName,
            relationType: this.relationform.relationType
          })
          .then(function(response) {
            arr[0].id = response.data.id;
          });
        this.getdata();
      } else {
        await this.$http.put(`information/${id}`, this.relationform);
        this.getdata();
      }
      this.relationshipshow = false;
    },
    handleClose(tag) {
      this.relationform.objectName.splice(
        this.relationform.objectName.indexOf(tag),
        1
      );
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.relationform.objectName.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    async getdata() {
      //console.log(JSON.stringify(this.relationTableData));
      //("information");
      const res1 = await this.$http.get("building");
      const res2 = await this.$http.get("information");
      this.tableData = res1.data;
      this.relationTableData = res2.data;
    },
    // 添加节点
    append(data) {
      const id = data.children.length + 1;
      data.children.push({
        pid: 999,
        id: id,
        label: `概念${id}`
      });
    },
    // 删除子节点
    remove(data) {
      const index = this.data[0].children.findIndex(function(item) {
        return item.id == data.id;
      });
      this.data[0].children.splice(index, 1);
    },
    async handleClick(e) {
      this.formAttributeshow = true;
      const id = e.id;
      const res = await this.$http.get(`building/${id}`);
      const { data } = res;
      this.form = data;
    },
    async onSubmit() {
      let id = this.form.id;
      if (id == undefined) {
        var arr = new Array(1);
        arr[0] = this.form;
        await this.$http
          .post(`building`, {
            name: this.form.name,
            alias: this.form.alias,
            company: this.form.company,
            type: this.form.type
          })
          .then(function(response) {
            arr[0].id = response.data.id;
          });
        this.getdata();
      } else {
        await this.$http.put(`building/${id}`, this.form);
        this.getdata();
      }
      this.formAttributeshow = false;
    },
    closeform() {
      this.formAttributeshow = false;
    },
    addformAttribute() {
      this.formAttributeshow = true;
      this.form = {
        name: "",
        type: "",
        Ename: "",
        othername: "",
        company: ""
      };
    },
    deleteAttribute(e) {
      this.$confirm("是否确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const id = e.id;
          await this.$http.delete(`building/${id}`);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getdata();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    this.getdata();
  }
};
</script>
<style scoped lang="less">
.el-button--mini.is-circle {
  padding: 2px;
}
.tagshow {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.building {
  width: 100%;
  height: 100%;
  display: flex;
  .bulid_lift {
    width: 200px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin-right: 20px;
    .upload-demo {
      text-align: center;
    }
  }
  .bulid_right {
    flex: 1;
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    .build_main {
      width: 100%;
      height: 100%;
      .el-tabs {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        /deep/ .el-tabs__content {
          width: 100%;
          height: 100%;
        }
        .el-tab-pane {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
        }
        .build_content {
          display: flex;
          height: 100%;
          .el-table {
            height: 100%;
          }
          .formAttribute {
            margin-left: 20px;
          }
          .formRelation {
            max-width: 300px;
            margin-left: 20px;
            .button-new-tag {
              margin-right: 5px;
              margin-top: 5px;
              height: 32px;
              line-height: 30px;
              padding-top: 0;
              padding-bottom: 0;
            }
            .input-new-tag {
              width: 90px;
              margin-left: 10px;
              vertical-align: bottom;
            }
          }
        }
      }
    }
  }
}
.el-tag {
  margin-right: 5px;
  margin-top: 5px;
}
.btngroup {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.building_title {
  width: 100%;
  height: 100px;
  .building_right_title_Icon {
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background: #d1d4d1;
    margin-right: 10px;
    vertical-align: middle;
  }
}
</style>
<style lang="less">
.concept_name {
  display: flex;
  > span {
    width: 80px;
  }
  .el-input {
    height: 30px;
    width: 150px;
    input {
      height: 24px !important;
      line-height: 24px;
    }
  }
  .el-button.is-circle {
    padding: 4px;
  }
}
.bulid_lift {
  .el-button.is-circle {
    padding: 3px;
  }
}
</style>


