import { Canvas, FabricImage, Point } from 'fabric';
import ElementManager from './element_manager';
import ImageEditor from './image_editor';
import { FabricUtils } from './fabric_utils';

class ImageEditorHelper {

  static currentImageEditor: ImageEditor | undefined;

  static dpr = window.devicePixelRatio || 1;

  static CANVAS_DEFAULT_WIDTH = 100;

  static CANVAS_DEFAULT_HEIGHT = 100;

  static createImageEditor(imageUrl: string) {

    const elements = this.createElement()
    const eleManager = new ElementManager(elements);

    const resizer = (canvas: Canvas, width: number, height: number) => {
      this.resizeCanvas(canvas, eleManager, width, height);
    }
    const canvas = this.initCanvas(elements.canvas, imageUrl, resizer);
    const editor = new ImageEditor(canvas, eleManager);
    editor.init();
    return editor;
  }

  private static createElement(): Record<string, any> {

    const width = this.CANVAS_DEFAULT_WIDTH, height = this.CANVAS_DEFAULT_HEIGHT;

    const wrapper = document.getElementById("app")!;
    wrapper.style.width = '100%';
    wrapper.style.height = '100%';
    wrapper.style.position = 'absolute';
    wrapper.style.visibility = 'hidden';
    document.body.appendChild(wrapper);

    const toolbar = document.createElement("div");
    const toolbarMenu = this.initToolbar(toolbar);

    // 不考虑滚动条的事，出现滚动条的话，就给点偏差
    // canvasWrapper，包裹画板
    const canvasWrapper = document.createElement("div");
    canvasWrapper.style.backgroundColor = 'white';
    canvasWrapper.style.position = 'relative';
    canvasWrapper.style.overflow = 'hidden';

    const resizers = this.createCanvasResizer(wrapper);

    // 添加一张用于截图的canvas，以及8个resizer
    const screenshotCanvas = document.createElement("canvas")
    screenshotCanvas.style.display = 'none';
    screenshotCanvas.style.left = '0';
    screenshotCanvas.style.top = '0';
    screenshotCanvas.style.position = 'absolute';

    // 通过wrapper的拉伸，应该是可以的拉伸底图，底图是白色的
    // 拉伸的过程中看不出来，等拉伸完统一结算
    // 拉伸下右不需要考虑太多，拉伸上左要让图片进行偏移

    // 给的默认值，不需要考虑太多
    const canvas = document.createElement("canvas")
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    canvas.width = width;
    canvas.height = height;

    canvasWrapper.append(canvas);
    wrapper.appendChild(canvasWrapper)
    wrapper.appendChild(toolbar)
    wrapper.appendChild(screenshotCanvas);
    document.body.appendChild(wrapper);

    const screenshotResizer = this.createScreenshotResizers(wrapper);
    const screenshotToolbar = this.createScreenshotToolbar(wrapper);

    const rets = {
      ...toolbarMenu, canvas, canvasWrapper, ...resizers, toolbar, wrapper, screenshotCanvas, screenshotResizer, screenshotToolbar
    } as any;
    return rets;
  }
  static createScreenshotToolbar(parent: HTMLElement) {
    const toolbar = document.createElement("div");
    const style = toolbar.style;
    style.position = 'absolute';
    style.backgroundColor = 'rgb(229,230,231)'
    style.borderRadius = '4px 4px 4px 4px';
    style.height = '24px';
    style.width = '64px';
    style.paddingTop = '4px';
    style.paddingBottom = '4px';
    style.display = 'none';
    const cancelScreenshot = this.appendMenu(toolbar, './assets/cancel.svg', 8, 0);
    const confirmScreenshot = this.appendMenu(toolbar, './assets/confirm.svg', 0, 0);
    parent.appendChild(toolbar);
    return {
      toolbar,
      screenshot: {
        confirm: confirmScreenshot,
        cancel: cancelScreenshot
      }
    };
  }
  static createScreenshotResizers(parent: HTMLElement) {
    const createResizer = () => {
      const resizer = document.createElement("div");
      const style = resizer.style;
      style.left = '0';
      style.top = '0';
      style.position = 'absolute';
      style.width = '8px';
      style.height = '8px';
      style.boxSizing = 'border-box';
      style.border = '1px solid #19a918'
      style.transform = 'translate(-50%,-50%)';
      style.display = 'none';
      resizer.addEventListener('dragstart', function (event) {
        event.preventDefault();
      })
      resizer.draggable = false;
      // style.display = 'none'
      parent.appendChild(resizer);
      return resizer;
    }
    const northWest = createResizer();
    const north = createResizer();
    const northEast = createResizer();
    const east = createResizer();
    const southEast = createResizer();
    const south = createResizer();
    const southWest = createResizer();
    const west = createResizer();

    return {
      northWest, north, northEast, east, southEast, south, southWest, west
    }
  }

