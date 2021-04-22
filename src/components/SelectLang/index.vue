<template>
  <div class="local">
    <el-dropdown trigger="click" @command="toggleLang">
      <span class="el-dropdown-link">
        {{ $t("language") }}
        <i class="el-icon-caret-bottom"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="v in langList" :key="v.key" :command="v.key">{{
          v.item
        }}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "SelectLang",
  props: {
    lang: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      langList: [
        { key: "zh-CN", item: "中文简体" },
        { key: "en-US", item: "English" }
      ]
    };
  },
  watch: {
    lang(lang) {
      this.$i18n.locale = lang;
    }
  },
  methods: {
    toggleLang(local) {
      this.$emit("change-lang", local);
    }
  }
};
</script>

<style lang="scss" scoped>
.local {
  margin-right: 16px;
}
</style>
