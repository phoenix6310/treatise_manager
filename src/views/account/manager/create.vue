<template>
  <div class="create_manager_wrap">
    <el-form
      :model="managerForm"
      :rules="rules"
      ref="managerForm"
      label-width="100px"
      class="demo-managerForm"
    >
      <el-form-item label="管理员类型" prop="managerType" class="form_inline">
        <el-select
          v-model="managerForm.managerType"
          placeholder="请选择"
          :disabled="isEdit"
        >
          <el-option
            v-for="item in managerTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地区选择" prop="proviceId" class="form_inline">
        <el-select
          v-model="managerForm.proviceId"
          placeholder="请选择"
          filterable
          :disabled="
            this.managerForm.managerType === 9003 ||
            this.managerForm.managerType === 10001
          "
        >
          <el-option
            v-for="item in provinceOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="姓名" prop="name" class="form_inline">
        <el-input v-model="managerForm.name"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" class="form_inline">
        <el-input v-model="managerForm.email"></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="account" class="form_inline">
        <el-input v-model="managerForm.account"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('managerForm')"
          >{{ !isEdit ? "立即创建" : "确认修改" }}</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getOrgs } from "@/api/competition";
import { addAdmin, updateAdmin } from "@/api/account";
export default {
  data() {
    var provinceValidate = (rule, value, callback) => {
      //   console.log(value, "timePeriodValidate");
      if (this.managerForm.managerType) {
        if (
          this.managerForm.managerType === 9003 ||
          this.managerForm.managerType === 10001
        ) {
          // 全国管理员不需要选择省份
          callback();
        } else {
          if (!value) {
            callback(new Error("请选择省份"));
          } else {
            callback();
          }
        }
      }
    };
    return {
      provinceOptions: [],
      managerTypes: [
        {
          value: 10001,
          label: "超级管理员",
        },
        {
          value: 9003,
          label: "全国管理员",
        },
        {
          value: 9002,
          label: "省级管理员",
        },
        // {
        //   value: 9001,
        //   label: "校级级管理员",
        // },
      ],
      managerForm: {
        managerType: "",
        name: "",
        proviceId: "",
        email: "",
        account: "",
      },
      rules: {
        managerType: [
          { required: true, message: "请选择管理员类型", trigger: "blur" },
        ],
        proviceId: [
          {
            required: true,
            validator: provinceValidate,
            message: "请选择省份",
            trigger: "blur",
          },
        ],
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        account: [{ required: true, message: "请输入编号", trigger: "blur" }],
      },
      userId: "",
      isEdit: false,
    };
  },
  async created() {
    console.log(this.$route, this.$route.params);

    let { data: orgs } = await getOrgs({
      currentId: 0,
      orgId: 0,
      level: 1,
    });
    let provinceOptions = [];
    orgs.map((province) => {
      provinceOptions.push({
        value: province.id,
        label: province.name,
      });
    });
    this.provinceOptions = provinceOptions;

    let userId = this.$route.params.userId;
    if (userId) {
      this.userId = userId;
      this.isEdit = true;
    }
    if (this.isEdit) {
      try {
        let manageInfo = JSON.parse(sessionStorage.getItem("manageInfo"));
        console.log(manageInfo);
        Object.assign(this.managerForm, {
          managerType: manageInfo.userType,
          name: manageInfo.name,
          proviceId: manageInfo.proviceId === 0 ? "" : manageInfo.proviceId,
          email: manageInfo.email,
          account: manageInfo.account,
        });
      } catch (err) {}
    }
  },
  watch: {
    "this.managerForm.managerType"(newVal) {
      if (newVal === 9003 || newVal === 10001) {
        Object.assign(this.managerForm, {
          proviceId: "",
        });
      }
    },
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          console.log(this.managerForm);
          let res = null;
          let data = {
            // userId: ''
            account: this.managerForm.account,
            // collegeId: '',
            proviceId: this.managerForm.proviceId,
            name: this.managerForm.name,
            email: this.managerForm.email,
          };
          if (
            this.managerForm.managerType === 9003 ||
            this.managerForm.managerType === 10001
          ) {
            delete data.proviceId;
          }
          if (!this.isEdit) {
            res = await addAdmin(data);
            console.log(res);
          } else {
            data.userId = this.userId;
            res = await updateAdmin(data);
          }
          if (res.code === 1) {
            this.$message({
              type: "success",
              message: !this.isEdit ? "已添加" : "已修改",
              duration: 3000,
            });
            this.$router.push({
              path: "/account/manager",
            });
          } else {
            this.$message({
              type: "error",
              message: res.message,
              duration: 3000,
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
</style>