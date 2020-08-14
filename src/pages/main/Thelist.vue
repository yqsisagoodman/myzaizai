<template>
  <div>
    <el-main>
      <div>
        订单号
        <el-input v-model="orderNo" placeholder="订单号"></el-input>收货人
        <el-input v-model="consignee" placeholder="收货人"></el-input>手机号
        <el-input v-model="phone" placeholder="手机号"></el-input>订单状态
        <el-select v-model="orderState" placeholder="订单状态">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <br />

        <div class="block" style="margin-top:20px">
          <span class="demonstration" style="margin-right:10px">选择时间</span>
          <el-date-picker
            v-model="date"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
          <el-button type="primary" style="margin-left:10px" @click="clickSearch">查询</el-button>
        </div>

        <el-divider></el-divider>

        <el-table :data="tableData" border style="width: 100%">
          <el-table-column fixed prop="orderNo" label="订单号" width="150"></el-table-column>
          <el-table-column prop="deliveryTime" label="下单时间" width="120"></el-table-column>
          <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
          <el-table-column prop="consignee" label="收货人" width="120"></el-table-column>
          <el-table-column prop="deliverAddress" label="配送地址" width="300"></el-table-column>
          <el-table-column prop="orderTime" label="送达时间" width="120"></el-table-column>
          <el-table-column prop="remarks" label="用户备注" width="120"></el-table-column>
          <el-table-column prop="orderAmount" label="订单金额" width="120"></el-table-column>
          <el-table-column prop="orderState" label="订单状态" width="120"></el-table-column>

          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row), dialogVisible = true"
                type="text"
                size="small"
              >查看</el-button>
              <el-button type="text" size="small" @click="clickrst(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 查看时的弹框 -->
        <el-dialog title="订单详情" :visible.sync="dialogVisible" width="30%">
          <div>
            <p id="title">订单id:{{this.prop.id}}</p>
            <el-divider></el-divider>
            <p id="title">订单号：{{this.prop.orderNo}}</p>
            <el-divider></el-divider>
            <p id="title">下单时间：{{this.prop.orderTime}}</p>
            <el-divider></el-divider>
            <p id="title">联系电话：{{this.prop.phone}}</p>
            <el-divider></el-divider>
            <p id="title">收货人：{{this.prop.consignee}}</p>
            <el-divider></el-divider>
            <p id="title">送货地址：{{this.prop.deliverAddress}}</p>
            <el-divider></el-divider>
            <p id="title">送达时间：{{this.prop.deliveryTime}}</p>
            <el-divider></el-divider>
            <p id="title">备注：{{this.prop.remarks}}</p>
            <el-divider></el-divider>
            <p id="title">订单金额：{{this.prop.orderAmount}}</p>
            <el-divider></el-divider>
            <p id="title">订单状态：{{this.prop.orderState}}</p>
            <el-divider></el-divider>
          </div>

          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>

        <!-- 分页器 -->
        <div class="block" style="margin-top:20px">
          <span class="demonstration"></span>
          <el-pagination
            :page-size="pageSize"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            layout="total, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>

        <!-- 修改订单 -->
        <el-dialog title="修改订单" :visible.sync="showdialog" width="30%">
          <!-- 订单ID  -->
          <el-row>
            <el-col :span="12">
              订单号：
              <el-input style="width:200px" v-model="editobj.id" disabled></el-input>
            </el-col>
          </el-row>

          <!-- 订单号  -->
          <el-row>
            <el-col :span="12">
              订单号：
              <el-input style="width:200px" v-model="editobj.orderNo" placeholder="订单号"></el-input>
            </el-col>
          </el-row>

          <!-- 下单时间  -->
          <el-row>
            <el-col :span="12">
              下单时间：
              <el-input style="width:200px" v-model="editobj.orderTime" placeholder="下单时间"></el-input>
            </el-col>
          </el-row>

          <!-- 电话 -->
          <el-row>
            <el-col :span="12">
              电话：
              <el-input style="width:200px" v-model="editobj.phone" placeholder="电话"></el-input>
            </el-col>
          </el-row>

          <!-- 收货人 -->
          <el-row>
            <el-col :span="12">
              收货人：
              <el-input style="width:200px" v-model="editobj.consignee" placeholder="收货人"></el-input>
            </el-col>
          </el-row>

          <!-- 送货地址  -->
          <el-row>
            <el-col :span="12">
              送货地址：
              <el-input
                style="width:200px"
                type="text"
                v-model="editobj.deliverAddress"
                placeholder="送货地址"
              ></el-input>
            </el-col>
          </el-row>

          <!-- 送达时间  -->
          <el-row>
            <el-col :span="12">
              送达时间：
              <el-input style="width:200px" v-model="editobj.deliveryTime" placeholder="送达时间"></el-input>
            </el-col>
          </el-row>

          <!-- 备注  -->
          <el-row>
            <el-col :span="12">
              备注：
              <el-input style="width:200px" v-model="editobj.remarks" placeholder="备注"></el-input>
            </el-col>
          </el-row>

          <!-- 订单金额 -->
          <el-row>
            <el-col>
              <p>订单金额</p>
              <el-input-number v-model="editobj.orderAmount" :min="0" label="描述文字"></el-input-number>
            </el-col>
          </el-row>

          <!-- 订单状态-->
          <el-row>
            <el-col :span="8">
              订单状态
              <el-select v-model="editobj.orderState">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>

          <span slot="footer" class="dialog-footer">
            <el-button @click="showdialog = false">取 消</el-button>
            <el-button type="primary" @click="clickChangeItems">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </el-main>
  </div>
