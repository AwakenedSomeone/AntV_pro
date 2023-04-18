import { G2 } from '@antv/g2plot'

// 棱柱体
G2.registerShape('interval', 'custom-cuboid', {
  hypotenuse(long, angle) {
    // 获得弧度
    const radian = ((2 * Math.PI) / 360) * angle
    return {
      a: Math.sin(radian) * long, // 传入斜边求邻边
      b: Math.cos(radian) * long, // 传入斜边求对边
      c: Math.atan(radian) * long, // 传入邻边求对边
    }
  },
  // 1. 定义关键点
  getPoints(cfg) {
    const { x } = cfg
    const { y } = cfg
    const { y0 } = cfg
    const width = cfg.size
    const obj = this.hypotenuse(width / 2, 90)
    const yLen1 = y > 0 ? y - obj.c : 0
    const yLen2 = y > 0 ? y - 2*obj.c : 0
    return [
      // 右侧边
      { x, y: yLen2 },
      { x, y: y0 },
      { x: x + width / 2, y: y0 },
      { x: x + width / 2, y: yLen1 },
      // 顶部
      { x: x - width / 2, y: yLen1 },
      { x, y: yLen2 },
      { x: x + width / 2, y: yLen1 },
      { x, y },
      // 左侧边
      { x: x - width / 2, y: y0 },
      { x, y: y0 },
      { x, y: yLen2 },
      { x: x - width / 2, y: yLen1 },
    ]
  },
  // 2. 绘制
  draw(cfg, container) {
    const group = container.addGroup()
    const points = this.parsePoints(cfg.points) // 将0-1空间的坐标转换为画布坐标
    const result = []
    points.forEach((item) => {
      result.push([item.x, item.y])
    })
    const { topOptions, rightOptions, leftOptions } = cfg.customInfo.customCuboid
    group.addShape('polygon', {
      attrs: {
        points: result.slice(0, 4),
        ...cfg.defaultStyle,
        ...cfg.style,
        ...{
          fill: getCustomFieldValue(cfg, rightOptions.fill),
        },
      },
    })
    group.addShape('polygon', {
      attrs: {
        points: result.slice(4, 8),
        ...cfg.defaultStyle,
        ...cfg.style,
        ...{
          fill: getCustomFieldValue(cfg, topOptions.fill),
        },
      },
    })
    group.addShape('polygon', {
      attrs: {
        points: result.slice(8),
        ...cfg.defaultStyle,
        ...cfg.style,
        ...{
          fill: getCustomFieldValue(cfg, leftOptions.fill),
        },
      },
    })
    return group
  },
})

// 棱柱体-横向
G2.registerShape('interval', 'custom-cuboid2', {
  hypotenuse(long, angle) {
    // 获得弧度
    const radian = ((2 * Math.PI) / 360) * angle
    return {
      a: Math.sin(radian) * long, // 传入斜边求邻边
      b: Math.cos(radian) * long, // 传入斜边求对边
      c: Math.atan(radian) * long, // 传入邻边求对边
    }
  },
  // 1. 定义关键点
  getPoints(cfg) {
    const { x } = cfg
    const { y } = cfg
    const { y0 } = cfg
    const width = cfg.size
    const obj = this.hypotenuse(width / 2, 30)
    const yLen1 = y > 0 ? y - obj.c : 0
    const yLen2 = y > 0 ? y - 2*obj.c : 0
    return [
      // 透明占位，这样柱子方向才能正常显示,label也能正常设置位置,垂直居中
      { x: x - width/2, y: y0},
      { x: x + width/2, y: y0 },
      { x: x + width / 2, y: y },
      { x: x - width / 2, y: y  },
      // 右侧边
      { x , y: y0 },
      { x: x + width / 2, y: y0 },
      { x: x + width / 2, y: yLen1 },
      { x, y: yLen2 },

      // 顶部
      { x: x - width / 2, y: yLen1 },
      { x, y: yLen2 },
      { x: x + width / 2, y: yLen1 },
      { x, y },
      // 左侧边
      { x: x - width / 2, y: y0 },
      { x, y: y0 },
      { x, y: yLen2 },
      { x: x - width / 2, y: yLen1 },
    ]
  },
  // 2. 绘制
  draw(cfg, container) {
    const group = container.addGroup()
    const points = this.parsePoints(cfg.points) // 将0-1空间的坐标转换为画布坐标
    const result = []
    points.forEach((item) => {
      result.push([item.x, item.y])
    })
    const { 
       rightOptions,
      leftOptions,
       topOptions 
    } = cfg.customInfo.customCuboid
    group.addShape('polygon', {
      attrs: {
        points: result.slice(0, 4),
        ...cfg.defaultStyle,
        ...cfg.style,
        ...{
          fill: 'transparent',
        },
      },
    })
    group.addShape('polygon', {
      attrs: {
        points: result.slice(4, 8),
        ...cfg.defaultStyle,
        ...cfg.style,
        ...{
          fill: getCustomFieldValue(cfg, rightOptions.fill),
        },
      },
    })
    
    group.addShape('polygon', {
      attrs: {
        points: result.slice(8, 12),
        ...cfg.defaultStyle,
        ...cfg.style,
        ...{
          fill: getCustomFieldValue(cfg, topOptions.fill),
        },
      },
    })
    group.addShape('polygon', {
      attrs: {
        points: result.slice(12),
        ...cfg.defaultStyle,
        ...cfg.style,
        ...{
          fill: getCustomFieldValue(cfg, leftOptions.fill),
        },
      },
    })
    
    return group
  },
})

