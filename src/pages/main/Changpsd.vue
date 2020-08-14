<template>
  <div>
    <el-main>
      <div>
        <p id="title">修改密码</p>
        <el-divider></el-divider>
        <el-form status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="oldpwd" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="新密码" prop="checkPass">
            <el-input type="password" v-model="newpwd" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="确认密码" prop="age">
            <el-input v-model.number="surepwd"></el-input>
          </el-form-item>

          <el-form-item style="float: left;">
            <el-button type="primary" @click="clickAbtn">确定</el-button>
            <el-button @click="clickBtn">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </div>
</template>

<script>
import { checkpwd, changepwd } from "@/api/apis";
export default {
  data() {
    return {
      oldpwd: "",
      newpwd: "",
      surepwd: "",
    };
  },
  methods: {
    clickAbtn() {
      checkpwd(this.oldpwd, Number(localStorage.id)).then((res) => {
        if (!res.data.code == 0) {
          //弹出提示信息
          this.$message.error("旧密码不正确");
          return;
        } else {
          changepwd(this.newpwd, Number(localStorage.id)).then((res) => {
            if (res.data.code == 0) {
              this.$message({
                message: res.data.msg,
                type: "success",
              });
            }
          });
        }
      });
    },
    clickBtn() {
     
      this.oldpwd= "",
     this.newpwd= "",
      this.surepwd=""
    
    
    }
  },
};
</script>

<style lang="less" scoped>
.el-main {
  background-color: #e9eef3;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.el-input {
  width: 20%;
}
.el-main[data-v-6972622e] {
  background: #fff;
}
</style>