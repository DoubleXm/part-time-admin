<template>
  <div class="sidebar">
    <Logo :is-collapse="isCollapse" v-if="hasLogo"></Logo>
    <el-scrollbar :class="['scrollbar-wrapper', hasLogo ? 'has-logo' : '']">
      <el-menu
        mode="vertical"
        :default-active="$route.path"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuColor"
        :active-text-color="variables.activeMenuColor"
        :unique-opened="false"
        :collapse-transition="false"
      >
        <sildebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        ></sildebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import Logo from "./Logo";
import SildebarItem from "./SildebarItem";
import { routes } from "@/router";
import { mapGetters } from "vuex";
import variables from "@/styles/variables.scss";

export default {
  components: {
    SildebarItem,
    Logo
  },
  computed: {
    ...mapGetters(["sidebar", "hasLogo"]),
    isCollapse() {
      return !this.sidebar.opened;
    },
    variables() {
      return variables;
    },
    routes() {
      return routes;
    }
  }
};
</script>
