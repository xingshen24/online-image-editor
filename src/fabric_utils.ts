import { FabricObject } from "fabric";


export class FabricUtils {

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
