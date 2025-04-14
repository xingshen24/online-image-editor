import { filters, T2DPipelineState, TWebGLPipelineState } from "fabric";

export const calcScaleFactor = (sourceWidth: number, sourceHeigt: number, maxWidth: number, maxHeigt: number) => {
  const xRatio = sourceWidth / maxWidth;
  const yRatio = sourceHeigt / maxHeigt;
  if (xRatio <= 1 && yRatio <= 1) {
    return 1;
  }
  return 1 / Math.max(xRatio, yRatio);
}

export class MaxWidthHeightResizer extends filters.Resize {

  private maxWidth: number;

  private maxHeight: number;

  constructor(options: any) {
    super(options);
    this.maxHeight = options.maxHeight;
    this.maxWidth = options.maxWidth;
  }

  applyTo(options: TWebGLPipelineState | T2DPipelineState) {
    const scale = calcScaleFactor(options.sourceWidth, options.sourceHeight, this.maxWidth, this.maxHeight)
    if (scale !== 1) {
      this.scaleX = scale;
      this.scaleY = scale;
    }
    console.log(scale)
    super.applyTo(options);
  }

  isNeutralState(): boolean {
    return false;
  }

}