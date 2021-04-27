<template>
  <div class="door-task" style="height: 100%;">
    <el-form>
      <el-form-item>
        <el-button type="primary" @click="add">新建</el-button>
      </el-form-item>
    </el-form>
    <ProTable
      ref="proTableRef"
      :sourceData="sourceData"
      @size-change="sizeChange"
      @page-change="pageChange"
      @sort-change="sortChange"
    >
      <template v-slot:handler="{ row }">
        <el-button type="text" @click="del(row.id)" style="color: #f56c6c;">
          <i class="el-icon-delete"> 删除</i>
        </el-button>
        <el-button type="text" @click="set(row)">
          <i class="el-icon-edit"> 编辑</i>
        </el-button>
      </template>
    </ProTable>
    <task-form ref="addTaskRef" title="新建任务"></task-form>
    <task-form ref="setTaskRef" title="编辑任务"></task-form>
  </div>
</template>

<script>
import ProTable from "@/components/ProTable";
import taskForm from "./taskForm";
import { getDoor, delDoor } from "@/api";

export default {
  name: "User",
  components: {
    ProTable,
    taskForm
  },
  data() {
    return {
      form: {
        limit: 10,
        offset: 1,
        sort: "update_at",
        order: "DESC",
        admin: 1
      },
      sourceData: {
        page: true,
        type: "index",
        border: true,
        columns: [
          { label: "ID", prop: "id", sort: "custtom", minWidth: "260px" },
          { label: "任务名称", prop: "title", sort: "custtom", minWidth: "120px" },
          { label: "任务内容", prop: "task_detail", sort: "custtom", minWidth: "260px" },
          { label: "任务分类", prop: "task_catetory", sort: "custtom", minWidth: "120px" },
          { label: "任务奖励", prop: "price", sort: "custtom", minWidth: "180px" },
          { label: "任务剩余量", prop: "surplus", sort: "custtom", minWidth: "180px" },
          { label: "更新时间", prop: "update_at", sort: "custtom", minWidth: "180px" },
          { label: "删除时间", prop: "deleted_at", sort: "custtom", minWidth: "180px" },
          { label: "操作", slot: "handler", minWidth: "120px", fixed: "right" }
        ],
        tableData: []
      }
    };
  },
  mounted() {
    this.query();
  },
  methods: {
    async query() {
      this.$refs.proTableRef.setLoading(true);
      const { data } = await getDoor(this.form);
      this.sourceData.tableData = data.rows || [];
      this.$refs.proTableRef.updateTotal(data.total || 0);
      this.$refs.proTableRef.setLoading(false);
    },
    sizeChange(page) {
      this.form.limit = page;
      this.query();
    },
    pageChange(page) {
      this.form.offset = page;
      this.query();
    },
    sortChange({ order, prop }) {
      this.form.order = order;
      this.form.sort = prop;
      this.query();
    },
    async del(id) {
      await delDoor({ id });
      this.query();
    },
    add() {
      this.$refs.addTaskRef.showDialog(null, () => this.query());
    },
    set(row) {
      this.$refs.setTaskRef.showDialog(row, () => this.query());
    }
  }
};
</script>
