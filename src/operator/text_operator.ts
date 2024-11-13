import { Canvas, IText } from "fabric";
import ImageEditor from "../image_editor";
import { DEFAULT_COLOR, ImageEditorOperator, OperatorProps, OperatorType } from "../image_editor_operator";
import FabricObjectChangeHelper from "./move_helper";

export default class TextOperator implements ImageEditorOperator, OperatorProps {

  private imageEditor: ImageEditor;

  private canvas: Canvas;

  private start: boolean = false;

  private startX: number;

  private startY: number;

  private allowCreate: boolean = true;

  private fontSize: number = 20;

  private color: string = DEFAULT_COLOR;

  constructor(imageEditor: ImageEditor) {
    this.imageEditor = imageEditor;
    this.canvas = imageEditor.getCanvas();
    this.startX = 0;
    this.startY = 0;
  }

  getOperatorSize(): number {
    return this.fontSize;
  }

  getOperatorColor(): string {
    return this.color;
  }

  setOperatorSize(fontSize: number): void {
    this.fontSize = fontSize;
  }

  setOperatorColor(color: string): void {
    this.color = color;
  }

  handleMouseDownBefore(): void {
    if (this.imageEditor.getOperatorType() != OperatorType.TEXT) {
      return
    }
    if (this.canvas.getActiveObject()) {
      this.allowCreate = false;
    } else {
      this.allowCreate = true;
    }
  }

  handleMouseDown(event: any): void {
    if (!this.allowCreate) {
      return;
    }
    const canvas = this.canvas;
    if (canvas.getActiveObject() || this.imageEditor.getOperatorType() != OperatorType.TEXT) {
      return;
    }

    const pointer = canvas.getScenePoint(event.e);
    this.startX = pointer.x;
    this.startY = pointer.y;
    this.start = true;
  }

  handleMouseUp(event: any): void {
    if (!this.allowCreate) {
      return;
    }
    if (!this.start || this.imageEditor.getOperatorType() != OperatorType.TEXT) {
      return
    }
    this.start = false;
    const canvas = this.canvas;
    const pointer = canvas.getScenePoint(event.e);
    const width = Math.abs(pointer.x - this.startX);
    const height = Math.abs(pointer.y - this.startY);

    if (width * width + height * height > 100) {
      return;
    }

    const text = new IText('请输入内容', {
      left: pointer.x,
      top: pointer.y,
      fontSize: this.fontSize,
      fill: this.color,
      lockScalingFlip: true
    } as any);

    text.setControlVisible('mt', false);
    text.setControlVisible('mb', false);
    text.setControlVisible('ml', false);
    text.setControlVisible('mr', false);

    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();

    const lastXY = text.getXY();
    const lastScale = {
      x: text.scaleX,
      y: text.scaleY
    }
    text.set('lastXY', lastXY);
    text.set('lastScale', lastScale);
    FabricObjectChangeHelper.listenMove(text, this.imageEditor.getHistory());
    FabricObjectChangeHelper.listenRatioScale(text, this.imageEditor.getHistory());
    this.imageEditor.getHistory().recordCreateAction(text);
  }
}