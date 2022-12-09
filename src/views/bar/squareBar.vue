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
    hypotenuse(long,angle){
    //获得弧度
      var radian = 2*Math.PI/360*angle;
      return {
          a:Math.sin(radian) * long,//邻边
          b:Math.cos(radian) * long//对边
      };
    },
    registFun() {
      const that = this
      // 自定义菱形
      registerShape("interval", "rhombus", {
        // 1. 定义关键点
        getPoints(cfg) {
          const x = cfg.x;
          const y = cfg.y;
          const width = cfg.size;
          const obj = that.hypotenuse(width, 30)
          return [
            { x: x - width / 2, y: y },
            { x: x + width / 2, y: y },
            { x: x + width / 2 + obj.a, y: y + obj.b },
            { x: x - width / 2 + obj.a, y: y + obj.b },
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
              ...cfg.style,
            },
          });
          return polygon;
        },
      });
      registerShape("interval", "rhombus1", {
        // 1. 定义关键点
        getPoints(cfg) {
          const x = cfg.x;
          const y = cfg.y;
          const y0 = cfg.y0;
          const width = cfg.size;
          const obj = that.hypotenuse(width, 30)
          return [
            { x: x + width / 2, y: y },
            { x: x + width / 2, y: y0 },
            { x: x + width / 2 + obj.a, y: y0 + obj.b },
            { x: x + width / 2 + obj.a, y: y + obj.b },
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
           fill: "l(90) 0:#5B8FF9  1:#00FFFF",
        })
        .position("type*value");
        // 设置柱体顶部的菱形
      this.myChart
        .interval()
        .shape("rhombus") // 使用刚刚定义的顶部的菱形
        .style({
          fillOpacity: 1,
          fill: "#5B8FF9",
        })
        .position("type*value");
        this.myChart
        .interval()
        .shape("rhombus1") // 使用刚刚定义的侧边菱形
        .style({
          fillOpacity: 1,
          fill: "l(90)  0:#5B8FF9  1:#00FFFF",
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
