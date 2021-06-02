<template>
  <div class="practice-page" style="width: 100%;">
    <el-form :model="form" label-position="left" inline>
      <el-form-item label="职位" prop="post" label-width="80" style="width: 240px">
        <el-input v-model="form.post"></el-input>
      </el-form-item>
      <el-form-item label="分类" prop="category" label-width="80" style="width: 240px">
        <el-select v-model="form.category">
          <el-option v-for="(item, index) in categoryList" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label-width="10" style="width: 240px">
        <el-button type="primary" @click="get">查询</el-button>
        <el-button type="primary" @click="add">新增</el-button>
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
import { getPrictice, getCategoryList } from "@/api";

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
          // eslint-disable-next-line no-dupe-keys
          { label: "ID", prop: "id", sort: "custom", minWidth: "120", sort: true },
          { label: "分类", prop: "category", minWidth: "120", sort: true },
          { label: "公司", prop: "shop_name", minWidth: "120", sort: true },
          { label: "职位", prop: "post", minWidth: "120", sort: true },
          { label: "工资", prop: "salary", minWidth: "120", sort: true },
          { label: "开始时间", prop: "begin_time", minWidth: "120", sort: true },
          { label: "结束时间", prop: "end_time", minWidth: "120", sort: true },
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
      form: { admin: 1, limit: 20, offset: 1, order: "", sort: "", category: "", salary: "", area_name: "", post: "" },
      categoryList: []
    };
  },
  mounted() {
    this.get();
  },
  methods: {
    async getCategoryList() {
      const { data } = await getCategoryList();
      this.categoryList = data.rows;
    },
    async get() {
      this.$refs.tableRef.setLoading(true);
      const { data } = await getPrictice(this.form);
      this.sourceData.tableData = data.rows || [];
      this.$refs.tableRef.updateTotal(data.total || 0);
      this.$refs.tableRef.setLoading(false);
      // 请求列表
      this.getCategoryList();
    },
    edit(row) {
      console.log(row);
      this.$message.error("该功能尚未实现 请访问可以访问此接口 PUT /prictice/admin");
    },
    del(row) {
      console.log(row);
      this.$message.error("该功能尚未实现 请访问可以访问此接口 DELETE /prictice/admin/:id");
    },
    add() {
      this.$message.error("该功能尚未实现 请访问可以访问此接口 POST /prictice/admin/");
    },
    pageChange(page) {
      this.form.offset = page;
      this.get();
    },
    sizeChange(page) {
      this.form.limit = page;
      this.get();
    },
    sortChange({ order, prop }) {
      this.form.order = order;
      this.form.sort = prop;
      this.get();
    }
  }
};
</script>

<style lang="scss">
.practice-page {
  height: 100%;
}
</style>
