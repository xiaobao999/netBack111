<template>
  <div class="login-wrap">
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      :model="formdata"
      class="login-form"
    >
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button type="primary" class="login-btn" @click.prevent="handleLogin()">登陆</el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      labelPosition: "top",
      formdata: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async handleLogin() {
      // const res = await this.$http.post(`login`, this.formdata);
      // const {
      //   data: {
      //     data,
      //     meta: { msg, status }
      //   }
      // } = res;
    }
  }
};
</script>
<style lang="less" scoped>
.login-wrap {
  //background: #324152;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form {
  background-color: #ffffff;
  border-radius: 5px;
  width: 400px;
  padding: 30px;
}
.login-btn {
  width: 100%;
}
</style>