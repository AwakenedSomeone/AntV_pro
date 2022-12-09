import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';
import '@/components/antvG2Plot'

Vue.config.productionTip = false
Vue.use(Antd)
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
