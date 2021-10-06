<template>
  <div class="rules_wrap">
    <div class="page-header">
      <el-button size="medium" type="primary" @click="add"
        >新建评分标准</el-button
      >
    </div>
    <div class="page-table">
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
export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      totalNum: 0,
      tableData: [],
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
    updateTableData() {
      this.tableData = [];
      let params = {
        pageSize: this.pageSize,
        pageNo: this.pageNum,
      };
      let list = [];
      for (let i = 0; i < this.pageSize; i++) {
        list.push({
          id: i,
          name: `calis学生答辩赛${i}`,
          createTime: "2021/9/30 18:00",
          creator: "xx",
          nums: parseInt(Math.random() * 10),
          totalScore: parseInt(Math.random() * 100),
        });
      }
      this.tableData = list;
      this.totalNum = 88;
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
      });
      console.log(rowData);
    },
    del(rowData) {
      console.log(rowData);
    },
  },
};
</script>
<style lang="scss" scoped>
.rules_wrap {
}
</style>
