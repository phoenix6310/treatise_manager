<template>
  <div class="edit_participant_wrap">
    <el-form
      :model="userInfo"
      :rules="rules"
      ref="userInfo"
      label-width="100px"
      class="demo-userInfo"
    >
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="userInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="userInfo.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('userInfo')"
          >确认修改</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { updateStudentInfo } from "@/api/account";
export default {
  data() {
    return {
      userInfo: {
        userNo: "",
        account: "",
        userType: "",
        collegeId: "",
        proviceId: "",
        name: "",
        email: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    let userInfo = sessionStorage.getItem("userInfo");
    console.log(JSON.parse(userInfo));
    try {
      userInfo = JSON.parse(userInfo);
      this.userId = userInfo.userId;
      Object.assign(this.userInfo, {
        userNo: userInfo.userNo,
        account: userInfo.account,
        userType: userInfo.userType,
        collegeId: userInfo.collegeId,
        proviceId: userInfo.proviceId,
        name: userInfo.name,
        email: userInfo.email,
        // dissId: userInfo.dissId,
      });
    } catch (error) {}
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.userInfo.userId = this.userId;
          let res = await updateStudentInfo(this.userInfo);

          if (res && res.code === 1) {
            this.$message({
              type: "success",
              message: "已修改",
              duration: 3000,
            });
            this.$router.push({
              path: "/account/participant",
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss">
.edit_participant_wrap {
}
</style>