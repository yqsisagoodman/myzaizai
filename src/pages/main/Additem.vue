<template>
  <div>
    <el-main>
      <div>
        <p id="title">商品添加</p>
        <el-divider></el-divider>
        <p>
          商品名称
          <el-input v-model="name" placeholder="商品名称"></el-input>
        </p>
        <br />
        <p>
          商品分类
          <el-select v-model="category" placeholder="请选择商品分类">
            <el-option v-for="item in options" :key="item.id" :value="item.cateName"></el-option>
          </el-select>
        </p>
        <br />
        <p>
          商品价格
          <el-input-number v-model="price" :precision="2" :step="0.1" :max="9999"></el-input-number>
        </p>
        <br />

        <div style="display:flex;justify-content:flex-start">
          <span style="margin-right:5px;">商品图片</span>
          <el-upload
            :action="ITEMS_IMG_UPLOAD"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :data="uploaddata"
            list-type="picture-card"
          >
            <i class="el-icon-plus avatar-uploader-icon" v-show="imgUrl == ''"></i>
            <img :src="GET_ITEMS_IMG + imgUrl" style="width: 100%" v-show="imgUrl != ''"/>
          </el-upload>
        </div>
        <br />

        <div style="display:flex;">
          商品描述
          <el-input
            style="width:30%;margin-left:5px;"
            type="textarea"
            :rows="2"
            v-model="goodsDesc"
          ></el-input>
        </div>
        <br />
        <p>
          <el-button type="primary" @click="clickadd">添加商品</el-button>
        </p>
      </div>
    </el-main>
  </div>
</template>

<script>
import { categories, addgoods, ITEMS_IMG_UPLOAD,
  GET_ITEMS_IMG } from "@/api/apis";
export default {
  data() {
    return {
      name: "",
      category: "",
      price: 0,
      imgUrl: "",
      goodsDesc: "",
      options: [],
      ITEMS_IMG_UPLOAD:'',
      GET_ITEMS_IMG:'',
      uploaddata: {},
    };
  },
  created() {
      this.ITEMS_IMG_UPLOAD = ITEMS_IMG_UPLOAD;
    this.GET_ITEMS_IMG = GET_ITEMS_IMG;

    this.uploaddata = { id: localStorage.id };

    categories().then((res) => {
      console.log(res);
      this.options = res.data.categories;
    });

 
  },
  methods: {
    handleAvatarSuccess(res) {
      if (res.code == 0) {
        //图片上传成功!
       this.imgUrl=res.imgUrl;
      }
    },
    clickadd() {
      addgoods(
        this.name,
        this.category,
        this.price,
        this.imgUrl,
        this.goodsDesc
      ).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: "商品添加成功!",
            type: "success",
          });
        } else {
          this.$message({
            message: "用户添加失败!",
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.el-main {
  background-color: #e9eef3;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.el-main[data-v-5384a77c] {
  background-color: #fff;
}
.el-input {
  width: 20%;
}
.el-button {
  margin-left: 65px;
}
</style>