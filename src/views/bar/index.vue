<template>
  <div>
    <h2>常见柱状图</h2>
    <div class="bar-box">
      <div class="card-item">
        <div class="chart">
          <Base id="card1" />
        </div>
        <h3 class="title">立体圆柱图</h3>
      </div>
      <div class="card-item">
        <div class="chart">
          <LineBar id="bar1" />
        </div>
        <h3 class="title">特殊条形图</h3>
      </div>
      <div class="card-item">
        <div class="chart">
          <SquareBar id="bar2" />
        </div>
        <h3 class="title">立方体柱状图</h3>
      </div>
      <div class="card-item">
        <div class="chart">
          <CircleBar id="circleBar" />
        </div>
        <h3 class="title">圆点为柱</h3>
      </div>
      <div class="card-item">
        <div class="chart">
          <LegendChart id="legendChart" />
        </div>
        <h3 class="title">图例切换两组图形</h3>
      </div>
      <div class="card-item">
        <div class="chart" style="background: linear-gradient(360deg, rgba(2, 26, 58, 0.9) 0%, rgba(8, 52, 77, 0.9) 100%);padding: 20px">
          <IntervalChart shapeType="arcBar" :data="chartData"  />
        </div>
        <h3 class="title">圆头柱状图</h3>
      </div>
      <div class="card-item">
        <div class="chart" style="background: linear-gradient(360deg, rgba(2, 26, 58, 0.9) 0%, rgba(8, 52, 77, 0.9) 100%);padding: 20px">
          <IntervalChart shapeType="cylinder" :data="chartData"  />
        </div>
        <h3 class="title">带背景的圆柱图</h3>
      </div>
      <div class="card-item">
        <div class="chart" style="background: linear-gradient(360deg, rgba(2, 26, 58, 0.9) 0%, rgba(8, 52, 77, 0.9) 100%);padding: 20px">
          <IntervalChart shapeType="prism2" :data="chartData" :optionsConfig="{
            coordinate: [{
          type: 'transpose'
        }],
        appendPadding: [0, 20, 0, 0],
        label: {
          position: 'right',
        },
        yAxis: {
          label: {
            formatter: (v) => `${v} %`
          }
        },
          }"  />
        </div>
        <h3 class="title">棱形立体图-横向</h3>
      </div>
      <div class="card-item">
        <div class="chart" style="background: linear-gradient(360deg, rgba(2, 26, 58, 0.9) 0%, rgba(8, 52, 77, 0.9) 100%);padding: 20px">
          <IntervalChart shapeType="prism" :data="chartData"   />
        </div>
        <h3 class="title">棱形立体图-纵向</h3>
      </div>
      <div class="card-item">
        <div class="chart" style="background: linear-gradient(360deg, rgba(2, 26, 58, 0.9) 0%, rgba(8, 52, 77, 0.9) 100%);padding: 20px">
          <IntervalChart shapeType="bevelCuboid" :data="chartData"  />
        </div>
        <h3 class="title">斜角柱状图</h3>
      </div>
      <div class="card-item" >
        <div class="chart" style="
background: rgba(0, 19, 68, 1);padding: 20px">
          <IntervalChart shapeType="shortLine" :data="chartData.slice(0, 3)"  />
        </div>
        <h3 class="title">横线柱状图</h3>
      </div>
    </div>
  </div>
</template>

<script>
import Base from './base.vue'
import LineBar from './lineBar.vue'
import SquareBar from './squareBar.vue'
import CircleBar from './circle.vue'
import LegendChart from './legend.vue'
export default {
  components: {
    Base,
    LineBar,
    SquareBar,
    CircleBar,
    LegendChart,
  },
  data () {
    return {
      chartData: [
        { xField: '1月', yField: 56, },
        { xField: '2月', yField: 100, },
        { xField: '3月', yField: 0, },
        { xField: '4月', yField: 76, },
        { xField: '5月', yField: 87, },
        { xField: '6月', yField: 76, },
        { xField: '7月', yField: 25, },
        { xField: '8月', yField: 76, },
        { xField: '9月', yField: 87, },
        { xField: '10月', yField: 76, },
        { xField: '11月', yField: 0, },
        { xField: '12月', yField: 76, },
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.bar-box {
  width: calc(100vw - 250px);
  max-height: calc(100vh - 120px);
  overflow: auto;
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  justify-content: flex-start;
  flex-wrap: wrap;
  .card-item {
    width: 30%;
    height: 350px;
    &:not(:last-child) {
      margin-right: 1.5%;
    }
    .chart {
      width: 100%;
      height: calc(100% - 50px);
    }
    .title {
      margin-top: 15px;
      text-align: center;
    }
  }
}
</style>