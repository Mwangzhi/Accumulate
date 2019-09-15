import VirtualDOM from './virtual-dom'
/**
 * 用于构造一个virtual-dom结构
 * @param {*} componentType
 * @param {*} props
 * @param {*} args
 */
export default function (componentType, props, ...args){
  return new VirtualDOM(componentType, props, ...args)
}