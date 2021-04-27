<template>
  <div class="user-page" style="height: 100%;">
    <el-form :model="form" ref="formRef" inline>
      <el-form-item label="用户名" prop="nick_name">
        <el-input v-model="form.nick_name"></el-input>
      </el-form-item>
      <el-form-item label="签名信息" prop="autograph">
        <el-input v-model="form.autograph"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formRef')">查询</el-button>
        <el-button @click="resetForm('formRef')">重置</el-button>
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
      </template>
    </ProTable>
  </div>
</template>

<script>
import ProTable from "@/components/ProTable";
import { getUser, delUser } from "@/api";

export default {
  name: "User",
  components: {
    ProTable
  },
  data() {
    return {
      form: {
        limit: 10,
        offset: 1,
        sort: "",
        order: "",
        begin_time: "",
        end_time: "",
        phone_number: "",
        nick_name: "",
        description: "",
        autograph: ""
      },
      sourceData: {
        page: true,
        type: "index",
        border: true,
        columns: [
          { label: "ID", prop: "id", sort: "custtom", minWidth: "260px" },
          { label: "用户名", prop: "nick_name", sort: "custtom", minWidth: "120px" },
          { label: "手机号", prop: "phone_number", sort: "custtom", minWidth: "120px" },
          { label: "密码", prop: "password", sort: "custtom", minWidth: "260px" },
          { label: "描述", prop: "description", sort: "custtom", minWidth: "120px" },
          { label: "签名信息", prop: "autograph", sort: "custtom", minWidth: "120px" },
          { label: "更新时间", prop: "update_at", sort: "custtom", minWidth: "180px" },
          { label: "删除时间", prop: "deleted_at", sort: "custtom", minWidth: "180px" },
          { label: "操作", slot: "handler", minWidth: "120px" }
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
      const { data } = await getUser(this.form);
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
      this.form.prop = prop;
      this.query();
    },
    async del(id) {
      await delUser(id);
      this.query();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.query();
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.query();
    }
  }
};
</script>

<style></style>
