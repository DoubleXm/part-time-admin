<template>
  <div>
    <el-scrollbar class="scrollbar-wrapper">
      <el-menu
        default-active="2"
        :collapse="false"
        background-color="#fff"
        text-color="#333"
        active-text-color="#000"
        :unique-opened="true"
        :collapse-transition="false"
      >
        <sildebar-item
          v-for="route in menuList"
          :key="route.path"
          :item="route"
        ></sildebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import SildebarItem from "./SildebarItem";
import { routes } from "@/router";

export default {
  components: {
    SildebarItem
  },
  data() {
    return {
      menuList: routes
    };
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.scrollbar-wrapper {
  overflow-x: hidden !important;
}
</style>
