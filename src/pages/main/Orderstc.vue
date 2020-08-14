
<template>
  <div>
    <el-main>
      <div style="display:flex;justify-content:flex-start;margin-top:20px;margin-bottom:20px">
        <span style="margin-right:9px;">时间范围</span>
    
          <el-date-picker
            v-model="date"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
 
        <el-button style="margin-left:10px;" type="primary" @click="searchclick">查询</el-button>
      </div>
      <el-card>
        <div id="main" style="width:900px;height:600px;"></div>
      </el-card>
    </el-main>
  </div>
</template>

<script>
import { orderdata } from "@/api/apis";
import echarts from "echarts";
import { getChinatime } from "@/utils/utils";

export default {
  data() {
    return {
      date: [],
    };
  },
  methods: {
    searchclick() {
      let timestr = JSON.stringify([
        getChinatime(this.date[0]),
        getChinatime(this.date[1]),
      ]);
      this.refreshEcharts(timestr);


console.log(timestr);
    },
    refreshEcharts(str) {
      orderdata(str).then(res => {
        let arr = res.data.data;
        for (let obj of arr) {
          obj.orderTime = getChinatime(obj.orderTime);
        }
        var option = {
          xAxis: {
            type: "category",
            data: arr.map(obj => obj.orderTime),
          },

          yAxis: {
            type: "value",
          },

          series: [
            {
              data: arr.map(obj => obj.orderAmount),
              type: "bar",
            },
          ],
        };
        this.sechart.setOption(option);
      });
    },
  },
  mounted() {
    //发送请求  option 渲染
    this.sechart = echarts.init(document.getElementById("main"));
  },
};
</script>

<style lang="less" scoped>
</style>