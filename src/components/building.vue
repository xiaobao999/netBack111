Skip to content
 
Search or jump to…

Pull requests
Issues
Marketplace
Explore
 
@xiaobao999 
Learn Git and GitHub without any code!
Using the Hello World guide, you’ll start a branch, write comments, and open a pull request.

 
1
0 0 xiaobao999/netBack111
 Code  Issues 0  Pull requests 0  Projects 0  Wiki  Security  Insights  Settings
netBack111/src/components/building.vue
Fetching contributors…

We found a potential security vulnerability in one of your dependencies.
Only the owner of this repository can see this message.

389 lines (384 sloc)  12.3 KB
    
<template>
  <div class="building">
    <div class="building_left">
      <el-tree
        :data="data"
        :props="defaultProps"
        @node-click="handleNodeClick"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        :render-content="renderContent"
      ></el-tree>
      <div class="building_bottom" style="width:100%;text-align:center;">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-change="handleChange"
          :file-list="fileList"
        >
          <el-button type="primary" size="small" class="concept_improt">概念导入</el-button>
        </el-upload>
      </div>
    </div>
    <div class="building_right" style="width:100%">
      <div class="building_right_title">
        <div style="margin-bottom:15px;vertical-align:top">
          <span class="building_right_title_Icon"></span>
          <span>概念名</span>
        </div>
        <div>
          <span>概念名：{{msg}}</span>
          <span style="margin-left:20px">描述：{{describe}}</span>
        </div>
      </div>
      <div class="building_right_content">
        <div class="building_right_content_tabs">
          <el-tabs v-model="activeName" @tab-click="handleTabsClick">
            <el-tab-pane label="属性信息" name="first">
              <div>
                <div style="margin-bottom:10px">
                  <el-button type="primary" size="small">新增</el-button>
                  <span style="float:right">共4条属性信息</span>
                </div>
                <el-table :data="tableData" border max-height="650" stripe style="width: 100%">
                  <el-table-column prop="date" label="属性名" min-width="200"></el-table-column>
                  <el-table-column prop="name" label="属性别名" min-width="200"></el-table-column>
                  <el-table-column prop="address" label="属性类型" min-width="200"></el-table-column>
                  <el-table-column prop="address" label="单位" min-width="200"></el-table-column>
                  <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                      <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                      <el-button type="text" size="small">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="关系信息" name="second">
              <div>
                <div style="margin-bottom:10px">
                  <el-button type="primary" size="small">新增</el-button>
                  <span style="float:right">共1条属性信息</span>
                </div>
                <el-table
                  :data="relationTableData"
                  border
                  max-height="650"
                  stripe
                  style="width: 100%"
                >
                  <el-table-column prop="relationName" label="关系名" min-width="150"></el-table-column>
                  <el-table-column prop="parentName" label="所属概念" min-width="150"></el-table-column>
                  <el-table-column prop="relationOtherName" label="关系别名" min-width="150"></el-table-column>
                  <el-table-column prop="objectName" label="对象概念" min-width="200"></el-table-column>
                  <el-table-column prop="relationType" label="类型" min-width="100"></el-table-column>
                  <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                      <el-button @click="relationClick(scope.row)" type="text" size="small">编辑</el-button>
                      <el-button type="text" size="small">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="formAttribute" style="display:none">
          <div style="border-bottom:1px solid #d1d4d1;padding:10px 5px;margin-bottom:15px">
            <span>属性设置</span>
            <span style="float:right;cursor: pointer;" @click="closeForm('formAttribute')">X</span>
          </div>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="属性名">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="英文名称">
              <el-input v-model="form.Ename"></el-input>
            </el-form-item>
            <el-form-item label="别名">
              <el-input v-model="form.othername"></el-input>
            </el-form-item>
            <el-form-item label="单位">
              <el-input v-model="form.company"></el-input>
            </el-form-item>
            <el-form-item label="属性类型">
              <el-select v-model="form.type" placeholder="请选择类型">
                <el-option label="数组型" value="shuzu"></el-option>
                <el-option label="计算类型" value="jisuan"></el-option>
                <el-option label="日期" value="riqi"></el-option>
                <el-option label="浮点值" value="fudian"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onSubmit">确定</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="formRelation" style="display:none">
          <div style="border-bottom:1px solid #d1d4d1;padding:10px 5px;margin-bottom:15px">
            <span>关系设置</span>
            <span style="float:right;cursor: pointer;" @click="closeForm('formRelation')">X</span>
          </div>
          <el-form ref="form" :model="relationform" label-width="80px">
            <el-form-item label="关系名">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="别名">
              <el-input v-model="form.othername"></el-input>
            </el-form-item>
            <el-form-item label="对象概念">
              <el-input v-model="form.objectName"></el-input>
            </el-form-item>
            <el-form-item label="类型">
              <el-radio-group v-model="form.type">
                <el-radio label="单值"></el-radio>
                <el-radio label="非单值"></el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onSubmit">确定</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
