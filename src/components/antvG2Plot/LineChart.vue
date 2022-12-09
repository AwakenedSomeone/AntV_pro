<template>
  <div class="chart-wrapper">
    <div
      ref="title"
      class="chart-title"
    >
      <span v-html="title" />
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
import { Line } from '@antv/g2plot'
import { guid } from '@/utils'
import defaultsDeep from 'lodash/defaultsDeep'
import cloneDeep from 'lodash/cloneDeep'
import { lineConfig, tooltipConfig } from './config'

export default {
  name: 'LineChart',
  props: {
    title: {
      type: String,
      default: '',
    },
    data: {
      type: Array,
      default () {
        return []
      },
    },
    shapeType: {
      type: String,
      default: '',
    },
    // 是否展示图例
    showLegend: {
      type: Boolean,
      default: false,
    },
    // 除了默认的配置，其他需要添加的配置或者覆盖的配置由此传入
    optionsConfig: {
      type: Object,
      default () {
        return {
        }
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
        tooltip: {
          showTitle: false,
          showMarkers: true,
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
          const typeOptions = lineConfig[this.shapeType] || {}
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
      const typeOptions = lineConfig[this.shapeType] || {}
      const options = {
        ...this.defaultOptions,
        ...typeOptions,
      }
      const finialOptions = defaultsDeep(cloneDeep(this.optionsConfig), options)
      this.myChart = new Line(this.id, {
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
