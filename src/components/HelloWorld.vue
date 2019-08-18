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
      <div class="atlasshow">
        <h3>test</h3>
        <div>创建人</div>
        <div>创建时间：2019年6月11日</div>
        <div>所属领域：科教</div>
        <hr/>
        <div>
          <el-button size="mini">删除</el-button>
          <el-button size="mini" @click="eject('edit')">编辑</el-button>
          <el-button size="mini">管理图谱</el-button>
        </div>
      </div>
    </div>
    <!-- 编辑添加弹出页面 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form">
        <el-form-item label="名称：" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="创建人：" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="创建时间：" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属领域：" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="'edit'==dialogFormstate">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
      <div slot="footer" class="dialog-footer" v-if="'add'==dialogFormstate">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">创 建</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      input: "",
      dialogFormVisible: false,
      dialogFormstate: "",
      formLabelWidth: "100px",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  methods: {
    eject(e) {
      this.dialogFormstate = e;
      this.dialogFormVisible = true;
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
    background-color: rgb(23, 24, 23);
    height: 1px;
  }
}
</style>
