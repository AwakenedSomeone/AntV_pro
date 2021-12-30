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
        { type: "未知", value: 1, percent: 0.02 },
        { type: "17 岁以下", value: 654, percent: 0.02 },
        { type: "18-24 岁", value: 4400, percent: 0.2 },
        { type: "25-29 岁", value: 5300, percent: 0.24 },
        { type: "30-39 岁", value: 6200, percent: 0.28 },
        { type: "40-49 岁", value: 3300, percent: 0.14 },
        { type: "50 岁以上", value: 1500, percent: 0.06 },
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
      // 自定义椭圆形
      registerShape("interval", "ellipse", {
        // 1. 定义关键点
        getPoints(cfg) {
          const x = cfg.x;
          const y = cfg.y;
          const width = cfg.size;
          return [
            { x: x, y: y },
            { x: x - width / 2, y: y },
            { x: x + width / 2, y: y },
          ];
        },
        // 2. 绘制
        draw(cfg, group) {
          const points = this.parsePoints(cfg.points); // 将0-1空间的坐标转换为画布坐标
          const polygon = group.addShape({
            type: "ellipse",
            attrs: {
              x: points[0].x,
              y: points[0].y,
              rx: (points[2].x - points[1].x) / 2,
              ry: (points[2].x - points[1].x) / 5,
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
          fill: "l(180) 0:#5B8FF9 0.5:#00FFFF 1:#5B8FF9",
        })
        .position("type*value");
        // 设置柱体顶部的椭圆
      this.myChart
        .interval()
        .shape("ellipse") // 使用刚刚定义的椭圆形
        .style({
          fillOpacity: 1,
          fill: "l(90) 0:#00BFFF 1:#5B8FF9",
        })
        .position("type*value");

      // 添加文本标注
      this.chartData.forEach((item) => {
        this.myChart
          .annotation()
          .text({
            position: [item.type, item.value],
            content: item.value,
            style: {
              textAlign: "center",
            },
            offsetY: -30,
          })
          .text({
            position: [item.type, item.value],
            content: (item.percent * 100).toFixed(0) + "%",
            style: {
              textAlign: "center",
            },
            offsetY: -12,
          });
      });
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
