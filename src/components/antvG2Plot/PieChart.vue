<template>
  <div class="chart-wrapper">
    <div
      v-show="data.length"
      :id="id"
      class="chart-box"
    />
    <Empty v-if="data.length === 0" />
  </div>
</template>

<script>
import { Pie, G2 } from '@antv/g2plot'
import { guid, ToFixed } from '@/utils'
import defaultsDeep from 'lodash/defaultsDeep'
import cloneDeep from 'lodash/cloneDeep'
import { tooltipConfig } from './config'

const G = G2.getEngine('canvas')

export default {
  name: 'PieChart',
  props: {
    data: {
      type: Array,
      default () {
        return []
      },
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
        appendPadding: 10,
        angleField: 'value',
        colorField: 'type',
        radius: 0.7,
        innerRadius: 0.65,
        color: ['#FFAA45', '#44C4BC', '#FF7675', '#808080', '#094698'],
        data: [],
        statistic: null,
        label: {
          type: 'spider',
          labelHeight: 46,
          formatter: (data, mappingData) => {
            const group = new G.Group({})
            group.addShape({
              type: 'text',
              attrs: {
                x: 10,
                y: 8,
                text: `${ToFixed(data.percent * 100, 2)}%`,
                fill: mappingData.color,
                fontWeight: 700,
                fontSize: 20,
              },
            })
            group.addShape({
              type: 'text',
              attrs: {
                x: 0,
                y: 25,
                text: `${data.type}`,
                fill: 'rgba(255, 255, 255, 0.71)',
                fontSize: 14,
              },
            })
            return group
          },
        },
        legend: {
          position: 'bottom',
          itemName: {
            style: {
              fill: 'rgba(255, 255, 255, 0.78)',
            },
          },
          marker: {
            // 把 marker 从 square 变成线条
            symbol: () => {
              // M 3.5 0 10.5 0 A 3.5 3.5 0 0 1 10.5 7 L 3.5 7 A 3.5 3.5 0 0 1 3.5 0
              const r = 3.5
              const width = 7
              const height = 7
              const offsetY = 2
              return [
                ['M', r, offsetY, r + width, offsetY],
                ['A', r, r, 0, 0, 1, r + width, height + offsetY],
                ['L', r, height + offsetY],
                ['A', r, r, 0, 0, 1, r, offsetY],
              ]
            },
            style: {
              lineWidth: 0,
            },
          },
        },
        pieStyle: {
          stroke: '#021941',
          lineWidth: 3,
        },
        tooltip: {
          showTitle: false,
          showMarkers: false,
          position: 'top',
          formatter: (datum) => ({ name: datum.type, value: datum.value }),
          domStyles: tooltipConfig.domStyles,
        },
        interactions: [
          { type: 'element-selected' },
        ],
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
      this.myChart = new Pie(this.id, {
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
