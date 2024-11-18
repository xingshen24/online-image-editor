import { Point } from "fabric";
import ElementManager, { pixelToNumber } from "./element_manager";
import ImageEditor from "./image_editor";
import { CanvasSnapshot } from "./undoer/CanvasSnapshot";

const DEFAULT_MOUSE_DOWN_FUNC = (_e: MouseEvent) => { };

export class Screenshoter {

  private mouseMoving = DEFAULT_MOUSE_DOWN_FUNC;

  private mouseUp = DEFAULT_MOUSE_DOWN_FUNC;

  private resizerPosX = 0;

  private resizerPosY = 0;

  private startX = 0;

  private startY = 0;

  private movingX = 0;

  private movingY = 0;

  private width = 0;

  private height = 0;

  private maxLeft = 0;

  private minLeft = 0;

  private maxTop = 0;

  private minTop = 0;

  // 正在激活的
  private activeResizer = 'none';

  private mask?: HTMLCanvasElement;

  private maskLeft = 0;

  private maskTop = 0;

  private fabricWrapperEl?: HTMLDivElement;

  private imageEditor?: ImageEditor;

  private elementManager?: ElementManager;

  private clipArea = { startX: 0, startY: 0, width: 0, height: 0 }

  private dragger = {
    isClipAreaInDrag: false,
    startX: 0,
    startY: 0,
    width: 0,
    height: 0,
    // 记录鼠标一开始落在的位置
    pointerDownX: 0,
    pointerDownY: 0,

    // 做临时变量用，拖拽结束的时候需要用到
    currentX: 0,
    currentY: 0,
  }

  private dragRecord: Record<string, any> = {
    northWestTop: 0,
    northWestLeft: 0,
    northTop: 0,
    northLeft: 0,
    northEastTop: 0,
    northEastLeft: 0,
    eastTop: 0,
    eastLeft: 0,
    southTop: 0,
    southLeft: 0,
    southWestTop: 0,
    southWestLeft: 0,
    westTop: 0,
    westLeft: 0
  }

  private cursorInClipArea = false;

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

  private canvasMouseDownFunc = DEFAULT_MOUSE_DOWN_FUNC;
  private canvasMouseMoveFunc = DEFAULT_MOUSE_DOWN_FUNC;
  private canvasMouseUpFunc = DEFAULT_MOUSE_DOWN_FUNC;

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
      that.resizerPosX = pixelToNumber(style.left);
      that.resizerPosY = pixelToNumber(style.top);
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

    this.cancel.removeEventListener('click', this.cancelFunc);
    this.confirm.removeEventListener('click', this.confirmFunc);

    this.cancelFunc = this.cancelScreenshot.bind(this);
    this.confirmFunc = this.confirmScreenshot.bind(this);

