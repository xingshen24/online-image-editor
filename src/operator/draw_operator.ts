import { BaseBrush, Canvas, PencilBrush, Shadow } from "fabric";
import OperationHistory from "../history";
import ImageEditor from "../image_editor";
import { DEFAULT_COLOR, DEFAULT_STROKE_WIDTH, OperatorProps } from "../image_editor_operator";
import FabricObjectChangeHelper from "./move_helper";

export default class DrawOperator implements OperatorProps {

  private imageEditor: ImageEditor;

  private canvas: Canvas;

  private history: OperationHistory;

  private color: string = DEFAULT_COLOR;

  private strokeWidth: number = DEFAULT_STROKE_WIDTH;

  private recorder: (event: any) => void;

  private brush: BaseBrush | undefined;

  constructor(imageEditor: ImageEditor) {
    this.imageEditor = imageEditor;
    this.canvas = imageEditor.getCanvas();
    this.history = imageEditor.getHistory();
    this.recorder = this.recordPathCreate.bind(this);
  }
  getOperatorSize(): number {
    return this.strokeWidth;
  }
  getOperatorColor(): string {
    return this.color;
  }

  setOperatorSize(width: number): void {
    this.strokeWidth = width;
    this.brush!.width = width;
  }

  setOperatorColor(color: string): void {
    this.color = color;
    this.brush!.color = color;
  }

  recordPathCreate(event: any) {
    const path = event.path;
    path.hoverCursor = 'default';
    path.perPixelTargetFind = true;
    path.lockScalingFlip = true;
    this.canvas.renderAll();
    const lastXY = path.getXY();
    const lastScale = {
      x: path.scaleX,
      y: path.scaleY
    }
    path.set('lastXY', lastXY);
    path.set('lastScale', lastScale);
    FabricObjectChangeHelper.listenMove(path, this.imageEditor.getHistory());
    FabricObjectChangeHelper.listenRatioScale(path, this.imageEditor.getHistory());
    this.history.recordCreateAction(path);
  }

  startDrawMode(): void {
    const canvas = this.canvas;
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush = new PencilBrush(canvas);
    this.brush = canvas.freeDrawingBrush;
    let brush = canvas.freeDrawingBrush;
    brush.color = this.color;
    brush.width = this.strokeWidth;
    brush.shadow = new Shadow({ blur: 2, offsetX: 0, offsetY: 0, color: '#333' })
    this.canvas.on('path:created', this.recorder);
  }

  endDrawMode(): void {
    this.canvas.isDrawingMode = false;
    this.canvas.off('path:created', this.recorder);
  }
}