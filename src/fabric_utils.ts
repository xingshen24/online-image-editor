import { FabricObject, Point } from "fabric";
import ImageEditor from "./image_editor";


export class FabricUtils {

  // 在scale的时候，直接重新绘制，不要等比例变换，等比例变换会导致矩形、箭头出问题
  public static setScaleToRedraw(fo: FabricObject, imageEditor: ImageEditor) {
    fo.on('scaling', () => {
      const transform = imageEditor.getTransform();
      if (!transform || transform.target !== fo) {
        return;
      }

      const state = imageEditor.getTransformState();
      const { scaleX, scaleY, width, height } = fo;
      const { scaleX: oriScaleX, scaleY: oriScaleY } = state;

      // x y的位置保持不变，原地进行变化
      fo.set({
        width: width * scaleX,
        height: height * scaleY,
        scaleX: oriScaleX, // 重置缩放
        scaleY: oriScaleY
      });

      // 缓存会导致图像不能正确的放缩
      fo.objectCaching = false;
    })
  }

  // 专门针对椭圆进行的重绘
  public static setScaleToRedrawEllipse(fo: FabricObject, imageEditor: ImageEditor) {

    fo.on('scaling', () => {

      const transform = imageEditor.getTransform();
      if (!transform || transform.target !== fo) {
        return;
      }

      const state = imageEditor.getTransformState();
      const { scaleX, scaleY, width, height } = fo;
      const { scaleX: oriScaleX, scaleY: oriScaleY } = state;

      const strokeWidth = fo.strokeWidth;
      let rx = width * scaleX / 2;
      let ry = height * scaleY / 2;
      if (rx > strokeWidth / 2) {
        rx = rx - strokeWidth / 2;
      }
      if (ry > strokeWidth / 2) {
        ry = ry - strokeWidth / 2;
      }
      fo.set({
        rx, ry,
        width: width * scaleX,
        height: height * scaleY,
        scaleX: oriScaleX, // 重置缩放
        scaleY: oriScaleY
      });
      // 缓存会导致图像不能正确的放缩
      fo.objectCaching = false;
    })
  }

  public static setCenterOrigin(fo: FabricObject) {
    fo.originX = 'center'
    fo.originY = 'center'
  }

  public static setCornerControlsOnly(fo: FabricObject) {
    fo.setControlsVisibility({
      mt: false, // 中上
      mb: false, // 中下
      ml: false, // 中左
      mr: false, // 中右
      mtr: false, // 旋转
      tl: true,  // 左上角
      tr: true,  // 右上角
      bl: true,  // 左下角
      br: true   // 右下角
    });
  }
}
