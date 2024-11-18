import { FabricObject, Point } from "fabric";
import { CanvasDetailedProps, FabricCanvasProps, FlipXUndoProps, FlipYUndoProps, RotateProps } from "./history";
import ImageEditor from "./image_editor";
import { OperatorProps, OperatorType } from "./image_editor_operator";
import MosaicOperator from "./operator/mosaic_operator";
import TextOperator from "./operator/text_operator";
import { getAbsolutePosition } from "./uitls";

const COLOR_MAP = {
  RED: '#FF0000',
  ORANGLE: '#FFA500',
  BLUE: '#1A9BFF',
  GREEN: '#1AAF19',
  BLACK: '#323232',
  GREY: '#808080',
  WHITE: '#FFFFFF'
}

const DEFAULT_FUNCTION = () => { }

export const pixelToNumber = (length: string) => {
  if (length == null) {
    return 0;
  }
  length = length.replace('px', '');
  if (length == '') {
    return 0;
  }
  return Number(length);
}

const toNumber = (str: string) => {
  if (str == '') {
    str = '0';
  }
  return Number(str);
}

type ResizerType = 'north' | 'northwest' | 'west' | 'southwest' | 'south' |
  'southeast' | 'east' | 'northeast' | null

export default class ElementManager {

  public static HAS_CURSOR_CSS_ADDED = false;

  private static COLOR_ACTIVE_FLAG = "color_in_active";

  private static ACTIVE_SIZE_COLOR = '#1AAD19';

  private static DEACTIVE_SIZE_COLOR = '#C8C8C8';

  private imageEditor: ImageEditor | null = null;

  readonly canvasWrapper: HTMLDivElement;
  readonly canvas: HTMLCanvasElement;
  private fabricWrapperEl: HTMLDivElement | null = null;
  private northResizer: HTMLDivElement;
  private northWestResizer: HTMLDivElement;
  private westResizer: HTMLDivElement;
  private southWestResizer: HTMLDivElement;
  private southResizer: HTMLDivElement;
  private southEastResizer: HTMLDivElement;
  private eastResizer: HTMLDivElement;
  private northEastResizer: HTMLDivElement;

  private resizingType: ResizerType = null;
  private resizeStartInfo = {
    x: NaN,
    y: NaN,
    left: NaN,
    top: NaN,
    width: NaN,
    height: NaN,
    fwTop: NaN,
    fwLeft: NaN
  }

  private topInResize: boolean = false;

  // fw Fabric Wrapper
  private northStartFn: (e: MouseEvent) => void = DEFAULT_FUNCTION;
  private northWestStartFn: (e: MouseEvent) => void = DEFAULT_FUNCTION;
  private westStartFn: (e: MouseEvent) => void = DEFAULT_FUNCTION;
  private southWestStartFn: (e: MouseEvent) => void = DEFAULT_FUNCTION;
  private southStartFn: (e: MouseEvent) => void = DEFAULT_FUNCTION;
  private southEastStartFn: (e: MouseEvent) => void = DEFAULT_FUNCTION;
  private eastStartFn: (e: MouseEvent) => void = DEFAULT_FUNCTION;
  private northEastStartFn: (e: MouseEvent) => void = DEFAULT_FUNCTION;

  private resizeMoveFn: (e: MouseEvent) => void = DEFAULT_FUNCTION;
  private resizeFinishFn: (e: MouseEvent) => void = DEFAULT_FUNCTION;

  private squareSize: number = NaN;

  readonly wrapper: HTMLDivElement;

  private screenshotCanvas: HTMLCanvasElement;
  private screenshotResizer: {
    northWest: HTMLDivElement,
    north: HTMLDivElement,
    northEast: HTMLDivElement,
    east: HTMLDivElement,
    southEast: HTMLDivElement,
    south: HTMLDivElement,
    southWest: HTMLDivElement,
    west: HTMLDivElement
  };

  private screenshotToolbar: HTMLDivElement;
  private screenshotConfirmButton: HTMLDivElement;
  private screenshotCancelButton: HTMLDivElement;

  private toolbar: HTMLDivElement;
  private rectangleMenu: HTMLDivElement;
  private ellipseMenu: HTMLDivElement;
  private arrowMenu: HTMLDivElement;
  private drawMenu: HTMLDivElement;
  private textMenu: HTMLDivElement;
  private mosaicMenu: HTMLDivElement;

  private shrinkMenu: HTMLDivElement;
  private extendMenu: HTMLDivElement;

  private flipXMenu: HTMLDivElement;
  private flipYMenu: HTMLDivElement;
  private rotateClockwiseMenu: HTMLDivElement;
  private rotateCounterClockwiseMenu: HTMLDivElement;
  private cropMenu: HTMLDivElement;


  private undoMenu: HTMLDivElement;
  private redoMenu: HTMLDivElement;
  private resetMenu: HTMLDivElement;
  private cancelMenu: HTMLDivElement;
  private confirmMenu: HTMLDivElement;
  private optionBar: HTMLDivElement;

  private small: HTMLSpanElement;
  private normal: HTMLSpanElement;
  private big: HTMLSpanElement;

  private red: HTMLSpanElement;
  private orangle: HTMLSpanElement;
  private blue: HTMLSpanElement;
  private green: HTMLSpanElement;
  private black: HTMLSpanElement;
  private white: HTMLSpanElement;
  private grey: HTMLSpanElement;

  private sizeOptions: HTMLSpanElement;
  private colorOptions: HTMLSpanElement;
  private optionArrow: HTMLDivElement;

  private menuMap = new Map();
  private eleColorMap = new Map();
  private colorEleMap = new Map();

