import { FabricObject } from "fabric";

export class FabricUtils {

  public static setCenterOrigin(fo: FabricObject) {
    fo.originX = 'center'
    fo.originY = 'center'
  }
  
}