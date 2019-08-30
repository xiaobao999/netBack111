<template>
  <div class="dataimport">
    <el-tabs>
      <el-tab-pane label="上传文件">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="导入时间">
            <el-input v-model="form.time"></el-input>
          </el-form-item>
          <el-form-item label="操作员">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="任务领域">
            <el-input v-model="form.areas"></el-input>
          </el-form-item>
          <el-form-item label="备注信息">
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.information"></el-input>
          </el-form-item>
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
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button @click="close">取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="数据库导入">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="表名">
            <el-input v-model="form.time"></el-input>
          </el-form-item>
          <el-form-item label="数据库类型">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="连接字符串">
            <el-input v-model="form.areas"></el-input>
          </el-form-item>
          <el-form-item label="备注信息">
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.information"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button @click="close">取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped lang="less">
.dataimport {
  width: 800px;
  margin-left: 300px;
  .el-tabs {
    margin-top: 0;
  }
}
</style>
<script>
export default {
  data() {
    return {
      form: {
        time: "",
        name: "",
        areas: "",
        information: ""
      },
      fileList: []
    };
  },
  methods: {
    onSubmit() {},
    handleRemove() {},
    handlePreview() {},
    handleExceed() {},
    beforeRemove() {}
  }
};
</script>