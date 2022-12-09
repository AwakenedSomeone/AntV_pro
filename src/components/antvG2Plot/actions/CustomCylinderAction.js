/* eslint-disable class-methods-use-this */
import { G2 } from '@antv/g2plot'

const { InteractionAction, registerInteraction, registerAction } = G2

// 自定义柱状图交互
export class CustomCylinderAction extends InteractionAction {
  toggle() {
    const view = this.getView()
    const evt = this.context.event
    if (evt.data) {
      // items: 数组对象，当前 tooltip 显示的每条内容
      const { data } = evt.data
      const pointGeometries = view.geometries.filter((geom) => geom.type === 'interval')
      pointGeometries.forEach((pointGeometry) => {
        const { customCylinder } = pointGeometry.customOption
        const {
          bottomOptions, frontOptions,
          topOptions, backgroundOptions, backgroundTopOptions,
        } = customCylinder
        pointGeometry.elements.forEach((pointElement) => {
          const active = data === pointElement.data
          const [point0, point1, point2, point3, point4] = pointElement.shape.getChildren()
          if (active) {
            const attr0 = point0.get('attrs')
            point0.attr(
              {
                fill: this.getSetFill(attr0.fill, backgroundOptions),
              },
            )
            const attr1 = point1.get('attrs')
            point1.attr(
              {
                fill: this.getSetFill(attr1.fill, frontOptions),
              },
            )
            const attr2 = point2.get('attrs')
            point2.attr(
              {
                fill: this.getSetFill(attr2.fill, bottomOptions),
              },
            )
            const attr3 = point3.get('attrs')
            point3.attr(
              {
                fill: this.getSetFill(attr3.fill, backgroundTopOptions),
              },
            )
            const attr4 = point4.get('attrs')
            point4.attr(
              {
                fill: this.getSetFill(attr4.fill, topOptions),
              },
            )
          } else {
            this.resetElementState(pointElement)
          }
        })
      })
    }
  }

  getSetFill(current, target) {
    if (current === target.fill) {
      return target.activeFill
    }
    return target.fill
  }

  reset() {
    const view = this.getView()
    const points = view.geometries.filter((geom) => geom.type === 'interval')
    points.forEach((point) => {
      point.elements.forEach((pointElement) => {
        this.resetElementState(pointElement)
      })
    })
  }

  resetElementState(element) {
    const childrens = element.shape.getChildren()
    childrens.forEach((child) => {
      const { fill } = child.get('attrs')
      child.attr({ fill })
    })
  }

  getView() {
    return this.context.view
  }
}

registerAction('custom-cylinder-action', CustomCylinderAction)
registerInteraction('custom-cylinder-interaction', {
  start: [
    {
      trigger: 'element:click',
      action: 'custom-cylinder-action:toggle',
    },
    {
      trigger: 'element:mouseenter',
      action: 'custom-cylinder-action:toggle',
    },
  ],
  end: [
    {
      trigger: 'element:mouseleave',
      action: 'custom-cylinder-action:reset',
    },
  ],
})