// 斜角长方形
G2.registerShape('interval', 'custom-bevel-cuboid', {
  hypotenuse(long, angle) {
    // 获得弧度
    const radian = ((2 * Math.PI) / 360) * angle
    return {
      a: Math.sin(radian) * long, // 邻边
      b: Math.cos(radian) * long, // 对边
      c: Math.atan(radian) * long, // 传入邻边求对边
    }
  },
  // 1. 定义关键点
  getPoints(cfg) {
    const { x } = cfg
    const { y } = cfg
    const { y0 } = cfg
    const width = cfg.size
    const halfWidth = width / 2
    const obj = this.hypotenuse(width, 60)
    return [
      { x: x - halfWidth, y: y0 },
      { x: x + halfWidth, y: y0 },
      { x: x + halfWidth, y },
      { x: x - halfWidth, y: y - obj.c > 0 ? y - obj.c : 0 }, // 减去的结果小于0，则最低为0
    ]
  },
  // 2. 绘制
  draw(cfg, container) {
    const group = container.addGroup()
    const points = this.parsePoints(cfg.points) // 将0-1空间的坐标转换为画布坐标
    const result = []
    points.forEach((item) => {
      result.push([item.x, item.y])
    })
    const { style } = cfg.customInfo.customBevelCuboid
    group.addShape('polygon', {
      attrs: {
        points: result,
        ...cfg.defaultStyle,
        ...cfg.style,
        ...{
          fill: getCustomFieldValue(cfg, style.fill),
          stroke: getCustomFieldValue(cfg, style.stroke),
        },
      },
    })
    return group
  },
})
// 圆柱体
G2.registerShape('interval', 'custom-cylinder', {
  // 1. 定义关键点
  getPoints(cfg) {
    const { x } = cfg
    const { y } = cfg
    const { y0 } = cfg
    const width = cfg.size
    const halfWidth = width / 2
    return [
      // 通过x和y记录圆柱宽度 从而得到半径
      { x: x - halfWidth, y: y0 },
      { x: x + halfWidth, y: y0 },
      // 背景长方形 底部两个点，顶部的点在外层计算
      { x: x + width / 2, y },
      { x: x - halfWidth, y },
      // 正面长方形
      { x: x - halfWidth, y: y0 },
      { x: x + halfWidth, y: y0 },
      { x: x + width / 2, y },
      { x: x - halfWidth, y },
      // 底部椭圆圆心位置
      { x, y: y0 },
      // 顶部椭圆圆心位置
      { x, y },

    ]
  },
  // 2. 绘制
  draw(cfg, container) {
    const group = container.addGroup()
    const points = this.parsePoints(cfg.points) // 将0-1空间的坐标转换为画布坐标
    const {
      bottomOptions, frontOptions,
      topOptions, backgroundOptions, backgroundTopOptions,
    } = cfg.customInfo.customCylinder
    // 先求得长半径和短半径，短半径即是各坐标y值需要移动的距离
    const rx = (points[1].x - points[0].x) / 2 // 除以2是大致设的，根据不同需求可以酌量修改
    const ry = (points[1].x - points[0].x) / 5 // 除以5是大致设的，根据不同需求可以酌量修改
    // 先画背景阴影的长方形
    // 重点，图表容器上方的坐标y值是0
    const bgList = points.slice(2, 4)
    const backgroundRectList = [
      [bgList[0].x, bgList[0].y],
      [bgList[1].x, bgList[0].y],
      [bgList[1].x, 0 + ry],
      [bgList[0].x, 0 + ry],
    ]
    group.addShape('polygon', {
      attrs: {
        points: backgroundRectList,
        ...cfg.defaultStyle,
        ...cfg.style,
        ...{
          fill: getCustomFieldValue(cfg, backgroundOptions.fill),
        },
      },
    })
    // 然后画实体的柱状条
    const rectangle = points.slice(4, 8)
    const result = []
    // 每个点高度减去半径
    rectangle.forEach((item, index) => {
      if (index < 2) {
      result.push([item.x, item.y - ry])

      } else {
      result.push([item.x, item.y])

      }
    })
    group.addShape('polygon', {
      attrs: {
        points: result,
        ...cfg.defaultStyle,
        ...cfg.style,
        ...{
          fill: getCustomFieldValue(cfg, frontOptions.fill),
        },
      },
    })
    
    // 底部圆
    const ellipse1 = points.slice(8, 9)
    
    group.addShape('ellipse', {
      attrs: {
        x: ellipse1[0].x,
        y: ellipse1[0].y - ry,
        rx,
        ry,
        ...cfg.defaultStyle,
        ...cfg.style,
        ...{
          fill: getCustomFieldValue(cfg, bottomOptions.fill),
        },
      },
    })

    // 画背景阴影的最顶部圆,圆心坐标x同其他的圆一样
    group.addShape('ellipse', {
      attrs: {
        x: ellipse1[0].x,
        y: 0 + 2 * ry, // 顶部坐标是0
        rx,
        ry,
        ...cfg.defaultStyle,
        ...cfg.style,
        ...{
          fill: getCustomFieldValue(cfg, backgroundTopOptions.fill),
        },
      },
    })

    // 顶部圆
    const ellipse2 = points.slice(9)
    console.log(ellipse1[0].y)
    console.log(ellipse2)
    group.addShape('ellipse', {
      attrs: {
        x: ellipse2[0].x,
        y: ellipse2[0].y,
        rx,
        ry: ellipse2[0].y < ellipse1[0].y ? ry : 0,
        ...cfg.defaultStyle,
        ...cfg.style,
        ...{
          fill: getCustomFieldValue(cfg, topOptions.fill),
        },
      },
    })

    return group
  },
})

