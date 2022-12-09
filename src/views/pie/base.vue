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
        { type: '分类一', value: 20 },
        { type: '分类二', value: 18 },
        { type: '分类三', value: 32 },
        { type: '分类四', value: 15 },
        { type: 'Other', value: 15 },
      ],
      myChart: null,
      intervalHandler: null
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

      this.myChart.coordinate('theta', {
        radius: 0.75,
        innerRadius: 0.6,
      });

      this.myChart.tooltip({
        showMarkers: false,
      });
      const interval = this.myChart
        .interval()
        .adjust('stack')
        .position('value')
        .color('type')
        .shape('slice-shape');
      this.myChart.interaction('element-single-selected');
      this.myChart.render(); // 一定要先render了之后再添加循环，这样才能拿到元素
      let i = 0
      interval.elements[i].setState('selected', true);
      if (this.intervalHandler) {
        clearInterval(this.intervalHandler)
        this.intervalHandler = null
      }
      this. intervalHandler = setInterval(() => {
        interval.elements[i].setState('selected', false);
        if (i + 1 < interval.elements.length) {
          i++
        } else {
          i = 0
        }
        interval.elements[i].setState('selected', true);
        
      }, 2000)
      
    },
  },
  beforeDestroy() {
    if (this.intervalHandler) {
      clearInterval(this.intervalHandler)
      this.intervalHandler = null
    }
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
