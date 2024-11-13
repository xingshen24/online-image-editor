import { Canvas } from "fabric";
import ImageEditor from "../image_editor";
import { DEFAULT_COLOR, DEFAULT_STROKE_WIDTH, ImageEditorOperator, OperatorProps, OperatorType } from "../image_editor_operator";
import Arrow from "./fabric_arrow";
import FabricObjectChangeHelper from "./move_helper";

export default class ArrowOperator implements ImageEditorOperator, OperatorProps {

  private imageEditor: ImageEditor;

  private canvas: Canvas;

  private start: boolean;

  private current: Arrow | undefined = undefined;

  private startX: number;

  private startY: number;

  private color: string = DEFAULT_COLOR;

  private strokeWidth: number = DEFAULT_STROKE_WIDTH;

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
    let refuse = this.canvas.getActiveObject() != undefined || this.start;
    refuse = refuse || this.imageEditor.getOperatorType() != OperatorType.ARROW;
    if (refuse) {
      return
    }
    this.start = true;
    const canvas = this.canvas;
    canvas.requestRenderAll();
    let point = canvas.getScenePoint(event.e);
    const points: [number, number, number, number] = [point.x, point.y, point.x, point.y];
    this.startX = point.x;
    this.startY = point.y;
    const arrow = new Arrow(points, {
      strokeWidth: this.strokeWidth,
      stroke: this.color,
      lockScalingFlip: true
    })
    this.current = arrow;
    canvas.add(arrow);
  }

  handleMouseMove(event: any): void {
    if (!this.start) {
      return;
    }
    const pointer = this.canvas.getScenePoint(event.e);
    this.current?.set({
      x2: pointer.x,
      y2: pointer.y
    })
    this.canvas.renderAll();
  }

  handleMouseUp(event: any): void {
    if (this.imageEditor.getOperatorType() != OperatorType.ARROW || !this.start) {
      return;
    }
    this.start = false;
    const canvas = this.canvas;
    const pointer = canvas.getScenePoint(event.e);
    const notMeetMin = Math.abs(pointer.x - this.startX) < 8 && Math.abs(pointer.y - this.startY) < 8;
    if (notMeetMin && this.current) {
      this.canvas.remove(this.current);
    } else {
      const lastXY = this.current?.getXY();
      const lastSize = {
        width: this.current!.width,
        height: this.current!.height
      }
      this.current!.set('lastXY', lastXY);
      this.current!.set('lastDim', lastSize);
      FabricObjectChangeHelper.listenMove(this.current!, this.imageEditor.getHistory());
      FabricObjectChangeHelper.listenScale(this.current!, this.imageEditor.getHistory());
      this.imageEditor.getHistory().recordCreateAction(this.current!);
    }
  }
}