  // topbar和bottombar都要做固定width，居中
  // 不要考虑其它的，尾部也是一样的
  private static initToolbar(toolbar: HTMLElement): Record<string, HTMLElement> {

    toolbar.style.padding = "8px";
    toolbar.style.backgroundColor = "#e5e6e7";
    toolbar.style.borderRadius = "4px 4px 4px 4px";
    toolbar.style.height = "24px";
    toolbar.style.width = "690px";
    toolbar.style.position = "absolute";

    const ret = {} as any;

    ret.rectangleMenu = this.appendMenu(toolbar, './assets/rect.svg');
    ret.ellipseMenu = this.appendMenu(toolbar, './assets/circle.svg');
    ret.arrowMenu = this.appendMenu(toolbar, './assets/arrow.svg');
    ret.drawMenu = this.appendMenu(toolbar, './assets/draw.svg');
    ret.textMenu = this.appendMenu(toolbar, './assets/text.svg');
    ret.mosaicMenu = this.appendMenu(toolbar, './assets/mosaic.svg');

    ret.shrinkMenu = this.appendMenu(toolbar, './assets/shrink.svg', 42);
    ret.extendMenu = this.appendMenu(toolbar, './assets/extend.svg');
    ret.flipXMenu = this.appendMenu(toolbar, './assets/flipX.svg');
    ret.flipYMenu = this.appendMenu(toolbar, './assets/flipY.svg');


    ret.rotateCounterClockwiseMenu = this.appendMenu(toolbar, './assets/rotate.svg');
    ret.rotateCounterClockwiseMenu.style.transform = 'rotateY(180deg)';
    ret.rotateClockwiseMenu = this.appendMenu(toolbar, './assets/rotate.svg');
    ret.cropMenu = this.appendMenu(toolbar, './assets/crop.svg');

    ret.undoMenu = this.appendMenu(toolbar, './assets/undo.svg', 38);
    ret.redoMenu = this.appendMenu(toolbar, './assets/redo.svg');
    ret.resetMenu = this.appendMenu(toolbar, './assets/reset.svg');
    ret.cancaleMenu = this.appendMenu(toolbar, './assets/cancel.svg', 36);
    ret.confirmMenu = this.appendMenu(toolbar, './assets/confirm.svg', 0, 0);
    return ret;
  }

  private static appendMenu(topbar: HTMLElement, url: string, marginLeft = 0, marginRight = 8): HTMLElement {
    const menu = document.createElement("div")
    menu.style.display = "inline-block";
    menu.style.width = "24px";
    menu.style.height = "24px";
    menu.style.marginRight = marginRight + 'px';
    menu.style.borderRadius = "4px"
    menu.style.lineHeight = "1";
    if (marginLeft != 0) {
      menu.style.marginLeft = marginLeft + "px"
    }

    const icon = document.createElement("i");
    icon.style.display = "block";
    icon.style.width = "24px";
    icon.style.height = "24px";
    icon.style.backgroundSize = "100% 100%";
    icon.style.backgroundRepeat = "no-repeat";
    icon.style.cursor = "pointer";
    icon.style.opacity = "0.8";
    icon.style.backgroundImage = `url('${url}')`
    menu.appendChild(icon);
    topbar.appendChild(menu);
    return menu;
  }

