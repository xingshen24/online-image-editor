import { Ellipse, FabricObject } from "fabric";
import OperationHistory from "../history";

export default class FabricObjectChangeHelper {

  static listenMove(obj: FabricObject, history: OperationHistory) {
    obj.on('moving', () => {
      if (!obj.get('movingFlag')) {
        obj.set('movingFlag', true);
      }
    })
    obj.on('mouseup', () => {
      if (!obj.get('movingFlag')) {
        return;
      }
      obj.set('movingFlag', undefined);
      const pos = obj.get('lastXY');
      obj.set('lastXY', obj.getXY());
      history.recordMoveAction(obj, pos.x, pos.y);
    })
  }

  static listenScale(obj: FabricObject, history: OperationHistory) {
    obj.on('scaling', () => {
      if (!obj.get('scalingFlag')) {
        obj.set('scalingFlag', true);
      }

      const { scaleX, scaleY } = obj;
      // 这个地方还不能四舍五入，在结束的地方四舍五入比较好
      // 四舍五入导致向左上拉的时候，位置会出现偏差
      obj.set({
        width: obj.width * scaleX,
        height: obj.height * scaleY,
        scaleX: 1, // 重置缩放
        scaleY: 1
      });

      // 缓存会导致图像不能正确的放缩
      obj.objectCaching = false;
    })

    obj.on('mouseup', () => {
      // 还原缓存
      obj.objectCaching = true;
      const flag = obj.get('scalingFlag')
      if (!flag) {
        return
      }
      obj.set('scalingFlag', undefined);
      const dim = obj.get('lastDim');
      const pos = obj.get('lastXY');
      const width = dim.width;
      const height = dim.height;
      const currWidth = obj.width;
      const currHeight = obj.height;
      const currDim = {
        width: currWidth,
        height: currHeight
      }
      obj.set('lastDim', currDim);
      obj.set('lastXY', obj.getXY());
      history.recordScaleAction(obj, width, height, pos.x, pos.y)
    })
  }

  static listenEllipseScale(obj: Ellipse, history: OperationHistory) {
    obj.on('scaling', () => {
      if (!obj.get('scalingFlag')) {
        obj.set('scalingFlag', true);
      }

      const { scaleX, scaleY } = obj;
      const strokeWidth = obj.strokeWidth;
      let rx = obj.width * scaleX / 2;
      let ry = obj.height * scaleY / 2;
      if (rx > strokeWidth / 2) {
        rx = rx - strokeWidth / 2;
      }
      if (ry > strokeWidth / 2) {
        ry = ry - strokeWidth / 2;
      }
      obj.set({
        rx, ry,
        width: obj.width * scaleX,
        height: obj.height * scaleY,
        scaleX: 1, // 重置缩放
        scaleY: 1
      });
      // 缓存会导致图像不能正确的放缩
      obj.objectCaching = false;
    })

    obj.on('mouseup', () => {
      // 还原缓存
      obj.objectCaching = true;
      const flag = obj.get('scalingFlag')
      if (!flag) {
        return
      }
      obj.set('scalingFlag', undefined);
      const dim = obj.get('lastDim');
      const pos = obj.get('lastXY');
      const rxy = obj.get('lastRXY');
      const width = dim.width;
      const height = dim.height;
      const rx = rxy.rx;
      const ry = rxy.ry;
      const currWidth = obj.width;
      const currHeight = obj.height;
      const currDim = {
        width: currWidth,
        height: currHeight
      }
      const currRXY = {
        rx: obj.rx,
        ry: obj.ry
      }
      obj.set('lastDim', currDim);
      obj.set('lastXY', obj.getXY());
      obj.set('lastRXY', currRXY)
      history.recordEllipseScaleAction(obj, width, height, pos.x, pos.y, rx, ry)
    })
  }

  // 框选，椭圆，箭头，都不是等比例缩放
  // 文字、画笔是等比例缩放，要考虑一下等比例缩放的问题
  static listenRatioScale(obj: FabricObject, history: OperationHistory) {
    obj.on('scaling', () => {
      if (!obj.get('scalingFlag')) {
        obj.set('scalingFlag', true);
      }
    })

    obj.on('mouseup', () => {
      // 还原缓存
      obj.objectCaching = true;
      const flag = obj.get('scalingFlag')
      if (!flag) {
        return
      }
      obj.set('scalingFlag', undefined);
      const scale = obj.get('lastScale');
      const pos = obj.get('lastXY');
      const scaleX = scale.x;
      const scaleY = scale.y;
      const currScale = {
        x: obj.scaleX,
        y: obj.scaleY
      }
      obj.set('lastScale', currScale);
      obj.set('lastXY', obj.getXY());
      history.recordRatioScaleAction(obj, scaleX, scaleY, pos.x, pos.y)
    })
  }
}