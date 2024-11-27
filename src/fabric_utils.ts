import { controlsUtils, FabricObject } from "fabric";

export class FabricUtils {

  public static setCenterOrigin(fo: FabricObject) {
    fo.originX = 'center'
    fo.originY = 'center'
  }

  public static setCornerControlsOnly(fo: FabricObject) {
    console.log(fo)
    fo.setControlsVisibility({
      tl: true,  // 左上角
      tr: true,  // 右上角
      bl: true,  // 左下角
      br: true,  // 右下角
    });
  }
}