<template>
  <div ref="container" :id="id" class="container"></div>
</template>

<script>
import { Chart } from "@antv/g2";
import { registerShape } from "@antv/g2";
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
    this.registFun();
    this.setData();
    this.$refs.container.addEventListener('resize', () => {
      this.setData()
    })
  },
  methods: {
    registFun() {
      // 自定义圆形
      registerShape("interval", "circleArea", {
        // 1. 定义关键点
        getPoints(cfg) {
          const x = cfg.x;
          const y = cfg.y;
          const width = cfg.size;
          return [
            { x: x, y: y },
            { x: x - width / 4, y: y }, // 用于draw的时候获取半径，圆饼半径小于圆环的，所以width / 5
            { x: x + width / 4, y: y },
          ];
        },
        // 2. 绘制
        draw(cfg, group) {
          const points = this.parsePoints(cfg.points); // 将0-1空间的坐标转换为画布坐标
          const polygon = group.addShape({
            type: "circle",
            attrs: {
              x: points[0].x,
              y: points[0].y,
              r: 5,
              ...cfg.defaultStyle,
              ...cfg.style,
            },
          });
          return polygon;
        },
      });
      // 自定义圆环
      registerShape("interval", "ring", {
        // 1. 定义关键点
        getPoints(cfg) {
          const x = cfg.x;
          const y = cfg.y;
          const width = cfg.size;
          return [
            { x: x, y: y },
            { x: x - width / 2, y: y }, // 用于获取圆环半径，width / 2 大于 width / 4，这样圆环才能在圆饼外面
            { x: x + width / 2, y: y },
          ];
        },
        // 2. 绘制
        draw(cfg, group) {
          const points = this.parsePoints(cfg.points); // 将0-1空间的坐标转换为画布坐标
          const polygon = group.addShape({
            type: "circle",
            attrs: {
              x: points[0].x,
              y: points[0].y,
              r: 10,
              ...cfg.defaultStyle,
              ...cfg.style,
            },
          });
          return polygon;
        },
      });
    },
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
      this.myChart.tooltip({
        showMarkers: false,
      });
      // 设置圆柱形的柱体
      this.myChart
        .interval()
        .style({
          stroke: "#5B8FF9",
        })
        .position("type*value");
      this.myChart
        .line()
        .style({
          stroke: "#5B8FF9",
        })
        .position("type*value1");
        // 设置圆
      this.myChart
        .interval()
        .shape("circleArea") // 使用刚刚定义的圆饼图
        .style({
          fillOpacity: 1,
          fill: "#00BFFF",
        })
        .position("type*value1");
        // 设置环
      this.myChart
        .interval()
        .shape("ring") // 使用刚刚定义的圆环
        .style({
          fillOpacity: 1, //圆环记得设置fillOpacity为0 或者fill: transparent
          fill: 'transparent',
          stroke: "#fff", // 圆环用stroke描边
        })
        .position("type*value1");
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
  background: #ccc;
}
</style>
