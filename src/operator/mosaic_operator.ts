import { Canvas, PatternBrush, Shadow } from "fabric";
import ImageEditor from "../image_editor";
import OperationHistory from "../history";
import { DEFAULT_COLOR, OperatorProps } from "../image_editor_operator";

const blockSize = 5;

function mosaicify(imageData: any) {
  const { data } = imageData;
  const iLen = imageData.height;
  const jLen = imageData.width;
  let index;
  let i, _i, _iLen, j, _j, _jLen, r, g, b, a;
  for (i = 0; i < iLen; i += blockSize) {
    for (j = 0; j < jLen; j += blockSize) {
      index = i * 4 * jLen + j * 4;
      r = data[index];
      g = data[index + 1];
      b = data[index + 2];
      a = data[index + 3];

      _iLen = Math.min(i + blockSize, iLen);
      _jLen = Math.min(j + blockSize, jLen);
      for (_i = i; _i < _iLen; _i++) {
        for (_j = j; _j < _jLen; _j++) {
          index = _i * 4 * jLen + _j * 4;
          data[index] = r;
          data[index + 1] = g;
          data[index + 2] = b;
          data[index + 3] = a;
        }
      }
    }
  }
}

export default class MosaicOperator implements OperatorProps {

  private canvas: Canvas;

  private history: OperationHistory;

  // 10小 20中 40大
  private width: number = 20;

  private mosaicBrush: PatternBrush | undefined;

  private recorder: (event: any) => void;

  constructor(imageEditor: ImageEditor) {
    this.canvas = imageEditor.getCanvas();
    this.history = imageEditor.getHistory();
    this.recorder = this.recordPathCreate.bind(this);
  }
  getOperatorSize(): number {
    return this.width;
  }
  getOperatorColor(): string {
    return DEFAULT_COLOR;
  }
  setOperatorSize(width: number): void {
    this.width = width;
    this.mosaicBrush!.width = width;
  }

  setOperatorColor(): void {
    // ignore
  }

  recordPathCreate(event: any) {
    const path = event.path;
    path.selectable = false;
    path.evented = false;
    path.hoverCursor = 'default';
    path.lockScalingFlip = true
    this.canvas.renderAll();
    this.history.recordCreateAction(path);
  }

  startMosaicMode() {
    const canvas = this.canvas;
    canvas.isDrawingMode = true;
    const mosaicBrush = new PatternBrush(canvas);
    this.mosaicBrush = mosaicBrush;
    canvas.freeDrawingBrush = mosaicBrush;
    mosaicBrush.width = this.width;
    mosaicBrush.shadow = new Shadow({
      blur: 0,
      offsetX: 0,
      offsetY: 0,
      affectStroke: true,
    });
    mosaicBrush.getPatternSrc = function () {
      // 创立一个暂存 canvas 来绘製要画的图案
      const cropping = {
        left: 0,
        top: 0,
        width: canvas.width,
        height: canvas.height,
      };

      const imageCanvas = canvas.toCanvasElement(1, cropping);
      const imageCtx = imageCanvas.getContext('2d')!;
      const imageData = imageCtx.getImageData(
        0,
        0,
        imageCanvas.width,
        imageCanvas.height,
      );
      mosaicify(imageData);
      imageCtx.putImageData(imageData, 0, 0);

      const patternCanvas = document.createElement('canvas'); // 这里的ceateElement一定要使用fabric内置的方法
      const patternCtx = patternCanvas.getContext('2d')!;
      patternCanvas.width = canvas.width || 0;
      patternCanvas.height = canvas.height || 0;
      patternCtx.drawImage(
        imageCanvas,
        0,
        0,
        imageCanvas.width,
        imageCanvas.height,
        cropping.left,
        cropping.top,
        cropping.width,
        cropping.height,
      );
      return patternCanvas;
    };
    this.canvas.on('path:created', this.recorder);
  }

  endMosaicMode() {
    this.canvas.isDrawingMode = false;
    this.canvas.off('path:created', this.recorder);
  }
}