</template>

<script>
import { orderlist, goodsdetail, orderedit } from "@/api/apis";
import { getChinatime } from "@/utils/utils.js";
export default {
  data() {
    return {
      dialogVisible: false,
      prop: {},

      //查询数据
      orderNo: "",
      consignee: "",
      phone: "",
      orderState: "",
      date: [],

      tableData: [],
      currentPage: 1,
      pageSize: 4,
      total: 0,

      showdialog: false,
      //回填数据
      editobj: {}, //当前编辑数据
      options: [
        {
          value: "派送中",
          lable: "派送中",
        },
        {
          value: "已受理",
          lable: "已受理",
        },
        {
          value: "已完成",
          lable: "已完成",
        },
      ],
    };
  },

  methods: {
    //修改订单
    clickrst(row) {
      this.editobj = { ...row };
      this.showdialog = true;
    },
    //发送修改请求
    clickChangeItems() {
      orderedit(this.editobj).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: "商品数据修改成功！",
          });
          //刷新数据
          this.getorderlist();
          //关闭模态框
          this.showdialog = false;
        }
      });
    },

    //分页器按钮
    handleSizeChange() {},
    //点击页数
    handleCurrentChange(newpage) {
      this.currentPage = newpage;
      this.getorderlist(this.paramsex);
    },
    clickSearch() {
      //时间查询
      let { orderNo, consignee, phone, orderState } = this;
      //其它参数对象
      let paramsex = {};
      if (orderNo != "") paramsex.orderNo = orderNo;
      if (consignee != "") paramsex.consignee = consignee;
      if (phone != "") paramsex.phone = phone;
      if (orderState != "" && orderState != "全部")
        paramsex.orderState = orderState;
        
      if (this.date.length > 0)
        paramsex.date = JSON.stringify([
          getChinatime(this.date[0]),
          getChinatime(this.date[1]),
        ]);
      this.paramsex = paramsex;
      this.getorderlist(this.paramsex);
    },

    //获取订单列表
    getorderlist(paramsex) {
      orderlist({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        ...paramsex,
      }).then((res) => {
        //  console.log(res);



        let arr = res.data.data;
        for (let obj of arr) {
          obj.orderTime = getChinatime(obj.orderTime);
          obj.deliveryTime = getChinatime(obj.deliveryTime);

          
        }

        //本页数据
        this.tableData = arr;
        //总商品条数
        this.total = res.data.total;
      });
    },
    //查看订单详情
    handleClick(row) {
      goodsdetail((this.prop = { ...row }));
    },
  },

  created() {
    this.getorderlist();
  },
};
</script>

<style lang="less" scoped>
.el-main {
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.el-input {
  width: 20%;
  margin-right: 10px;
}
</style>