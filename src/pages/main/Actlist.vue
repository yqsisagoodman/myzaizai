<template>
  <div>
    <el-main>
      <div>
        <p id="title">账号列表</p>
        <el-divider></el-divider>
        <el-table :data="userlist" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>

          <el-table-column prop="account" label="账号" width="180"></el-table-column>

          <el-table-column prop="userGroup" label="用户组" width="180"></el-table-column>

          <el-table-column prop="ctime" label="创建时间"></el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="clickRst(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="clickDlet(scope.$index,scope.row)">删除</el-button>
              <!-- scope.$index指拿到每一行的index
              scope.row指拿到每一行的数据-->
            </template>
          </el-table-column>
        </el-table>

        <!-- 编辑页面 -->
        <el-dialog width="460px" title="编辑账号" :visible.sync="dialogFormVisible">
          <!-- 表单 -->
          <el-form style="width: 337px;" :model="editForm">
            <!-- 账号 -->
            <el-form-item label="账号" label-width="120px">
              <el-input v-model="editForm.account" autocomplete="off"></el-input>
            </el-form-item>

            <!-- 用户组 -->
            <el-form-item item label="用户组" label-width="120px">
              <el-select v-model="editForm.userGroup" placeholder="请选择用户组">
                <el-option label="超级管理员" value="超级管理员"></el-option>
                <el-option label="普通管理员" value="普通管理员"></el-option>
              </el-select>
            </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveEdit">确 定</el-button>
          </div>
        </el-dialog>

        <!-- 分页器 -->
        <el-pagination
          :page-sizes="[5, 10, 15]"
          :page-size="pageSize"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
      <div style="margin-top:20px">
        <el-button type="danger" @click="clickAll">批量删除</el-button>
        <el-button type="primary">取消选择</el-button>
      </div>
    </el-main>
  </div>
</template>

<script>
import { getList, delAccount, delAllact, changeAct } from "@/api/apis";

import { getChinatime } from "@/utils/utils.js";

export default {
  data() {
    return {
      userlist: [],
      currentPage: 1,
      pageSize: 4,
      total: 20,

      //编辑框数据
      editForm: {
        id: "",
        account: "",
        userGroup: "",
      },
      dialogFormVisible: false, //编辑框的隐藏和显示状态
    };
  },

  //获取账号列表
  created() {
    this.getuserlist();
  },
  methods: {
    //编辑
    clickRst(row) {
      this.dialogFormVisible = true;
      // alert(88888)
      this.editForm = { ...row }; //赋值给编辑表单  回填数据
      //显示模态框
    },
    saveEdit() {
      this.dialogFormVisible = false;
      changeAct(
        this.editForm.id,
        this.editForm.account,
        this.editForm.userGroup
      ).then((res) => {
        if (res.data.code === 0) {
          getList(this.currentPage, this.pageSize).then((res) => {
            this.userlist = res.data.data;
            this.total = res.data.total;
          });
        }
      });
    },

    
    //单列删除
    clickDlet(index, row) {
      delAccount(row.id).then((res) => {
        if (res.data.code === 0) {
          this.userlist.splice(this.userlist[index], 1);
        }
      });
    },
    handleSelectionChange(rows) {
      // console.log(rows);

      this.ids = rows.map((row) => row.id);
      //map遍历row
      // console.log(this.ids);
    },
    //批量删除
    clickAll() {
      delAllact(JSON.stringify(this.ids)).then((res) => {
        if (res.data.code === 0) {
          getList(this.currentPage, this.pageSize).then((res) => {
            this.userlist = res.data.data;
            this.total = res.data.total;
          });
        }
      });
    },

    //分页器按钮
    handleSizeChange(newpagesize) {
      // console.log(`每页 ${val} 条`);
      //改变当前页数
      this.pageSize = newpagesize;
      //请求当前页数
      this.getuserlist();
    },
    //点击页数
    handleCurrentChange(newpage) {
      //改变当前页数数据
      this.currentPage = newpage;
      //请求当前页数新数据
      this.getuserlist();
    },
    //获取用户列表
    getuserlist() {
      getList(this.currentPage, this.pageSize).then((res) => {
        let arr = res.data.data;
        for (let obj of arr) {
          obj.ctime = getChinatime(obj.ctime);
          obj.isedit = false; //是否在编辑状态
        }
        //本页数据
        this.userlist = arr;

        //总商品条数
        this.total = res.data.total;
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
</style>