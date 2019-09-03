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
      <el-menu
        :router="true"
        :default-active="defaultnav"
        class="left_nav"
        background-color="#006586"
        text-color="#fff"
        active-text-color="#ee6e15"
      >
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
      defaultnav: "netment"
    };
  },
  created() {
    this.geturl();
  },
  methods: {
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
  .el-menu.el-menu--horizontal {
    border-bottom: none;
  }
  .left_nav {
    width: 223px;
  }
}
</style>
