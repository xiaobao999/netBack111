<template>
  <div class="dataimport">
    <el-tabs>
      <el-tab-pane label="上传文件">
        <el-form ref="form" :model="upform" label-width="100px">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">上传文件</el-button>
          </el-upload>
          <el-form-item label="上传时间">
            <el-date-picker
              v-model="upform.time"
              type="datetime"
              placeholder="请选择时间"
              format="yyyy 年 MM 月 dd 日 HH 时 mm 分 ss 秒"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="操作员">
            <el-input v-model="upform.name"></el-input>
          </el-form-item>
          <el-form-item label="任务领域">
            <el-input v-model="upform.areas"></el-input>
          </el-form-item>
          <el-form-item label="备注信息">
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="upform.information"></el-input>
          </el-form-item>
          <el-form-item style="text-align:right;">
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button @click="close">取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="数据库导入">
        <el-form ref="form" :model="portform" label-width="100px" style="margin-top:32px;">
          <el-form-item label="导入时间">
            <el-date-picker
              v-model="portform.time"
              type="datetime"
              placeholder="请选择时间"
              format="yyyy 年 MM 月 dd 日 HH 时 mm 分 ss 秒"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="操作员">
            <el-input v-model="portform.name"></el-input>
          </el-form-item>
          <el-form-item label="任务领域">
            <el-input v-model="portform.areas"></el-input>
          </el-form-item>
          <el-form-item label="备注信息">
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="portform.information"></el-input>
          </el-form-item>
          <el-form-item style="text-align:right;">
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button @click="close">取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="导入历史">
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column prop="time" label="导入时间"></el-table-column>
          <el-table-column prop="name" label="操作员"></el-table-column>
          <el-table-column prop="areas" label="任务领域"></el-table-column>
          <el-table-column prop="information" label="备注信息"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped lang="less">
.dataimport {
  width: 800px;
  margin: 0 auto;
  .el-tabs {
    margin-top: 0;
  }
  .el-form-item {
    margin-bottom: 30px;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
}
</style>
<script>
export default {
  data() {
    return {
      upform: {
        time: "",
        name: "",
        areas: "",
        information: ""
      },
      portform: {
        time: "",
        name: "",
        areas: "",
        information: ""
      },
      fileList: [],
      tableData: [
        {
          time: "2019 年 09 月 18 日 14 时 21 分 50 秒",
          name: "admin",
          areas: "机构",
          information: "无"
        }
      ]
    };
  },
  methods: {
    onSubmit() {},
    handleRemove() {},
    handlePreview() {},
    handleExceed() {},
    beforeRemove() {},
    close() {}
  }
};
</script>