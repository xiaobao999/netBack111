<template>
  <div class="netstration">
    <div class="search">
      <el-input v-model="input" placeholder="请输入图谱名称"></el-input>
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
          <el-button size="mini" style="float:left">删除</el-button>
          <div style="display:inline-block;float: right;">
            <el-button size="mini" @click="eject('edit',i)">编辑</el-button>
          <el-button size="mini" type="primary" @click="datement()">图谱管理</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 编辑添加弹出页面 -->
    <el-dialog title :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form">
        <el-form-item label="名称：" :label-width="formLabelWidth">
          <el-input v-model="form.atlasname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="创建人：" :label-width="formLabelWidth">
          <el-input v-model="form.atlasfounder" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="创建时间：" :label-width="formLabelWidth">
          <el-input v-model="form.atlastime" autocomplete="off"></el-input>
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
export default {
  name: "HelloWorld",
  data() {
    return {
      atlaslist: [
        {
          id: 1,
          atlasname: "text1",
          atlasfounder: "张三",
          atlastime: "20109/06/14",
          atlasfield: "昌平"
        },
        {
          id: 2,
          atlasname: "text2",
          atlasfounder: "李四",
          atlastime: "20109/08/01",
          atlasfield: "东城"
        }
      ],
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
  methods: {
    eject(e, index) {
      this.dialogFormstate = e;
      this.dialogFormVisible = true;
      if (e == "edit") {
        // this.formdata = this.atlaslist[index].assign();
        this.formdata = JSON.parse(JSON.stringify(this.atlaslist[index]));
        console.log(this.formdata);
        this.form = this.atlaslist[index];
      }
      if (e == "add") {
        this.form = {};
      }
    },
    datement() {
      this.$router.push({
        name: "datement"
      });
    },
    editatlas() {
      let n = this.atlaslist.findIndex(item => item.id == this.form.id);
      this.atlaslist[n] = this.form;
      this.dialogFormVisible = false;
    },
    addatlas() {
      this.form.id = this.atlaslist.length + 1;
      this.atlaslist.push(this.form);
      this.dialogFormVisible = false;
    },
    cancel() {
      console.log(this.formdata, "formdata");
      let n = this.atlaslist.findIndex(item => item.id == this.form.id);
      this.atlaslist[n] = this.formdata;
      this.dialogFormVisible = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.netstration {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
}
.search {
  width: 300px;
}
.atlas {
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  > div {
    margin: 0 10px 10px 0;
    width: 23%;
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
ul,li{ 
  list-style:none
}
.atlas_list{
  text-align: left;
  padding-left: 5px;
  font-size: 14px;
}
.atlas_list>li:first-child{
  font-size: 24px;
}
.atlas_list li{
  margin-bottom: 5px;
}

</style>
