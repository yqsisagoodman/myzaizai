<template>
  <el-container>
    <el-aside width="200px">
      <!-- 左侧树菜单 -->
      <el-menu
        :default-active="curhash"
        class="el-menu-vertical-demo"
        background-color="#304156"
        text-color="#fff"
        active-text-color="#409EFF"
        router
        unique-opened
      >
        <!-- 可展开菜单 -->

        <el-menu-item>
          <i class="el-icon-dish-1"></i>
          <span slot="title" style="font-size:18px">外卖商家中心</span>
        </el-menu-item>

        <div v-for="item in powerarr" :key="item.url">
          <el-menu-item v-if="!item.children" :index="item.url">
            <i :class="item.icon"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>

          <!-- 商品列表 添加商品 商品分类 -->

          <el-submenu v-else :index="item.url">
            <!-- 大标题 -->
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.name}}</span>
            </template>

            <el-menu-item
              v-for="child in item.children"
              :key="child.url"
              :index="child.url"
            >{{child.name}}</el-menu-item>
          </el-submenu>
        </div>
      </el-menu>
    </el-aside>
    <el-container>
      <!-- 头部 -->
      <el-header>
        <div>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="item in breadlist" :key="item">{{item}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div style="display: flex;
  justify-content: space-between;align-items: center;">
          <span style="color:#858689;">
            <a
              href="http://localhost:8080/#/main/Adminif"
              style=" text-decoration: none;color:tomato;"
            >欢迎你,{{ username }}</a>
          </span>
          <img style="width:50px;border-radius:50%" :src="headimg" />
        </div>
      </el-header>

      <!-- 二级路由 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { checktoken, getpsnol } from "@/api/apis";
export default {
  data() {
    return {
      username: "",
      list: [
        {
          url: "/main/Index",
          icon: "el-icon-message-solid",
          name: "后台首页",
          roles: ["super", "normal"],
        },
        {
          url: "/main/Thelist",
          icon: "el-icon-s-promotion",
          name: "订单管理",
          roles: ["super", "normal"],
        },
        {
          url: "/main/items",
          icon: "el-icon-location",
          name: "商品管理",
          children: [
            { url: "/main/Listgds", name: "商品列表" },
            { url: "/main/Additem", name: "添加商品" },
            { url: "/main/Clsgds", name: "商品分类" },
          ],
          roles: ["super", "normal"],
        },
        {
          url: "/main/Stomgt",
          icon: "el-icon-s-shop",
          name: "店铺管理",
          roles: ["super"],
        },
        {
          url: "/main/users",
          icon: "el-icon-user",
          name: "账号管理",
          children: [
            { url: "/main/Actlist", name: "账号列表" },
            { url: "/main/Addact", name: "添加账号" },
            { url: "/main/Changpsd", name: "修改密码" },
          ],
          roles: ["super"],
        },
        {
          url: "/main/total",
          icon: "el-icon-pie-chart",
          name: "销售统计",
          children: [
            { url: "/main/Cmdstc", name: "商品统计" },
            { url: "/main/Orderstc", name: "订单统计" },
          ],
          roles: ["super"],
        },
      ],
      //动态菜单
      curhash: "",
      headimg: "",
      breadlist: [],
    };
  },
  computed: {
    powerarr() {
      let newarr = this.list.filter((item) => {
        return item.roles.includes(localStorage.role);
      });
      return newarr;

      //es6
      //  return this.list.filter(item=>item.roles.includes(localStorage,role))
    },
  },
  created() {
    //js语法
    //console.log(window.location.hash)
    //vue语法
    // console.log(this.$router); 表示整个最大的路由对象
    this.curhash = this.$route.path;
    //当前HASH值的路由对象

    //发送请求验证token是否失效
    //'super'  //超级用户：显示 六大板块
    //'normal'  //普通用户：显示 前三个普通板块
    checktoken(localStorage.token).then((res) => {
      if (res.data.code == 0) {
        //有效
        this.username = localStorage.acc;
      } else {
        //无效
        this.username = "请登录";
      }
    });
    this.refreshinfo();
    //监听bus传递事件
    this.$bus.$on("imguploadfinish", () => {
      this.refreshinfo(); //头像刷新
    });
    //初始化给二级导航赋值(刷新页面)
    this.breadlist = this.$route.meta.breadlist;
  },
  methods: {
    refreshinfo() {
      getpsnol(localStorage.id).then((res) => {
        this.headimg = res.data.accountInfo.imgUrl;
      });
    },
  },

  //观察hash的变化
  watch: {
    $route(to) {
      //  console.log(to,path);
      this.breadlist = to.meta.breadlist;
    },
  },
};
</script>

<style lang="less" scoped>
@base: #304156;
@graybase: #f0f2f5;

.el-container {
  height: 100%;
}

.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
}

.el-aside {
  background-color: #304156;
}

.el-main {
  background-color: @graybase;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.el-menu {
  border: 0;
}
</style>