<template>
  <a-layout id="layout">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo" >antV使用demo</div>
      <a-menu theme="dark" mode="inline" v-model="current" :default-selected-keys="['bar']" @click="menuClick">
        <a-menu-item key="bar">
          <a-icon type="bar-chart" />
          <span>antV-g2柱状图</span>
        </a-menu-item>
        <a-menu-item key="line">
          <a-icon type="line-chart" />
          <span>antV-g2折线图</span>
        </a-menu-item>
        <a-menu-item key="pie">
          <a-icon type="pie-chart" />
          <span>antV-g2饼图</span>
        </a-menu-item>
        
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
      current: ['bar']
    };
  },
  methods: {
    menuClick({ key}) {
      this.$router
        .push({
          name: key,
        })
      this.current = [key]
    }
  }
};
</script>
<style lang="less">
#layout {
  height: 100%;
}
#layout .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#layout .trigger:hover {
  color: #1890ff;
}

#layout .logo {
  height: 32px;
  margin: 16px;
  color: #fff;
}
.ant-menu {
  text-align: left;
}
</style>