  constructor(options: any) {

    this.wrapper = options.wrapper;
    this.canvas = options.canvas;

    this.screenshotCanvas = options.screenshotCanvas;
    this.screenshotResizer = options.screenshotResizer;
    this.screenshotToolbar = options.screenshotToolbar.toolbar;
    this.screenshotConfirmButton = options.screenshotToolbar.screenshot.confirm;
    this.screenshotCancelButton = options.screenshotToolbar.screenshot.cancel;

    this.canvasWrapper = options.canvasWrapper;
    this.northResizer = options.northResizer;
    this.northWestResizer = options.northWestResizer;
    this.westResizer = options.westResizer;
    this.southWestResizer = options.southWestResizer;
    this.southResizer = options.southResizer;
    this.southEastResizer = options.southEastResizer;
    this.eastResizer = options.eastResizer;
    this.northEastResizer = options.northEastResizer;

    this.fixResizerPosition();

    this.squareSize = this.southResizer.getBoundingClientRect().width;

    this.toolbar = options.toolbar;

    this.rectangleMenu = options.rectangleMenu;
    this.menuMap.set(OperatorType.RECT, this.rectangleMenu);
    this.ellipseMenu = options.ellipseMenu;
    this.menuMap.set(OperatorType.ELLIPSE, this.ellipseMenu);
    this.arrowMenu = options.arrowMenu;
    this.menuMap.set(OperatorType.ARROW, this.arrowMenu);
    this.drawMenu = options.drawMenu;
    this.menuMap.set(OperatorType.DRAW, this.drawMenu);
    this.textMenu = options.textMenu;
    this.menuMap.set(OperatorType.TEXT, this.textMenu);
    this.mosaicMenu = options.mosaicMenu;
    this.menuMap.set(OperatorType.MOSAIC, this.mosaicMenu);

    this.shrinkMenu = options.shrinkMenu;
    this.extendMenu = options.extendMenu;
    this.flipXMenu = options.flipXMenu;
    this.flipYMenu = options.flipYMenu;
    this.rotateClockwiseMenu = options.rotateClockwiseMenu;
    this.rotateCounterClockwiseMenu = options.rotateCounterClockwiseMenu;
    this.cropMenu = options.cropMenu;

    this.undoMenu = options.undoMenu;
    this.redoMenu = options.redoMenu;
    this.resetMenu = options.resetMenu;
    this.cancelMenu = options.cancelMenu;
    this.confirmMenu = options.confirmMenu;

    const ele = this.createOperatorOptionBar();
    this.optionBar = ele.optionBar;
    this.small = ele.small;
    this.normal = ele.normal;
    this.big = ele.big;
    this.red = ele.red;
    this.orangle = ele.orangle;
    this.green = ele.green;
    this.blue = ele.blue;
    this.black = ele.black;
    this.white = ele.white;
    this.grey = ele.grey;

    this.sizeOptions = ele.sizeOptions;
    this.colorOptions = ele.colorOptions;
    this.optionArrow = ele.arrow;

    this.eleColorMap.set(this.red, COLOR_MAP.RED);
    this.eleColorMap.set(this.orangle, COLOR_MAP.ORANGLE);
    this.eleColorMap.set(this.green, COLOR_MAP.GREEN);
    this.eleColorMap.set(this.blue, COLOR_MAP.BLUE);
    this.eleColorMap.set(this.black, COLOR_MAP.BLACK);
    this.eleColorMap.set(this.white, COLOR_MAP.WHITE);
    this.eleColorMap.set(this.grey, COLOR_MAP.GREY);

    this.colorEleMap.set(COLOR_MAP.RED, this.red);
    this.colorEleMap.set(COLOR_MAP.ORANGLE, this.orangle);
    this.colorEleMap.set(COLOR_MAP.GREEN, this.green);
    this.colorEleMap.set(COLOR_MAP.BLUE, this.black);
    this.colorEleMap.set(COLOR_MAP.BLACK, this.black);
    this.colorEleMap.set(COLOR_MAP.WHITE, this.white);
    this.colorEleMap.set(COLOR_MAP.GREY, this.grey);
  }

  init(imageEditor: ImageEditor) {
    this.imageEditor = imageEditor;
    this.fabricWrapperEl = imageEditor.getCanvas().wrapperEl;
    this.initResizers();
    this.fixToolbarPosition();
    this.appendHoverCSS();
  }

  appendHoverCSS() {
    if (ElementManager.HAS_CURSOR_CSS_ADDED) {
      return;
    }
    const style = document.createElement('style');
    const css = `
      .north-cursor-resize:hover, .south-cursor-resize:hover{
        cursor: ns-resize;
      }

      .west-cursor-resize:hover, .east-cursor-resize:hover{
        cursor: ew-resize;
      }

      .north-east-cursor-resize:hover, .south-west-cursor-resize:hover{
        cursor: nesw-resize;
      }

      .north-west-cursor-resize:hover, .south-east-cursor-resize:hover{
        cursor: nwse-resize;
      }
    `
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
    ElementManager.HAS_CURSOR_CSS_ADDED = true;

    this.northResizer.classList.add('north-cursor-resize');
    this.northWestResizer.classList.add('north-west-cursor-resize');
    this.westResizer.classList.add('west-cursor-resize');
    this.southWestResizer.classList.add('south-west-cursor-resize');
    this.southResizer.classList.add('south-cursor-resize');
    this.southEastResizer.classList.add('south-east-cursor-resize');
    this.eastResizer.classList.add('east-cursor-resize');
    this.northEastResizer.classList.add('north-east-cursor-resize');

    this.screenshotResizer.north.classList.add('north-cursor-resize');
    this.screenshotResizer.northWest.classList.add('north-west-cursor-resize');
    this.screenshotResizer.west.classList.add('west-cursor-resize');
    this.screenshotResizer.southWest.classList.add('south-west-cursor-resize');
    this.screenshotResizer.south.classList.add('south-cursor-resize');
    this.screenshotResizer.southEast.classList.add('south-east-cursor-resize');
    this.screenshotResizer.east.classList.add('east-cursor-resize');
    this.screenshotResizer.northEast.classList.add('north-east-cursor-resize');
  }

