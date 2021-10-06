<template>
  <div class="rules_wrap">
    <div class="page-header">
      <el-button size="medium" type="primary" @click="add">新增竞赛</el-button>
    </div>
    <div class="page-table">
      <div class="table_search_wrap">
        <div class="search_box_wrap">
          <div class="search_box">
            <div class="search_title">年份</div>
            <el-date-picker
              v-model="term"
              type="year"
              placeholder="年份"
              value-format="yyyy"
              size="small"
              class="w100"
            >
            </el-date-picker>
          </div>
          <div class="search_box">
            <div class="search_title">类型</div>
            <el-select v-model="type" placeholder="请选择" size="small" class="w120">
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
            <el-select v-model="matchType" placeholder="请选择" size="small" class="w120">
              <el-option
                v-for="item in competitionScope"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="search_input_wrap">
          <el-input placeholder="请输入竞赛名称" v-model="name" size="small">
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
        <el-table-column prop="name" label="竞赛名称"></el-table-column>
        <el-table-column prop="typeStr" label="竞赛类型"></el-table-column>
        <el-table-column prop="matchTypeStr" label="竞赛规模"></el-table-column>
        <el-table-column prop="proviceName" label="竞赛地区"></el-table-column>
        <el-table-column prop="term" label="竞赛年份"></el-table-column>
        <el-table-column prop="timePeriod" label="竞赛时间"></el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
            <el-button size="mini" @click="del(scope.row)" type="danger"
              >删除</el-button
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
import { getCompetitionList, delCompetition } from "@/api/competition";
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
      type: "",
      competitionTypes: [
        {
          value: "",
          label: "全部",
        },
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
    };
  },
  created() {
    this.updateTableData();
  },
  methods: {
    dateToISO(dataTime) {
      return dayjs(dataTime).format("YYYY-MM-DD HH:mm:ss");
    },
    add() {
      this.$router.push({
        path: "/competition/create",
      });
    },
    async updateTableData() {
      this.tableData = [];
      let params = {
        pageSize: this.pageSize,
        pageNo: this.pageNum,
        sort: "",
        columnFilters: {
          term: this.term,
          "~name": this.name,
          type: this.type,
          matchType: this.matchType,
        },
      };
      let list = [];
      let res = await getCompetitionList(params);
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
          switch (itemInfo.matchType) {
            case 1:
              itemInfo.matchTypeStr = "国赛";
              break;
            case 2:
              itemInfo.matchTypeStr = "省赛";
              break;
            case 3:
              itemInfo.matchTypeStr = "校赛";
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
      sessionStorage.setItem("competitionInfo", JSON.stringify(rowData));
      this.$router.push({
        path: `/competition/edit/${rowData.id}`,
      });
      console.log(rowData);
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
.rules_wrap {
}
</style>
