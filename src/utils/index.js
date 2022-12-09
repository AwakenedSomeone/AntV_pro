import Big from 'big.js'
/**
 * 获取guid
 */
 export const guid = () => {
  // eslint-disable-next-line no-bitwise
  const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  return (`${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`)
}

/** *
 * 数字小数展示
 */
export function ToFixed(value = null, fixed = 2) {
  if (value) {
    if (value.toString().indexOf('.') >= 0
      && value.toString().split('.')[1].length > fixed) {
      return (new Big(value - 0).toFixed(fixed)) - 0
    }
    return value - 0
  }
  return value
}