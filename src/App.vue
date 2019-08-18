<template>
  <div id="app">
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
        <el-menu-item index="1">图谱管理</el-menu-item>
        <el-submenu index="2">
          <template slot="title">数据空间</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="main">
      <el-menu
        default-active="1"
        class="left_nav"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title">文献网络管理</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>数据模型管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1">模型构建</el-menu-item>
            <el-menu-item index="2-2">版本管理</el-menu-item>
            <el-menu-item index="2-3">模型可视化</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>文献数据管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1">数据导入</el-menu-item>
            <el-menu-item index="3-2">源数据管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>工作流管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="4-1">流程配置</el-menu-item>
            <el-menu-item index="4-2">进度查看</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
      <router-view />
    </div>
  </div>
</template>

<style lang="less">
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
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
  }
  .el-menu.el-menu--horizontal {
    border-bottom: none;
  }
  .left_nav {
    width: 223px;
  }
}
</style>
<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleOpen() {},
    handleClose() {}
  }
};
</script>
