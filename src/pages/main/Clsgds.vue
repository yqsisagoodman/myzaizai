<template>
  <div>
    <el-main>
      <div>
        <span id="title">商品分类</span>
        <div style="display:flex;">
          <span style="margin-left:1000px;margin-top:-21px;width:50px">
            <el-button type="primary" @click="dialogFormVisible = true">添加分类</el-button>

            <!-- 添加分类弹出框页面 -->
            <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
              <!-- 表单 -->
              <el-form :model="addform">
                <el-form-item label="分类名称" :label-width="formLabelWidth">
                  <el-input autocomplete="off" v-model="addform.cateName"></el-input>
                </el-form-item>
                <p style="margin-left:60px">
                  是否启用
                  <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                </p>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="surebtn">确 定</el-button>
              </div>
            </el-dialog>
          </span>
        </div>

        <el-divider></el-divider>
      </div>
      <!-- 分类表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="序号" width="180"></el-table-column>

        <el-table-column label="分类名称" width="180">
          <template slot-scope="scope">
            <span v-show="!scope.row.isedit">{{scope.row.cateName}}</span>

            <el-input v-show="scope.row.isedit" v-model="scope.row.cateName"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="是否启用">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :disabled="!scope.row.isedit"
            ></el-switch>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="clickwrit(scope)">{{scope.row.isedit ? '完成':'编辑'}}</el-button>

            <el-button type="danger" @click="clickdel(scope.$index,scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="block">
        <span class="demonstration"></span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pagesizes"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="14"
        ></el-pagination>
      </div>
    </el-main>
  </div>
</template>

<script>
import { addcate, catelist, delcate, editcate } from "@/api/apis";
export default {
  data() {
    return {
      //添加分类
      addform: {
        cateName: "",
      },
      dialogFormVisible: false,
      // value: true,
      form: {
        name: "",
      },
      formLabelWidth: "120px",

      //获取分类列表
      tableData: [],
      currentPage: 1,
      pageSize: 6,
      pagesizes: [5, 10, 15, 20], //可以切换的每页显示条数
      total: 0,
      ids: [],
    };
  },

  created() {
  this.refreshTable()
  },

  methods: {
    clickwrit(scope) {
      // console.log(scope.row.id,scope.row.cateName);
      if (scope.row.isedit) {
        //改变数据
        editcate(scope.row.id, scope.row.cateName, scope.row.state).then(
          (res) => {
            // console.log(res);
            if (res.data.code == 0) {
              this.$message({
                message: "商品类别修改成功!",
                type: "success",
              });
              scope.row.isedit = false;
            }
          }
        );
      } else {
        //点击编辑按钮
        scope.row.isedit = true;
      }
    },

    handleSizeChange() {},
    handleCurrentChange(newpage) {
      this.currentPage=newpage
      this.refreshTable()
    },

    refreshTable(){

   
  //获取分类列表
    catelist(this.currentPage, this.pageSize).then((res) => {
      let arr = res.data.data;
      // console.log(res);
      for (let obj of arr) {
        obj.state=obj.state == 1;
        obj.isedit = false;
      }

      //本页数据
      this.tableData = arr;
      //总商品条数
      this.total = res.data.total;
    });
 },









    //添加分类
    surebtn() {
      this.dialogFormVisible = false;

      addcate(this.addform.cateName, this.value).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: "商品类别添加成功!",
            type: "success",
          });
        } else {
          this.$message({
            message: "商品类别添加失败!",
          });
        }
      });
    },
    //删除分类
    clickdel(index, row) {
      delcate(row.id).then((res) => {
        if (res.data.code === 0) {
          this.tableData.splice(this.tableData[index], 1);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.el-main {
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.el-input {
  width: 80%;
}
</style>