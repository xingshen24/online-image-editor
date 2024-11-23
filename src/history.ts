import { Canvas, Ellipse, FabricObject, Point, TDegree } from "fabric";
import ImageEditor from "./image_editor";
import { CanvasDimsRecord, CanvasReshaperAction } from "./undoer/CanvasReshaper";
import { CanvasSnapshot, CanvasSnapshotAction } from "./undoer/CanvasSnapshot";

export interface OperationAction {

  undo(): void;

  redo(): void;
}

enum State {
  CAN_UNDO, CAN_REDO
}

class CreateAction implements OperationAction {

  protected canvas: Canvas;

  protected object: FabricObject;

  protected state: State = State.CAN_UNDO;

  constructor(canvas: Canvas, object: FabricObject) {
    this.canvas = canvas;
    this.object = object;
  }

  undo() {
    if (this.state == State.CAN_UNDO) {
      this.canvas.remove(this.object);
      this.canvas.renderAll();
      this.state = State.CAN_REDO;
    }
  }

  redo() {
    if (this.state == State.CAN_REDO) {
      this.canvas.add(this.object);
      this.canvas.renderAll();
      this.state = State.CAN_UNDO;
    }
  }
}

class RemoveAction implements OperationAction {

  protected canvas: Canvas;

  protected object: FabricObject;

  protected state: State = State.CAN_UNDO;

  constructor(canvas: Canvas, object: FabricObject) {
    this.canvas = canvas;
    this.object = object;
  }

  undo() {
    if (this.state == State.CAN_UNDO) {
      this.canvas.add(this.object);
      this.canvas.renderAll();
      this.state = State.CAN_REDO;
    }
  }

  redo() {
    if (this.state == State.CAN_REDO) {
      this.canvas.remove(this.object);
      this.canvas.renderAll();
      this.state = State.CAN_UNDO;
    }
  }
}

class MoveAction implements OperationAction {

  protected canvas: Canvas;

  protected object: FabricObject;

  protected previousX: number;

  protected previousY: number;

  protected currentX: number;

  protected currentY: number;

  constructor(canvas: Canvas, object: FabricObject, previousX: number, previousY: number) {
    this.object = object;
    this.previousX = previousX;
    this.previousY = previousY;
    this.currentX = object.getX();
    this.currentY = object.getY();
    this.canvas = canvas;
  }

  undo(): void {
    this.object.setX(this.previousX);
    this.object.setY(this.previousY);
    this.object.setCoords();
    this.canvas.renderAll();
  }

  redo(): void {
    this.object.setX(this.currentX);
    this.object.setY(this.currentY);
    this.object.setCoords();
    this.canvas.renderAll();
  }

}

class ScaleAction implements OperationAction {

  protected canvas: Canvas;

  protected object: FabricObject;

  protected previousWidth: number;

  protected previousHeight: number;

  protected previousX: number;

  protected previousY: number;

  protected currentWidth: number;

  protected currentHeight: number;

  protected currentX: number;

  protected currentY: number;

  constructor(canvas: Canvas, object: FabricObject, previousWidth: number, previousHeight: number, previousX: number, previousY: number) {
    this.canvas = canvas;
    this.object = object;
    this.previousWidth = previousWidth;
    this.previousHeight = previousHeight;
    this.previousX = previousX;
    this.previousY = previousY;
    this.currentWidth = object.get('width');
    this.currentHeight = object.get('height');
    this.currentX = object.getX();
    this.currentY = object.getY();
  }

  undo(): void {
    this.object.set({ width: this.previousWidth, height: this.previousHeight });
    this.object.setX(this.previousX);
    this.object.setY(this.previousY);
    this.canvas.renderAll();
  }

  redo(): void {
    this.object.set({ width: this.currentWidth, height: this.currentHeight });
    this.object.setX(this.currentX);
    this.object.setY(this.currentY);
    this.canvas.renderAll();
  }
}

