<template>
  <el-container>
    <el-aside width="200px" height="100%">
      <side-bar></side-bar>
    </el-aside>
    <el-container>
      <el-header>
        <nav-bar></nav-bar>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SideBar from "./Sidebar";
import NavBar from "./NavBar";

export default {
  name: "Layout",
  components: {
    SideBar,
    NavBar
  }
};
</script>

<style></style>
