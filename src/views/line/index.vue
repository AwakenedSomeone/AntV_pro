<template>
  <div>
    <h2>折线图</h2>
    <div class="chart-box">
      <div class="card-item">
        <div class="chart">
          <LineChart :optionsConfig="optionsConfig" :data="chartData" />
        </div>
        <h3 class="title">鼠标放上去显示特殊点的折线图</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      optionsConfig: {
        smooth: true,
        lineStyle: {
          stroke: '#FF8F31',
          lineWidth: 3,
        },
        area: {
          style: {
            fill: 'l(270) 0:rgba(255, 143, 49, 0) 1:rgba(255, 143, 49, 1)',
          },
        },
        point: {
          size: 8,
          shape: 'custom-point',
        },
        color: '#FF8F31',
        tooltip: {
          showMarkers: false,
        },
        interactions: [{ type: 'custom-marker-interaction' }],
      },
      chartData: [
        { xField: '1月', yField: 56, },
        { xField: '2月', yField: 90, },
        { xField: '3月', yField: 25, },
        { xField: '4月', yField: 76, },
        { xField: '5月', yField: 87, },
        { xField: '6月', yField: 76, },
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.chart-box {
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