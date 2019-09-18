<template>
  <div class="home">
    <div class="top_nav">
      <el-menu
        class="nav_top"
        mode="horizontal"
        @select="handleSelect"
        background-color="#017398"
        text-color="#fff"
        active-text-color="#ee6e15"
      >
        <img src="../assets/navlogo.png" alt />
        <el-menu-item>{{user}}</el-menu-item>
        <el-menu-item @click="logout">退出</el-menu-item>
      </el-menu>
    </div>
    <div class="main">
      <div
        class="left_nav"
        :class="isCollapse?'Retract':'open'"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
      >
        <el-menu
          :router="true"
          :default-active="defaultnav"
          background-color="#006586"
          text-color="#fff"
          @open="handleOpen"
          @close="handleClose"
          active-text-color="#ee6e15"
          :collapse="isCollapse"
        >
          <el-menu-item index="/netment">
            <i class="el-icon-menu"></i>
            <span slot="title">文献网络管理</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-tools"></i>
              <span>数据模型管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/building">模型构建</el-menu-item>
              <el-menu-item index="/version">版本管理</el-menu-item>
              <el-menu-item index="/visualization">模型可视化</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-upload"></i>
              <span>文献数据管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/dataimport">数据导入</el-menu-item>
              <el-menu-item index="/management">源数据管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-s-operation"></i>
              <span>工作流管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/guration">流程配置</el-menu-item>
              <el-menu-item index="/progress">进度查看</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
        <div @click="switchit" class="switchbtn">
          <i class="el-icon-caret-left" v-if="!isCollapse"></i>
          <i class="el-icon-caret-right" v-if="isCollapse"></i>
        </div>
      </div>
      <el-main class="subject">
        <router-view></router-view>
      </el-main>
    </div>
  </div>
</template>
<script>
import loginVue from "../components/login.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      defaultnav: "/netment",
      isCollapse: false,
      change: false
    };
  },
  computed: {
    ...mapState(["user"])
  },
  created() {
    this.geturl();
  },
  methods: {
    state() {
      this.isCollapse = !this.isCollapse;
    },
    handleSelect() {},
    handleOpen() {},
    handleClose() {},
    geturl() {
      const URL = this.$route.path;
      console.log(URL);
      this.defaultnav = URL;
    },
    switchit() {
      this.isCollapse = !this.isCollapse;
    },
    logout() {
      this.$confirm("确定退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功!"
          });
          sessionStorage.removeItem("login");
          this.$router.push({
            path: "/login"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    }
  }
};
</script>
<style scoped lang="less">
.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .main {
    width: 100%;
    height: 100%;
    display: flex;
    .subject {
      overflow: hidden;
      width: 100%;
      flex: 1;
    }
  }
  .nav_top {
    display: flex;
    justify-content: flex-end;
    position: relative;
    img {
      height: 35px;
      position: absolute;
      left: 10px;
      top: 8px;
      outline: none;
    }
  }
  .Retract {
    width: 65px;
  }
  .open {
    width: 200px;
  }
  .el-menu.el-menu--horizontal {
    border-bottom: none;
  }
  .left_nav {
    height: 100%;
    // overflow: hidden;
    position: relative;
    .el-menu {
      height: 100%;
      overflow: hidden;
    }
    // 开关样式]
    .switchbtn {
      i {
        position: absolute;
        top: 50%;
        right: 0;
        color: #fff;
        transform: translateY(-50%);
        transform: scaleY(3);
      }
    }
  }
}
.Tips {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  b {
    font-size: 12px;
    color: #fff;
  }
}
/deep/.el-switch.is-checked .el-switch__core {
  border-color: #409eff;
  background-color: #006586 !important;
}
/deep/.el-switch__core {
  border-color: #409eff;
  background: #006586 !important;
}
</style>