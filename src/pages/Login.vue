<template>
  <div id="app">
    <div id="bpp">
      <span>系统登录</span>
      <p>
        <el-input prefix-icon="el-icon-s-custom" v-model="acc" clearable></el-input>
      </p>
      <p>
        <el-input prefix-icon="el-icon-lock" v-model="pwd" show-password></el-input>
      </p>

      <p class="error-p">{{ errormsg }}</p>
      <p>
        <el-button type="primary" style="width:100%" @click="clickLogin">登录</el-button>
      </p>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/apis";
export default {
  data() {
    return {
      id:'',
      acc: "", //账号
      pwd: "", //密码
      errormsg: "", //错误提示
    };
  },
  methods: {
    clickLogin() {
      //  console.log(this.acc,this.pwd)
      login(this.acc, this.pwd).then(res => {
        if (res.data.code == 0) {
          //写入token
          localStorage.token = res.data.token; //写入token
          localStorage.role = res.data.role; //写入用户组
          localStorage.acc = this.acc; //存入用户名
          localStorage.id=res.data.id;

          this.$router.push("/main/index"); //改变hash地址
          this.$message({
            message: "用户登录成功！",
            type: "success",
          });
        } else this.errormsg = res.data.msg;
      });

      // axios.get('http://127.0.0.1:5000/users/checkLogin'),{
      //   params:{参数}
      // })
    },
  },
};
</script>

<style lang="less" scoped>
#app {
  background: #304156;
  width: 100%;
  height: 100%;
}
#bpp {
  //   border: 1px solid #fff;
  width: 400px;
  height: 300px;
  position: fixed;
  left: 500px;
  top: 200px;
  text-align: center;
}
span {
  font-weight: bold;
  color: #fff;
}
p {
  margin-top: 40px;
}
</style>