class EllipseScaleAction extends ScaleAction {

  protected previousRX: number;

  protected previousRY: number;

  protected currentRX: number;

  protected currentRY: number;

  constructor(canvas: Canvas, object: Ellipse, previousWidth: number, previousHeight: number
    , previousX: number, previousY: number, previousRX: number, previousRY: number) {
    super(canvas, object, previousWidth, previousHeight, previousX, previousY);
    this.previousRX = previousRX;
    this.previousRY = previousRY;
    console.log(this.previousRX)
    console.log(this.previousRY)
    this.currentRX = object.rx;
    this.currentRY = object.ry;
  }

  undo(): void {
    const obj = this.object as Ellipse;
    obj.rx = this.previousRX;
    obj.ry = this.previousRY;
    super.undo();
  }

  redo(): void {
    const obj = this.object as Ellipse;
    obj.rx = this.currentRX;
    obj.ry = this.currentRY;
    super.redo();
  }
}


class RatioScaleAction implements OperationAction {

  protected canvas: Canvas;

  protected object: FabricObject;

  protected previousScaleX: number;

  protected previousScaleY: number;

  protected previousX: number;

  protected previousY: number;

  protected currentScaleX: number;

  protected currentScaleY: number;

  protected currentX: number;

  protected currentY: number;

  constructor(canvas: Canvas, object: FabricObject, previousScaleX: number, previousScaleY: number, previousX: number, previousY: number) {
    this.canvas = canvas;
    this.object = object;
    this.previousScaleX = previousScaleX;
    this.previousScaleY = previousScaleY;
    this.previousX = previousX;
    this.previousY = previousY;
    this.currentScaleX = object.scaleX;
    this.currentScaleY = object.scaleY;
    this.currentX = object.getX();
    this.currentY = object.getY();
  }

  undo(): void {
    this.object.scaleX = this.previousScaleX;
    this.object.scaleY = this.previousScaleY;
    this.object.setX(this.previousX);
    this.object.setY(this.previousY);
    this.canvas.renderAll();
  }

  redo(): void {
    this.object.scaleX = this.currentScaleX;
    this.object.scaleY = this.currentScaleY;
    this.object.setX(this.currentX);
    this.object.setY(this.currentY);
    this.canvas.renderAll();
  }
}

export class FlipXUndoProps {
  fabricWrapperEl?: HTMLDivElement;
  left: string = '';
  backgroundImage?: FabricObject;
  flipX: boolean = false;
  x: number = 0;
  objs: FabricObject[] = [];
  objX: number[] = [];
  objFlipX: boolean[] = [];
}

class ReverseAction implements OperationAction {

  protected undoFn: () => void;

  protected redoFn: () => void;

  protected restore = false;

  constructor(undo: () => void, redo: () => void) {
    this.undoFn = undo;
    this.redoFn = redo;
  }

  undo(): void {
    if (!this.restore) {
      this.undoFn();
      this.restore = true;
    }
  }
  redo(): void {
    if (this.restore) {
      this.redoFn();
      this.restore = false;
    }
  }

}

export class CanvasWrapperProps {
  canvasWrapper?: HTMLDivElement;
  canvasWrapperLeft = '';
  canvasWrapperTop = '';
  topResizer?: HTMLDivElement;
  topResizerLeft = '';
  topResizerTop = '';
  leftResizer?: HTMLDivElement;
  leftResizerLeft = '';
  leftResizerTop = '';
  bottomResizer?: HTMLDivElement;
  bottomResizerTop = '';
  bottomResizerLeft = '';
  rightResizer?: HTMLDivElement;
  rightResizerTop = '';
  rightResizerLeft = '';
  toolbar?: HTMLDivElement;
  toolbarLeft = '';
  toolbarTop = '';
  optionBar?: HTMLDivElement;
  optionBarLeft = '';
  optionBarTop = '';
}