  private static initCanvas(dom: HTMLCanvasElement, imageUrl: string, resizer: (canvas: Canvas, width: number, height: number) => void): fabric.Canvas {

    // 随便给个默认值，后面初始化的时候改掉
    const canvas = new Canvas(dom, {
      width: this.CANVAS_DEFAULT_WIDTH, height: this.CANVAS_DEFAULT_HEIGHT
    })

    FabricImage.fromURL(imageUrl).then(img => {
      canvas.backgroundImage = img;
      canvas.backgroundColor = '#FFF';
      // 设置完需要渲染一下
      canvas.renderAll();
      const width = img.width, height = img.height;
      FabricUtils.setCenterOrigin(img);
      img.setXY(new Point(width / 2, height / 2));
      resizer(canvas, width, height);
    })

    return canvas;
  }

  static resizeCanvas(fbCanvas: Canvas, manager: ElementManager, width: number, height: number) {
    const dpr = this.dpr;
    const wrapper = manager.wrapper;
    const canvasWrapper = manager.canvasWrapper;
    const canvas = manager.canvas;

    canvasWrapper.style.width = width + 'px';
    canvasWrapper.style.height = height + 'px';

    // top和left都要好好计算一下
    const rect = wrapper.getBoundingClientRect();
    const wrapperWidth = rect.width;
    const wrapperHeight = rect.height;

    let leftOffset = (wrapperWidth - width) / 2;
    if (leftOffset <= 20) {
      leftOffset = 20;
    }
    let topOffset = (wrapperHeight - height) / 2;
    if (topOffset <= 20) {
      topOffset = 20;
    }

    canvasWrapper.style.left = leftOffset + 'px';
    canvasWrapper.style.top = topOffset + 'px';

    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    fbCanvas.setDimensions({ width, height })

    manager.fixComponentsPosition();
    wrapper.style.visibility = 'visible';
  }

  private static createCanvasResizer(wrapper: HTMLElement) {

    const squareSize = 12;

    const northResizer = document.createElement('div');
    const northWestResizer = document.createElement('div');
    const westResizer = document.createElement('div');
    const southWestResizer = document.createElement('div');
    const southResizer = document.createElement('div');
    const southEastResizer = document.createElement('div');
    const eastResizer = document.createElement('div');
    const northEastResizer = document.createElement('div');

    function format(ele: HTMLDivElement) {
      ele.style.width = squareSize + 'px';
      ele.style.height = squareSize + 'px';
      ele.style.backgroundColor = 'white';
      ele.style.position = 'absolute'
      ele.style.border = 'solid 1px #000';
      ele.style.boxSizing = 'border-box'
      ele.draggable = false;
      ele.addEventListener('dragstart', function (event) {
        event.preventDefault();
      })
    }

    format(northResizer);
    format(northWestResizer);
    format(westResizer);
    format(southWestResizer);
    format(southResizer);;
    format(southEastResizer);
    format(eastResizer);
    format(northEastResizer);

    wrapper.appendChild(northResizer);
    wrapper.appendChild(northWestResizer);
    wrapper.appendChild(westResizer);
    wrapper.appendChild(southWestResizer);
    wrapper.appendChild(southResizer);
    wrapper.appendChild(southEastResizer);
    wrapper.appendChild(eastResizer);
    wrapper.appendChild(northEastResizer);

    return {
      northResizer, northWestResizer, westResizer, southWestResizer,
      southResizer, southEastResizer, eastResizer, northEastResizer
    }
  }
}

ImageEditorHelper.currentImageEditor = ImageEditorHelper.createImageEditor('/basic.jpg');