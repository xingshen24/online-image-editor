import { Canvas, FabricImage, FabricObject } from "fabric";
import { OperationAction } from "../history";

export class CanvasSnapshot {

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

  readonly objects: FabricObject[];

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

    this.objects = this.canvas.getObjects();
  }

  restore() {
    this.canvasWrapper.style.left = this.left;
    this.canvasWrapper.style.top = this.top;
    this.canvasWrapper.style.width = this.width;
    this.canvasWrapper.style.height = this.height;

    this.fabricWrapperEl.style.top = this.fwTop;
    this.fabricWrapperEl.style.left = this.fwLeft;

    this.canvas.setDimensions({ width: this.canvasWidth, height: this.canvasHeight });
    const originObjects = this.canvas.getObjects();

    for (const object of originObjects) {
      this.canvas.remove(object);
    }

    for (const object of this.objects) {
      this.canvas.add(object);
    }
  }
}

export class CanvasSnapshotAction implements OperationAction {

  readonly previous: CanvasSnapshot;

  readonly current: CanvasSnapshot;

  protected restore: boolean = false;

  protected fixer: () => void;

  constructor(previous: CanvasSnapshot, current: CanvasSnapshot, fixer: () => void) {
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
      this.fixer();
      this.restore = false;
    }
  }
}