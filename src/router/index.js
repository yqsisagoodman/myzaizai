// 引入核心库
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login'
import {checktoken} from '@/api/apis'
// import Main from "../pages/Main"

// 全局注册路由
Vue.use(VueRouter)


const router= new VueRouter({
    base:process.env.BASE_URL,
    routes:[
        {
        path:"/",
        name:'Login',
        component:Login
    },
    {
        path:"/main",
        name:'Main',
        //懒加载
       component :()=>import('../pages/Main'),
       children:[
           {
               path:'/main/Index',
               name:'/main/Index',
               component:()=>import('../pages/main/Index'),
               //自定义数据
               meta:{ breadlist:['首页']}
           },
           {
            path:'/main/Addact',
            name:'/main/Addact',
            component:()=>import('../pages/main/Addact'),
            meta:{ breadlist:['账号管理','添加账号']}

           },
           {
            path:'/main/Additem',
            name:'/main/Additem',
            component:()=>import('../pages/main/Additem'),
            meta:{ breadlist:['商品管理','添加商品']}

           },
           {
            path:'/main/Changpsd',
            name:'/main/Changpsd',
            component:()=>import('../pages/main/Changpsd'),
            meta:{ breadlist:['账号管理','修改密码']}

           },
           {
            path:'/main/Adminif',
            name:'/main/Adminif',
            component:()=>import('../pages/main/Adminif'),
            meta:{ breadlist:['管理员信息']}

           },
           {
            path:'/main/Stomgt',
            name:'/main/Stomgt',
            component:()=>import('../pages/main/Stomgt'), 
            meta:{ breadlist:['店铺管理']}

           },
           {
            path:'/main/Listgds',
            name:'/main/Listgds',
            component:()=>import('../pages/main/Listgds'),
            meta:{ breadlist:['商品管理','商品列表']}

           },
           {
            path:'/main/Cmdstc',
            name:'/main/Cmdstc',
            component:()=>import('../pages/main/Cmdstc'),
            meta:{ breadlist:['销售统计','商品统计']}

           },
           {
            path:'/main/Orderstc',
            name:'/main/Orderstc',
            component:()=>import('../pages/main/Orderstc'),
            meta:{ breadlist:['销售统计','订单统计']}

           },
           {
            path:'/main/Clsgds',
            name:'/main/Clsgds',
            component:()=>import('../pages/main/Clsgds'),
            meta:{ breadlist:['商品管理','商品分类']}

           },
           {
            path:'/main/Actlist',
            name:'/main/Actlist',
            component:()=>import('../pages/main/Actlist'),
            meta:{ breadlist:['账号管理','账号列表']}

           },
           {
            path:'/main/Thelist',
            name:'/main/Thelist',
            component:()=>import('../pages/main/Thelist'),
            meta:{ breadlist:['订单管理']}

           },
       ]
    }
]

    })



//在切换路由之前
router.beforeEach((to,from,next)=>{
    //to :要跳转到路由
    //from:来自于哪里
    if(to.path !='/'){
        checktoken(localStorage.token).then(res=>{
             if(res.data.code==0)
                    next()
        else
            next('/')
        
    })
        }else
            next()
        
      
    
    })

    //让路由继续跳转
    //next()
    //next:下一步



//在切换路由之后
// router.afterEach()
export default router

