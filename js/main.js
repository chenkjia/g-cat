
import './libs/adapter';
import './render'; // 初始化Canvas
import DataBus from './databus'; // 导入数据类，用于管理游戏状态和数据

const ctx = canvas.getContext('2d'); // 获取canvas的2D绘图上下文;

globalThis.databus = new DataBus(); // 全局数据管理，用于管理游戏状态和数据

/**
 * 游戏主函数
 */
export default class Main {

  constructor() {
  }

}
