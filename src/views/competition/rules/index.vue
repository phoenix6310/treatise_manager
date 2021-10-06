<template>
  <div class="rules_wrap">
    <div class="page-header">
      <el-button size="medium" type="primary" @click="add"
        >新增评分标准</el-button
      >
    </div>
    <div class="page-table">
      <div class="table_search_wrap">
        <div class="search_box_wrap"></div>
        <div class="search_input_wrap">
          <el-input placeholder="请输入评分标准名称" v-model="name" size="small">
            <el-button slot="append" icon="el-icon-search" @click="updateTableData"></el-button>
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
        <el-table-column prop="name" label="评分标准名称"></el-table-column>
        <el-table-column prop="creator" label="创建人"></el-table-column>
        <el-table-column prop="nums" label="指标说明(个)"></el-table-column>
        <el-table-column prop="totalScore" label="总分（分）"></el-table-column>
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
import { getRuleList, delRuleById } from "@/api/competition.js";
export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      totalNum: 0,
      tableData: [],
      name: "",
    };
  },
  created() {
    this.updateTableData();
  },
  methods: {
    add() {
      this.$router.push({
        path: "/competition/createRule",
      });
    },
    async updateTableData() {
      this.tableData = [];
      this.totalNum = 0;
      let params = {
        pageSize: this.pageSize,
        pageNo: this.pageNum,
        columnFilters: {
          "~name": this.name,
        },
      };
      let list = [];
      //   for (let i = 0; i < this.pageSize; i++) {
      //     list.push({
      //       id: i,
      //       name: `calis学生答辩赛${i}`,
      //       createTime: "2021/9/30 18:00",
      //       creator: "xx",
      //       nums: parseInt(Math.random() * 10),
      //       totalScore: parseInt(Math.random() * 100),
      //     });
      //   }
      let res = await getRuleList(params);
      console.log(res);
      if (res.code === 1) {
        let {
          data: { contents },
        } = res;
        contents.map((item) => {
          list.push({
            id: item.id,
            name: item.name,
            totalScore: item.score,
            creator: item.createBy,
            nums: item.indSize,
          });
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
      this.$router.push({
        path: `/competition/editRule/${rowData.id}`,
        query: {
          name: rowData.name,
        },
      });
      console.log(rowData);
    },
    async del(rowData) {
      console.log(rowData);
      const formData = new FormData();
      formData.append("ids", rowData.id);
      let res = await delRuleById(formData);
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
