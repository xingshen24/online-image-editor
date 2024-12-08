import { Canvas } from "fabric";
import { OperationAction } from "../history";
import ImageEditor from "../image_editor";

export class CanvasPosRecord {

  readonly canvasWrapper: HTMLElement;
  readonly left: string;
  readonly top: string

  constructor(canvasWrapper: HTMLElement) {
    this.canvasWrapper = canvasWrapper;
    this.left = canvasWrapper.style.left;
    this.top = canvasWrapper.style.top;
  }

  restore() {
    this.canvasWrapper.style.left = this.left;
    this.canvasWrapper.style.top = this.top;
  }
}

export class CanvasDimsRecord {

  readonly canvasWrapper: HTMLElement;
  readonly fabricWrapperEl: HTMLElement;
  readonly canvas: Canvas;

  readonly top: string;
  readonly left: string;
  readonly width: string;
  readonly height: string;

  readonly fwTop: string;
  readonly fwLeft: string;
  readonly canvasWidth: number;
  readonly canvasHeight: number;

  public offsetX: number = 0;
  public offsetY: number = 0;

  public imageEditor?: ImageEditor;

  equals(current: CanvasDimsRecord) {
    let equal = this.top === current.top;
    equal = equal && this.left === current.left;
    equal = equal && this.width === current.width;
    equal = equal && this.height === current.height;
    equal = equal && this.fwTop === current.fwTop;
    equal = equal && this.fwLeft === current.fwLeft;
    equal = equal && this.canvasWidth === current.canvasWidth;
    equal = equal && this.canvasHeight === current.canvasHeight;
    return equal;
  }

  constructor(canvasWrapper: HTMLElement, fabricWrapperEl: HTMLElement, canvas: Canvas) {
    this.left = canvasWrapper.style.left;
    this.top = canvasWrapper.style.top;
    this.width = canvasWrapper.style.width;
    this.height = canvasWrapper.style.height;

    this.fwTop = fabricWrapperEl.style.top;
    this.fwLeft = fabricWrapperEl.style.left;

    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;

    this.canvasWrapper = canvasWrapper;
    this.fabricWrapperEl = fabricWrapperEl;
    this.canvas = canvas;
  }

  restore() {
    this.canvasWrapper.style.left = this.left;
    this.canvasWrapper.style.top = this.top;
    this.canvasWrapper.style.width = this.width;
    this.canvasWrapper.style.height = this.height;

    this.fabricWrapperEl.style.top = this.fwTop;
    this.fabricWrapperEl.style.left = this.fwLeft;

    this.canvas.setDimensions({ width: this.canvasWidth, height: this.canvasHeight });

    this.imageEditor && this.imageEditor.transform(this.offsetX, this.offsetY);
  }
}

export class CanvasReshaperAction implements OperationAction {

  readonly previous: CanvasDimsRecord;

  readonly current: CanvasDimsRecord;

  protected restore: boolean = false;

  protected fixer: () => void;

  constructor(previous: CanvasDimsRecord, current: CanvasDimsRecord, fixer: () => void) {
    this.previous = previous;
    this.current = current;
    this.fixer = fixer;
  }

  undo(): void {
    if (!this.restore) {
      this.previous.restore();
      this.fixer();
      this.restore = true;
    }
  }
  redo(): void {
    if (this.restore) {
      this.current.restore();
      this.restore = false;
      this.fixer();
    }
  }
}