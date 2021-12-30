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
    </div>
  </div>
</template>

<script>
import Base from './base.vue'
import LineBar from './lineBar.vue'
export default {
  components: {
    Base,
    LineBar,
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