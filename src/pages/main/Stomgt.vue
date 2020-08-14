<template>
  <div>
    <el-main>
      <div>
        <span id="title">店铺管理</span>
        <div style="display:flex;">
          <span style="margin-left:1100px;margin-top:-21px">
            <el-button type="primary" @click="clickrst">保存</el-button>
          </span>
        </div>
        <el-divider></el-divider>
        <p>
          店铺名称
          <el-input v-model="name" placeholder="粥品香坊(天府新谷)"></el-input>
        </p>
        <br />
        <div style="display:flex;">
          店铺公告
          <el-input style="width:30%;margin-left:5px;" type="textarea" :rows="2" v-model="bulletin"></el-input>
        </div>
        <br />

        <div style="display:flex;justify-content:flex-start">
          <span style="margin-right:5px;">店铺头像</span>
          <el-upload
            :action="SHOP_ITEMS_IMG"
            :on-success="handleAvatarSuccess"
            :show-file-list="false"
          >
           
            <img style="width: 180px" :src="avatar==''?'': GET_SHOP_IMG  + avatar" />
          </el-upload>
        </div>
        <br />

        <div style="display:flex;justify-content:flex-start">
          <span style="margin-right:5px;">店铺图片</span>
          <el-upload
            :action="SHOP_ITEMS_IMG"
            list-type="picture-card"
            :on-success="shopimgsUploadSuccess"
            :on-remove="removeImg"
            :file-list="shopimgs"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </div>
        <br />
        <p>
          配送费
          <el-input v-model="deliveryPrice" placeholder="4"></el-input>
        </p>
        <br />
        <p>
          配送时间
          <el-input v-model="deliveryTime" placeholder="38"></el-input>
        </p>
        <br />
        <p>
          配送描述
          <el-input v-model="description" placeholder="蜂鸟专送"></el-input>
        </p>
        <br />
        <p>
          店铺评分
          <el-input v-model="score" placeholder="4.5"></el-input>
        </p>
        <br />
        <p>
          销量
          <el-input v-model="sellCount" placeholder="100"></el-input>
        </p>
        <br />
        <div style="display:flex;justify-content:flex-start;">
          <span style="margin-right:10px;">活动</span>

          <el-checkbox-group v-model="supports">
            <p>
              <el-checkbox label="在线支付满28减"></el-checkbox>
              <el-checkbox label="VC无线橙果汁全场8折"></el-checkbox>
            </p>
            <br />

            <p>
              <el-checkbox label="单人精彩套餐"></el-checkbox>
              <el-checkbox label="特价饮品8折抢购"></el-checkbox>
            </p>
            <br />
            <el-checkbox label="单人特色套餐"></el-checkbox>
          </el-checkbox-group>
        </div>
        <div style="display:flex;justify-content:flex-start;margin-top:20px;">
          <span style="margin-right:9px;">营业时间</span>
          <el-time-picker
            is-range
            v-model="date"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
          ></el-time-picker>
        </div>
      </div>
    </el-main>
  </div>
</template>

<script>
import { shopinfo, GET_SHOP_IMG, SHOP_ITEMS_IMG, shopedit } from "@/api/apis";
import { getChinatime } from "@/utils/utils";
export default {
  data() {
    return {
      dialogImageUrl: "",

      shopimgs: [], //回填店铺图片数组
      GET_SHOP_IMG: "", //图片IP地址
      SHOP_ITEMS_IMG: "", //图片上传地址

      avatar: "", //店铺头像
      bulletin: "", //公告
      date: [], //营业时间
      deliveryPrice: 0, //配送费
      deliveryTime: 0, //送达时间
      description: "", //描述
      id: 0,
      minPrice: 0, //起送费
      name: "",
      pics: [], //店铺图片
      score: 0, //评分
      sellCount: 0, //销量
      supports: [], //活动
    };
  },


  methods: {
    handleRemove(file,fileList){
      console.log(file,fileList);
    },
      handlePictureCardPreview(file) {
        this.dialogImageUrl=file.url;
        this.dialogVisible=true;
      },
      //头像上传
 handleAvatarSuccess(res) {
      if (res.code == 0) {
        this.avatar = res.imgUrl;
        this.$message({
          type: "success",
          message: "店铺头像上传成功"
        });      
      }
    },
 //店铺图片上传
    shopimgsUploadSuccess(res) {
      if(res.code==0){
        //显示上传的图片
        this.pics.push(res.imgUrl);
        // console.log(this.pics);
      }
    },
   //删除店铺图片
   removeImg(res){
    //  console.log(res.name);
    this.pics.splice(this.pics.indexOf(res.name),1);

   },

   //保存修改
    clickrst() {
 var params = {
        id: this.id,
        name: this.name,
        bulletin: this.bulletin,
        avatar: this.avatar,
        deliveryPrice: this.deliveryPrice,
        deliveryTime: this.deliveryTime,
        description: this.description,
        score: this.score,
        sellCount: this.sellCount,
        //转换其中的字符串数组
        date:JSON.stringify([getChinatime(this.data[0]),
        getChinatime(this.data[1])
        ]),
        supports:JSON.stringify(this.supports),
        pics:JSON.stringify(this.pics)
 };
       shopedit(params).then(res=>{
         if(res.data.code==0){
           this.$message({
              type: "success",
            message: "店铺信息修改成功！"
           });
         }
       }) 
    },  
  },


  created() {
    shopinfo().then(res => {
     for(let key in res.data.data){
       this[key]=res.data.data[key];
     }
   
    this.GET_SHOP_IMG = GET_SHOP_IMG;
    this.SHOP_ITEMS_IMG = SHOP_ITEMS_IMG;
   //回填照片、
   this.shopimgs=this.pics.map(imgstr=>{
     return{
       name:imgstr,
       url:GET_SHOP_IMG+imgstr
     }
   })
    });
  },
};
</script>


<style lang="less" scoped>
.el-main {
  background-color: #e9eef3;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.el-main[data-v-f84322e4] {
  background-color: #fff;
}
.el-input {
  width: 20%;
}
.el-checkbox {
  margin: 5px 10px 10px 5px;
}
</style>