import axios from 'axios'

//服务器IP
const IP ='http://127.0.0.1:5000'

//请求基本路径
axios.defaults.baseURL=IP

 //商品图片上传路径
 export const ITEMS_IMG_UPLOAD = IP + '/goods/goods_img_upload'
 //获取商品图片地址
 export const GET_ITEMS_IMG = IP + '/upload/imgs/goods_img/'


//店铺图片上传接口
export const SHOP_ITEMS_IMG= IP + '/shop/upload'

//获取店铺图片地址、
export const GET_SHOP_IMG= IP + '/upload/shop/'



//es6
export var login =(account,password)=>axios.post('/users/checkLogin',{account,password})

//---------------------账号管理--------------------------------------
export var useradd =(account,password,userGroup)=>axios.post('/users/add',{account,password,userGroup})
//添加账号
export var addAccount =(account,password,userGroup)=>axios.post('/users/add',{account,password,userGroup})

//头像上传接口
// export var avatar_upload=(id)=>axios.post('/users/avatar_upload',{id})




//获取账号列表
export var getList=(currentPage,pageSize)=>axios.get('/users/list',{params:{currentPage,pageSize}})


//删除账号
export var delAccount=(id)=>axios.get('/users/del',{params:{id}})

//批量删除账号
export var delAllact=(ids)=>axios.get('/users/batchdel',{params:{ids}})


//修改账号
export var changeAct=(id,account,userGroup)=>axios.post('/users/edit',{id,account,userGroup})


// ------------------------------------密码部分------------------------------
//检查密码正确性
export var checkpwd=(id,oldPwd)=>axios.get('/users/checkoldpwd',{params:{id,oldPwd}})

//修改密码
export var changepwd=(id,newPwd)=>axios.post('/users/editpwd',{id,newPwd})


//获取账号（个人中心）信息
export var getpsnol=(id)=>axios.get('/users/accountinfo',{params:{id}})

//验证token  token:用户令牌
export var checktoken = (token) => axios.get('/users/checktoken',{params:{token}})


// ---------------------------------------商品分类部分-------------------------

//添加商品分类
export var addcate=(cateName,state)=>axios.post('/goods/addcate',{cateName,state})

//获取分类列表
export var catelist=(currentPage,pageSize)=>axios.get('/goods/catelist',{params:{currentPage,pageSize}})

//删除分类
export var delcate= (id) => axios.get('/goods/delcate',{params:{id}})

//修改分类
export var editcate=(id,cateName,state)=>axios.post('/goods/editcate',{id,cateName,state})

//查询分类名称
export var categories=()=>axios.get('/goods/categories',{params:{}})

// ---------------------------------------商品部分----------------------------------

//商品图片上传接口
export var goods_img_upload=()=>axios.post('/goods/goods_img_upload',{})

//添加商品
export var addgoods=(name,category,price,imgUrl,goodsDesc)=>axios.post('/goods/add',{name,category,price,imgUrl,goodsDesc})

//获取商品列表
export var shoplist=(currentPage,pageSize)=>axios.get('/goods/list',{params:{currentPage,pageSize}})

//删除商品
export var goodsdel=(id)=>axios.get('/goods/del',{params:{id}})

//修改商品
export var rstgoods=(params)=>axios.post('/goods/edit',params)

// ---------------------------------------订单管理部分----------------------------------

//获取订单列表
export var orderlist=(params)=>axios.get('/order/list',{params})

//获取订单详情
export var goodsdetail=(id)=>axios.get('/order/detail',{params:{id}})

//修改订单
export var orderedit=(id,orderNo,orderTime,phone,consignee,deliverAddress,deliveryTime,remarks,orderAmount,orderState)=>axios.post('/order/edit',{id,orderNo,orderTime,phone,consignee,deliverAddress,deliveryTime,remarks,orderAmount,orderState})

// -----------------------------------------店铺管理模块------------------------------------------------
//获取店铺详情
export var shopinfo=()=>axios.get('/shop/info',{params:{}})



//店铺内容修改
export var shopedit=(id,name,bulletin,avatar, deliveryPrice,deliveryTime,description,score,
sellCount,supports,date,pics)=>axios.post('/shop/edit',{id,name,bulletin,avatar, deliveryPrice,deliveryTime,description,score,
    sellCount,supports,date,pics})
 





    
//首页报表接口
export var totaldata=()=>axios.get('/order/totaldata')

//订单统计
export var orderdata = (date) => axios.get('/order/ordertotal', {params: {date}})




