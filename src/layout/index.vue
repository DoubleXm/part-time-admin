<template>
  <el-container class="app-container">
    <el-aside :class="asideCss">
      <side-bar></side-bar>
    </el-aside>
    <el-container>
      <el-header>
        <nav-bar></nav-bar>
      </el-header>
      <el-main>
        <transition name="fade-transform" mode="out-in">
          <keep-alive>
            <router-view />
          </keep-alive>
        </transition>
      </el-main>
      <setting />
    </el-container>
  </el-container>
</template>

<script>
import SideBar from "./Sidebar";
import NavBar from "./NavBar";
import Setting from "./Setting";
import { mapGetters } from "vuex";

export default {
  name: "Layout",
  components: {
    SideBar,
    NavBar,
    Setting
  },
  computed: {
    ...mapGetters(["sidebar"]),
    asideCss() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  .el-header {
    height: 50px;
    padding: 0;
  }
  .el-aside {
    height: 100vh;
    transition: width ease 0.4s;
    &.hideSidebar {
      width: 54px !important;
    }
    &.openSidebar {
      width: 200px !important;
    }
  }
  /* fade-transform */
  .fade-transform-leave-active,
  .fade-transform-enter-active {
    transition: all 0.5s;
  }

  .fade-transform-enter {
    opacity: 0;
    transform: translateX(-30px);
  }

  .fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  .el-main {
    padding: 10px;
  }
}
</style>
