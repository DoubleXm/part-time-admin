<template>
  <div class="course-page" style="width: 100%;">
    <el-form>
      <el-form-item>
        <el-button type="primary" @click="add">新建</el-button>
      </el-form-item>
    </el-form>
    <pro-table
      ref="tableRef"
      :source-data="sourceData"
      @size-change="sizeChange"
      @page-change="pageChange"
      @sort-change="sortChange"
    >
      <template v-slot:handler="{ row }">
        <el-button type="text" size="mini" @click="edit(row)">修改</el-button>
        <el-button type="text" size="mini" @click="del(row)" style="color: #f56c6c;">删除</el-button>
      </template>
    </pro-table>
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
        border: true,
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
          },
          {
            label: "操作",
            slot: "handler",
            minWidth: "100"
          }
        ],
        tableData: []
      },
      req: { limit: 10, offset: 1, order: "", sort: "" }
    };
  },
  mounted() {
    this.get();
  },
  methods: {
    async get() {
      this.$refs.tableRef.setLoading(true);
      const { data } = await getCourse(this.req);
      this.sourceData.tableData = data.rows || [];
      this.$refs.tableRef.updateTotal(data.total || 0);
      this.$refs.tableRef.setLoading(false);
    },
    edit(row) {
      console.log(row);
      this.$message.error("该功能尚未实现 请访问可以访问此接口 PUT /course/admin/");
    },
    del(row) {
      console.log(row);
      this.$message.error("该功能尚未实现 请访问可以访问此接口 DELETE /course/admin/");
    },
    add() {
      this.$message.error("该功能尚未实现 请访问可以访问此接口 POST /course/admin/");
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
