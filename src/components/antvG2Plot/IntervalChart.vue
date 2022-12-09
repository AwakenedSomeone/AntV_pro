<template>
  <div class="chart-wrapper">
    <div
      ref="title"
      class="chart-title"
    >
      <slot name="title" />
    </div>
    <div
      v-show="data.length"
      :id="id"
      class="chart-box"
      :style="{height: chartHeight}"
    />
  </div>
</template>

<script>
import { Column } from '@antv/g2plot'
import { guid } from '@/utils'
import defaultsDeep from 'lodash/defaultsDeep'
import cloneDeep from 'lodash/cloneDeep'
import { intervalConfig, tooltipConfig } from './config'

export default {
  name: 'IntervalChart',
  props: {
    data: {
      type: Array,
      default () {
        return []
      },
    },
    // 柱状图不同的柱子类型  prism：棱柱体 arcBar：顶部圆弧形
    shapeType: {
      type: String,
      default: '',
    },
    showLegend: {
      type: Boolean,
      default: false,
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
        xField: 'xField',
        yField: 'yField',
        data: [],
        seriesField: this.showLegend ? 'legend' : '',
        legend: false,
        tooltip: {
          showTitle: false,
          showMarkers: false,
          formatter: (datum) => ({ name: datum.xField, value: datum.yField }),
          domStyles: tooltipConfig.domStyles,
        },
        yAxis: {
          grid: {
            line: {
              style: {
                stroke: '#324F6A',
              },
            },
          },
          label: {
            style: {
              fill: '#fff',
            },
          },
          line: null,
        },
        xAxis: {
          label: {
            style: {
              fill: '#fff',
            },
          },
          tickLine: null,
          line: {
            style: {
              stroke: '#1CFAFE',
            },
          },
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
          const typeOptions = intervalConfig[this.shapeType] || {}
          const options = {
            ...this.defaultOptions,
            ...typeOptions,

          }
          const finialOptions = defaultsDeep(cloneDeep(this.optionsConfig), options)
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
  mounted () {
    this.initHeight()
  },
  methods: {
    initHeight () {
      const titleHeight = this.$refs.title.clientHeight
      this.chartHeight = `calc(100% - ${titleHeight}px)`
    },
    initChart () {
      const typeOptions = intervalConfig[this.shapeType] || {}
      const options = {
        ...this.defaultOptions,
        ...typeOptions,
      }
      const finialOptions = defaultsDeep(cloneDeep(this.optionsConfig), options)
      this.myChart = new Column(this.id, {
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
}
</style>