const getCustomFieldValue = (cfg, field) => {
  if (typeof field === 'function') {
    return field(cfg.data)
  }
  return field
}
// 柱状条顶部短横线
G2.registerShape('interval', 'custom-short-line', {
  // 1. 定义关键点
  getPoints(cfg) {
    const { x } = cfg
    const { y } = cfg
    const { y0 } = cfg
  
    const width = cfg.size
    const halfWidth = width / 2
    return [
      { x: x - halfWidth, y: y0 },
      { x: x + halfWidth, y },
      {x: x - width, y},
      {x: x + width, y}
    ]
  },
  // 2. 绘制
  draw(cfg, container) {
    const group = container.addGroup()
    const points = this.parsePoints(cfg.points) // 将0-1空间的坐标转换为画布坐标
    const result = [
      [points[0].x, points[0].y],
      [points[0].x, points[1].y],
      [points[1].x, points[1].y],
      [points[1].x, points[0].y]
    ]

    const yLen = points[1].y < points[0].y ? points[1].y + 3 : points[1].y
    const lines = [
      [points[0].x, yLen],
      [points[0].x, points[1].y ],
      [points[1].x, points[1].y ],
      [points[1].x, yLen]
    ]
    const backgroundPoints = [
      [points[2].x, points[0].y],
      [points[2].x, 0 + 6],
      [points[3].x, 0 + 6],
      [points[3].x, points[0].y]
    ]
    const {  barFill,lineFill, backgroundFill } = cfg.customInfo.customShortLine
    group.addShape('polygon', {
      attrs: {
        points: backgroundPoints,
        ...cfg.defaultStyle,
        ...cfg.style,
        ...{
          fill: getCustomFieldValue(cfg, backgroundFill),
        },
      },
    })
    group.addShape('polygon', {
      attrs: {
        points: result,
        ...cfg.defaultStyle,
        ...cfg.style,
        ...{
          fill: getCustomFieldValue(cfg, barFill),
        },
      },
    })
    group.addShape('polygon', {
      attrs: {
        points: lines,
        ...cfg.defaultStyle,
        ...cfg.style,
        ...{
          fill: getCustomFieldValue(cfg, lineFill),
        },
      },
    })
    
    return group
  },
})

// 自定义marker
G2.registerShape('point', 'custom-point', {
  draw(cfg, container) {
    const point = { x: cfg.x, y: cfg.y }
    const group = container.addGroup()
    group.addShape('circle', {
      name: 'outer-point',
      attrs: {
        x: point.x,
        y: point.y,
        fill: cfg.color || cfg.style.fill,
        opacity: 0.5,
        r: 0, // 设置为0，让默认状态的点不显示
      },
    })
    group.addShape('circle', {
      name: 'inner-point',
      attrs: {
        x: point.x,
        y: point.y,
        fill: cfg.color || cfg.style.fill,
        opacity: 1,
        r: 0, // 设置为0，让默认状态的点不显示
      },
    })
    return group
  },
})
