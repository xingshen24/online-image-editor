import { BaseBrush, Canvas, PencilBrush, Shadow } from "fabric";
import OperationHistory from "../history";
import ImageEditor from "../image_editor";
import { DEFAULT_COLOR, DEFAULT_STROKE_WIDTH, OperatorProps, OperatorType } from "../image_editor_operator";

export default class DrawOperator implements OperatorProps {

  private imageEditor: ImageEditor;

  private canvas: Canvas;

  private history: OperationHistory;

  private color: string = DEFAULT_COLOR;

  private strokeWidth: number = DEFAULT_STROKE_WIDTH;

  private recorder: (event: any) => void;

  private brush: BaseBrush | undefined;

  private enableDraw = false;

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
    const boundingRect = path.getBoundingRect();

    // 将原点从 left/top 转为 center
    path.set({
      originX: 'center',
      originY: 'center',
      left: boundingRect.left + boundingRect.width / 2,
      top: boundingRect.top + boundingRect.height / 2,
    });

    path.perPixelTargetFind = true;
    path.lockScalingFlip = true;

    this.canvas.renderAll();
    this.history.recordCreateAction(path);
  }

  tryToStartDraw() {
    if (this.imageEditor.getOperatorType() !== OperatorType.DRAW) {
      return;
    }
    if (!this.canvas._hoveredTarget) {
      this.enableDraw = true;
      this.startDrawMode();
    }
  }

  tryToFinishDraw() {
    if (this.imageEditor.getOperatorType() !== OperatorType.DRAW) {
      return;
    }
    if (this.enableDraw) {
      this.endDrawMode();
      this.enableDraw = false;
    }
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