let id = 100;
let tableWidth = 0;
let tableWidthS = 0;
export default {
  data() {
    return {
      msg: "",
      describe: "",
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
      ], //属性信息table
      relationTableData: [
        {
          relationName: "配备（peiBei）",
          parentName: "",
          relationOtherName: "",
          objectName: "",
          relationType: "单值"
        }
      ], //关系信息table
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1"
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ], //左侧树
      defaultProps: {
        children: "children",
        label: "label"
      },
      activeName: "first",
      form: {
        name: "",
        type: [],
        Ename: "",
        othername: "",
        company: ""
      }, //关系信息form
      relationform: {
        name: "",
        type: [],
        othername: "",
        objectName: ""
      }, //关系信息form
      fileList: [] //上传列表
    };
  },
  methods: {
    handleNodeClick() {},
    handleClick() {
      $(".formAttribute").show();
      tableWidthS = document.body.clientWidth - 200 - 275 - 300 + "px";
      $(".building_right_content_tabs").css("width", tableWidthS);
    },
    relationClick() {
      $(".formRelation").show();
      tableWidthS = document.body.clientWidth - 200 - 275 - 300 + "px";
      $(".building_right_content_tabs").css("width", tableWidthS);
    },
    append(data) {
      const newChild = { id: id++, label: "testtest" };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    renderContent(h, { node, data }) {
      if (data.children) {
        return (
          <span
            class="custom-tree-node"
            style="display: inline-block;width:85%;"
          >
            <span style="display:inline-block;min-height:30px;line-height:30px;">
              {node.label}
            </span>
            <span style="float:right">
              <el-button
                size="mini"
                type="button"
                style="padding: 5px 10px;"
                on-click={() => this.append(data)}
              >
                +
              </el-button>
              <el-button
                size="mini"
                type="button"
                style="padding: 5px 10px;"
                on-click={() => this.remove(node, data)}
              >
                -
              </el-button>
            </span>
          </span>
        );
      } else {
        return (
          <span
            class="custom-tree-node"
            style="padding: 5px 10px;"
            style="display: inline-block;width:90%;"
          >
            <span style="display:inline-block;min-height:30px;line-height:30px;">
              {node.label}
            </span>
          </span>
        );
      }
    },
    handleTabsClick() {},
    onSubmit() {},
    closeForm(ele) {
      $("." + ele).hide();
      tableWidth = document.body.clientWidth - 200 - 265 + "px";
      $(".building_right_content_tabs").css("width", tableWidth);
    },
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    }
  },
  mounted: function() {
    this.$nextTick(function() {});
  }
};
</script>
<style scoped lang="less">
.building {
  display: flex;
  height: 100%;
  .building_left {
    width: 200px;
    position: relative;
  }
  .building_right {
    //border-left: 5px solid #e9f3f5;
    .building_right_title {
      width: 100%;
      height: 100px;
      //border-bottom: 5px solid #e9f3f5;
      padding-left: 10px;
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
    .building_right_content {
      padding: 0px 10px;
      position: relative;
    }
  }
}
.el-tree > div {
  padding: 5px 0;
}
.building_bottom {
  position: absolute;
  left: 50%;
  bottom: 20px;
  transform: translateX(-50%);
}
.formRelation,
.formAttribute {
  width: 300px;
  // border-left: 5px solid #e9f3f5;
  height: 100%;
  position: absolute;
  right: 0px;
  top: 0px;
}
</style>

