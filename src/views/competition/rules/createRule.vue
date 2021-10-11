<template>
  <div class="create_rule_wrap">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="140px"
    >
      <el-form-item label="评分标准名称" prop="name">
        <el-input
          v-model="ruleForm.name"
          placeholder="请输入评分标准名称"
          maxlength="50"
          class="rule_name"
        ></el-input>
      </el-form-item>
      <el-form-item label="评分规则">
        <ul class="rule_detail_container">
          <li class="rule_item">
            <div class="rule_item_0">指标</div>
            <div class="rule_item_1">指标说明</div>
            <div class="rule_item_2">分数(分)</div>
          </li>
          <li
            class="rule_item"
            v-for="(ruleItem, index) in ruleForm.rule"
            :key="`parent-${index}`"
          >
            <div class="rule_item_0">
              <div class="rule_title">
                <el-input
                  v-model="ruleItem.name"
                  size="small"
                  type="textarea"
                  maxlength="50"
                  autosize
                ></el-input>
              </div>
              <div class="rule_item_total_score">
                总分：{{ ruleScoreItem[index] }}分
              </div>
              <div class="rule_control_wrap">
                <el-button
                  type="primary"
                  icon="el-icon-plus"
                  circle
                  size="mini"
                  v-if="ruleForm.rule.length - 1 === index"
                  @click="add(index)"
                ></el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  size="mini"
                  v-if="ruleForm.rule.length > 1"
                  @click="del(index)"
                ></el-button>
              </div>
            </div>
            <ul>
              <li
                v-for="(innerRuleItem, innerIndex) in ruleItem.children"
                :key="`child-${index}-${innerIndex}`"
              >
                <div class="rule_item_1">
                  <el-input
                    v-model="innerRuleItem.name"
                    size="small"
                    type="textarea"
                    maxlength="100"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                  ></el-input>
                </div>
                <div class="rule_item_2">
                  <el-input
                    v-model="innerRuleItem.score"
                    size="small"
                  ></el-input>
                  <div class="rule_control_wrap">
                    <el-button
                      type="primary"
                      icon="el-icon-plus"
                      circle
                      size="mini"
                      v-if="ruleItem.children.length - 1 === innerIndex"
                      @click="add(index, innerIndex)"
                    ></el-button>
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      circle
                      size="mini"
                      v-if="ruleItem.children.length > 1"
                      @click="del(index, innerIndex)"
                    ></el-button>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" :disabled="isUpload">{{
          !isEdit ? "立即创建" : "确认修改"
        }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addRule, getRuleById } from "@/api/competition.js";
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        rule: [
          {
            name: "",
            info: "",
            children: [
              {
                name: "",
                score: "",
                info: "",
              },
              //   {
              //     name: "答辩内容严谨连续，见解独到，逻辑清晰，专业度高，并有正确的思想导向",
              //     score: 10,
              //     info: "",
              //   },
            ],
          },
          //   {
          //     name: "答辩表现",
          //     info: "",
          //     children: [
          //       {
          //         name: "语言规范，口齿清晰，表达准确、流畅、自然",
          //         score: 2,
          //         info: "",
          //       },
          //       {
          //         name: "精神饱满，表现恰当",
          //         score: 4,
          //         info: "",
          //       },
          //       {
          //         name: "上下场致意，答谢",
          //         score: 2,
          //         info: "",
          //       },
          //       {
          //         name: "着装不得体，不自然大方",
          //         score: -2,
          //         info: "",
          //       },
          //     ],
          //   },
        ],
      },
      rules: {
        name: [
          { required: true, message: "请输入评分标准名称", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "长度在 1 到 50 个字符",
            trigger: "blur",
          },
        ],
      },
      ruleId: "",
      isEdit: false,
      isUpload: false,
    };
  },
  created() {
    console.log(this.$route, this.$route.params);
    let ruleId = this.$route.params.id;
    console.log(ruleId, typeof ruleId);
    if (ruleId) {
      this.ruleId = ruleId;
      this.isEdit = true;
    }

    // 编辑
    if (this.isEdit) {
      this.ruleForm.name = this.$route.query.name;
      getRuleById({
        type: this.ruleId,
      }).then((res) => {
        console.log("edit", res);
        if (res.code === 1) {
          let rule = [];
          res.data.map((item) => {
            let itemInfo = {
              name: item.name,
              info: item.info,
              children: [],
            };
            if (item.children.length) {
              item.children.map((innerItem) => {
                let innerItemInfo = {};
                itemInfo.children.push({
                  name: innerItem.name,
                  score: innerItem.score,
                  info: innerItem.info,
                });
              });
            } else {
              itemInfo.children.push({
                name: "",
                score: "",
                info: "",
              });
            }

            rule.push(itemInfo);
          });
          Object.assign(this.ruleForm, {
            rule,
          });
        } else {
          this.$message({
            type: "error",
            message: "出错了，请刷新页面",
            duration: 3000,
          });
        }
      });
    }
  },
  computed: {
    ruleScoreItem() {
      let scores = [];
      this.ruleForm.rule.map((item) => {
        let score = 0;
        item.children.map((innerItem) => {
          if (innerItem.score >= 0) {
            score += +innerItem.score;
          }
        });
        scores.push(score);
      });
      return scores;
    },
  },
  methods: {
    add(parentIndex, childIndex) {
      //   console.log(parentIndex, childIndex);
      if (childIndex === undefined) {
        // 一级指标的增加
        this.ruleForm.rule.push({
          name: "",
          info: "",
          children: [
            {
              name: "",
              score: "",
              info: "",
            },
          ],
        });
      } else {
        // 二级指标的增加
        this.ruleForm.rule[parentIndex].children.push({
          name: "",
          score: "",
          info: "",
        });
      }
    },
    del(parentIndex, childIndex) {
      if (childIndex === undefined) {
        // 一级指标的删除
        this.ruleForm.rule.splice(parentIndex, 1);
      } else {
        // 二级指标的删除
        this.ruleForm.rule[parentIndex].children.splice(childIndex, 1);
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.isUpload = true;
          let params = {
            name: this.ruleForm.name,
            datas: this.ruleForm.rule,
          };
          console.log(params);
          let res = {}
          if(!this.isEdit){
              res = await addRule(params);
          }else{
              params.id = this.ruleId
              res = await addRule(params)
          }
          console.log(res);
          if (res.code === 1) {
            this.$message({
              type: "success",
              message: !this.isEdit?"已添加":"已修改",
              duration: 3000,
            });
            this.$router.push({
              path: "/competition/rules",
            });
          } else {
            this.$message({
              type: "error",
              message: res.message,
              duration: 3000,
            });
            this.isUpload = false;
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
.create_rule_wrap {
  .rule_name {
    width: 620px;
  }
  .rule_detail_container {
    .rule_item {
      display: flex;
      margin-bottom: 10px;
      .rule_item_0 {
        width: 120px;
      }
      .rule_item_1 {
        width: 400px;
        margin: 0 10px;
      }
      .rule_item_2 {
        width: 200px;
      }
      ul {
        li {
          display: flex;
          .rule_item_1 {
            width: 400px;
            margin-bottom: 10px;
          }
        }
      }
    }
  }
  .rule_control_wrap {
    display: flex;
    align-items: flex-start;
  }
}
</style>
<style lang="scss">
.rule_item_2 {
  .el-input {
    display: flex;
  }
}
.rule_item_0 {
  .el-textarea {
    display: flex;
  }
}
.rule_item_2 {
  display: flex;
  .el-input {
    width: 80px;
  }
  .rule_control_wrap {
    margin-left: 8px;
  }
}
</style>