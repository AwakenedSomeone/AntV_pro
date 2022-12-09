export const intervalConfig = {
  // 柱状条顶部圆形
  arcBar: {
    interactions: [{ type: 'active-region', enable: false }],
    maxColumnWidth: 20,
    columnBackground: {
      // 阴影颜色和圆弧配置
      style: {
        fill: 'rgba(40, 252, 255, 0.10)',
        lineWidth: 1,
        stroke: 'l(90) 0:rgba(144, 201, 255, 0.40) 0.5:#89DBFF 1:#89DBFF',
        radius: [10, 10, 0, 0],
      },
    },
    columnStyle: {
      // 柱子的颜色和圆弧配置
      radius: [10, 10, 0, 0],
      fill: 'l(90) 0:rgba(40, 252, 255, 1) 1:rgba(40, 98, 255, 0)',
      lineWidth: 1,
    },
  },
  // 棱柱体
  prism: {
    shape: 'custom-cuboid',
    maxColumnWidth: 30,
    label: {
      // 可手动配置 label 数据标签位置
      position: 'top', // 'top', 'bottom', 'middle',
      offsetY: -45,
      style: {
        fill: '#fff',
      },
    },
    customInfo: {
      // 可以在用到的组件里自定义此字段，传不同的颜色进来
      customCuboid: {
        // 顶部颜色
        topOptions: {
          fill: '#46D9FA',
        },
        // 右侧颜色
        rightOptions: {
          fill: 'l(90) 0:#46D9FA 1:#455CE9',
        },
        // 左侧颜色
        leftOptions: {
          fill: 'l(90) 0:#28788A 1:#171F4E',
        },
      },
    },
  },
  // 斜角柱条
  bevelCuboid: {
    shape: 'custom-bevel-cuboid',
    maxColumnWidth: 20,
    customInfo: {
      // 可以在用到的组件里自定义此字段，传不同的颜色进来
      customBevelCuboid: {
        // 右侧颜色
        style: {
          stroke: '#88EFFF',
          fill: 'l(90) 0:#62F7B6 1:rgba(5, 179, 230, 0)',
        },
      },
    },
  },
  // 圆柱体
  cylinder: {
    shape: 'custom-cylinder',
    customInfo: {
      // 可以在用到的组件里自定义此字段，传不同的颜色进来
      customCylinder: {
        // 顶部颜色
        topOptions: {
          fill: '#16BBED',
          activeFill: '#F5E483',
        },
        // 正面长方形的颜色
        frontOptions: {
          fill: 'l(90) 0:#1251D2 1:#1BDFFC',
          activeFill: 'l(90) 0:#FFBB17 1:#F5E483',
        },
        // 底部圆的颜色
        bottomOptions: {
          fill: '#1E80E4',
          activeFill: '#F4AD04',
        },
        // 柱条背景色
        backgroundOptions: {
          fill: 'l(90) 0:rgba(18, 81, 210, 0.09) 1:rgba(27, 223, 252, 0.09)',
          activeFill: 'l(90) 0:rgba(255, 187, 23, 0.09) 1:rgba(245, 228, 131, 0.09)',
        },
        // 柱条背景顶部的圆的填充色
        backgroundTopOptions: {
          fill: 'rgba(0, 168, 255, 0.035)',
          activeFill: 'rgba(22, 138, 237, 0.1)',
        },
      },
    },
    interactions: [{ type: 'custom-cylinder-interaction' }],
  },
}

export const lineConfig = {

}

export const tooltipConfig = {
  domStyles: {
    'g2-tooltip': {
      border: '1px solid rgba(0, 168, 255, 1)',
      background: 'rgba(16,41,74,0.4)',
      boxShadow: 'none',
      borderRadius: 'none',
    },
    'g2-tooltip-value': {
      color: '#01D8FF',
      fontWeight: 'bold',
      marginLeft: '5px',
    },
    'g2-tooltip-list-item': {
      color: '#01D8FF',
      fontSize: '14px',
    },
    'g2-tooltip-marker': {
      display: 'none',
    },
  },
}
