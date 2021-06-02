<template>
  <div class="login-container">
    <div class="lang">
      <select-lang :lang="lang" @change-lang="selectLang"></select-lang>
    </div>
    <div class="main">
      <div class="main-top">
        <div class="main-top__logo">
          <h3>Part-time</h3>
        </div>
        <div class="main-top__desc">一个兼职的项目的管理后台</div>
      </div>
      <el-form :model="form" ref="form" size="medium" class="login-form">
        <el-form-item
          prop="phone_number"
          :rules="[{ required: true, message: '请输入账号', trigger: 'blur' }]"
        >
          <el-input
            size="medium"
            type="text"
            v-model="form.phone_number"
            prefix-icon="el-icon-user-solid"
            placeholder="账号：admin 或 test"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="password"
          :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
        >
          <el-input
            size="medium"
            type="password"
            v-model="form.password"
            prefix-icon="el-icon-lock"
            placeholder="密码：admin 或 123456"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login" :loading="loading"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import SelectLang from "@/components/SelectLang";
import { mapMutations } from "vuex";

export default {
  components: {
    SelectLang
  },
  data() {
    return {
      form: {
        phone_number: "18516321273",
        password: "123465"
      },
      loading: false
    };
  },
  computed: {
    lang() {
      return this.$store.state.app.local;
    }
  },
  methods: {
    ...mapMutations({
      selectLang: "app/SET_LOCAL"
    }),
    login() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return false;
        }
        this.loading = true;
        this.$store
          .dispatch("user/login", this.form)
          .then(() => {
            this.loading = false;
            this.$router.push("/");
          })
          .catch(() => {
            this.loading = false;
          });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  position: relative;
  height: 100%;
  min-height: 100%;
  background: #f0f2f5 url("~@/assets/background.svg") no-repeat 50%;
  background-size: 100%;
  .lang {
    height: 50px;
    padding-top: 14px;
    padding-right: 20px;
    text-align: right;
  }
  .main {
    width: 350px;
    margin: 0 auto;
    .main-top {
      .main-top__logo {
        text-align: center;
        h3 {
          font-size: 26px;
          line-height: 30px;
          margin: 0;
          margin-bottom: 6px;
          padding-top: 40px;
        }
      }
      .main-top__desc {
        font-size: 14px;
        line-height: 20px;
        text-align: center;
      }
    }
    .login-form {
      margin-top: 20px;
      .el-button {
        width: 100%;
      }
    }
  }
}
</style>
