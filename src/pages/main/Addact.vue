<template>
  <div>
    <el-main>
      <div>
        <p id="title">添加账号</p>
        <el-divider></el-divider>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="pass">
            <el-input type="user" v-model="account" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="checkPass">
            <el-input type="password" v-model="password" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="用户组">
            <el-select v-model="userGroup" placeholder="请选择用户组" filterable>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item style="float: left;">
            <el-button type="primary" @click="clickBtn">添加</el-button>
            <el-button @click="clickReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </div>
</template>

<script>
import { addAccount } from "@/api/apis";
export default {
  data() {
    // var checkAge = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error("密码不能为空"));
    //   }
    //   setTimeout(() => {
    //     if (!Number.isInteger(value)) {
    //       callback(new Error("请输入密码"));
    //     } else {
    //       if (value < 18) {
    //         callback(new Error("必须年满18岁"));
    //       } else {
    //         callback();
    //       }
    //     }
    //   }, 1000);
    // };
    // var validatePass = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请输入密码"));
    //   } else {
    //     if (this.ruleForm.checkPass !== "") {
    //       this.$refs.ruleForm.validateField("checkPass");
    //     }
    //     callback();
    //   }
    // };

    return {
      // ruleForm: {
      account: "",
      password: "",
      userGroup: "",
      options: [
        {
          value: "普通管理员",
          lable: "普通管理员",
        },
        {
          value: "超级管理员",
          lable: "超级管理员",
        },
      ],
    };
    // rules: {
    //   pass: [{ validator: validatePass, trigger: "blur" }],

    //   age: [{ validator: checkAge, trigger: "blur" }],
    // },
    //   };
  },
  methods: {
    clickBtn() {
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     alert("submit!");
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });

      addAccount(this.account, this.password, this.userGroup).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: "用户添加成功!",
            type: "success",
          });
          (this.account = ""), (this.password = ""), (this.userGroup = "");
        } else {
          this.$message({
            message: "用户添加失败!",
          });
        }
      });
    },
    clickReset() {
      (this.account = ""), (this.password = ""), (this.userGroup = "");
    },
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // },
    // handleChange(val) {
    //   console.log(val);
    // },
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

.el-main[data-v-1a227333] {
  background-color: #fff;
}
</style>