/* eslint-disable class-methods-use-this */
import { G2 } from '@antv/g2plot'

const { InteractionAction, registerInteraction, registerAction } = G2
// 自定义marker交互
export class CustomMarkerAction extends InteractionAction {
  active() {
    const view = this.getView()
    const evt = this.context.event
    if (evt.data) {
      // items: 数组对象，当前 tooltip 显示的每条内容
      const { items } = evt.data
      const pointGeometries = view.geometries.filter((geom) => geom.type === 'point')
      pointGeometries.forEach((pointGeometry) => {
        pointGeometry.elements.forEach((pointElement) => {
          const active = items.findIndex((item) => item.data === pointElement.data) !== -1
          const [point0, point1] = pointElement.shape.getChildren()
          if (active) {
            // outer-circle
            point0.animate(
              {
                r: 12,
                opacity: 0.2,
              },
              {
                duration: 1800,
                easing: 'easeLinear',
                repeat: true,
              },
            )
            // inner-circle
            point1.animate(
              {
                r: 8,
                opacity: 0.4,
              },
              {
                duration: 800,
                easing: 'easeLinear',
                repeat: true,
              },
            )
          } else {
            this.resetElementState(pointElement)
          }
        })
      })
    }
  }

  reset() {
    const view = this.getView()
    const points = view.geometries.filter((geom) => geom.type === 'point')
    points.forEach((point) => {
      point.elements.forEach((pointElement) => {
        this.resetElementState(pointElement)
      })
    })
  }

  resetElementState(element) {
    const [point0, point1] = element.shape.getChildren()
    point0.stopAnimate()
    point1.stopAnimate()
    const { r, opacity } = point0.get('attrs')
    point0.attr({ r, opacity })
    const { r: r1, opacity: opacity1 } = point1.get('attrs')
    point1.attr({ r: r1, opacity: opacity1 })
  }

  getView() {
    return this.context.view
  }
}

registerAction('custom-marker-action', CustomMarkerAction)
registerInteraction('custom-marker-interaction', {
  start: [
    {
      trigger: 'tooltip:show',
      action: 'custom-marker-action:active',
    },
  ],
  end: [
    {
      trigger: 'tooltip:hide',
      action: 'custom-marker-action:reset',
    },
  ],
})
