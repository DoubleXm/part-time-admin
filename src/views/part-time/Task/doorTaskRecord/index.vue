<template>
  <div class="door-task-record">
    <el-form>
      <el-form-item>
        <el-button type="primary" @click="add">新建</el-button>
      </el-form-item>
    </el-form>
    <ProTable
      ref="ProTableRef"
      :source-data="sourceData"
      @size-change="sizeChange"
      @page-change="pageChange"
      @sort-change="sortChange"
    >
      <template v-slot:status="{ row }">
        <span v-if="row.status === 1" style="color: #67C23A;">审核通过</span>
        <span v-if="row.status === 2" style="color: #409EFF;">待审核</span>
        <span v-if="row.status === 3" style="color: #E6A23C;">审核失败</span>
      </template>
      <template v-slot:handler="{ row }">
        <el-button type="text" @click="del(row.id)" style="color: #f56c6c;">
          <i class="el-icon-delete"> 删除</i>
        </el-button>
        <el-button type="text" @click="check(row.id, 1)" style="color: #67C23A;">
          <i class="el-icon-delete"> 过审</i>
        </el-button>
        <el-button type="text" @click="check(row.id, 3)" style="color: #E6A23C;">
          <i class="el-icon-delete"> 拒审</i>
        </el-button>
      </template>
    </ProTable>
    <task-record-form ref="addTaskRecordForm" title="新增门任务记录"></task-record-form>
    <task-record-form ref="delTaskRecordForm" title="删除门任务记录"></task-record-form>
  </div>
</template>

<script>
import ProTable from "@/components/ProTable";
import TaskRecordForm from "./taskRecordForm";
import { getDoorRecord, delDoorRecord, setDoorRecord } from "@/api";

export default {
  name: "DoorTaskRecord",
  components: {
    ProTable,
    TaskRecordForm
  },
  data() {
    return {
      form: {
        limit: 10,
        offset: 1,
        order: "",
        sort: ""
      },
      sourceData: {
        border: true,
        page: true,
        columns: [
          { label: "ID", prop: "id", sort: "custtom", minWidth: "260px" },
          { label: "任务ID", prop: "door_id", sort: "custtom", minWidth: "260px" },
          { label: "用户ID", prop: "user_id", sort: "custtom", minWidth: "260px" },
          { label: "图片", prop: "images", sort: "custtom", minWidth: "120px" },
          { label: "内容", prop: "content", sort: "custtom", minWidth: "180px" },
          { label: "任务状态", slot: "status", sort: "custtom", minWidth: "180px", fixed: "right" },
          { label: "更新时间", prop: "update_at", sort: "custtom", minWidth: "180px" },
          { label: "删除时间", prop: "deleted_at", sort: "custtom", minWidth: "180px", fixed: "right" },
          { label: "操作", slot: "handler", minWidth: "180px", fixed: "right" }
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
      this.$refs.ProTableRef.setLoading(true);
      const { data } = await getDoorRecord(this.form);
      this.sourceData.tableData = data.rows || [];
      this.$refs.ProTableRef.updateTotal(data.total || 0);
      this.$refs.ProTableRef.setLoading(false);
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
    add() {
      this.$refs.addTaskRecordForm.showDialog(null, () => this.query());
    },
    async del(id) {
      await delDoorRecord({ id });
      this.query();
    },
    async check(id, status) {
      await setDoorRecord({ id, status });
      this.query();
    }
  }
};
</script>

<style></style>