  createOperatorOptionBar() {
    const wrapper = document.createElement("div");
    // 默认隐藏
    wrapper.style.display = 'none';
    wrapper.style.backgroundColor = 'white';
    wrapper.style.position = 'absolute';
    wrapper.style.borderRadius = '4px';
    // 解决行高预留空白问题
    wrapper.style.fontSize = '0';
    const sizeOptions = document.createElement("span");
    const colorOptions = document.createElement("span");
    sizeOptions.style.display = 'inline-block';
    colorOptions.style.display = 'inline-block';
    wrapper.append(sizeOptions);
    wrapper.append(colorOptions);
    const small = document.createElement("span");
    small.style.width = '8px';
    small.style.height = '8px';
    small.style.margin = '16px 0 16px 16px';
    small.style.backgroundColor = ElementManager.DEACTIVE_SIZE_COLOR;
    small.style.display = 'inline-block';
    small.style.borderRadius = '50%';
    const normal = document.createElement("span");
    normal.style.width = '12px';
    normal.style.height = '12px';
    normal.style.margin = '14px 0 14px 14px';
    normal.style.backgroundColor = ElementManager.DEACTIVE_SIZE_COLOR;
    normal.style.display = 'inline-block';
    normal.style.borderRadius = '50%';
    const big = document.createElement("span");
    big.style.width = '16px';
    big.style.height = '16px';
    big.style.margin = '12px 16px 12px 14px';
    big.style.backgroundColor = ElementManager.DEACTIVE_SIZE_COLOR;
    big.style.display = 'inline-block';
    big.style.borderRadius = '50%';
    sizeOptions.append(small);
    small.classList.add('online-image-editor-operator-option');
    sizeOptions.append(normal);
    normal.classList.add('online-image-editor-operator-option');
    sizeOptions.append(big);
    big.classList.add('online-image-editor-operator-option');

    const red = document.createElement("span");
    red.style.backgroundColor = COLOR_MAP.RED;
    const orangle = document.createElement("span");
    orangle.style.backgroundColor = COLOR_MAP.ORANGLE;
    const blue = document.createElement("span");
    blue.style.backgroundColor = COLOR_MAP.BLUE;
    const green = document.createElement("span");
    green.style.backgroundColor = COLOR_MAP.GREEN;
    const black = document.createElement("span");
    black.style.backgroundColor = COLOR_MAP.BLACK;
    const white = document.createElement("span");
    white.style.backgroundColor = COLOR_MAP.WHITE;
    const grey = document.createElement("span");
    grey.style.backgroundColor = COLOR_MAP.GREY;
    colorOptions.append(red);
    colorOptions.append(orangle);
    colorOptions.append(blue);
    colorOptions.append(green);
    colorOptions.append(black);
    colorOptions.append(white);
    colorOptions.append(grey);
    const colors = [red, orangle, blue, green, black, white, grey];

    for (const color of colors) {
      const style = color.style;
      style.display = 'inline-block';
      style.width = '20px';
      style.height = '20px';
      style.margin = '10px 0 10px 8px';
      style.boxSizing = 'border-box';
      color.classList.add('online-image-editor-operator-option');
    }

    red.style.margin = '10px 0 10px 0';
    grey.style.marginRight = '8px';
    white.style.border = 'solid 1px #E6E6E6';
    white.style.boxSizing = 'border-box';

    const arrowWrapper = document.createElement('div');
    const arrow = document.createElement('div');
    arrow.style.position = 'absolute';
    arrow.style.left = '142px';
    arrow.style.top = '-8px';
    arrow.style.borderTopWidth = '0';
    arrow.classList.add('online-image-editor-operator-option-arrow');
    arrowWrapper.append(arrow);
    wrapper.append(arrowWrapper);

    const style = document.createElement('style');
    const css = `
      .online-image-editor-operator-option:hover{
        cursor: pointer;
      }

      .online-image-editor-operator-option-arrow:after{
        position: absolute;
        width: 0;
        height: 0;
        border-color: transparent;
        border-style: solid;
        border-width: 8px;
        content: "";
        top:1px;
        margin-left:-8px;
        border-top-width:0;
        border-bottom-color: #FFF;
      }
    `
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
    document.body.append(wrapper);
    return {
      optionBar: wrapper,
      small, normal, big, red, orangle, green, blue, black, white, grey,
      sizeOptions, colorOptions, arrow
    };
  }

  bindEvents() {

    const imageEditor = this.imageEditor!;

    this.rectangleMenu.onclick = () => { this.switchOperator(OperatorType.RECT) };
    this.ellipseMenu.onclick = () => { this.switchOperator(OperatorType.ELLIPSE) };
    this.arrowMenu.onclick = () => { this.switchOperator(OperatorType.ARROW) };
    this.drawMenu.onclick = () => { this.switchOperator(OperatorType.DRAW) };
    this.mosaicMenu.onclick = () => { this.switchOperator(OperatorType.MOSAIC) };
    this.textMenu.onclick = () => { this.switchOperator(OperatorType.TEXT) };

    this.shrinkMenu.onclick = () => { this.shrinkCanvasToBackgroundImage(); }
    this.extendMenu.onclick = () => { this.extendsCanvas(); }

    this.flipXMenu.onclick = () => { this.flipHorizontal(); }
    this.flipYMenu.onclick = () => { this.flipVertical(); }
    this.rotateClockwiseMenu.onclick = () => { this.rotateClockwise(); }
    this.rotateCounterClockwiseMenu.onclick = () => { this.rotateCounterClockwise(); }
    this.cropMenu.onclick = () => { this.cropImage(); }

    this.undoMenu.onclick = () => { imageEditor.getHistory().undo(); }
    this.redoMenu.onclick = () => { imageEditor.getHistory().redo(); }

    this.resetMenu.onclick = () => { this.resetImageEditor(); }

    this.confirmMenu.onclick = () => { this.downloadAreaImage(); }
  }



  switchOperator(type: OperatorType) {
    const imageEditor = this.imageEditor!;
    const previous = imageEditor.getOperatorType();
    if (imageEditor.getOperatorType() == type) {
      imageEditor.changeOperatorType(OperatorType.NONE);
    } else {
      imageEditor.changeOperatorType(type);
    }
    const current = imageEditor.getOperatorType();
    if (previous != OperatorType.NONE) {
      const preEle = this.menuMap.get(previous);
      preEle.style.backgroundColor = 'transparent';
      this.hideOptionBar();
    }
    if (current != OperatorType.NONE) {
      const currEle = this.menuMap.get(current);
      currEle.style.backgroundColor = '#FFF';
      this.showOptionBar(currEle);
    }
  }

  hideOptionBar() {
    this.optionBar.style.display = 'none';
  }

  showOptionBarDirect() {
    this.optionBar.style.display = 'inline-block';
  }

  showOptionBar(currEle: HTMLDivElement) {
    const imageEditor = this.imageEditor!;
    this.adjustOptionBarPosition(currEle)
    const operator = imageEditor.getActiveOperator();
    // 马赛克不显示颜色选项
    const isMosaic = operator instanceof MosaicOperator;
    if (!isMosaic) {
      this.showFullOptions();
      const that = this;
      const color = operator.getOperatorColor();
      const eles = this.eleColorMap.keys();
      for (const ele of eles) {
        const eleColor = this.eleColorMap.get(ele);
        if (eleColor == color) {
          this.activeColor(ele);
        } else {
          this.deactiveColor(ele);
        }
      }

      this.red.onclick = () => { that.changeColor(operator, COLOR_MAP.RED, that.red) };
      this.orangle.onclick = () => { that.changeColor(operator, COLOR_MAP.ORANGLE, that.orangle) };
      this.green.onclick = () => { that.changeColor(operator, COLOR_MAP.GREEN, that.green) };
      this.blue.onclick = () => { that.changeColor(operator, COLOR_MAP.BLUE, that.blue) };
      this.black.onclick = () => { that.changeColor(operator, COLOR_MAP.BLACK, that.black) };
      this.white.onclick = () => { that.changeColor(operator, COLOR_MAP.WHITE, that.white) };
      this.grey.onclick = () => { that.changeColor(operator, COLOR_MAP.GREY, that.grey) };
    } else {
      this.showSizeOptions();
    }

    let s = 2, n = 4, b = 6;
    if (operator instanceof MosaicOperator) {
      s = 10, n = 20, b = 40;
    } else if (operator instanceof TextOperator) {
      s = 15, n = 20, b = 25;
    }
    const size = operator.getOperatorSize();
    switch (size) {
      case s: this.selectSize(this.small); break;
      case n: this.selectSize(this.normal); break;
      case b: this.selectSize(this.big); break;
    }
    const that = this;
    this.small.onclick = () => { operator.setOperatorSize(s); that.selectSize(that.small); }
    this.normal.onclick = () => { operator.setOperatorSize(n); that.selectSize(that.normal); }
    this.big.onclick = () => { operator.setOperatorSize(b); that.selectSize(that.big); }
  }