    this.cancel.addEventListener('click', this.cancelFunc);
    this.confirm.addEventListener('click', this.confirmFunc);
  }

  handleDragArea() {

    const canvas = this.mask!;

    canvas.removeEventListener('mousemove', this.canvasMouseMoveFunc);
    canvas.removeEventListener('mousedown', this.canvasMouseDownFunc);
    document.removeEventListener('mouseup', this.canvasMouseUpFunc);

    this.canvasMouseMoveFunc = (event: MouseEvent) => {

      const clipArea = this.clipArea;

      const xRange = [clipArea.startX, clipArea.startX + clipArea.width];
      const yRange = [clipArea.startY, clipArea.startY + clipArea.height];

      const currentX = Math.round(event.pageX - this.maskLeft);
      const currentY = Math.round(event.pageY - this.maskTop);

      const xInRange = currentX >= xRange[0] && currentX <= xRange[1];
      const yInRange = currentY >= yRange[0] && currentY <= yRange[1];

      const currentCursor = canvas.style.cursor;

      this.cursorInClipArea = xInRange && yInRange;

      if (xInRange && yInRange && currentCursor != 'move') {
        canvas.style.cursor = 'move';
      } else if ((!xInRange || !yInRange) && currentCursor != 'default' && !this.dragger.isClipAreaInDrag) {
        canvas.style.cursor = 'default';
      }

      if (this.dragger.isClipAreaInDrag) {
        const x = event.pageX;
        const y = event.pageY;

        let changeX = x - this.dragger.pointerDownX;
        let changeY = y - this.dragger.pointerDownY;

        if (changeX + clipArea.startX < 0) {
          changeX = -clipArea.startX;
        } else if (clipArea.startX + changeX + clipArea.width > this.width) {
          changeX = this.width - clipArea.width - clipArea.startX;
        }

        if (changeY + clipArea.startY < 0) {
          changeY = -clipArea.startY;
        } else if (clipArea.startY + changeY + clipArea.height > this.height) {
          changeY = this.height - clipArea.height - clipArea.startY;
        }

        this.transferClipArea(changeX, changeY);

        this.fixedScreenshotToolbarPosition();
      }
    }

    this.canvasMouseDownFunc = (event: MouseEvent) => {
      if (this.cursorInClipArea === false) {
        return;
      }

      this.dragger.isClipAreaInDrag = true;
      this.dragger.pointerDownX = event.pageX;
      this.dragger.pointerDownY = event.pageY;

      const resizers = this.screenshotResizer!
      Object.entries(resizers).forEach((value) => {
        const eleName = value[0];
        const ele = value[1];

        this.dragRecord[eleName + 'Left'] = pixelToNumber(ele.style.left);
        this.dragRecord[eleName + 'Top'] = pixelToNumber(ele.style.top);
      })

      this.dragger.height = this.clipArea.height;
      this.dragger.width = this.clipArea.width;
      this.dragger.startX = this.clipArea.startX;
      this.dragger.startY = this.clipArea.startY;
    }

    this.canvasMouseUpFunc = (_event: MouseEvent) => {
      if (!this.dragger.isClipAreaInDrag) {
        return;
      }
      this.dragger.isClipAreaInDrag = false;
      this.clipArea.startX = this.dragger.currentX;
      this.clipArea.startY = this.dragger.currentY;
    }

    document.addEventListener('mousemove', this.canvasMouseMoveFunc)
    canvas.addEventListener('mousedown', this.canvasMouseDownFunc)
    document.addEventListener('mouseup', this.canvasMouseUpFunc);
  }

  transferClipArea(changeX: number, changeY: number) {
    const resizers = this.screenshotResizer!
    Object.entries(resizers).forEach((value) => {
      const eleName = value[0];
      const left = this.dragRecord[eleName + 'Left'];
      const top = this.dragRecord[eleName + 'Top'];
      value[1].style.left = left + changeX + 'px';
      value[1].style.top = top + changeY + 'px';
    })

    const startX = this.dragger.startX + changeX;
    const startY = this.dragger.startY + changeY;
    const width = this.dragger.width;
    const height = this.dragger.height;

    const context = this.mask!.getContext('2d')!;
    context.clearRect(0, 0, this.width, this.height);
    context.fillStyle = 'rgba(0,0,0,0.4)';
    context.fillRect(0, 0, this.width, this.height);

    context.clearRect(startX, startY, width, height);

    this.dragger.currentX = startX;
    this.dragger.currentY = startY;
  }

  updateClipArea() {

  }

  getClipAreaRect() {
    const resizer = this.screenshotResizer!;
    const neTop = pixelToNumber(resizer.northEast.style.top);
    const nwTop = pixelToNumber(resizer.northWest.style.top);
    const swTop = pixelToNumber(resizer.southWest.style.top);
    const seTop = pixelToNumber(resizer.southEast.style.top);

    const nwLeft = pixelToNumber(resizer.northWest.style.left)
    const neLeft = pixelToNumber(resizer.northEast.style.left);
    const swLeft = pixelToNumber(resizer.southWest.style.left);
    const seLeft = pixelToNumber(resizer.southEast.style.left);

    const maxTop = Math.max(neTop, nwTop, swTop, seTop);
    const minTop = Math.min(neTop, nwTop, swTop, seTop);
    const maxLeft = Math.max(nwLeft, neLeft, swLeft, seLeft);
    const minLeft = Math.min(nwLeft, neLeft, swLeft, seLeft);

    // 超出的部分，实际上是不显式的
    const canvasLeft = Math.abs(pixelToNumber(this.fabricWrapperEl!.style.left));
    const canvasTop = Math.abs(pixelToNumber(this.fabricWrapperEl!.style.top));

    const maskLeft = Math.abs(pixelToNumber(this.mask!.style.left))
    const maskTop = Math.abs(pixelToNumber(this.mask!.style.top))

    const top = minTop - maskTop + canvasTop;
    const left = minLeft - maskLeft + canvasLeft;
    const width = maxLeft - minLeft;
    const height = maxTop - minTop;
    return { top, left, width, height }
  }

  // TODO 结束的时候要把所有的事件全部都干掉
  async confirmScreenshot() {
    const em = this.elementManager!;
    const previous = new CanvasSnapshot(
      em.canvasWrapper, em.getFabricWrapper()!, this.imageEditor!.getCanvas()
    );

    const { top, left, width, height } = this.getClipAreaRect();

    const start = new Point(left, top);
    const end = new Point(left + width, height + top);
    const image = this.imageEditor!.getAreaImageInfo(start, end);

    this.handleScreenshotFinished();

    await this.imageEditor!.renderToCanvas(image);

    const current = new CanvasSnapshot(
      em.canvasWrapper, em.getFabricWrapper()!, this.imageEditor!.getCanvas()
    );
    const history = this.imageEditor!.getHistory();
    history.recordSnapshotAction(previous, current, () => em.fixComponentsPosition());
  }

  cancelScreenshot() {
    this.handleScreenshotFinished();
  }

  handleScreenshotFinished() {
    this.toolbar!.style.display = 'none';
    const resizer = this.screenshotResizer!;
    Object.entries(resizer).forEach(([_k, v]) => {
      v.style.display = 'none';
    })
    this.activeResizer = 'none';
    this.mask!.style.display = 'none';
    this.elementManager!.showResizer();
    this.elementManager?.showToolbar();
    document.removeEventListener('pointermove', this.mouseMoving);
    document.removeEventListener('pointerup', this.mouseUp);
    document.removeEventListener('mouseup', this.canvasMouseUpFunc);
  }

  fixedScreenshotToolbarPosition() {

    const toolbar = this.toolbar!;
    const resizer = this.screenshotResizer!;

    if (toolbar.style.display == 'none') {
      toolbar.style.display = 'block';
    }
    const neTop = pixelToNumber(resizer.northEast.style.top);
    const nwTop = pixelToNumber(resizer.northWest.style.top);
    const swTop = pixelToNumber(resizer.southWest.style.top);
    const seTop = pixelToNumber(resizer.southEast.style.top);

    const nwLeft = pixelToNumber(resizer.northWest.style.left)
    const neLeft = pixelToNumber(resizer.northEast.style.left);
    const swLeft = pixelToNumber(resizer.southWest.style.left);
    const seLeft = pixelToNumber(resizer.southEast.style.left);

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

    const canvasLeft = pixelToNumber(this.mask!.style.left);
    const canvasTop = pixelToNumber(this.mask!.style.top);

    const northWestLeft = pixelToNumber(resizer.northWest.style.left);
    const northWestTop = pixelToNumber(resizer.northWest.style.top);

    const southEastLeft = pixelToNumber(resizer.southEast.style.left);
    const southEastTop = pixelToNumber(resizer.southEast.style.top);

    const width = Math.round(southEastLeft - northWestLeft);
    const height = Math.round(southEastTop - northWestTop);

    const context = this.mask!.getContext('2d')!;
    context.clearRect(0, 0, this.width, this.height);
    context.fillStyle = 'rgba(0,0,0,0.4)';
    context.fillRect(0, 0, this.width, this.height);

    // 然后将中间的设置为空白的，完全学习微信
    const startX = northWestLeft - canvasLeft;
    const startY = northWestTop - canvasTop;

    context.clearRect(startX, startY, width, height);
    this.clipArea.startX = startX;
    this.clipArea.startY = startY;
    this.clipArea.width = width;
    this.clipArea.height = height;
    this.fixedScreenshotToolbarPosition();
  }


  formatCenterResizer() {
    const resizer = this.screenshotResizer!;
    const nwLeft = pixelToNumber(resizer.northWest.style.left)
    const nwTop = pixelToNumber(resizer.northWest.style.top);
    const neLeft = pixelToNumber(resizer.northEast.style.left);
    const swTop = pixelToNumber(resizer.southWest.style.top);

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

    this.maskLeft = left;
    this.maskTop = top;

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

    this.clipArea = {
      startX, startY,
      width: cropWidth,
      height: cropHeight
    }

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

    document.removeEventListener('pointermove', this.mouseMoving);
    document.removeEventListener('pointerup', this.mouseUp);

    this.mouseMoving = (e: MouseEvent) => {
      if (this.activeResizer != 'none') {
        this.movingX = e.pageX;
        this.movingY = e.pageY;
        this.resizeArea();
      }
    };
    document.addEventListener('pointermove', this.mouseMoving);

    this.mouseUp = () => {
      this.activeResizer = 'none';
    }

    document.addEventListener('pointerup', this.mouseUp);
    this.handleDragArea();

    this.elementManager!.hideResizer();

    this.fixedScreenshotToolbarPosition();
  }
}