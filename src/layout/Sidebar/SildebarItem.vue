<template>
  <div v-if="!item.hide">
    <template v-if="isHasOneChild(item.children, item)">
      <app-link :to="item.path">
        <el-menu-item :index="item.path">
          <menu-item
            icon="el-icon-location"
            :title="item.meta.title"
          ></menu-item>
        </el-menu-item>
      </app-link>
    </template>
    <el-submenu v-else :index="item.path">
      <template slot="title">
        <menu-item icon="el-icon-location" :title="item.meta.title"></menu-item>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
      />
    </el-submenu>
  </div>
</template>

<script>
import MenuItem from "./Item";
import AppLink from "./Link";

export default {
  name: "SidebarItem",
  components: {
    MenuItem,
    AppLink
  },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      onlyOneChild: {}
    };
  },
  methods: {
    isHasOneChild(children = [], route) {
      const showingChildren = children.filter(item => {
        if (item.hide) {
          return false;
        } else {
          this.onlyOneChild = item;
          return true;
        }
      });

      // 如果 children 只有一个 默认显示 children
      if (showingChildren.length === 1) {
        return true;
      }
      // 如果没有 children 显示自身
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...route, path: "" };
        return true;
      }

      return false;
    }
  }
};
</script>

<style></style>