  showSizeOptions() {
    const isColorVisiable = this.imageEditor!.getOperatorType() != OperatorType.MOSAIC;
    if (!isColorVisiable) {
      this.colorOptions.style.display = 'none';
      // 196 / 2，196是整个颜色区域的宽度，去除之后，大小选择框，要向右移动这么多
      let left = Number(this.optionBar.style.left.replace('px', ''));
      left = left + (196) / 2;
      let width = this.optionBar.getBoundingClientRect().width;
      this.optionBar.style.left = left + 'px';
      const arrowLeft = width / 2;
      this.optionArrow.style.left = arrowLeft + 'px';
    }
  }
  showFullOptions() {
    const isColorVisiable = this.colorOptions.style.display == 'inline-block';
    if (!isColorVisiable) {
      this.colorOptions.style.display = 'inline-block';
      let arrowLeft = Number(this.optionArrow.style.left.replace('px', ''));
      arrowLeft = arrowLeft + 168 / 2;
      this.optionArrow.style.left = arrowLeft + 'px';
    }
  }

  changeColor(operator: OperatorProps, color: string, ele: HTMLSpanElement) {
    operator.setOperatorColor(color);
    const colors = [this.red, this.orangle, this.green, this.blue, this.black, this.white, this.grey];
    for (const color of colors) {
      if (color == ele) {
        this.activeColor(color);
      } else {
        this.deactiveColor(color);
      }
    }
  }

  activeColor(ele: HTMLSpanElement) {
    ele.setAttribute(ElementManager.COLOR_ACTIVE_FLAG, 'true');
    if (ele != this.white) {
      ele.style.border = '6px solid ' + this.eleColorMap.get(ele);
      ele.style.backgroundColor = 'white';
    } else {
      ele.style.border = '6px solid #E6E6E6';
      ele.style.backgroundColor = 'white';
    }
  }

  deactiveColor(ele: HTMLSpanElement) {
    if (ele.getAttribute(ElementManager.COLOR_ACTIVE_FLAG)) {
      if (ele != this.white) {
        ele.style.border = '0';
        ele.style.backgroundColor = this.eleColorMap.get(ele);
      } else {
        ele.style.border = 'solid 1px #E6E6E6';
        ele.style.backgroundColor = 'white';
      }
      ele.removeAttribute(ElementManager.COLOR_ACTIVE_FLAG);
    }
  }

  selectSize(ele: HTMLSpanElement) {
    const sizes = [this.small, this.normal, this.big];
    for (const size of sizes) {
      if (ele == size) {
        this.activeSize(size);
      } else {
        this.deactiveSize(size);
      }
    }
  }

  activeSize(ele: HTMLSpanElement) {
    ele.style.backgroundColor = ElementManager.ACTIVE_SIZE_COLOR;
  }

  deactiveSize(ele: HTMLSpanElement) {
    ele.style.backgroundColor = ElementManager.DEACTIVE_SIZE_COLOR;
  }

  hideToolbar() {
    this.toolbar.style.visibility = 'hidden';
    this.hideOptionBar();
  }

  showToolbar() {
    this.toolbar.style.visibility = 'visible';
    const optType = this.imageEditor!.getOperatorType();
    // 对于要显示的toolbar，直接显示
    if (optType != OperatorType.NONE) {
      this.showOptionBarDirect();
    }
    this.fixToolbarPosition();
  }

  initResizers() {

    const that = this;

    this.northStartFn = (event: MouseEvent) => { that.resizeStart('north', event); }
    this.northWestStartFn = (event: MouseEvent) => { that.resizeStart('northwest', event); }
    this.westStartFn = (event: MouseEvent) => { that.resizeStart('west', event); }
    this.southWestStartFn = (event: MouseEvent) => { that.resizeStart('southwest', event); }
    this.southStartFn = (event: MouseEvent) => { that.resizeStart('south', event); }
    this.southEastStartFn = (event: MouseEvent) => { that.resizeStart('southeast', event); }
    this.eastStartFn = (event: MouseEvent) => { that.resizeStart('east', event); }
    this.northEastStartFn = (event: MouseEvent) => { that.resizeStart('northeast', event); }

    this.resizeMoveFn = (event: MouseEvent) => {
      if (this.resizingType === null) {
        return
      }
      that.onResizeMove(event);
      that.fixResizerPosition();
    }

    this.resizeFinishFn = (_event: MouseEvent) => {
      if (this.resizingType === null) {
        return;
      }
      that.finishResize();
      that.showToolbar();
    }

    this.northResizer.addEventListener('mousedown', this.northStartFn);
    this.northWestResizer.addEventListener('mousedown', this.northWestStartFn);
    this.westResizer.addEventListener('mousedown', this.westStartFn);
    this.southWestResizer.addEventListener('mousedown', this.southWestStartFn);
    this.southResizer.addEventListener('mousedown', this.southStartFn);
    this.southEastResizer.addEventListener('mousedown', this.southEastStartFn);
    this.eastResizer.addEventListener('mousedown', this.eastStartFn);
    this.northEastResizer.addEventListener('mousedown', this.northEastStartFn);

    document.addEventListener('mousemove', this.resizeMoveFn);
    document.addEventListener('mouseup', this.resizeFinishFn);
  }

  resizeStart(type: ResizerType, event: MouseEvent) {
    const style = this.canvasWrapper.style;
    const fwStyle = this.fabricWrapperEl!.style;
    this.resizingType = type;
    this.resizeStartInfo = {
      x: event.pageX,
      y: event.pageY,
      left: pixelToNumber(style.left),
      top: pixelToNumber(style.top),
      height: pixelToNumber(style.height),
      width: pixelToNumber(style.width),
      fwLeft: pixelToNumber(fwStyle.left),
      fwTop: pixelToNumber(fwStyle.top)
    }
    this.hideToolbar();
  }

