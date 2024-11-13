import { Point } from "fabric";
import ElementManager, { pxielToNumber } from "./element_manager";
import ImageEditor from "./image_editor";

const DEFAULT_MOUSE_DOWN_FUNC = (_e: MouseEvent) => { };

export class Screenshoter {

  private mouseMoving = (_e: MouseEvent) => { };

  private mouseUp = (_e: MouseEvent) => { };

  private resizerPosX: number = 0;

  private resizerPosY: number = 0;

  private startX: number = 0;

  private startY: number = 0;

  private movingX: number = 0;

  private movingY: number = 0;

  private width: number = 0;

  private height: number = 0;

  private maxLeft: number = 0;

  private minLeft: number = 0;

  private maxTop: number = 0;

  private minTop: number = 0;

  // 正在激活的
  private activeResizer = 'none';

  private mask: HTMLCanvasElement | undefined;

  private fabricWrapperEl: HTMLDivElement | undefined;

  private imageEditor?: ImageEditor;

  private elementManager?: ElementManager;

  private screenshotResizer: {
    northWest: HTMLDivElement,
    north: HTMLDivElement,
    northEast: HTMLDivElement,
    east: HTMLDivElement,
    southEast: HTMLDivElement,
    south: HTMLDivElement,
    southWest: HTMLDivElement,
    west: HTMLDivElement
  } | undefined;

  private toolbar: HTMLDivElement | undefined;
  private confirm: HTMLDivElement | undefined;
  private cancel: HTMLDivElement | undefined;

  private confirmFunc = () => { };
  private cancelFunc = () => { };

  private mouseDownNorthWest = DEFAULT_MOUSE_DOWN_FUNC;
  private mouseDownNorth = DEFAULT_MOUSE_DOWN_FUNC;
  private mouseDownNorthEast = DEFAULT_MOUSE_DOWN_FUNC;
  private mouseDownEast = DEFAULT_MOUSE_DOWN_FUNC;
  private mouseDownSouthEast = DEFAULT_MOUSE_DOWN_FUNC;
  private mosueDownSouth = DEFAULT_MOUSE_DOWN_FUNC;
  private mouseDownSouthWest = DEFAULT_MOUSE_DOWN_FUNC;
  private mouseDownWest = DEFAULT_MOUSE_DOWN_FUNC;

  init(imageEditor: ImageEditor, manager: ElementManager) {
    this.elementManager = manager;
    this.imageEditor = imageEditor;
    this.fabricWrapperEl = manager.getFabricWrapper()!;
    this.mask = manager.getScreenshotCanvas();
    this.screenshotResizer = manager.getScreenshotResizers();
    this.toolbar = manager.getScreenshotToolbar();
    this.confirm = manager.getScreenshotConfirmButton();
    this.cancel = manager.getScreenshotCancelButton();

    const that = this;

    const recordResizer = (name: string, style: CSSStyleDeclaration, e: MouseEvent) => {
      that.activeResizer = name;
      that.startX = e.pageX;
      that.startY = e.pageY;
      that.resizerPosX = pxielToNumber(style.left);
      that.resizerPosY = pxielToNumber(style.top);
    }

    const resizer = that.screenshotResizer!;

    that.mouseDownNorthWest = (e: MouseEvent) => { recordResizer('northwest', resizer.northWest.style, e) }
    this.screenshotResizer.northWest.addEventListener('pointerdown', this.mouseDownNorthWest);

    that.mouseDownNorth = (e: MouseEvent) => { recordResizer('north', resizer.north.style, e) }
    this.screenshotResizer.north.addEventListener('pointerdown', this.mouseDownNorth);

    that.mouseDownNorthEast = (e: MouseEvent) => { recordResizer('northeast', resizer.northEast.style, e) }
    this.screenshotResizer.northEast.addEventListener('pointerdown', this.mouseDownNorthEast);

    that.mouseDownEast = (e: MouseEvent) => { recordResizer('east', resizer.east.style, e) }
    this.screenshotResizer.east.addEventListener('pointerdown', this.mouseDownEast);

    that.mouseDownSouthEast = (e: MouseEvent) => { recordResizer('southeast', resizer.southEast.style, e) }
    this.screenshotResizer.southEast.addEventListener('pointerdown', this.mouseDownSouthEast);

    that.mosueDownSouth = (e: MouseEvent) => { recordResizer('south', resizer.south.style, e) }
    this.screenshotResizer.south.addEventListener('pointerdown', this.mosueDownSouth);

    that.mouseDownSouthWest = (e: MouseEvent) => { recordResizer('southwest', resizer.southWest.style, e) }
    this.screenshotResizer.southWest.addEventListener('pointerdown', this.mouseDownSouthWest);

    that.mouseDownWest = (e: MouseEvent) => { recordResizer('west', resizer.west.style, e) }
    this.screenshotResizer.west.addEventListener('pointerdown', this.mouseDownWest);

    document.removeEventListener('pointermove', this.mouseMoving);
    document.removeEventListener('pointerup', this.mouseUp);

    this.mouseMoving = (e: MouseEvent) => {
      if (that.activeResizer != 'none') {
        that.movingX = e.pageX;
        that.movingY = e.pageY;
        that.resizeArea();
      }
    };
    document.addEventListener('pointermove', this.mouseMoving);

    this.mouseUp = () => {
      that.activeResizer = 'none';
    }

    document.addEventListener('pointerup', this.mouseUp);
    this.cancel.removeEventListener('click', this.cancelFunc);
    this.confirm.removeEventListener('click', this.confirmFunc);

    this.cancelFunc = this.cancelScreenshot.bind(this);
    this.confirmFunc = this.confirmScreenshot.bind(this);

    this.cancel.addEventListener('click', this.cancelFunc);
    this.confirm.addEventListener('click', this.confirmFunc);
  }

