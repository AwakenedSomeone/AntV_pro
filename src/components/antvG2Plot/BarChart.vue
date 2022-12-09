<template>
  <div class="chart-wrapper">
    <div
      v-show="data.length"
      :id="id"
      class="chart-box"
    />
  </div>
</template>

<script>
import { Bar } from '@antv/g2plot'
import { guid } from '@/utils'
import defaultsDeep from 'lodash/defaultsDeep'
import cloneDeep from 'lodash/cloneDeep'
import { tooltipConfig } from './config'
// 条形图
export default {
  name: 'BarChart',
  props: {
    data: {
      type: Array,
      default () {
        return []
      },
    },
    barColors: {
      type: Object,
      default () {
        return {
          用户: {
            stroke: 'l(0) 0:rgba(136, 239, 255, 0.20) 1:#BDF9FF',
            fill: 'l(0) 0:rgba(5, 179, 230, 0) 1:rgba(98, 247, 182, 0.80)',
          },
          市场用户: {
            stroke: 'l(0) 0:rgba(248, 230, 196, 0.20) 1:rgba(248, 230, 196, 1)',
            fill: 'l(0) 0:rgba(255, 152, 35, 0) 1:rgba(255, 168, 69, 0.80)',
          },
        }
      },
    },
    // 除了默认的配置，其他需要添加的配置或者覆盖的配置由此传入
    optionsConfig: {
      type: Object,
      default () {
        return {}
      },
    },
  },
  data () {
    return {
      id: guid(),
      chartHeight: '100%',
      myChart: null,
      defaultOptions: {
        supportCSSTransform: true,
        isGroup: true,
        xField: 'yField',
        yField: 'xField',
        seriesField: 'legend',
        dodgePadding: 4,
        intervalPadding: 20,
        data: [],
        barStyle: (options) => ({
          ...this.barColors[options.legend],
        }),
        color: ['l(0) 0:rgba(255, 152, 35, 0) 1:rgba(255, 168, 69, 0.80)', 'l(0) 0:rgba(5, 179, 230, 0) 1:rgba(98, 247, 182, 0.80)'],
        legend: {
          position: 'top',
          marker: {
            // 把 marker 从 square 变成线条
            symbol: () => {
              // M 3.5 0 10.5 0 A 3.5 3.5 0 0 1 10.5 7 L 3.5 7 A 3.5 3.5 0 0 1 3.5 0
              const r = 3.5
              const width = 10
              const height = 7
              const offsetY = 2
              return [
                ['M', r, offsetY, r + width, offsetY],
                ['A', r, r, 0, 0, 1, r + width, height + offsetY],
                ['L', r, height + offsetY],
                ['A', r, r, 0, 0, 1, r, offsetY],
              ]
            },
            style: (oldStyle) => ({
              ...oldStyle,
              lineWidth: 1,
              // square marker 只有填充色，赋给 line 的 stroke
              stroke: oldStyle.stroke || oldStyle.fill,
            }),
            spacing: 12,
          },
          itemName: {
            style: {
              fill: 'rgba(255, 255, 255, 0.71)',
            },
          },
        },
        label: {
          // 可手动配置 label 数据标签位置
          position: 'right', // 'left', 'middle', 'right'
          offset: 4,
          style: {
            fill: 'rgba(255, 255, 255, 0.71)',
          },
        },
        tooltip: {
          showTitle: false,
          showMarkers: false,
          formatter: (datum) => ({ name: datum.xField, value: datum.yField }),
          domStyles: tooltipConfig.domStyles,
        },
        yAxis: {
          grid: null,
          tickLine: null,
          label: {
            style: {
              fill: '#fff',
            },
          },
          line: null,
        },
        xAxis: {
          grid: null,
          label: null,
          line: null,
        },
      },
    }
  },
  watch: {
    data: {
      handler(val) {
        this.$nextTick(() => {
          if (!this.myChart) {
            this.initChart()
          }
          const finialOptions = defaultsDeep(cloneDeep(this.optionsConfig), this.defaultOptions)
          this.myChart.update({
            data: val,
            finialOptions,
          })
        })
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    initChart () {
      const finialOptions = defaultsDeep(cloneDeep(this.optionsConfig), this.defaultOptions)
      this.myChart = new Bar(this.id, {
        ...finialOptions,
      })
      this.myChart.render()
    },
  },
}
</script>

<style lang="less" scoped>
.chart-wrapper {
  width: 100%;
  height: 100%;
  .chart-box {
    width: 100%;
    height: 100%;
  }
}
</style>
