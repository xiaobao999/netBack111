<template>
  <div class="tagshow">
    <el-tag
      :key="tag"
      v-for="tag in ulist"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
    >{{tag}}</el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    ></el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">添加</el-button>
  </div>
</template>
<script>
export default {
  name: "FormTag",
  props: ["list"],
  data() {
    return {
      inputValue: "",
      inputVisible: false,
      ulist: []
    };
  },
  created() {
    this.getdata();
  },
  computed: {},
  methods: {
    handleClose(tag) {
      this.ulist.splice(this.ulist.indexOf(tag), 1);
    },
    getdata() {
      let n = [];
      for (let i = 0, l = this.list.length; i < l; i++) {
        n.push(this.list[i][0]);
      }
      this.ulist = n;
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.ulist.push(inputValue);
        this.list.push([inputValue, 1]);
      }
      this.inputVisible = false;
      this.inputValue = "";
    }
  },
  watch: {
    list(val) {
      this.getdata();
    }
  }
};
</script>
<style scoped lang="less">
.input-new-tag {
  width: 90px;
  vertical-align: bottom;
}
</style>