  async confirmScreenshot() {

    const storeState = this.imageEditor!.storeCanvasState();

    const resizer = this.screenshotResizer!;
    const neTop = pxielToNumber(resizer.northEast.style.top);
    const nwTop = pxielToNumber(resizer.northWest.style.top);
    const swTop = pxielToNumber(resizer.southWest.style.top);
    const seTop = pxielToNumber(resizer.southEast.style.top);

    const nwLeft = pxielToNumber(resizer.northWest.style.left)
    const neLeft = pxielToNumber(resizer.northEast.style.left);
    const swLeft = pxielToNumber(resizer.southWest.style.left);
    const seLeft = pxielToNumber(resizer.southEast.style.left);

    const maxTop = Math.max(neTop, nwTop, swTop, seTop);
    const minTop = Math.min(neTop, nwTop, swTop, seTop);
    const maxLeft = Math.max(nwLeft, neLeft, swLeft, seLeft);
    const minLeft = Math.min(nwLeft, neLeft, swLeft, seLeft);

    // 超出的部分，实际上是不显式的
    const canvasLeft = Math.abs(pxielToNumber(this.fabricWrapperEl!.style.left));
    const canvasTop = Math.abs(pxielToNumber(this.fabricWrapperEl!.style.top));

    const maskLeft = Math.abs(pxielToNumber(this.mask!.style.left))
    const maskTop = Math.abs(pxielToNumber(this.mask!.style.top))

    const top = minTop - maskTop + canvasTop;
    const left = minLeft - maskLeft + canvasLeft;
    const width = maxLeft - minLeft;
    const height = maxTop - minTop;

    const start = new Point(left, top);
    const end = new Point(left + width, height + top);
    const image = this.imageEditor!.getAreaImageInfo(start, end);
    this.showAndHideElements();
    await this.imageEditor!.renderToCanvas(image);

    const cropState = this.imageEditor!.storeCanvasState();

    this.imageEditor!.getHistory().recordCropAction(storeState.wrapper, storeState.canvas, cropState.wrapper, cropState.canvas);
  }

  cancelScreenshot() {
    this.showAndHideElements();
  }

  showAndHideElements() {
    this.toolbar!.style.display = 'none';
    const resizer = this.screenshotResizer!;
    Object.entries(resizer).forEach(([_k, v]) => {
      v.style.display = 'none';
    })
    this.activeResizer = 'none';
    this.mask!.style.display = 'none';
    this.elementManager!.showResizer();
  }

