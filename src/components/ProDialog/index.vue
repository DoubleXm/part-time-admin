<template>
  <el-dialog
    class="pt-dialog"
    ref="dialog"
    :title="title"
    :width="width"
    :modal="modal"
    :center="center"
    :close-on-click-modal="false"
    :visible.sync="dialogVisible"
    @close="close"
    @open="open"
  >
    <slot></slot>
    <slot name="custom-footer"></slot>
    <span slot="footer" class="dialog-footer" v-if="isFooter">
      <el-button :disabled="loading" @click="close">{{ cancelText }}</el-button>
      <el-button :loading="loading" type="primary" @click="onSave">{{
        confirmText
      }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { drag } from "@/libs/drag";

export default {
  name: "ProDialog",
  props: {
    title: {
      type: String,
      required: true
    },
    width: {
      type: String,
      default: "30%"
    },
    // 是否需要遮罩
    modal: {
      type: Boolean,
      default: true
    },
    // 头部/尾部是否居中布局
    center: {
      type: Boolean,
      default: false
    },
    isFooter: {
      type: Boolean,
      default: true
    },
    cancelText: {
      type: String,
      default: "取 消"
    },
    confirmText: {
      type: String,
      default: "确 定"
    }
  },
  data() {
    return {
      dialogVisible: false,
      loading: false
    };
  },
  mounted() {
    const headerEle = document.querySelector(".pt-dialog .el-dialog__header");
    const dragEle = document.querySelector(".el-dialog");
    drag(headerEle, dragEle);
  },
  methods: {
    open() {
      this.$emit("open");
      this.dialogVisible = true;
    },
    // 主动关闭
    close() {
      this.dialogVisible = false;
      this.loading = false;
    },
    onSave() {
      this.loading = true;
      const ret = {
        close: this.close
      };
      this.$emit("save", ret);
    }
  }
};
</script>

<style lang="scss">
@import "~@/styles/variables.scss";

.pt-dialog {
  .el-dialog {
    .el-dialog__header {
      height: 55px;
      padding: 18px 20px;
      color: $titleColor;
      border-bottom: 1px solid $borderColor;
      .el-dialog__title {
        line-height: 20px;
        font-size: 16px;
      }
    }
    .el-dialog__footer {
      height: 55px;
      padding: 10px 16px;
      border-top: 1px solid $borderColor;
    }
  }
}
</style>
