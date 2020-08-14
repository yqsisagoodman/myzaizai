<template>
  <div>
    <el-main>
      
        <p id="title">商品列表</p>
        <el-divider></el-divider>
        <el-table :data="tableData" v-loading="isloading" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="商品 ID">
                  <span>{{ props.row.id }}</span>
                </el-form-item>

                <el-form-item label="商品名称">
                  <span>{{ props.row.name }}</span>
                </el-form-item>

                <el-form-item label="商品分类">
                  <span>{{ props.row.category }}</span>
                </el-form-item>

                <el-form-item label="商品价格">
                  <span>{{ props.row.price }}</span>
                </el-form-item>

                <el-form-item label="商品图片">
                  <span>{{ props.row.imgUrl }}</span>
                </el-form-item>

                <el-form-item label="创建时间">
                  <span>{{ props.row.ctime }}</span>
                </el-form-item>

                <el-form-item label="商品评价">
                  <span>{{ props.row.rating }}</span>
                </el-form-item>

                <el-form-item label="商品销量">
                  <span>{{ props.row.sellCount }}</span>
                </el-form-item>

                <el-form-item label="商品描述">
                  <span>{{ props.row.goodsDesc }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>

          <el-table-column prop="name" label="商品名称" width="180"></el-table-column>

          <el-table-column prop="category" label="所属分类" width="180"></el-table-column>

          <el-table-column prop="price" label="商品价格"></el-table-column>

          <el-table-column label="商品图片">
            <template slot-scope="scope">
              <img style="width:80px;height:80px" :src="GET_ITEMS_IMG + scope.row.imgUrl" />
            </template>
          </el-table-column>

          <el-table-column prop="goodsDesc" label="商品描述"></el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="clickrst(scope.row)">编辑</el-button>
              <el-button type="danger" size="mini" @click="clickdel(scope.$index,scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
    

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pagesizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>

      <!-- 编辑商品 -->
      <el-dialog title="编辑商品数据" :visible.sync="showdialog" width="30%">

        <!-- 商品名称  -->
        <el-row>
          <el-col :span="12">
            商品名称
            <el-input v-model="editobj.name" placeholder="商品名称"></el-input>
          </el-col>
        </el-row>
        
        <!-- 商品分类 -->
        <el-row>
          <el-col :span="8">
            商品分类
            <el-select v-model="editobj.category" placeholder="请选择商品分类">
              <el-option
                v-for="item in categorieslist"
                :key="item.cateName"
                :label="item.cateName"
                :value="item.cateName"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <!-- 商品价格 -->
        <el-row>
          <el-col>
            <p>商品价格</p>
            <el-input-number v-model="editobj.price" :min="0" label="描述文字"></el-input-number>
          </el-col>
        </el-row>
        <!-- 商品图片 -->
        <el-row>
          <el-col>
            商品图片
            <div class="inner">
              <el-upload
                :action="ITEMS_IMG_UPLOAD"
                :on-success="uploadfinish"
                :show-file-list="false"
              >
                <i v-show="!editobj.imgUrl" class="el-icon-plus"></i>
                <img
                  style="width: 100px"
                  v-show="editobj.imgUrl"
                  :src="GET_ITEMS_IMG  + editobj.imgUrl"
                />
              </el-upload>
            </div>
          </el-col>
        </el-row>

        <!-- 商品描述 -->
        <el-row>
          <p>商品描述</p>
          <el-col :span="12">
            <el-input type="textarea" :rows="2" placeholder="商品描述" v-model="editobj.goodsDesc"></el-input>
          </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showdialog = false">取 消</el-button>
          <el-button type="primary" @click="clickChangeItems">确 定</el-button>
        </span>
      </el-dialog>
    </el-main>
  </div>
</template>

<script>
import {
  shoplist,
  goodsdel,
  //获取分类列表
  categories,
  rstgoods, //编辑商品
  GET_ITEMS_IMG,
  ITEMS_IMG_UPLOAD,
} from "@/api/apis";

export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      pagesizes: [5, 10, 15, 20],
      total: 0,
      ids: [],

      GET_ITEMS_IMG: "", //图片IP地址
      ITEMS_IMG_UPLOAD: "", //图片上传地址
      isloading: false, //是否显示加载动画
      showdialog: false,
      //回填数据
      editobj: {}, //当前编辑数据
      categorieslist: [], //类别列表
    };
  },

  methods: {
    //删除商品
    clickdel(index, row) {
      goodsdel(row.id).then((res) => {
        if (res.data.code == 0) {
          this.tableData.splice(this.tableData[index], 1);
        }
      });
    },

    //图片上传回调
    uploadfinish(res) {
      if (res.code == 0) {
        this.editobj.imgUrl = res.imgUrl;
      }
    },

    //修改商品
    clickrst(row) {
      //分类列表
      categories().then(res => {
        this.categorieslist = res.data.categories;
      });
      this.editobj = { ...row };
      this.showdialog = true;
    },
    //发送修改数据请求（确定按钮）
    clickChangeItems() {
      delete this.editobj.rating;
      delete this.editobj.ratings;
      delete this.editobj.sellCount;

      rstgoods(this.editobj).then(res => {
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: "商品数据修改成功！",
          });
          //刷新数据
          this.refreshTable();
          //关闭模态框
          this.showdialog = false;
        }
      });
    },

    //分页器按钮
    handleSizeChange(newpagesize) {
      this.pageSize = newpagesize;
      this.refreshTable();
    },
    handleCurrentChange(newpage) {
      this.currentPage = newpage;
      this.refreshTable();
    },
    //刷新表格数据
    refreshTable() {
      this.isloading = true;
      shoplist(this.currentPage, this.pageSize).then((res) => {
        this.tableData = res.data.data;
        this.total = res.data.total;
        this.isloading = false;
      });
    },
  },
  created() {
    this.GET_ITEMS_IMG = GET_ITEMS_IMG;
    this.ITEMS_IMG_UPLOAD = ITEMS_IMG_UPLOAD;

    this.refreshTable(); //初始化
  },
};
</script>

<style lang="less" scoped>
.el-main {
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>