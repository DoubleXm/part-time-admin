<template>
  <div class="course-page" style="width: 100%;">
    <pro-table
      ref="tableRef"
      :source-data="sourceData"
      @size-change="sizeChange"
      @page-change="pageChange"
      @sort-change="sortChange"
    ></pro-table>
  </div>
</template>

<script>
import ProTable from "@/components/ProTable";
import { getCourse } from "@/api";

export default {
  components: {
    ProTable
  },
  data() {
    return {
      sourceData: {
        type: "selection",
        page: true,
        columns: [
          { label: "ID", prop: "id", sort: "custom", minWidth: "120" },
          { label: "标题", prop: "title", minWidth: "120" },
          { label: "内容", prop: "content", minWidth: "120" },
          { label: "图片", prop: "image", minWidth: "120" },
          {
            label: "创建时间",
            prop: "created_at",
            formatter: () => new Date().getTime(),
            minWidth: "120"
          }
        ],
        tableData: []
      },
      req: { limit: 10, offset: 1, order: "", sort: "" }
    };
  },
  mounted() {
    this.getCourse();
  },
  methods: {
    async getCourse() {
      this.$refs.tableRef.setLoading(true);
      const { data } = await getCourse(this.req);
      this.sourceData.tableData = data.rows || [];
      this.$refs.tableRef.updateTotal(data.total || 0);
      this.$refs.tableRef.setLoading(false);
    },
    pageChange(page) {
      this.req.offset = page;
      this.getCourse();
    },
    sizeChange(page) {
      this.req.limit = page;
      this.getCourse();
    },
    sortChange({ order, prop }) {
      this.req.order = order;
      this.req.sort = prop;
      this.getCourse();
    }
  }
};
</script>

<style lang="scss">
.course-page {
  height: 100%;
}
</style>
