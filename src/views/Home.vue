<template>
  <div class="home">
    <div class="top_nav">
      <el-menu
        :default-active="activeIndex2"
        class="nav_top"
        mode="horizontal"
        @select="handleSelect"
        background-color="#017398"
        text-color="#fff"
        active-text-color="#ee6e15"
      >
        <img src="../assets/navlogo.png" alt />
        <el-menu-item @click="datement">图谱管理</el-menu-item>
      </el-menu>
    </div>
    <div class="main">
      <div class="left_nav" :class="isCollapse?'Retract':'open'">
        <el-menu
          :router="true"
          :default-active="defaultnav"
          background-color="#006586"
          text-color="#fff"
          active-text-color="#ee6e15"
          :collapse="isCollapse"
        >
          <div class="Tips">
            <el-switch v-model="isCollapse"></el-switch>
            <b>{{!isCollapse?'收起':'展开'}}</b>
          </div>
          <el-menu-item index="netment">
            <i class="el-icon-menu"></i>
            <span slot="title">文献网络管理</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-tools"></i>
              <span>数据模型管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="building">模型构建</el-menu-item>
              <el-menu-item index="version">版本管理</el-menu-item>
              <el-menu-item index="visualization">模型可视化</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-upload"></i>
              <span>文献数据管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="dataimport">数据导入</el-menu-item>
              <el-menu-item index="management">源数据管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-s-operation"></i>
              <span>工作流管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="guration">流程配置</el-menu-item>
              <el-menu-item index="progress">进度查看</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
      <el-main class="subject">
        <router-view></router-view>
      </el-main>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      defaultnav: "netment",
      isCollapse: false
    };
  },
  created() {
    this.geturl();
  },
  methods: {
    state() {
      console.log(1111);
      this.isCollapse = !this.isCollapse;
    },
    handleSelect() {},
    handleOpen() {},
    handleClose() {},
    geturl() {
      const URL = this.$route.path.split("/");
      this.defaultnav = URL[1];
    },
    datement() {
      this.$router.push({
        name: "datement"
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
    overflow: hidden;
    .el-menu {
      height: 100%;
      overflow: hidden;
    }
    // 开关样式
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