  onResizeMove(event: MouseEvent) {
    if (this.resizingType === null) {
      return
    }
    const start = this.resizeStartInfo;
    const x = event.pageX;
    const y = event.pageY;

    const type = this.resizingType;
    const diffX = type !== 'north' && type !== 'south' ? x - start.x : 0;
    const diffY = type !== 'east' && type !== 'west' ? y - start.y : 0;

    let changeX = diffX, changeY = diffY;

    const isTopResizer = type === 'north' || type === 'northeast' || type === 'northwest';
    const isLeftResizer = type === 'west' || type === 'southwest' || type === 'northwest';
    const isBottomResizer = type === 'south' || type === 'southeast' || type === 'southwest';
    const isRightResizer = type === 'east' || type === 'northeast' || type === 'southeast';

    let newTop = start.top, newFwTop = start.fwTop;
    let newLeft = start.left, newFwLeft = start.fwLeft;
    let newHeight = start.height, newWidth = start.width;

    if (isTopResizer && changeY != 0) {
      newHeight = start.height - changeY;
      if (newHeight < 80) {
        newHeight = 80;
        changeY = start.height - newHeight;
      }
      newTop = start.top + changeY;
      newFwTop = start.fwTop - changeY;
    } else if (isBottomResizer && changeY != 0) {
      newHeight = start.height + changeY;
      if (newHeight < 80) {
        newHeight = 80;
      }
    }

    if (isLeftResizer && changeX != 0) {
      newWidth = start.width - changeX;
      if (newWidth < 80) {
        newWidth = 80;
        changeX = start.width - newWidth;
      }
      newLeft = start.left + changeX;
      newFwLeft = start.fwLeft - changeX;
    } else if (isRightResizer && changeX != 0) {
      newWidth = start.width + changeX;
      if (newWidth < 80) {
        newWidth = 80;
      }
    }

    this.canvasWrapper.style.width = newWidth + 'px';
    this.canvasWrapper.style.height = newHeight + 'px';
    this.canvasWrapper.style.top = newTop + 'px';
    this.canvasWrapper.style.left = newLeft + 'px';
    this.fabricWrapperEl!.style.top = newFwTop + 'px';
    this.fabricWrapperEl!.style.left = newFwLeft + 'px';
  }

  finishResize() {
    const body = document.querySelector('body');
    body!.style.cursor = 'default'
    if (this.resizingType != null) {
      this.resizingType = null;
      this.adaptCanvasToViewport();
    }
  }

  adaptCanvasToViewport() {

    const imageEditor = this.imageEditor!;

    const style = this.fabricWrapperEl!.style;
    const wrapperStyle = this.canvasWrapper!.style;

    // top left应该都是负数
    const top = pixelToNumber(style.top);
    const left = pixelToNumber(style.left);
    const width = pixelToNumber(style.width);
    const height = pixelToNumber(style.height);

    const wrapperWidth = pixelToNumber(wrapperStyle.width);
    const wrapperHeight = pixelToNumber(wrapperStyle.height);

    let newTop = top, newLeft = left;
    let newWidth = width, newHeight = height;
    let offsetX = 0, offsetY = 0;

    // top大于0，top要调整为0，否则不变
    // 高度增加top，并且所有对象向下位移相应的为孩子
    if (top > 0) {
      newTop = 0;
      newHeight = newHeight + top;
      offsetY = top;
    }

    if (left > 0) {
      newLeft = 0;
      newWidth = newWidth + left;
      offsetX = left;
    }

    const hideInRight = newWidth - newLeft - wrapperWidth;
    if (hideInRight < 0) {
      newWidth = newWidth + Math.abs(hideInRight);
    }

    const hideInBottom = newHeight - newTop - wrapperHeight;
    if (hideInBottom < 0) {
      newHeight = newHeight + Math.abs(hideInBottom);
    }

    if (newTop != top) {
      style.top = newTop + 'px';
    }

    if (newWidth != width || newHeight != height) {
      imageEditor.setCanvasDims(newWidth, newHeight);
    }

    if (offsetX != 0 || offsetY != 0) {
      imageEditor.transform(offsetX, offsetY);
    }

    if (newLeft != left || newTop != top) {
      style.left = newLeft + 'px';
      style.top = newTop + 'px';
    }
  }

  // 四周如果有白板，就把白板都缩了，其它的不同，相当于只动画板，不动画布
  shrinkCanvasToBackgroundImage() {
    const canvas = this.imageEditor!.getCanvas();
    const image = canvas.backgroundImage!;
    const point = image.getXY();

    const { visiableHeight, visiableWidth, left, top } = this.getCanvasAreaInfo();
    const shrinkRight = point.x + image.width - left < visiableWidth;
    const shrinkBottom = point.y + image.height - top < visiableHeight;

    const cutWrapperLeft = point.x > left ? point.x - left : 0;
    const cutWrapperTop = point.y > top ? point.y - top : 0;

    const cutWrapperRight = shrinkRight ? visiableWidth - (point.x + image.width - left) : 0;
    const cutWrapperBottom = shrinkBottom ? visiableHeight - (point.y + image.height - top) : 0;

    const wrapperWidth = pixelToNumber(this.canvasWrapper.style.width)
    const wrapperHeight = pixelToNumber(this.canvasWrapper.style.height)
    const wrapperTop = pixelToNumber(this.canvasWrapper.style.top)
    const wrapperLeft = pixelToNumber(this.canvasWrapper.style.left)

    this.canvasWrapper.style.width = wrapperWidth - cutWrapperRight - cutWrapperLeft + 'px';
    this.canvasWrapper.style.height = wrapperHeight - cutWrapperBottom - cutWrapperTop + 'px';

    // 视口向下移动的时候，画板不要动，也就是说画板left、top要相应的变化
    this.canvasWrapper.style.top = wrapperTop + cutWrapperTop + 'px';
    this.canvasWrapper.style.left = wrapperLeft + cutWrapperLeft + 'px';
    this.fabricWrapperEl!.style.top = -top - cutWrapperTop + 'px';
    this.fabricWrapperEl!.style.left = -left - cutWrapperLeft + 'px';

    this.fixComponentsPosition();
  }

