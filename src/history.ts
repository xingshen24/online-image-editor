import { Canvas, Ellipse, FabricObject, Point, TDegree } from "fabric";
import ImageEditor from "./image_editor";

interface OperationAction {

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
    this.canvas.renderAll();
  }

  redo(): void {
    this.object.setX(this.currentX);
    this.object.setY(this.currentY);
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

class FlipXAction implements OperationAction {

  private canvas: Canvas;

  private previous: FlipXUndoProps;

  private current: FlipXUndoProps;

  private hasUndo = false;

  constructor(canvas: Canvas, previous: FlipXUndoProps, current: FlipXUndoProps) {
    this.canvas = canvas;
    this.previous = previous;
    this.current = current;
  }
  undo(): void {
    if (this.hasUndo) {
      return;
    }
    const previous = this.previous;
    const bi = previous.backgroundImage;
    const fabricWrapperEl = previous.fabricWrapperEl;
    fabricWrapperEl!.style.left = previous.left;
    bi!.flipX = previous.flipX;
    bi!.setX(previous.x);
    for (const index in previous.objs) {
      const obj = previous.objs[index];
      const flipX = previous.objFlipX[index];
      const x = previous.objX[index];
      obj.flipX = flipX;
      obj.setX(x);
      obj.setCoords();
    }
    this.canvas.renderAll();
    this.hasUndo = true;
  }
  redo(): void {
    if (!this.hasUndo) {
      return;
    }
    const current = this.current;
    const bi = current.backgroundImage;
    const fabricWrapperEl = current.fabricWrapperEl;
    fabricWrapperEl!.style.left = current.left;
    bi!.flipX = current.flipX;
    bi!.setX(current.x);
    for (const index in current.objs) {
      const obj = current.objs[index];
      const flipX = current.objFlipX[index];
      const x = current.objX[index];
      obj.flipX = flipX;
      obj.setX(x);
      obj.setCoords();
    }
    this.canvas.renderAll();
    this.hasUndo = false
  }
}

export class FlipYUndoProps {
  fabricWrapperEl?: HTMLDivElement;
  top: string = '';
  backgroundImage?: FabricObject;
  flipY: boolean = false;
  y: number = 0;
  objs: FabricObject[] = [];
  objY: number[] = [];
  objFlipY: boolean[] = [];
}

class FlipYAction implements OperationAction {

  private canvas: Canvas;

  private previous: FlipYUndoProps;

  private current: FlipYUndoProps;

  private hasUndo = false;

  constructor(canvas: Canvas, previous: FlipYUndoProps, current: FlipYUndoProps) {
    this.canvas = canvas;
    this.previous = previous;
    this.current = current;
  }
  undo(): void {
    if (this.hasUndo) {
      return;
    }
    const previous = this.previous;
    const bi = previous.backgroundImage;
    const fabricWrapperEl = previous.fabricWrapperEl;
    fabricWrapperEl!.style.top = previous.top;
    bi!.flipY = previous.flipY;
    bi!.setY(previous.y);
    for (const index in previous.objs) {
      const obj = previous.objs[index];
      const flipY = previous.objFlipY[index];
      const y = previous.objY[index];
      obj.flipY = flipY;
      obj.setY(y);
      obj.setCoords();
    }
    this.canvas.renderAll();
    this.hasUndo = true;
  }
  redo(): void {
    if (!this.hasUndo) {
      return;
    }
    const current = this.current;
    const bi = current.backgroundImage;
    const fabricWrapperEl = current.fabricWrapperEl;
    fabricWrapperEl!.style.top = current.top;
    bi!.flipY = current.flipY;
    bi!.setY(current.y);
    for (const index in current.objs) {
      const obj = current.objs[index];
      const flipY = current.objFlipY[index];
      const y = current.objY[index];
      obj.flipY = flipY;
      obj.setY(y);
      obj.setCoords();
    }
    this.canvas.renderAll();
    this.hasUndo = false
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

export class RotateProps {
  fabricWrapperEl?: HTMLDivElement;
  canvasWrapper?: HTMLDivElement;
  imageEditor?: ImageEditor;
  left: string = '';
  top: string = '';
  canvasHeight: number = 0;
  canvasWidth: number = 0;
  height: string = '';
  width: string = '';
  objs: FabricObject[] = [];
  objPos: any[] = [];
  objAngle: TDegree[] = [];
  canvasWrapperProps?: CanvasWrapperProps;
}

abstract class CanvasSetAction implements OperationAction {
  undo(): void {

  }
  redo(): void {
  }
  resetCanvasWrapper(prop: CanvasWrapperProps) {
    prop.canvasWrapper!.style.top = prop.canvasWrapperTop;
    prop.canvasWrapper!.style.left = prop.canvasWrapperLeft;

    prop.topResizer!.style.top = prop.topResizerTop;
    prop.topResizer!.style.left = prop.topResizerLeft;

    prop.leftResizer!.style.top = prop.leftResizerTop;
    prop.leftResizer!.style.left = prop.leftResizerLeft;

    prop.bottomResizer!.style.top = prop.bottomResizerTop;
    prop.bottomResizer!.style.left = prop.bottomResizerLeft;

    prop.rightResizer!.style.top = prop.rightResizerTop;
    prop.rightResizer!.style.left = prop.rightResizerLeft;

    prop.toolbar!.style.top = prop.toolbarTop;
    prop.toolbar!.style.left = prop.toolbarLeft;

    prop.optionBar!.style.top = prop.optionBarTop;
    prop.optionBar!.style.left = prop.optionBarLeft;
  }
}

class RotationAction extends CanvasSetAction {

  private previous: RotateProps;
  private current: RotateProps;
  private canvas: Canvas;
  private hasUndo = false;

  constructor(canvas: Canvas, previous: RotateProps, current: RotateProps) {
    super();
    this.canvas = canvas;
    this.current = current;
    this.previous = previous;
  }
  undo(): void {
    if (this.hasUndo) {
      return;
    }
    const previous = this.previous;
    previous.imageEditor!.setCanvasDims(previous.canvasWidth, previous.canvasHeight);
    const fwStyle = previous.fabricWrapperEl!.style;
    fwStyle.left = previous.left;
    fwStyle.top = previous.top;

    const canvasWrapper = previous.canvasWrapper!;
    canvasWrapper.style.width = previous.width;
    canvasWrapper.style.height = previous.height;

    for (const index in previous.objs) {
      const obj = previous.objs[index];
      const xy = previous.objPos[index];
      const angle = previous.objAngle[index];
      obj.set('angle', angle)
      obj.setXY(new Point(xy.x, xy.y));
      obj.setCoords();
    }
    this.canvas.renderAll();
    this.resetCanvasWrapper(previous.canvasWrapperProps!);
    this.hasUndo = true;

  }


  redo(): void {
    if (!this.hasUndo) {
      return;
    }
    const current = this.current;
    current.imageEditor!.setCanvasDims(current.canvasWidth, current.canvasHeight);
    const fwStyle = current.fabricWrapperEl!.style;
    fwStyle.left = current.left;
    fwStyle.top = current.top;

    const canvasWrapper = current.canvasWrapper!;
    canvasWrapper.style.width = current.width;
    canvasWrapper.style.height = current.height;

    for (const index in current.objs) {
      const obj = current.objs[index];
      const xy = current.objPos[index];
      const angle = current.objAngle[index];
      obj.set('angle', angle)
      obj.setXY(new Point(xy.x, xy.y));
      obj.setCoords();
    }
    this.canvas.renderAll();
    this.resetCanvasWrapper(current.canvasWrapperProps!);
    this.hasUndo = false;
  }

}

class CropAction extends CanvasSetAction {

  private previousWrapper: CanvasDetailedProps;
  private previousCanvas: FabricCanvasProps;
  private cropWrapper: CanvasDetailedProps;
  private cropCanvas: FabricCanvasProps;
  private canvas: Canvas;
  private hasUndo = false;

  constructor(canvas: Canvas, previousWrapper: CanvasDetailedProps, previousCanvas: FabricCanvasProps
    , cropWrapper: CanvasDetailedProps, cropCanvas: FabricCanvasProps
  ) {
    super();
    this.canvas = canvas;
    this.previousWrapper = previousWrapper;
    this.previousCanvas = previousCanvas;
    this.cropWrapper = cropWrapper;
    this.cropCanvas = cropCanvas;
  }

  undo(): void {
    if (this.hasUndo) {
      return;
    }
    this.clearCanvas();
    super.resetCanvasWrapper(this.previousWrapper);
    const pw = this.previousWrapper;
    pw.canvasWrapper!.style.width = pw.canvasWrapperWidth;
    pw.canvasWrapper!.style.height = pw.canvasWrapperHeight;
    const pc = this.previousCanvas;
    pc.fabricWrapperEl!.style.left = pc.fabricWrapperElLeft;
    pc.fabricWrapperEl!.style.top = pc.fabricWrapperElTop;
    this.canvas.setDimensions({ width: pc.canvasWidth, height: pc.canvasHeight });
    this.canvas.backgroundColor = pc.canvasBackgroundColor;
    this.canvas.backgroundImage = pc.canvasBackgroundImage!;
    for (const object of pc.objects) {
      this.canvas.add(object);
      object.setCoords();
    }

    this.canvas.renderAll();
    this.hasUndo = true;
  }

  redo(): void {
    if (!this.hasUndo) {
      return;
    }
    this.clearCanvas();
    super.resetCanvasWrapper(this.cropWrapper);
    const cw = this.cropWrapper;
    cw.canvasWrapper!.style.width = cw.canvasWrapperWidth;
    cw.canvasWrapper!.style.height = cw.canvasWrapperHeight;
    const cc = this.cropCanvas;
    cc.fabricWrapperEl!.style.left = cc.fabricWrapperElLeft;
    cc.fabricWrapperEl!.style.top = cc.fabricWrapperElTop;
    this.canvas.setDimensions({ width: cc.canvasWidth, height: cc.canvasHeight });
    this.canvas.backgroundColor = cc.canvasBackgroundColor;
    this.canvas.backgroundImage = cc.canvasBackgroundImage!;
    for (const object of cc.objects) {
      this.canvas.add(object);
      object.setCoords();
    }

    this.canvas.renderAll();
    this.hasUndo = false;
  }

  clearCanvas() {
    // 不太清楚fabric会不会destory这些对象，所以防止万一起见，还是先删除了
    const canvas = this.canvas;
    canvas.backgroundImage = undefined;
    const objects = canvas.getObjects();
    for (const obj of objects) {
      canvas.remove(obj);
    }
    this.canvas.clear();
  }
}


export default class OperationHistory {

  protected undoStack: OperationAction[];

  protected redoStack: OperationAction[];

  protected canvas: Canvas;

  constructor(canvas: Canvas) {
    this.undoStack = [];
    this.redoStack = [];
    this.canvas = canvas;
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

  recordFlipXAction(previous: FlipXUndoProps, current: FlipXUndoProps) {
    this.undoStack.push(new FlipXAction(this.canvas, previous, current));
    this.clearRedoStack();
  }

  recordFlipYAction(previous: FlipYUndoProps, current: FlipYUndoProps) {
    this.undoStack.push(new FlipYAction(this.canvas, previous, current));
    this.clearRedoStack();
  }

  recordRotateAction(previous: RotateProps, current: RotateProps) {
    this.undoStack.push(new RotationAction(this.canvas, previous, current));
    this.clearRedoStack();
  }

  recordCropAction(wrapper: CanvasDetailedProps, canvas: FabricCanvasProps, cropWrapper: CanvasDetailedProps, cropCanvas: FabricCanvasProps) {
    this.undoStack.push(new CropAction(this.canvas, wrapper, canvas, cropWrapper, cropCanvas));
    this.clearRedoStack();
  }

  clearRedoStack() {
    this.redoStack = [];
  }

  clearStack(){
    this.redoStack = []
    this.undoStack = []
  }
}