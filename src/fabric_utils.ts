import { FabricObject, TransformActionHandler, controlsUtils } from "fabric";
import ImageEditor from "./image_editor";


export class FabricUtils {

  public static setCenterOrigin(fo: FabricObject) {
    fo.originX = 'center'
    fo.originY = 'center'
  }

  public static setCornerControlsOnly(fo: FabricObject, ie: ImageEditor) {
    const actionToWrap: TransformActionHandler = (_eventData, transform) => {
      const currTransform = ie.getTransformer();
      if (currTransform === null) {
        return false;
      }
      if (currTransform.target !== fo) {
        return false;
      }
      return true;
    };

    const scalingEqually = controlsUtils.wrapWithFireEvent(
      'scaling',
      controlsUtils.wrapWithFixedAnchor(actionToWrap),
    );

    fo.controls.br.actionHandler = scalingEqually;
    fo.setControlsVisibility({
      tl: true,  // 左上角
      tr: true,  // 右上角
      bl: true,  // 左下角
      br: true,  // 右下角
    });
  }
}
