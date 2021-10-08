<template>
  <div class="participant_wrap">
    <div class="page-header">
      <el-button size="medium" type="primary" @click="add"
        >新增管理员</el-button
      >
    </div>
    <div class="page-table">
      <div class="table_search_wrap">
        <div class="search_box_wrap">
          <div class="search_box">
            <div class="search_title">管理员类型</div>
            <el-select
              v-model="managerType"
              placeholder="请选择"
              @change="managerTypeChange"
              size="small"
            >
              <el-option
                v-for="item in managerTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <!-- <div class="search_box">
            <div class="search_title">年份</div>
            <el-date-picker
              v-model="term"
              type="year"
              placeholder="年份"
              value-format="yyyy"
              size="small"
              class="w100"
              @change="updateQuery"
            >
            </el-date-picker>
          </div>
          <div class="search_box">
            <div class="search_title">类型</div>
            <el-select
              v-model="type"
              placeholder="请选择"
              size="small"
              class="w120"
              @change="updateQuery"
            >
              <el-option
                v-for="item in competitionTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="search_box">
            <div class="search_title">规模</div>
            <el-select
              v-model="matchType"
              placeholder="请选择"
              size="small"
              class="w120"
              @change="updateQuery"
            >
              <el-option
                v-for="item in competitionScope"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="search_box">
            <div class="search_title">省份</div>
            <el-select
              v-model="proviceId"
              placeholder="请选择"
              filterable
              size="small"
              class="w100"
              @change="updateQuery"
            >
              <el-option
                v-for="item in provinceOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div> -->
        </div>
        <div class="search_input_wrap">
          <el-input placeholder="请输入姓名" v-model="name" size="small">
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="updateTableData"
            ></el-button>
          </el-input>
        </div>
      </div>
      <el-table
        border
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="account" label="账号"></el-table-column>
        <el-table-column
          prop="userTypeStr"
          label="管理员类型"
        ></el-table-column>
        <el-table-column prop="proviceName" label="所属地区"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="edit(scope.row)">编辑</el-button>

            <el-button size="mini" @click="resetPWD(scope.row)" type="warning"
              >重置密码</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="page-footer" v-show="tableData.length">
        <div class="block">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="total, sizes, prev, pager, next"
            :total="totalNum"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getAdminList, resetAdminPWD } from "@/api/account";
import { getOrgs } from "@/api/competition";
import dayjs from "dayjs";
export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      totalNum: 0,
      tableData: [],
      name: "",
      term: "",
      type: 1,
      managerType: "",
      managerTypes: [
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
      matchType: "",
      competitionScope: [
        {
          value: "",
          label: "全部",
        },
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
      proviceId: "",
      provinceOptions: [],
    };
  },
  async created() {
    this.updateTableData();
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
  },
  methods: {
    managerTypeChange() {
      this.updateTableData();
    },
    add() {
      this.$router.push({
        path: "/manager/create",
      });
    },
    updateQuery() {
      this.updateTableData();
    },
    dateToISO(dataTime) {
      return dayjs(dataTime).format("YYYY-MM-DD HH:mm:ss");
    },
    async updateTableData() {
      this.tableData = [];
      let params = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        // sort: "",
        columnFilters: {
          // term: this.term,
          "~name": this.name,
          // type: this.type,
          // matchType: this.matchType,
          // proviceId: this.proviceId,
          // collegeId: "",
          userType: this.managerType,
        },
      };

      let list = [];
      let res = await getAdminList(params);
      console.log(res);
      if (res.code === 1) {
        res.data.contents.map((competitionItem) => {
          let itemInfo = {
            ...competitionItem,
          };
          switch (itemInfo.type) {
            case 1:
              itemInfo.typeStr = "主观题答辩";
              break;
            case 2:
              itemInfo.typeStr = "优选视频";
              break;
          }
          // 1:学生 ，2:微课老师，1001:评审人员，9001:校级管理员，9002:省级管理员，9003:全国管理员，10001:超级管理员
          switch (itemInfo.userType) {
            case 10001:
              itemInfo.userTypeStr = "超级管理员";
              break;
            case 9003:
              itemInfo.userTypeStr = "全国管理员";
              break;
            case 9002:
              itemInfo.userTypeStr = "省级管理员";
              break;
            case 9001:
              itemInfo.userTypeStr = "校级管理员";
              break;
            case 1001:
              itemInfo.userTypeStr = "评审人员";
              break;
            case 2:
              itemInfo.userTypeStr = "微课老师";
              break;
            case 1:
              itemInfo.userTypeStr = "学生";
              break;
          }

          itemInfo.timePeriod = `${this.dateToISO(
            +itemInfo.startTime
          )}-${this.dateToISO(+itemInfo.endTime)}`;

          list.push(itemInfo);
        });
        this.tableData = list;
        this.totalNum = res.data.totalCount;
      }
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.updateTableData();
      // console.log(pageSize, 'handleSizeChange')
    },
    handleCurrentChange(currentPage) {
      this.pageNum = currentPage;
      this.updateTableData();
      // console.log(currentPage, 'handleCurrentChange')
    },
    edit(rowData) {
      sessionStorage.setItem("manageInfo", JSON.stringify(rowData));
      this.$router.push({
        path: `/manager/edit/${rowData.userId}`,
      });
      console.log(rowData);
    },
    async resetPWD(rowData){
      let data = {
        userId: rowData.userId
      }
      let res = await resetAdminPWD(data)
      console.log(res)
      if (res && res.code === 1) {
        this.$message({
          type: "success",
          message: "已重置",
          duration: 3000,
        });
      }
    },
    async del(rowData) {
      console.log(rowData);

      const formData = new FormData();
      formData.append("ids", rowData.id);
      let res = await delCompetition(formData);
      if (res && res.code === 1) {
        this.$message({
          type: "success",
          message: "已删除",
          duration: 3000,
        });
        this.updateTableData();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.participant_wrap {
}
</style>
