<template>
  <div class="netstration">
    <div class="search">
      <el-input v-model="input" placeholder="请输入图谱名称"></el-input>
      <el-button type="primary" @click="searchbtn">点击查找</el-button>
    </div>
    <div class="atlas">
      <div class="addatlas" @click="eject('add')">
        <i class="el-icon-plus"></i>
        <div>添加图谱</div>
      </div>
      <div class="atlasshow" v-for="(item,i) in atlaslist" :key="i">
        <ul class="atlas_list">
          <li>{{item.atlasname}}</li>
          <li>创建人:{{item.atlasfounder}}</li>
          <li>创建时间：{{item.atlastime}}</li>
          <li>所属领域：{{item.atlasfield}}</li>
        </ul>
        <hr />
        <div>
          <el-button size="mini" style="float:left" @click="delete_tp(i)">删除</el-button>
          <div style="display:inline-block;float: right;">
            <el-button size="mini" @click="eject('edit',i)">编辑</el-button>
            <el-button size="mini" type="primary" @click="datement(item)">图谱管理</el-button>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" width="30%" close-on-press-escape>
      <el-form :model="form">
        <el-form-item label="名称：" :label-width="formLabelWidth">
          <el-input v-model="form.atlasname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="创建人：" :label-width="formLabelWidth">
          <el-input v-model="form.atlasfounder" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="创建时间：" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.atlastime"
            type="datetime"
            placeholder="请选择时间"
            format="yyyy 年 MM 月 dd 日 HH 时 mm 分 ss 秒"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="所属领域：" :label-width="formLabelWidth">
          <el-input v-model="form.atlasfield" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="'edit'==dialogFormstate">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="editatlas()">确 定</el-button>
      </div>
      <div slot="footer" class="dialog-footer" v-if="'add'==dialogFormstate">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="addatlas()">创 建</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
let datalist;
export default {
  data() {
    return {
      atlaslist: [],
      input: "",
      dialogFormVisible: false,
      dialogFormstate: "",
      formLabelWidth: "100px",
      data: "",
      form: {
        id: "",
        atlasname: "",
        atlasfounder: "",
        atlastime: "",
        atlasfield: ""
      },
      formdata: {
        id: "",
        atlasname: "",
        atlasfounder: "",
        atlastime: "",
        atlasfield: ""
      }
    };
  },
  mounted() {
    this.loaddata();
  },
  methods: {
    //搜索
    searchbtn() {
      const searchbtn = this.input;
      if (searchbtn == "") {
        this.loaddata();
      }
      var reg = RegExp(searchbtn);
      const arrlist = [];
      for (let i = 0; i < datalist.length; i++) {
        if (datalist[i].atlasname.match(reg)) {
          arrlist.push(datalist[i]);
        }
      }
      this.atlaslist = arrlist;
    },
    loaddata() {
      this.$http.get("netment").then(res => {
        var data = res.data;
        if (data.length > 0) {
          this.atlaslist = data;
          datalist = data;
        }
      });
    },
    delete_tp(index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(
            "netment/" + this.atlaslist[index].id
          );
          if (res.status == 200) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          }
          this.loaddata();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    eject(e, index) {
      this.dialogFormstate = e;
      this.dialogFormVisible = true;
      if (e == "edit") {
        // this.formdata = this.atlaslist[index].assign();
        this.formdata = JSON.parse(JSON.stringify(this.atlaslist[index]));
        this.form = this.atlaslist[index];
      }
      if (e == "add") {
        this.form = {};
      }
    },
    datement(e) {
      this.$router.push({
        path: "datement/" + e.id
      });
    },
    async editatlas() {
      let n = this.atlaslist.findIndex(item => item.id == this.form.id);
      this.atlaslist[n] = this.form;
      await this.$http.put(
        "netment/" + this.form.id,
        {
          atlasname: this.form.atlasname,
          atlasname: this.form.atlasname,
          atlasfounder: this.form.atlasfounder,
          atlastime: this.form.atlastime,
          atlasfield: this.form.atlasfield
        },
        {
          emulateJSON: true
        }
      );
      await this.loaddata();
      this.dialogFormVisible = false;
    },
    async addatlas() {
      var arr = new Array(1);
      arr[0] = this.form;
      var resp = await this.$http
        .post(
          "netment",
          {
            atlasname: this.form.atlasname,
            atlasfounder: this.form.atlasfounder,
            atlastime: this.form.atlastime,
            atlasfield: this.form.atlasfield
          },
          {
            emulateJSON: true
          }
        )
        .then(function(response) {
          arr[0].id = response.data.id;
        });
      // this.form.id = this.atlaslist.length + 1;

      this.dialogFormVisible = false;
      this.loaddata();
    },
    cancel() {
      let n = this.atlaslist.findIndex(item => item.id == this.form.id);
      this.atlaslist[n] = this.formdata;
      this.dialogFormVisible = false;
    }
  }
};
</script>
<style scoped lang="less">
.search {
  width: 300px;
  display: flex;
  .el-button {
    margin-left: 10px;
  }
}
.atlas {
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  > div {
    margin: 0 10px 10px 0;
    width: 24%;
    height: 200px;
    text-align: center;
    border: 1px solid #c8c8c8;
    border-radius: 7px;
    padding: 10px;
    box-sizing: border-box;
  }
}
.addatlas {
  .el-icon-plus {
    background: rgb(1, 115, 152);
    color: #fff;
    padding: 10px;
    border-radius: 50%;
    font-size: 40px;
    margin: 40px 0 10px 0;
  }
}
.atlasshow {
  hr {
    border: 0;
    background-color: #d1d4d1;
    height: 1px;
  }
}
/* 清楚ul li的默认样式*/
ul,
li {
  list-style: none;
}
.atlas_list {
  text-align: left;
  padding-left: 5px;
  font-size: 14px;
}
.atlas_list > li:first-child {
  font-size: 24px;
}
.atlas_list li {
  margin-bottom: 5px;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
</style>
