import { Canvas, Ellipse, Point } from "fabric";
import { FabricUtils } from "../fabric_utils";
import ImageEditor from "../image_editor";
import { DEFAULT_COLOR, DEFAULT_STROKE_WIDTH, ImageEditorOperator, OperatorProps, OperatorType } from "../image_editor_operator";

export default class EllipseOperator implements ImageEditorOperator, OperatorProps {

  private imageEditor: ImageEditor;

  private canvas: Canvas;

  private start: boolean;

  private current: Ellipse | undefined = undefined;

  private startX: number;

  private startY: number;

  private strokeWidth: number = DEFAULT_STROKE_WIDTH;

  private color: string = DEFAULT_COLOR;

  constructor(imageEditor: ImageEditor) {
    this.imageEditor = imageEditor;
    this.canvas = imageEditor.getCanvas();
    this.start = false;
    this.startX = 0;
    this.startY = 0;
  }
  getOperatorSize(): number {
    return this.strokeWidth;
  }
  getOperatorColor(): string {
    return this.color;
  }
  setOperatorSize(width: number): void {
    this.strokeWidth = width;
  }
  setOperatorColor(color: string): void {
    this.color = color;
  }

  handleMouseDown(event: any): void {
    const canvas = this.canvas;
    if (canvas.getActiveObject() != undefined) {
      return;
    }
    if (this.imageEditor.getOperatorType() != OperatorType.ELLIPSE) {
      return;
    }
    if (this.start) {
      return;
    }
    this.start = true;
    let pointer = canvas.getScenePoint(event.e);
    this.startX = pointer.x;
    this.startY = pointer.y;
    this.current = new Ellipse({
      originX: 'center',
      originY: 'center',
      rx: 0,
      ry: 0,
      fill: 'transparent',
      stroke: this.color,
      strokeWidth: this.strokeWidth,
      lockScalingFlip: true,
      perPixelTargetFind: true
    })
    canvas.add(this.current);
  }

  handleMouseMove(event: any): void {
    if (!this.start) {
      return;
    }
    let pointer = this.canvas.getScenePoint(event.e);
    let rx = Math.abs(pointer.x - this.startX) / 2;
    let ry = Math.abs(pointer.y - this.startY) / 2;
    if (rx > this.strokeWidth / 2) {
      rx = rx - this.strokeWidth / 2
    }
    if (ry > this.strokeWidth / 2) {
      ry = ry - this.strokeWidth / 2
    }
    let x = (this.startX + pointer.x) / 2;
    let y = (this.startY + pointer.y) / 2;

    this.current!.set('rx', rx);
    this.current!.set('ry', ry);
    this.current!.setXY(new Point(x, y));

    this.canvas.requestRenderAll();
  }

  handleMouseUp(event: any): void {
    if (!this.start || this.imageEditor.getOperatorType() != OperatorType.ELLIPSE) {
      return
    }
    this.start = false;
    let pointer = this.canvas.getScenePoint(event.e);
    if (pointer.x == this.startX || pointer.y == this.startY) {
      this.canvas.remove(this.current!);
    } else {
      FabricUtils.setScaleToRedrawEllipse(this.current!, this.imageEditor);
      this.imageEditor.getHistory().recordCreateAction(this.current!);
      this.canvas.setActiveObject(this.current!)
      this.current!.setCoords();
    }
    this.current = undefined;
  }
}