<template>
  <div class="login_wrap">
    <div class="title_wrap">
      <div class="title_cn">知识随需获得，文化深远传播</div>
      <div class="title_en">
        Gain knowledge as long as you want,spread culture sa far as it may
      </div>
    </div>

    <div class="form_wrap">
      <el-form
        ref="loginForm"
        :model="loginForm"
        label-width="80px"
        :rules="rules"
      >
        <el-form-item label="账号" prop="account">
          <el-input v-model="loginForm.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('loginForm')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        account: "",
        password: "",
      },
      rules: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    onSubmit(formName) {
      console.log(this.$refs[formName]);
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const formData = new FormData();
          formData.append('account', this.loginForm.account.trim())
          formData.append('password', this.loginForm.password)

          this.$store.dispatch("Login", formData).then(()=>{
            // 登录成功
            this.$router.push('/')
          }).catch((err)=>{
            console.log(err)
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login_wrap {
  // height: 80%;
  display: flex;
  // align-items: flex-start;
  justify-content: center;
  padding-top: 10%;
  .title_wrap {
    margin-top: 80px;
    margin-right: 10%;
    .title_cn {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .title_en {
    }
  }

  .form_wrap {
    max-width: 340px;
    // margin-top: -20%;
    width: 30%;
    min-width: 260px;
    border: 1px solid #dcdfe6;
    padding: 20px 40px 20px 20px;
    border-radius: 8px;
  }
}
</style>