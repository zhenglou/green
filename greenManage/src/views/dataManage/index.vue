<template>
  <div class="dataManage_root">
    <div class="dataManage_top">
      <div class="dataManage_top_main">
        <li class="dataManage_top_main_item">
          <p class="dataManage_top_main_item_title">总订单数</p>
          <p class="dataManage_top_main_item_count">{{ totalsValue[2]?.totalValue || '加载中...' }}</p>
          <p class="dataManage_top_main_item_icon"></p>
          <p class="dataManage_top_main_item_sctitle">预约回收</p>
        </li>
        <li class="dataManage_top_main_item">
          <p class="dataManage_top_main_item_title">AI使用次数</p>
          <p class="dataManage_top_main_item_count">{{ totalsValue[0]?.totalValue || '加载中...' }}</p>
          <p class="dataManage_top_main_item_icon"></p>
          <p class="dataManage_top_main_item_sctitle">智能识别</p>
        </li>
        <li class="dataManage_top_main_item">
          <p class="dataManage_top_main_item_title">用户注册数</p>
          <p class="dataManage_top_main_item_count">{{ totalsValue[1]?.totalValue || '加载中...' }}</p>
          <p class="dataManage_top_main_item_icon"></p>
          <p class="dataManage_top_main_item_sctitle">平台注册</p>
        </li>
        <li class="dataManage_top_main_item">
          <p class="dataManage_top_main_item_title">商品兑换数</p>
          <p class="dataManage_top_main_item_count">{{ totalsValue[3]?.totalValue || '加载中...' }}</p>
          <p class="dataManage_top_main_item_icon"></p>
          <p class="dataManage_top_main_item_sctitle">积分兑换</p>
        </li>
      </div>
    </div>
    <div class="dataManage_root_center_hr"></div>
    <div class="dataManage_bottom">
      <div ref="chartRef" style="width: 70%; height: 400px;"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts";
import { selectAll, totals } from "../../api/dailyStatistics";
// 创建一个 ref 用于绑定 DOM 元素
const chartRef = ref<HTMLDivElement | null>(null);
let chartInstance: echarts.ECharts | null = null;
let totalsValue = reactive<any[]>([]);
let serieRaw:any[] = []
let date:any[] = [];
// 初始化图表
const initChart = () => {
  if (!chartRef.value) return;

  // 初始化 ECharts 实例
  chartInstance = echarts.init(chartRef.value);

  // 配置堆叠折线图的选项
  const option: echarts.EChartsOption = {
    title: {
      text: "近7日数据趋势",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["商品兑换数","用户注册数","每日订单数", "AI使用次数"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      // data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      data: date,
    },
    yAxis: {
      type: "value",
    },
    series: serieRaw
  };

  // 设置图表配置
  chartInstance.setOption(option);
};

// 销毁图表实例
const destroyChart = () => {
  if (chartInstance) {
    chartInstance.dispose();
    chartInstance = null;
  }
};

// 监听窗口大小变化，调整图表
const resizeChart = () => {
  chartInstance?.resize();
};
async function dealLineData() {
  const staticInfos = (await selectAll()).data.data;
  console.log(staticInfos);
  date = staticInfos.ai_usage.map((v:any)=>v.date);
  const metricMapping: { [key: string]: string } = {
    order_count: "每日订单数",
    ai_usage: "AI使用次数",
    user_register: "用户注册数",
    product_exchange: "商品兑换数",
  };
  // 转换为 series 格式
  const series = Object.keys(staticInfos).map((key) => {
    return {
      name: metricMapping[key],
      type: "line",
      stack: "Total",
      data: staticInfos[key].map((item: any) => item.value),
    };
  });
  serieRaw = series;
  console.log(serieRaw);
  initChart();
  window.addEventListener("resize", resizeChart);
}
async function dealTotalData() {

  totalsValue.push(...(await totals()).data.data);
  console.log(totalsValue);
}
// 挂载时初始化图表
onMounted(() => {
  dealLineData();
  dealTotalData();
});

// 卸载时清理资源
onBeforeUnmount(() => {
  destroyChart();
  window.removeEventListener("resize", resizeChart);
});
</script>


<style lang="scss" scoped>
.dataManage_root {
  width: 100%;
  height: 100%;
  position: relative;

  .dataManage_top {
    width: 100%;
    height: 50%;

    .dataManage_top_main {
      display: flex;
      padding-left: 88px;

      .dataManage_top_main_item {
        width: 200px;
        height: 250px;
        background: #FFFFFF;
        box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.04), 0px 2px 6px 0px rgba(0, 0, 0, 0.04), 0px 16px 24px 0px rgba(0, 0, 0, 0.06);
        border-radius: 20px 20px 20px 20px;
        margin-right: 56px;

        .dataManage_top_main_item_title {
          font-weight: 700;
          font-size: 24px;
          color: #828282;
          text-align: left;
          font-style: normal;
          text-transform: none;
          margin-top: 32px;
          text-align: center;
        }

        .dataManage_top_main_item_count {
          font-weight: 500;
          font-size: 64px;
          color: #828282;
          text-align: left;
          font-style: normal;
          text-transform: none;
          text-align: center;
        }

        .dataManage_top_main_item_icon {
          width: 20px;
          height: 20px;
          margin-left: 88px;
          background-image: url("/public/coolicon@1x.png");
          background-repeat: no-repeat;
          background-size: contain;
          margin-top: 10px
        }

        .dataManage_top_main_item_sctitle {
          font-weight: 500;
          font-size: 16px;
          color: #4F4F4F;
          text-align: center;
          font-style: normal;
          text-transform: none;
        }
      }
    }
  }

  .dataManage_root_center_hr {
    width: 926px;
    height: 1px;
    background: #C4C4C4;
    border-radius: 0px 0px 0px 0px;
    position: absolute;
    top: 350px;
    left: 88px;
  }

  .dataManage_bottom {
    padding-left: 40px;
  }
}
</style>