import Vue from 'vue'
import './registShape'
import './actions/index'

import IntervalChart from './IntervalChart.vue'
import LineChart from './LineChart.vue'
import PieChart from './PieChart.vue'
import BarChart from './BarChart.vue'

const components = [
  IntervalChart,
  LineChart,
  PieChart,
  BarChart,
]
components.forEach((com) => Vue.component(com.name, com))