  // 如果图片没有显示全，那么先显示全图片
  extendsCanvas() {

    const canvas = this.imageEditor!.getCanvas();
    const image = canvas.backgroundImage!;

    const point = image.getXY();
    const { visiableHeight, visiableWidth, left, top, canvasHeight, canvasWidth } = this.getCanvasAreaInfo();

    const topExtend = point.y - top;
    const leftExtend = point.x - left;
    const bottomExtend = visiableHeight - (point.y + image.height - top);
    const rightExtend = visiableWidth - (point.x + image.width - left);

    const wrapperWidth = pixelToNumber(this.canvasWrapper.style.width)
    const wrapperHeight = pixelToNumber(this.canvasWrapper.style.height)
    const wrapperTop = pixelToNumber(this.canvasWrapper.style.top)
    const wrapperLeft = pixelToNumber(this.canvasWrapper.style.left)

    let maxXExtend = Math.max(leftExtend, rightExtend);
    let maxYExtend = Math.max(topExtend, bottomExtend);
    let minXExtend = Math.min(leftExtend, rightExtend);
    let minYExtend = Math.min(topExtend, bottomExtend);

    let xExtend = 0, yExtend = 0;
    if (maxXExtend >= 0 && maxXExtend !== minXExtend) {
      xExtend = maxXExtend;
    } else if (maxXExtend >= 0 && maxXExtend === minXExtend) {
      xExtend = maxXExtend + Math.round(image.width * 0.2);
    }

    if (maxYExtend >= 0 && maxYExtend !== minYExtend) {
      yExtend = maxYExtend;
    } else if (maxYExtend >= 0 && maxYExtend === minYExtend) {
      yExtend = maxYExtend + Math.round(image.height * 0.15);
    }


    const extendLeft = xExtend - leftExtend;
    const extendRight = xExtend - rightExtend;
    const extendTop = yExtend - topExtend;
    const extendBottom = yExtend - bottomExtend;

    const newWrapperHeight = wrapperHeight + extendBottom + extendTop;
    const newWrapperWidth = wrapperWidth + extendLeft + extendRight;

    this.canvasWrapper.style.width = newWrapperWidth + 'px';
    this.canvasWrapper.style.height = newWrapperHeight + 'px';

    this.canvasWrapper.style.top = wrapperTop - extendTop + 'px';
    this.canvasWrapper.style.left = wrapperLeft - extendLeft + 'px';

    let newLeft = 0, newTop = 0;
    // 如果只是扩展现有的
    if (extendLeft < left) {
      newLeft = extendLeft - left;
      this.fabricWrapperEl!.style.left = newLeft + 'px';
    } else if (extendLeft >= left) {
      const newExtend = extendLeft - left;
      this.fabricWrapperEl!.style.left = '0'
      this.imageEditor!.transformX(newExtend);
    }

    if (extendTop < top) {
      newTop = extendTop - top;
      this.fabricWrapperEl!.style.top = newTop + 'px';
    } else if (extendTop >= top) {
      const newExtend = extendTop - top;
      this.fabricWrapperEl!.style.top = '0'
      this.imageEditor!.transformY(newExtend);
    }

    const extendWidth = newWrapperWidth - (canvasWidth - left);
    const extendHeight = newWrapperHeight - (canvasHeight - top);

    const newCanvasWidth = extendWidth > 0 ? canvasWidth + extendWidth : canvasWidth;
    const newCanvasHeight = extendHeight > 0 ? canvasHeight + extendHeight : canvasHeight

    this.imageEditor!.setCanvasDims(newCanvasWidth, newCanvasHeight);

    this.fixComponentsPosition();
  }

  flipHorizontal() {
    // 左右翻转时，上下是不要动的，然后左侧多余的部分移动到右侧，右侧多余的部分移动到左侧
    const { right, canvasWidth } = this.getCanvasAreaInfo();
    // 内容翻转，左偏移变右偏移
    this.fabricWrapperEl!.style.left = -right + 'px';

    const canvas = this.imageEditor?.getCanvas()!;
    // 翻转状态换一下
    const backgroundImage = canvas.backgroundImage!;

    const flipX = backgroundImage!.flipX;
    backgroundImage!.flipX = !flipX;

    // 左右偏移互换一下
    const x = backgroundImage.getX();
    const newX = canvasWidth - x;
    backgroundImage.setX(newX);

    const objs = canvas.getObjects() ?? [];
    for (const obj of objs) {
      const objFlipX = obj.flipX;
      const x = obj.getX()
      const width = obj.width;
      const nx = canvasWidth - width - x;
      obj.flipX = !objFlipX;
      obj.setX(nx);
      canvas.setActiveObject(obj);
    }
    canvas.renderAll();
  }

  flipVertical() {
    // 上下翻转时，左右是不要动的，然后上侧多余的部分移动到下侧，下侧多余的部分移动到上侧
    const { bottom, canvasHeight } = this.getCanvasAreaInfo();

    // 内容翻转，下偏移变上偏移
    this.fabricWrapperEl!.style.top = -bottom + 'px';

    const canvas = this.imageEditor?.getCanvas()!;
    // 翻转状态换一下
    const backgroundImage = canvas.backgroundImage!;

    const flipY = backgroundImage!.flipY;
    backgroundImage!.flipY = !flipY;

    // 上下偏移互换一下
    const y = backgroundImage.getY();
    const newY = canvasHeight - y;
    backgroundImage.setY(newY);

    const objs = canvas.getObjects() ?? [];
    for (const obj of objs) {
      const objFlipY = obj.flipY;
      const y = obj.getY()
      const height = obj.height;
      const ny = canvasHeight - height - y;
      obj.flipY = !objFlipY;
      obj.setY(ny);
      canvas.setActiveObject(obj);
    }

    canvas.renderAll();
  }

  // 顺时针旋转90度
  rotateClockwise() {

    const canvasArea = this.getCanvasAreaInfo();
    const { left, bottom } = canvasArea;
    const { canvasWidth, canvasHeight } = canvasArea;
    const { visiableHeight, visiableWidth } = canvasArea;
    const canvas = this.imageEditor!.getCanvas()!;

    // 顺时针旋转90度的时候，长高要做一个互换
    this.imageEditor!.setCanvasDims(canvasHeight, canvasWidth);

    const fwStyle = this.fabricWrapperEl!.style;
    fwStyle.left = (-1) * bottom + 'px';
    fwStyle.top = (-1) * left + 'px';

    this.canvasWrapper.style.width = visiableHeight + 'px';
    this.canvasWrapper.style.height = visiableWidth + 'px';

    const image = canvas.backgroundImage!
    const objs = canvas.getObjects() as FabricObject[] ?? [];
    objs.unshift(image);

    for (const obj of objs) {
      const angle = obj.angle;
      const newAngle = (angle + 90) % 360;
      obj.set('angle', newAngle);
      const point = obj.getCenterPoint();
      console.log(point)
      const newPoint = new Point(canvasHeight - point.y, point.x);
      obj.setXY(newPoint, 'center', 'center');

      console.log(newPoint);
    }

    const shapes = canvas.getObjects() as FabricObject[] ?? [];
    for (const shape of shapes) {
      canvas.setActiveObject(shape);
      shape.setCoords();
    }
    canvas.renderAll();

    // 旋转后，整个图会回到界面的正中央
    this.moveCanvasToCenter();
  }

  calculateCanvasWrapper() {
    const prop = new CanvasDetailedProps();
    prop.canvasWrapper = this.canvasWrapper;
    prop.canvasWrapperLeft = this.canvasWrapper.style.left;
    prop.canvasWrapperTop = this.canvasWrapper.style.top;
    prop.canvasWrapperHeight = this.canvasWrapper.style.height;
    prop.canvasWrapperWidth = this.canvasWrapper.style.width;

    prop.topResizer = this.northResizer;
    prop.topResizerLeft = this.northResizer.style.left;
    prop.topResizerTop = this.northResizer.style.top;

    prop.leftResizer = this.westResizer;
    prop.leftResizerLeft = this.westResizer.style.left;
    prop.leftResizerTop = this.westResizer.style.top;

    prop.bottomResizer = this.southResizer;
    prop.bottomResizerLeft = this.southResizer.style.left;
    prop.bottomResizerTop = this.southResizer.style.top;

    prop.rightResizer = this.eastResizer;
    prop.rightResizerLeft = this.eastResizer.style.left;
    prop.rightResizerTop = this.eastResizer.style.top;

    prop.toolbar = this.toolbar;
    prop.toolbarLeft = this.toolbar.style.left;
    prop.toolbarTop = this.toolbar.style.top;

    prop.optionBar = this.optionBar;
    prop.optionBarLeft = this.optionBar.style.left;
    prop.optionBarTop = this.optionBar.style.top;
    return prop;
  }