  adjustToolbarPosition() {
    const toolbar = this.toolbar!;
    const resizer = this.screenshotResizer!;

    if (toolbar.style.display == 'none') {
      toolbar.style.display = 'block';
    }
    const neTop = pxielToNumber(resizer.northEast.style.top);
    const nwTop = pxielToNumber(resizer.northWest.style.top);
    const swTop = pxielToNumber(resizer.southWest.style.top);
    const seTop = pxielToNumber(resizer.southEast.style.top);

    const nwLeft = pxielToNumber(resizer.northWest.style.left)
    const neLeft = pxielToNumber(resizer.northEast.style.left);
    const swLeft = pxielToNumber(resizer.southWest.style.left);
    const seLeft = pxielToNumber(resizer.southEast.style.left);

    const maxTop = Math.max(neTop, nwTop, swTop, seTop);
    const maxLeft = Math.max(nwLeft, neLeft, swLeft, seLeft);

    // 64为toolbar的宽度
    toolbar.style.left = (maxLeft - 64) + 'px';
    // 加10为了防止工具条太高
    toolbar.style.top = maxTop + 10 + 'px';
  }

  resizeArea() {
    const resizer = this.screenshotResizer!;
    const changeX = this.movingX - this.startX;
    const changeY = this.movingY - this.startY;

    let newLeft = this.resizerPosX + changeX;
    let newTop = this.resizerPosY + changeY;

    if (newLeft < this.minLeft) {
      newLeft = this.minLeft;
    } else if (newLeft > this.maxLeft) {
      newLeft = this.maxLeft;
    }

    if (newTop < this.minTop) {
      newTop = this.minTop;
    } else if (newTop > this.maxTop) {
      newTop = this.maxTop;
    }


    if (this.activeResizer == 'northwest') {
      resizer.northWest.style.left = newLeft + 'px';
      resizer.northWest.style.top = newTop + 'px';

      resizer.west.style.left = newLeft + 'px';
      resizer.north.style.top = newTop + 'px';

      resizer.southWest.style.left = newLeft + 'px';
      resizer.northEast.style.top = newTop + 'px';
    } else if (this.activeResizer == 'north') {

      resizer.north.style.top = newTop + 'px';
      resizer.northEast.style.top = newTop + 'px';
      resizer.northWest.style.top = newTop + 'px';

    } else if (this.activeResizer == 'northeast') {
      resizer.northEast.style.left = newLeft + 'px';
      resizer.northEast.style.top = newTop + 'px';

      resizer.north.style.top = newTop + 'px';
      resizer.northWest.style.top = newTop + 'px';

      resizer.east.style.left = newLeft + 'px';
      resizer.southEast.style.left = newLeft + 'px';

    } else if (this.activeResizer == 'east') {

      resizer.east.style.left = newLeft + 'px';
      resizer.northEast.style.left = newLeft + 'px';
      resizer.southEast.style.left = newLeft + 'px';

    } else if (this.activeResizer == 'southeast') {
      resizer.southEast.style.left = newLeft + 'px';
      resizer.southEast.style.top = newTop + 'px';

      resizer.east.style.left = newLeft + 'px';
      resizer.south.style.top = newTop + 'px';

      resizer.northEast.style.left = newLeft + 'px';
      resizer.southWest.style.top = newTop + 'px';
    } else if (this.activeResizer == 'south') {

      resizer.south.style.top = newTop + 'px';
      resizer.southEast.style.top = newTop + 'px';
      resizer.southWest.style.top = newTop + 'px';

    } else if (this.activeResizer == 'southwest') {
      resizer.southWest.style.left = newLeft + 'px';
      resizer.southWest.style.top = newTop + 'px';

      resizer.west.style.left = newLeft + 'px';
      resizer.south.style.top = newTop + 'px';

      resizer.northWest.style.left = newLeft + 'px';
      resizer.southEast.style.top = newTop + 'px';

    } else if (this.activeResizer == 'west') {
      resizer.west.style.left = newLeft + 'px';
      resizer.southWest.style.left = newLeft + 'px';
      resizer.northWest.style.left = newLeft + 'px';
    }

    // 调整时，中点位置要重新计算
    this.formatCenterResizer();

    const canvasLeft = pxielToNumber(this.mask!.style.left);
    const canvasTop = pxielToNumber(this.mask!.style.top);

    const northWestLeft = pxielToNumber(resizer.northWest.style.left);
    const northWestTop = pxielToNumber(resizer.northWest.style.top);

    const southEastLeft = pxielToNumber(resizer.southEast.style.left);
    const southEastTop = pxielToNumber(resizer.southEast.style.top);

    const length = southEastLeft - northWestLeft;
    const height = southEastTop - northWestTop;

    const context = this.mask!.getContext('2d')!;
    context.clearRect(0, 0, this.width, this.height);
    context.fillStyle = 'rgba(0,0,0,0.4)';
    context.fillRect(0, 0, this.width, this.height);

    // 然后将中间的设置为空白的，完全学习微信
    const startX = northWestLeft - canvasLeft;
    const startY = northWestTop - canvasTop;

    context.clearRect(startX, startY, length, height);
    this.adjustToolbarPosition();
  }
  formatCenterResizer() {
    const resizer = this.screenshotResizer!;
    const nwLeft = pxielToNumber(resizer.northWest.style.left)
    const nwTop = pxielToNumber(resizer.northWest.style.top);
    const neLeft = pxielToNumber(resizer.northEast.style.left);
    const swTop = pxielToNumber(resizer.southWest.style.top);

    const verticalLeft = (nwLeft + neLeft) / 2;
    const horizontalTop = (nwTop + swTop) / 2;

    resizer.north.style.left = verticalLeft + 'px';
    resizer.south.style.left = verticalLeft + 'px';

    resizer.west.style.top = horizontalTop + 'px';
    resizer.east.style.top = horizontalTop + 'px';
  }

