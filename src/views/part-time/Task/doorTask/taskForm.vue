<template>
  <ProDialog class="task-form" ref="dialogRef" :title="title" @save="save" @open="opened">
    <el-form :model="form" ref="formRef" inline label-width="100px" inline-message>
      <el-form-item
        label="标题"
        prop="title"
        :rules="{ required: true, message: '不能为空', trigger: ['blur', 'change'] }"
      >
        <el-input v-model="form.title" style="width: 193px;"></el-input>
      </el-form-item>
      <el-form-item
        label="内容"
        prop="task_detail"
        :rules="{ required: true, message: '不能为空', trigger: ['blur', 'change'] }"
      >
        <el-input v-model="form.task_detail" style="width: 193px;"></el-input>
      </el-form-item>
      <el-form-item
        label="佣金"
        prop="price"
        :rules="{ required: true, message: '不能为空', trigger: ['blur', 'change'] }"
      >
        <el-input v-model="form.price" style="width: 193px;"></el-input>
      </el-form-item>
      <el-form-item
        label="剩余量"
        prop="surplus"
        :rules="{ required: true, message: '不能为空', trigger: ['blur', 'change'] }"
      >
        <el-input v-model="form.surplus" style="width: 193px;"></el-input>
      </el-form-item>
      <el-form-item
        label="分类"
        prop="task_catetory"
        :rules="{ required: true, message: '不能为空', trigger: ['blur', 'change'] }"
      >
        <el-select v-model="form.task_catetory">
          <el-option label="调查" :value="1"></el-option>
          <el-option label="其他" :value="3"></el-option>
          <el-option label="分享" :value="4"></el-option>
          <el-option label="下载" :value="5"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </ProDialog>
</template>

<script>
import ProDialog from "@/components/ProDialog";
import { addDoor, setDoor } from "@/api";

export default {
  name: "TaskForm",
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
        title: "",
        task_detail: "",
        price: "",
        surplus: "",
        task_catetory: ""
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
          if (this.data) {
            console.log(this.data);
            this.$set(this.form, "id", this.data.id);
            await setDoor(this.form);
          } else {
            this.$set(this.form, "price", Number(this.form.price));
            this.$set(this.form, "surplus", Number(this.form.surplus));
            this.$set(this.form, "task_catetory", Number(this.form.task_catetory));
            await addDoor(this.form);
          }
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
      if (this.data) {
        for (let key in this.form) {
          if (Object.keys(this.data).includes(key)) {
            this.$set(this.form, key, this.data[key]);
          }
        }
      } else {
        this.$nextTick(() => {
          this.$refs.formRef.resetFields();
        });
      }
    }
  }
};
</script>

<style lang="scss"></style>