export class CanvasDetailedProps extends CanvasWrapperProps {
  canvasWrapperHeight = ''
  canvasWrapperWidth = '';
}

export class FabricCanvasProps {
  fabricWrapperEl?: HTMLDivElement;
  fabricWrapperElLeft = '';
  fabricWrapperElTop = '';
  canvasWidth = 0;
  canvasHeight = 0;
  canvasBackgroundColor = '';
  canvasBackgroundImage?: FabricObject
  objects = [] as FabricObject[]
}


export default class OperationHistory {

  protected undoStack: OperationAction[];

  protected redoStack: OperationAction[];

  protected imageEditor: ImageEditor;

  protected canvas: Canvas;

  constructor(imageEditor: ImageEditor) {
    this.undoStack = [];
    this.redoStack = [];
    this.imageEditor = imageEditor;
    this.canvas = imageEditor.getCanvas();
  }

  getCanvas() {
    return this.canvas;
  }

  redo(): boolean {
    if (this.redoStack.length > 0) {
      const opr = this.redoStack.pop()!;
      opr.redo();
      this.undoStack.push(opr!);
      return true;
    }
    return false;
  }

  undo(): boolean {
    if (this.undoStack.length > 0) {
      const opr = this.undoStack.pop()!;
      opr.undo();
      this.redoStack.push(opr);
      return true;
    }
    return false;
  }


  recordCreateAction(object: FabricObject) {
    this.undoStack.push(new CreateAction(this.canvas, object));
    this.clearRedoStack();
  }

  recordRemoveAction(object: FabricObject) {
    this.undoStack.push(new RemoveAction(this.canvas, object));
    this.clearRedoStack();
  }

  recordMoveAction(object: FabricObject, previousX: number, previousY: number) {
    this.undoStack.push(new MoveAction(this.canvas, object, previousX, previousY));
    this.clearRedoStack();
  }

  // 放缩可能会改变图形的位置
  recordScaleAction(object: FabricObject, previousWidth: number, previousHeight: number,
    previousX: number, previousY: number) {
    this.undoStack.push(new ScaleAction(this.canvas, object, previousWidth, previousHeight, previousX, previousY));
    this.clearRedoStack();
  }

  recordEllipseScaleAction(object: Ellipse, previousWidth: number, previousHeight: number,
    previousX: number, previousY: number, previousRX: number, previousRY: number) {
    this.undoStack.push(new EllipseScaleAction(this.canvas, object, previousWidth, previousHeight, previousX, previousY, previousRX, previousRY));
    this.clearRedoStack();
  }

  recordRatioScaleAction(object: FabricObject, previousScaleX: number, previousScaleY: number,
    previousX: number, previousY: number) {
    this.undoStack.push(new RatioScaleAction(this.canvas, object, previousScaleX, previousScaleY,
      previousX, previousY));
    this.clearRedoStack();
  }

  recordCropAction() {
    this.clearRedoStack();
  }

  recordDimsChangeAction(previous: CanvasDimsRecord, current: CanvasDimsRecord, fixFn: () => void) {
    // 没有变化的直接跳过
    if (previous.equals(current)) {
      return;
    }
    previous.imageEditor = this.imageEditor;
    current.imageEditor = this.imageEditor;
    this.undoStack.push(new CanvasReshaperAction(previous, current, fixFn))
    this.clearRedoStack();
  }

  // 通过反向操作实现撤销，通常应用于翻转
  recordReverseAction(undo: () => void, redo: () => void) {
    this.undoStack.push(new ReverseAction(undo, redo));
    this.clearRedoStack();
  }

  recordSnapshotAction(preivous: CanvasSnapshot, current: CanvasSnapshot, fixFn: () => void) {
    this.undoStack.push(new CanvasSnapshotAction(preivous, current, fixFn));
    this.clearRedoStack();
  }

  clearRedoStack() {
    this.redoStack = [];
  }

  clearStack() {
    this.redoStack = []
    this.undoStack = []
  }
}