  initMask(left: number, top: number, width: number, height: number) {
    this.width = width;
    this.height = height;
    const mask = this.mask!;
    mask.style.left = left + 'px';
    mask.style.top = top + 'px';
    mask.style.width = this.width + 'px';
    mask.style.height = this.height + 'px';
    mask.style.display = 'block';
    mask.width = this.width;
    mask.height = this.height;

    this.minLeft = left;
    this.maxLeft = this.minLeft + width;
    this.minTop = top;
    this.maxTop = this.minTop + height;

    const context = mask.getContext('2d')!;
    context.fillStyle = 'rgba(0,0,0,0.4)';
    context.fillRect(0, 0, this.width, this.height);

    const cropLeft = Math.round(this.width * 0.2);
    const cropTop = Math.round(this.height * 0.2);

    // 然后将中间的设置为空白的，完全学习微信
    const startX = cropLeft;
    const startY = cropTop;
    const cropWidth = Math.round(this.width * 0.6);
    const cropHeight = Math.round(this.height * 0.6);

    context.clearRect(startX, startY, cropWidth, cropHeight);

    const resizer = this.screenshotResizer!;
    resizer.northWest.style.left = left + cropLeft + 'px';
    resizer.northWest.style.top = top + + cropTop + 'px';

    resizer.north.style.left = left + cropLeft + Math.round(cropWidth / 2) + 'px';
    resizer.north.style.top = top + + cropTop + 'px';

    resizer.northEast.style.left = left + cropLeft + cropWidth + 'px';
    resizer.northEast.style.top = top + + cropTop + 'px';

    resizer.east.style.left = left + cropLeft + cropWidth + 'px';
    resizer.east.style.top = top + + cropTop + + Math.round(cropHeight / 2) + 'px';

    resizer.southEast.style.left = left + cropLeft + cropWidth + 'px';
    resizer.southEast.style.top = top + + cropTop + cropHeight + 'px';

    resizer.south.style.left = left + cropLeft + Math.round(cropWidth / 2) + 'px';
    resizer.south.style.top = top + + cropTop + + cropHeight + 'px';

    resizer.southWest.style.left = left + cropLeft + 'px';
    resizer.southWest.style.top = top + + cropTop + cropHeight + 'px';

    resizer.west.style.left = left + cropLeft + 'px';
    resizer.west.style.top = top + + cropTop + Math.round(cropHeight / 2) + 'px';
    Object.entries(resizer).forEach(([_k, v]) => {
      v.style.display = 'block';
    })

    this.elementManager!.hideResizer();

    this.adjustToolbarPosition();
  }
}