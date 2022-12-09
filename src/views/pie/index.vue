<template>
  <div>
    <h2>常见饼图或环形图</h2>
    <div class="chart-box">
      <div class="card-item">
        <div class="chart">
          <Base id="card1" />
        </div>
        <h3 class="title">自动选中的饼图</h3>
      </div>
    </div>
  </div>
</template>

<script>
import Base from './base.vue'
export default {
  components: {
    Base,
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