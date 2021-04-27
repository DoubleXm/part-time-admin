<template>
  <div :class="['theme-setting', drawer ? '' : 'no-width']">
    <div
      :class="['setting-btn', drawer ? 'moving-right' : 'moving-left']"
      :style="{ 'background-color': color }"
      @click="drawer = !drawer"
    >
      <i :class="drawer ? 'el-icon-circle-close' : 'el-icon-setting'"></i>
    </div>
    <el-drawer
      :visible.sync="drawer"
      direction="rtl"
      :size="'260px'"
      :with-header="false"
      :wrapperClosable="false"
      :modal="false"
    >
      <h4>系统配置</h4>
      <div class="setting-item">
        <span class="item-desc">主题色</span>
        <el-color-picker v-model="color"></el-color-picker>
      </div>
      <div class="setting-item">
        <span class="item-desc">侧边栏 Logo</span>
        <el-switch v-model="hasLogo"></el-switch>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false
    };
  },
  computed: {
    color: {
      get() {
        return this.$store.getters.themeColor;
      },
      set(val) {
        this.$store.dispatch("setting/changeSetting", {
          key: "themeColor",
          value: val
        });
      }
    },
    hasLogo: {
      get() {
        return this.$store.getters.hasLogo;
      },
      set(val) {
        this.$store.dispatch("setting/changeSetting", {
          key: "logo",
          value: val
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.theme-setting {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 3000;
  height: 100%;
  width: 260px;
  &.no-width {
    width: 0;
  }
  .setting-btn {
    position: absolute;
    top: 40%;
    right: 1px;
    z-index: 3333;
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    cursor: pointer;
    transition: all ease 0.3s;
    &.moving-right {
      transform: translateX(-261px);
    }
    &.moving-left {
      transform: translateX(0);
    }
    i {
      font-size: 18px;
      color: #fff;
    }
  }
  .el-drawer {
    h4 {
      font-size: 16px;
      color: #000;
      letter-spacing: 2px;
      font-weight: 500;
      margin-left: 20px;
    }
    .setting-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 30px;
      margin: 0 20px 14px 20px;
      color: $baseColor;
      font-size: $baseFont;
    }
  }
}
</style>
