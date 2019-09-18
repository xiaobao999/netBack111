<template>
  <div style="height:100%">
    <div class="nav">
      <el-menu
        class="nav_top"
        mode="horizontal"
        background-color="#017398"
        text-color="#fff"
        active-text-color="#ee6e15"
      >
        <img src="../assets/navlogo.png" alt />
      </el-menu>
    </div>
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
  </div>
</template>
<script>
import md5 from "js-md5";
import { mapMutations, mapActions } from "vuex";
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
    ...mapMutations(["getusername"]),
    ...mapActions(["mygetusername"]),
    getusername() {
      this.mygetusername(this.formdata.username);
    },
    async handleLogin() {
      const { username, password } = this.formdata;
      if (username == "") {
        this.$message.error("用户名不能为空");
        return;
      }
      if (password == "") {
        this.$message.error("密码不能为空");
        return;
      }
      if (username != "super" && username != "admin") {
        this.$message.error("用户名错误");
        return;
      }
      const res = await this.$http.get(username);
      const pwd = res.data;
      if (pwd.pwd != md5(password)) {
        this.$message.error("密码错误");
        return;
      }
      sessionStorage.setItem("login", md5(password));
      this.$message.success("登录成功");
      this.$router.push({
        name: "home"
      });
      this.getusername(this.formdata.username);
    }
  }
};
</script>
<style lang="less" scoped>
.nav {
  height: 60px;
  ul {
    height: 100%;
  }
}
img {
  margin: 10px 20px;
  height: 35px;
}
.login-wrap {
  //background: #324152;
  margin-top: 200px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form {
  background-color: #ffffff;
  border-radius: 5px;
  width: 400px;
  padding: 30px;
  border: 1px solid #a8a8a8;
}
.login-btn {
  width: 100%;
}
</style>