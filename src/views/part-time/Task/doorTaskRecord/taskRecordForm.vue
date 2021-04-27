<template>
  <ProDialog class="task-record-form" ref="dialogRef" :title="title" @save="save" @open="opened">
    <el-form :model="form" ref="formRef" inline label-width="100px" inline-message>
      <el-form-item
        label="门任务ID"
        prop="task_id"
        :rules="{ required: true, message: '不能为空', trigger: ['blur', 'change'] }"
      >
        <el-input v-model="form.task_id" style="width: 193px;"></el-input>
      </el-form-item>
      <el-form-item
        label="门任务内容"
        prop="content"
        :rules="{ required: true, message: '不能为空', trigger: ['blur', 'change'] }"
      >
        <el-input v-model="form.content" style="width: 193px;"></el-input>
      </el-form-item>
      <el-form-item
        label="图片"
        prop="images"
        :rules="{ required: true, message: '不能为空', trigger: ['blur', 'change'] }"
      >
        <el-input v-model="form.images" style="width: 193px;"></el-input>
      </el-form-item>
    </el-form>
  </ProDialog>
</template>

<script>
import ProDialog from "@/components/ProDialog";
import { addDoorRecord } from "@/api";

export default {
  name: "TaskRecordForm",
  components: {
    ProDialog
  },
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      form: {
        task_id: "",
        content: "",
        images: ""
      },
      data: null
    };
  },
  methods: {
    save(e) {
      this.$refs.formRef.validate(async valide => {
        if (!valide) {
          e.unlock();
          return;
        }
        try {
          await addDoorRecord(this.form);
          e.unlock();
          e.save();
          e.close();
        } catch (err) {
          e.unlock();
        }
      });
    },
    showDialog(data, cb) {
      this.data = data;
      this.$refs.dialogRef.showDialog(cb);
    },
    opened() {
      this.$nextTick(() => {
        this.$refs.formRef.resetFields();
      });
    }
  }
};
</script>

<style></style>
