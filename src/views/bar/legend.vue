<template>
  <div ref="container" :id="id" class="container"></div>
</template>

<script>
import { Chart } from "@antv/g2";
export default {
  props: {
    id: {
      type: String,
      default: 'container'
    }
  },
  data() {
    return {
      chartData: [
        { type: "未知", value: 1, value1: 1, percent: 0.02 },
        { type: "17 岁以下", value: 654,  value1: 654, percent: 0.02 },
        { type: "18-24 岁",  value: 4400, value1: 4400, percent: 0.2 },
        { type: "25-29 岁",  value: 5300, value1: 5300, percent: 0.24 },
        { type: "30-39 岁",  value: 6200, value1: 6200, percent: 0.28 },
        { type: "40-49 岁",  value: 3300, value1: 3300, percent: 0.14 },
        { type: "50 岁以上", value: 1500, value1: 1500, percent: 0.06 },
      ],
      myChart: null,
    };
  },
  mounted() {
    this.myChart = new Chart({
      container: this.id,
      autoFit: true,
      padding: [20, 0, 40, 0]
    });
    this.setData();
    this.$refs.container.addEventListener('resize', () => {
      this.setData()
    })
  },
  methods: {
    setData() {
      this.myChart.clear()
      this.myChart.data(this.chartData);
      // 通过度量（scale）定义数据的类型和展示方式， 这里对value进行别名设置，显示为"销售额(万)"
      this.myChart.scale("value", {
        alias: "销售额(万)",
      });

      this.myChart.axis("type", {
        tickLine: {
          alignTick: false,
        },
      });
      this.myChart.legend({
        custom: true,
        items: [
          { value: 'value', name: '柱状图', marker: { symbol: 'square', style: { fill: '#3182bd', r: 5 } } },
          { value: 'value1', name: '折线图', marker: { symbol: 'hyphen', style: { stroke: '#fdae6b', r: 5, lineWidth: 3 } } }
        ],
      });
      this.myChart.tooltip({
        showMarkers: false,
      });
      // 设置圆柱形的柱体
      let interval = this.myChart
        .interval()
        .style({
          stroke: "#5B8FF9",
        })
        .position("type*value");
      let line = this.myChart
        .line()
        .style({
          stroke: "#5B8FF9",
        })
        .position("type*value1");
        this.myChart.on('legend-item:click', (ev) => {
          const delegateObject = ev.target.get('delegateObject');
          const item = delegateObject.item; // 图例选项
          // 清空数据，重新渲染
          
          if (item.value === "value1") {
            // 重新设置折线图
            if (!item.unchecked) {
              line.changeVisible(true)
            } else {
              line.changeVisible(false)
            }
            
          } else {
            // 重新设置柱状图
            if (!item.unchecked) {
              interval.changeVisible(true)
            } else {
              interval.changeVisible(false)
            }
            
          }
          this.myChart.render();// 加上render，可以显示动画
        })
        this.myChart.on('dblclick', () => {
          // 双击显示两者
          interval.changeVisible(true)
          line.changeVisible(true)
        })
        // this.myChart.removeInteraction('legend-filter'); // 自定义图例，移除默认的分类图例筛选交互
        this.myChart.render();
    },
  },
  beforeDestroy() {
    this.myChart.destroy()
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
