<template>
  <div class="screen-full">
    <i
      :class="isScreenFull ? 'iconfont icon-suofang' : 'el-icon-full-screen'"
      @click="clickHandle"
    ></i>
  </div>
</template>

<script>
import screenfull from "screenfull";

export default {
  name: "ScreenFull",
  props: {
    ele: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isScreenFull: false
    };
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.destroy();
  },
  methods: {
    clickHandle() {
      if (!screenfull.isEnabled) {
        this.$message({
          type: "warning",
          message: "浏览器版本不支持全屏操作"
        });
        return false;
      }
      screenfull.toggle();
    },
    change() {
      this.isScreenFull = screenfull.isFullscreen;
    },
    init() {
      screenfull.on("change", this.change);
    },
    destroy() {
      screenfull.off("change", this.change);
    }
  }
};
</script>

<style lang="scss" scoped>
.screen-full {
  width: 40px;
  height: 50px;
  line-height: 50px;
  cursor: pointer;
}
</style>
