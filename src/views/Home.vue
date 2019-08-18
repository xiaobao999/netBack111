<template>
  <div class="home">
    <HelloWorld />
  </div>
</template>

<script>
import HelloWorld from "@/components/a0.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  }
};
</script>
<style scoped lang="less">
.home {
  width: 100%;
  height: 100%;
}
</style>
