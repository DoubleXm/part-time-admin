<template>
  <el-pagination
    size="mini"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="1"
    :page-sizes="[10, 15, 20, 50, 100]"
    :page-size="pageInfo.pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="pageInfo.total"
    :disabled="loading"
    background
  >
  </el-pagination>
  <!-- hide-on-single-page -->
</template>

<script>
export default {
  name: "Pagination",
  props: {
    pageInfo: {
      type: Object,
      default: () => ({ pageSize: 10, total: 0 })
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleSizeChange(page) {
      !this.loading && this.$emit("size-change", page);
    },
    handleCurrentChange(page) {
      !this.loading && this.$emit("page-change", page);
    }
  }
};
</script>

<style></style>