  // 逆时针旋转90度
  rotateCounterClockwise() {

    const previous = new RotateProps();
    const current = new RotateProps();
    previous.canvasWrapper = current.canvasWrapper = this.canvasWrapper;
    previous.fabricWrapperEl = current.fabricWrapperEl = this.fabricWrapperEl!;
    previous.imageEditor = current.imageEditor = this.imageEditor!;

    const canvasArea = this.getCanvasAreaInfo();
    const { right, top } = canvasArea;
    const { canvasWidth, canvasHeight } = canvasArea;
    const { visiableHeight, visiableWidth } = canvasArea;
    const canvas = this.imageEditor!.getCanvas()!;

    previous.canvasHeight = canvasHeight; previous.canvasWidth = canvasWidth;
    // 逆时针旋转90度的时候，长高要做一个互换
    this.imageEditor!.setCanvasDims(canvasHeight, canvasWidth);
    current.canvasHeight = canvasWidth; current.canvasWidth = canvasHeight;

    const fwStyle = this.fabricWrapperEl!.style;
    previous.left = fwStyle.left;
    previous.top = fwStyle.top;

    fwStyle.left = (-1) * top + 'px';
    fwStyle.top = (-1) * right + 'px';

    current.left = fwStyle.left;
    current.top = fwStyle.top;

    // 可见区域也要一同进行变换
    previous.width = this.canvasWrapper.style.width;
    previous.height = this.canvasWrapper.style.height;

    this.canvasWrapper.style.width = visiableHeight + 'px';
    this.canvasWrapper.style.height = visiableWidth + 'px';

    current.width = this.canvasWrapper.style.width;
    current.height = this.canvasWrapper.style.height;

    const image = canvas.backgroundImage!
    const objs = canvas.getObjects() as FabricObject[] ?? [];
    objs.unshift(image);

    // 还要考虑自带旋转度数的对象
    const oriAngle = image.angle;
    for (const obj of objs) {
      const { x, y } = obj.getXY();
      // 旋转时是按照左上角的顶点进行旋转的
      // 所以要注意到左上角的位置
      let newX, newY;
      // 直接参考顺时针
      if (oriAngle == 0) {
        newX = y;
        const imageRight = canvasWidth - x - obj.width;
        newY = imageRight + obj.width;
      } else if (oriAngle == 270) {
        const imgTop = y - obj.width;
        const imgRight = canvasWidth - x - obj.height;
        newX = imgTop + obj.width;
        newY = imgRight + obj.height;
      } else if (oriAngle == 180) {
        const imgTop = y - obj.height;
        const imgRight = canvasWidth - x;
        newX = imgTop + obj.height;
        newY = imgRight;
      } else if (oriAngle == 90) {
        const imgRight = canvasWidth - x;
        const imgTop = y;
        newX = imgTop;
        newY = imgRight;
      } else {
        throw Error('不满足预期的度数' + oriAngle)
      }
      const angle = obj.angle;
      const newAngle = (angle - 90 + 360) % 360;

      obj.set('angle', newAngle);
      obj.setXY(new Point(newX, newY));

      previous.objs.push(obj);
      previous.objAngle.push(angle);
      previous.objPos.push({ x, y })

      current.objs.push(obj);
      current.objAngle.push(newAngle);
      current.objPos.push({ x: newX, y: newY });

    }

    const shapes = canvas.getObjects() as FabricObject[] ?? [];
    for (const shape of shapes) {
      canvas.setActiveObject(shape);
      shape.setCoords();
    }
    canvas.renderAll();


    previous.canvasWrapperProps = this.calculateCanvasWrapper();

    // 旋转后，整个图会回到界面的正中央
    this.moveCanvasToCenter();

    current.canvasWrapperProps = this.calculateCanvasWrapper();

    this.imageEditor!.getHistory().recordRotateAction(previous, current);

  }

  moveCanvasToCenter() {

    // 先旋转，旋转完看看会不会出滚动条
    // 如果会出滚动条，那么就要考虑把滚动条的值算进去了
    // 如果没有出现滚动条，那么就不用考虑滚动条了
    const { width: parentWidth, height: parentHeight } = this.wrapper.getBoundingClientRect();
    const { width: wrapperWidth, height: wrapperHeight, left: wrapperLeft, top: wrapperTop } = this.canvasWrapper.getBoundingClientRect();

    let cwLeft, cwTop;
    if (parentWidth <= wrapperWidth) {
      cwLeft = 0;
      this.canvasWrapper.style.left = String(cwLeft);
    } else {
      const extra = parentWidth - wrapperWidth;
      cwLeft = extra / 2;
      this.canvasWrapper.style.left = cwLeft + 'px';
    }
    if (parentHeight <= wrapperHeight) {
      cwTop = 0;
      this.canvasWrapper.style.top = String(cwTop);
    } else {
      const extra = parentHeight - wrapperHeight;
      cwTop = extra / 2;
      this.canvasWrapper.style.top = cwTop + 'px';
    }

    this.fixComponentsPosition();
  }

  fixComponentsPosition() {
    this.fixToolbarPosition();
    this.fixResizerPosition();
  }

  fixResizerPosition() {

    const cwTop = pixelToNumber(this.canvasWrapper.style.top)
    const cwLeft = pixelToNumber(this.canvasWrapper.style.left)
    const wrapperWidth = pixelToNumber(this.canvasWrapper.style.width)
    const wrapperHeight = pixelToNumber(this.canvasWrapper.style.height)

    // 12是拉伸按钮的大小，6是拉伸大小的一半，用来做偏移用
    const northResizerTop = cwTop - 12;
    const northResizerLeft = cwLeft + wrapperWidth / 2 - 6;

    const westResizerTop = cwTop + wrapperHeight / 2 - 6;
    const westResizerLeft = cwLeft - 12;

    const southResizerTop = cwTop + wrapperHeight;
    const southResizerLeft = cwLeft + wrapperWidth / 2 - 6;
    const eastResizerTop = cwTop + wrapperHeight / 2 - 6;
    const eastResizerLeft = cwLeft + wrapperWidth;

    this.northResizer.style.top = northResizerTop + 'px';
    this.northResizer.style.left = northResizerLeft + 'px';

    this.northWestResizer.style.top = northResizerTop + 'px';
    this.northWestResizer.style.left = westResizerLeft + 'px';

    this.westResizer.style.top = westResizerTop + 'px';
    this.westResizer.style.left = westResizerLeft + 'px';

    this.southWestResizer.style.top = southResizerTop + 'px';
    this.southWestResizer.style.left = westResizerLeft + 'px';

    this.southResizer.style.top = southResizerTop + 'px';
    this.southResizer.style.left = southResizerLeft + 'px';

    this.southEastResizer.style.top = southResizerTop + 'px';
    this.southEastResizer.style.left = eastResizerLeft + 'px';

    this.eastResizer.style.top = eastResizerTop + 'px';
    this.eastResizer.style.left = eastResizerLeft + 'px';

    this.northEastResizer.style.top = northResizerTop + 'px';
    this.northEastResizer.style.left = eastResizerLeft + 'px';
  }

