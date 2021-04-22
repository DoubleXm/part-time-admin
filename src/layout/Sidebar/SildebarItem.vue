<template>
  <div v-if="!item.hide">
    <template
      v-if="
        isHasOneChild(item.children, item) &&
          (!onlyOneChild.children || onlyOneChild.noShowingChildren)
      "
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)">
          <item
            :icon="'iconfont ' + onlyOneChild.meta.icon"
            :title="onlyOneChild.meta.title"
          ></item>
        </el-menu-item>
      </app-link>
    </template>
    <el-submenu v-else :index="resolvePath(item.path)">
      <template slot="title">
        <item
          :icon="'iconfont ' + item.meta.icon"
          :title="item.meta.title"
        ></item>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from "path";
import Item from "./Item";
import AppLink from "./Link";
import { isExternal } from "@/libs/util";

export default {
  name: "SidebarItem",
  components: {
    Item,
    AppLink
  },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ""
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
        this.onlyOneChild = { ...route, path: "", noShowingChildren: true };
        return true;
      }

      return false;
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return this.basePath;
      }
      return path.resolve(this.basePath, routePath);
    }
  }
};
</script>
