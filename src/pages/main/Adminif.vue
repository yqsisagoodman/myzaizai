<template>
  <div>
    <el-main>
      <div>
        <p id="title">管理员信息</p>
        <el-divider></el-divider>
        <p id="title">管理员ID:{{info.id}}</p>
        <el-divider></el-divider>
        <p id="title">账号：{{info.account}}</p>
        <el-divider></el-divider>
        <p id="title">用户组：{{info.userGroup}}</p>
        <el-divider></el-divider>
        <p id="title">创建时间：{{info.ctime}}</p>
        <el-divider></el-divider>
        <div style="display:flex;justify-content:flex-start; align-items: center;">
          <span id="title">管理员头像:</span>
          <el-upload
            action="http://127.0.0.1:5000/users/avatar_upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :data="uploaddata"
            list-type="picture-card"
          >
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
    </el-main>
  </div>
</template>

<script>
import { getpsnol } from "@/api/apis";
// import { getChinatime } from "@/utils/utils.js";

export default {
  data() {
    return {
      uploaddata: {},
      info: [{ id: "", account: "", userGroup: "", ctime: "" }],
    };
  },
  
  created() {
    this.uploaddata = { id: localStorage.id };
    getpsnol(localStorage.id).then((res) => {
      //   console.log(localStorage.id);
      // console.log(res.data);
      this.info = res.data.accountInfo;
   });
  },
  methods: {
    handleAvatarSuccess(res) {
      if (res.code == 0) {
        //图片上传成功!
        this.$bus.$emit("imguploadfinish");
      }
    },
  },
};
</script>




<style lang="less" scoped>
.el-main {
  background-color: #e9eef3;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.el-main[data-v-549e248c] {
  background: #fff;
}
</style>