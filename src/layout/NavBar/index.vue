<template>
  <div class="nav-bar">
    <el-row>
      <el-col :span="1">
        <div class="toggle-sidebar" @click="toggleSidebar">
          <i :class="[sidebarIcon ? 'el-icon-s-fold' : 'el-icon-s-unfold']"></i>
        </div>
      </el-col>
      <el-col :span="23">
        <div class="right-menu">
          <screen-full></screen-full>
          <select-lang @change-lang="changeLang" :lang="lang"></select-lang>
          <div class="avatar">
            <el-dropdown trigger="click">
              <span class="avatar-title">
                <el-avatar
                  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                ></el-avatar>
                <i class="el-icon-caret-bottom"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="logout"
                  >退出登录</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ScreenFull from "@/components/ScreenFull";
import SelectLang from "@/components/SelectLang";
import { mapMutations, mapActions } from "vuex";

export default {
  components: {
    ScreenFull,
    SelectLang
  },
  computed: {
    lang() {
      return this.$store.state.app.local;
    },
    sidebarIcon() {
      return this.$store.getters.sidebar.opened;
    }
  },
  methods: {
    ...mapMutations({
      changeLang: "app/SET_LOCAL",
      toggleSidebar: "app/TOGGLE_SIDEBAR"
    }),
    ...mapActions({
      storeLogout: "user/logout"
    }),
    logout() {
      this.storeLogout();
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.nav-bar {
  height: 50px;
  box-shadow: 0px 2px 5px rgba(16, 37, 65, 0.08);
  .el-row,
  .el-col {
    height: 100%;
  }
  .toggle-sidebar {
    width: 50px;
    height: 100%;
    margin-right: 20px;
    line-height: 50px;
    font-size: 18px;
    color: $baseColor;
    text-align: center;
    cursor: pointer;
    transition: all ease 0.6s;
    &:active,
    &:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }
  }
  .right-menu {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    font-size: $baseFont;
    color: $baseColor;
    .avatar {
      margin-right: 30px;
      .avatar-title {
        height: 100%;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
