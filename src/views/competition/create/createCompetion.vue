<template>
  <div class="create_competition_wrap">
    <el-form
      :model="competitionForm"
      :rules="rules"
      ref="competitionForm"
      label-width="140px"
    >
      <el-form-item label="竞赛名称" prop="name">
        <el-input
          v-model="competitionForm.name"
          placeholder="请输入评分竞赛名称"
          maxlength="50"
          class="rule_name"
        ></el-input>
      </el-form-item>
      <el-form-item label="竞赛类型" prop="type" class="form_inline">
        <el-select
          v-model="competitionForm.type"
          placeholder="请选择"
          :disabled="isEdit"
        >
          <el-option
            v-for="item in competitionTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="竞赛规模" prop="matchType" class="form_inline">
        <el-select v-model="competitionForm.matchType" placeholder="请选择">
          <el-option
            v-for="item in competitionScope"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地区选择" prop="proviceId" class="form_inline">
        <el-select
          v-model="competitionForm.proviceId"
          placeholder="请选择"
          filterable
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
      <el-form-item label="年份选择" prop="term" class="form_inline">
        <el-date-picker
          v-model="competitionForm.term"
          type="year"
          placeholder="选择年份"
          value-format="yyyy"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="竞赛时间" prop="competitionPeriod">
        <el-date-picker
          v-model="competitionForm.competitionPeriod"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="timestamp"
          :disabled="isEdit"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="提交截止时间" prop="uploadTime" class="form_inline">
        <el-date-picker
          v-model="competitionForm.uploadTime"
          type="date"
          placeholder="选择日期"
          value-format="timestamp"
          :disabled="isEdit"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="评分规则" prop="templateId" class="form_inline">
        <el-select
          v-model="competitionForm.templateId"
          placeholder="请选择评分规则"
          filterable
        >
          <el-option
            v-for="item in ruleOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="选手题目" prop="subject">
        <el-input
          v-model="competitionForm.subject"
          size="small"
          type="textarea"
          maxlength="100"
          :autosize="{ minRows: 2, maxRows: 4 }"
        ></el-input>
      </el-form-item> -->

      <el-form-item label="盲审" prop="isBlind" class="form_inline">
        <el-switch v-model="competitionForm.isBlind"> </el-switch>
      </el-form-item>
      <el-form-item label="随机" prop="isRandom" class="form_inline">
        <el-switch v-model="competitionForm.isRandom"> </el-switch>
      </el-form-item>

      <el-form-item label="选手信息">
        <input
          type="file"
          ref="contestantsInfo"
          @change="fileChange('contestantsInfo')"
        />
      </el-form-item>
      <el-form-item label="评委信息">
        <input type="file" ref="reviewers" @change="fileChange('reviewers')" />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('competitionForm')"
          :disabled="isUpload"
          >{{ !isEdit ? "立即创建" : "确认修改" }}</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  getOrgs,
  getRuleList,
  addCompetition,
  updateCompetition,
} from "@/api/competition";
export default {
  data() {
    var timePeriodValidate = (rule, value, callback) => {
      //   console.log(value, "timePeriodValidate");
      if (!value.length) {
        callback(new Error("请选择竞赛时间"));
      } else {
        callback();
      }
    };
    return {
      competitionTypes: [
        {
          value: 1,
          label: "主观题答辩",
        },
        {
          value: 2,
          label: "优选视频",
        },
      ],
      competitionScope: [
        // {
        //   value: 3,
        //   label: "校赛",
        // },
        {
          value: 2,
          label: "省赛",
        },
        {
          value: 1,
          label: "国赛",
        },
      ],
      provinceOptions: [],
      ruleOptions: [],
      competitionForm: {
        // 省份id
        proviceId: "",
        collegeId: 0,
        //   竞赛类型
        type: 1,
        // 竞赛规模
        matchType: 2,
        name: "",
        // 选手题目
        // subject: "",
        // 年份
        term: "",
        // 竞赛时间
        competitionPeriod: [],
        // 截止时间
        uploadTime: "",
        // 评分规则id
        templateId: "",
        isBlind: false,
        isRandom: false,
      },
      isUpload: false,
      files: {},
      rules: {
        name: [
          { required: true, message: "请输入竞赛名称", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "长度在 1 到 50 个字符",
            trigger: "blur",
          },
        ],
        proviceId: [{ required: true, message: "请选择地区", trigger: "blur" }],
        term: [{ required: true, message: "请选择年份", trigger: "blur" }],
        uploadTime: [
          { required: true, message: "请选择提交截止时间", trigger: "blur" },
        ],
        templateId: [
          { required: true, message: "请选择评分规则", trigger: "blur" },
        ],
        competitionPeriod: [
          { required: true, validator: timePeriodValidate, trigger: "blur" },
        ],
        subject: [
          { required: true, message: "请输入选手题目", trigger: "blur" },
        ],
      },
      competitionId: "",
      isEdit: false,
    };
  },
  async created() {
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
    let ruleOptions = [];
    let params = {
      pageSize: 1,
      pageNum: 100000,
      columnFilters: {
        "~name": "",
      },
    };
    let {
      data: { contents: rules },
    } = await getRuleList(params);
    rules.map((rule) => {
      ruleOptions.push({
        value: rule.id,
        label: rule.name,
      });
    });
    this.ruleOptions = ruleOptions;
    let competitionId = this.$route.params.id;
    if (competitionId) {
      this.competitionId = competitionId;
      this.isEdit = true;
    }
    if (this.isEdit) {
      try {
        let competitionInfo = JSON.parse(
          sessionStorage.getItem("competitionInfo")
        );
        console.log(competitionInfo);
        Object.assign(this.competitionForm, {
          proviceId: competitionInfo.proviceId,
          collegeId: 0,
          //   竞赛类型
          type: competitionInfo.type,
          // 竞赛规模
          matchType: competitionInfo.matchType,
          name: competitionInfo.name,
          // 选手题目
          // subject: competitionInfo.subject,
          // 年份
          term: competitionInfo.term,
          // 竞赛时间
          competitionPeriod: [
            competitionInfo.startTime,
            competitionInfo.endTime,
          ],
          // 截止时间
          uploadTime: competitionInfo.uploadTime,
          // 评分规则id
          templateId: competitionInfo.templateId,
          isBlind: Boolean(competitionInfo.isBlind),
          isRandom: Boolean(competitionInfo.isRandom),
        });
      } catch (err) {}
    }
  },
  methods: {
    fileChange(fileRef) {
      console.log(this.$refs[fileRef].files[0]);
      this.files[fileRef] = this.$refs[fileRef].files[0];
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.isUpload = true;
          console.log(this.competitionForm);
          console.log(
            this.$refs["contestantsInfo"].files[0],
            this.$refs["reviewers"].files[0]
          );
          let formData = new FormData();
          for (var key in this.competitionForm) {
            console.log(key, this.competitionForm[key]);
            if (key === "competitionPeriod") {
              // 时间拆开
              formData.append("startTime", this.competitionForm[key][0]);
              formData.append("endTime", this.competitionForm[key][1]);
            } else if (key === "isBlind" || key === "isRandom") {
              // 讲tue、false转换为1、0
              formData.append(key, +this.competitionForm[key]);
            } else {
              formData.append(key, this.competitionForm[key]);
            }
          }
          const file1 = this.$refs["contestantsInfo"].files[0];
          const file2 = this.$refs["reviewers"].files[0];
          if (file1) {
            if (this.competitionForm.type === 1) {
              //   参赛学生信息
              formData.append("students", file1);
              //   formData.append("teachers", "");
            } else if (this.competitionForm.type === 2) {
              //  参赛教师信息
              //   formData.append("students", "");
              formData.append("teachers", file1);
            }
          } else {
            // formData.append("students", "");
            // formData.append("teachers", "");
          }
          if (file2) {
            formData.append("reviewers", file2);
          } else {
            // formData.append("reviewers", "");
          }
          console.log(formData, "formData");
          let res = null;
          if (!this.isEdit) {
            res = await addCompetition(formData);
          } else {
            formData.append("id", this.competitionId);
            res = await updateCompetition(formData);
          }

          if (res.code === 1) {
            this.$message({
              type: "success",
              message: !this.isEdit ? "已添加" : "已修改",
              duration: 3000,
            });
            this.$router.push({
              path: "/competition/index",
            });
          } else if (res.code === 9) {
            this.$alert("导入信息出错，是否下载错误信息", "提示", {
              confirmButtonText: "下载",
              callback: () => {
                window.open(`http://172.18.89.141:8888${res.data}`);
                this.$router.push({
                  path: "/competition/index",
                });
              },
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
.form_inline {
  display: inline-block;
  width: 340px;
}
</style>