  fixToolbarPosition() {
    const top = pixelToNumber(this.canvasWrapper.style.top);
    const left = pixelToNumber(this.canvasWrapper.style.left);
    const width = pixelToNumber(this.canvasWrapper.style.width);
    const toolbarWidth = pixelToNumber(this.toolbar.style.width) + 2 * pixelToNumber(this.toolbar.style.padding);
    const height = pixelToNumber(this.canvasWrapper.style.height);
    // 20是一个间隔高度
    this.toolbar.style.top = top + height + 20 + 'px';
    this.toolbar.style.left = left + width / 2 - toolbarWidth / 2 + 'px';
    const current = this.imageEditor!.getOperatorType()
    const currEle = this.menuMap.get(current);
    this.adjustOptionBarPosition(currEle);
    if (current == OperatorType.MOSAIC) {
      this.showSizeOptions();
    }
  }

  adjustOptionBarPosition(currEle?: HTMLDivElement) {
    if (currEle == null) {
      return;
    }
    const pos = getAbsolutePosition(currEle);
    const optionBar = this.optionBar;
    optionBar.style.display = 'inline-block';
    optionBar.style.left = Math.round(pos.x - 130) + 'px';
    optionBar.style.top = Math.round(pos.y + 36) + 'px';
  }

  getCanvasAreaInfo() {

    // 完整的canvas区域，包括可见与不可见的区域
    const canvasWidth = toNumber(this.fabricWrapperEl!.style.width.replace('px', ''));
    const canvasHeight = toNumber(this.fabricWrapperEl!.style.height.replace('px', ''));

    // canvas在左侧和上侧隐藏的区域，值是left和top的绝对值
    const left = (-1) * toNumber(this.fabricWrapperEl!.style.left.replace('px', ''));
    const top = (-1) * toNumber(this.fabricWrapperEl!.style.top.replace('px', ''));

    const visiableWidth = toNumber(this.canvasWrapper!.style.width.replace('px', ''));
    const visiableHeight = toNumber(this.canvasWrapper!.style.height.replace('px', ''));

    // canvas的宽高 减去 可见区域的长度 减去 左侧上侧的区域
    // 就能得到右侧和下侧部分的长度
    const right = canvasWidth - visiableWidth - left;
    const bottom = canvasHeight - visiableHeight - top;

    return {
      canvasWidth, canvasHeight, visiableWidth, visiableHeight, top, bottom, left, right
    }
  }

  getScreenshotCanvas() {
    return this.screenshotCanvas;
  }

  getScreenshotResizers() {
    return this.screenshotResizer;
  }

  getScreenshotToolbar() {
    return this.screenshotToolbar;
  }
  getScreenshotConfirmButton() {
    return this.screenshotConfirmButton;
  }
  getScreenshotCancelButton() {
    return this.screenshotCancelButton;
  }

  getFabricWrapper() {
    return this.fabricWrapperEl;
  }

  // 不能用两个canvas，两个canvas会带来闪烁的问题，直接在原来的canvas上操作
  cropImage() {
    this.hideToolbar();
    const width = pixelToNumber(this.canvasWrapper!.style.width);
    const height = pixelToNumber(this.canvasWrapper!.style.height);
    const screenshot = this.imageEditor!.getScreenshoter();
    const left = pixelToNumber(this.canvasWrapper!.style.left);
    const top = pixelToNumber(this.canvasWrapper!.style.top);
    screenshot.initMask(left, top, width, height);
  }

  resetWrapper(width: number, height: number) {
    this.canvasWrapper.style.width = width + 'px';
    this.canvasWrapper.style.height = height + 'px';
    this.moveCanvasToCenter();
  }

  hideResizer() {
    this.northResizer.style.display = 'none';
    this.westResizer.style.display = 'none';
    this.southResizer.style.display = 'none';
    this.eastResizer.style.display = 'none';
  }

  showResizer() {
    this.northResizer.style.display = 'block';
    this.westResizer.style.display = 'block';
    this.southResizer.style.display = 'block';
    this.eastResizer.style.display = 'block';
  }

  calculateCanvasInfo() {
    const info = new FabricCanvasProps();
    info.fabricWrapperEl = this.fabricWrapperEl!;
    info.fabricWrapperElLeft = this.fabricWrapperEl!.style.left;
    info.fabricWrapperElTop = this.fabricWrapperEl!.style.top;
    const canvas = this.imageEditor!.getCanvas();
    info.canvasWidth = canvas.width;
    info.canvasHeight = canvas.height;
    info.canvasBackgroundColor = canvas.backgroundColor as string;
    info.canvasBackgroundImage = canvas.backgroundImage;
    info.objects = canvas.getObjects();
    return info;
  }

  resetImageEditor() {
    const canvas = this.imageEditor!.getCanvas()
    const image = canvas.backgroundImage!;
    const width = image.width;
    const height = image.height;
    this.imageEditor!.setCanvasDims(width, height);
    image.setXY(new Point(0, 0));
    const objects = canvas.getObjects()
    for (const o of objects) {
      canvas.remove(o);
    }
    this.fabricWrapperEl!.style.width = '0';
    this.fabricWrapperEl!.style.height = '0';
    this.canvasWrapper.style.width = canvas.width + 'px';
    this.canvasWrapper.style.height = canvas.height + 'px';
    this.canvasWrapper.style.left = this.imageEditor!.initWrapperLeft;
    this.canvasWrapper.style.top = this.imageEditor!.initWrapperTop;
    this.fixComponentsPosition();
    this.imageEditor!.getHistory().clearRedoStack();
  }

  downloadAreaImage() {
    const width = pixelToNumber(this.canvasWrapper.style.width);
    const height = pixelToNumber(this.canvasWrapper.style.height);
    const left = pixelToNumber(this.fabricWrapperEl!.style.left)
    const top = pixelToNumber(this.fabricWrapperEl!.style.top)
    const start = new Point(left, top);
    const end = new Point(left + width, top + height);
    const image = this.imageEditor!.getAreaImageInfo(start, end);
    const link = document.createElement("a");
    link.href = image;
    link.download = 'image.png';
    link.click();
  }

  destory() {
    document.removeEventListener('mousemove', this.resizeMoveFn);
    document.removeEventListener('mouseup', this.resizeFinishFn);
  }
}