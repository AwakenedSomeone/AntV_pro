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
      default: "container",
    },
  },
  data() {
    return {
      chartData: [
        { name: "London", 月份: "Jan.", 月均降雨量: 18.9 },
        { name: "London", 月份: "Feb.", 月均降雨量: 28.8 },
        { name: "London", 月份: "Mar.", 月均降雨量: 39.3 },
        { name: "London", 月份: "Apr.", 月均降雨量: 81.4 },
        { name: "Berlin", 月份: "Jan.", 月均降雨量: 12.4 },
        { name: "Berlin", 月份: "Feb.", 月均降雨量: 23.2 },
        { name: "Berlin", 月份: "Mar.", 月均降雨量: 34.5 },
        { name: "Berlin", 月份: "Apr.", 月均降雨量: 99.7 },
      ],
      myChart: null,
    };
  },
  mounted() {
    this.myChart = new Chart({
      container: this.id,
      autoFit: true,
      padding: [20, 0, 40, 80],
    });
    this.registFun();
    this.setData();
    this.$refs.container.addEventListener("resize", () => {
      this.setData();
    });
  },
  methods: {
    registFun() {
      // 自定义多边形
      registerShape("interval", "polygon", {
        // 1. 定义关键点
        getPoints(cfg) {
          const x = cfg.x;
          const y0 = cfg.y0;
          const width = cfg.size;
          return [
            { x: x - width / 2 - (width /2)*0.1, y: y0 - width*0.1 },
            { x: x + width / 2 + (width /2)*0.1, y: y0 - width*0.1 },
            { x: x + width / 2 + (width /2)*0.1, y: y0 - width / 5 - width*0.1},
            { x: x + width/ 40, y: y0  - width / 3  - width*0.1},
            { x: x + width/ 40, y: y0  - 0.6 *width - width*0.1 },
            { x: x - width/ 40, y: y0  - 0.6 *width  - width*0.1},
            { x: x - width/ 40, y: y0  - width / 3  - width*0.1 },
            { x: x - width / 2 - (width /2)*0.1, y: y0 - width / 5 - width*0.1 },
          ];
        },
        // 2. 绘制
        draw(cfg, group) {
          const points = this.parsePoints(cfg.points); // 将0-1空间的坐标转换为画布坐标
          console.log(points);
          const result = []
          points.forEach((item) => {
            result.push([item.x, item.y])
            
          })
          const polygon = group.addShape("polygon", {
            attrs: {
              points: result,
              ...cfg.defaultStyle,
            },
          });
          return polygon;
        },
      });
    },
    setData() {
      this.myChart.clear();
      this.myChart.data(this.chartData);

      this.myChart.axis("月份", {
        line:null,
        tickLine: null,
        label: {
          offset: 40,
        }
      });
      this.myChart.axis("月均降雨量", false);

      this.myChart.tooltip({
        showMarkers: false,
      });
      this.myChart.coordinate().transpose();
      this.myChart.scale({
        tickCount: 2,
      })
      // 设置圆柱形的柱体
      this.myChart
        .interval()
        .adjust([
          {
            type: "dodge",
            marginRatio: 0.2,
          },
        ])
        .position("月份*月均降雨量")
        .color("name");
      // 设置柱体顶部的椭圆
      this.myChart
        .interval()
        .shape("polygon") // 使用刚刚定义的椭圆形
        .position("月份*月均降雨量");
        this.myChart.legend(false)
      this.myChart.render();
    },
  },
  beforeDestroy() {
    this.myChart.destroy();
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
