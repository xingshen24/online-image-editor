import { Canvas, Ellipse, FabricImage, IText, Path, Point, Rect, StaticCanvas, Transform } from "fabric";
import ElementManager from "./element_manager";
import { FabricUtils } from "./fabric_utils";
import OperationHistory from "./history";
import { OperatorType } from "./image_editor_operator";
import ArrowOperator from "./operator/arrow_operator";
import DrawOperator from "./operator/draw_operator";
import EllipseOperator from "./operator/ellipse_operator";
import MosaicOperator from "./operator/mosaic_operator";
import RectangleOperator from "./operator/rect_operator";
import TextOperator from "./operator/text_operator";
import { Screenshoter } from "./screenshoter";
import { ImageEditorShortcutManager } from "./shortcut_manager";
import Arrow from "./operator/fabric_arrow";

const DEFAULT_STATE = { x: 0, y: 0, width: 0, height: 0, scaleX: 1, scaleY: 1, angle: 0, rx: 0, ry: 0 };

export default class ImageEditor {

  // 控制图片编辑器的整体大小
  protected globalScale = 1;

  public static MIN_SCALE = 0.2;

  public static MAX_SCALE = 2;

  protected backgroundImage: FabricImage;

  protected backgroundImageDimension: { width: number, height: number };

  protected initialBackgroundImage: FabricImage;

  protected initialBackgroundImageDimension: { width: number, height: number };

  private canvas: Canvas;

  private currTransform: Transform | null = null;

  private transformStartState = DEFAULT_STATE;

  private screenshoter: Screenshoter;

  private history: OperationHistory;

  private operatorType: OperatorType = OperatorType.NONE;

  private elementManager: ElementManager;

  private rectOperator: RectangleOperator;

  private ellipseOperator: EllipseOperator;

  private arrowOperator: ArrowOperator;

  private drawOperator: DrawOperator;

  private mosaicOperator: MosaicOperator;

  private textOperator: TextOperator;

  private operatorMap = new Map();

  private shortcutManager: ImageEditorShortcutManager;

  private readonly confirmFn: (dataUrl: string) => void;

  private readonly cancelFn: () => void;

  constructor(canvas: Canvas, elementManager: ElementManager
    , confirm: (dataUrl: string) => void, cancel: () => void
  ) {
    this.confirmFn = confirm;
    this.cancelFn = cancel;
    this.elementManager = elementManager;
    this.canvas = canvas;
    const image = canvas.getObjects()[0];
    if (!(image instanceof FabricImage)) {
      throw new Error("unable to load background image");
    }
    this.backgroundImage = image;
    this.backgroundImageDimension = {
      width: image.width,
      height: image.height
    }
    this.initialBackgroundImage = image;
    this.initialBackgroundImageDimension = {
      width: image.width,
      height: image.height
    }
    this.history = new OperationHistory(this);

    this.rectOperator = new RectangleOperator(this);
    this.ellipseOperator = new EllipseOperator(this);
    this.arrowOperator = new ArrowOperator(this);
    this.drawOperator = new DrawOperator(this);
    this.mosaicOperator = new MosaicOperator(this);
    this.textOperator = new TextOperator(this);
    this.bindOperators();
    this.operatorMap.set(OperatorType.RECT, this.rectOperator);
    this.operatorMap.set(OperatorType.ELLIPSE, this.ellipseOperator);
    this.operatorMap.set(OperatorType.ARROW, this.arrowOperator);
    this.operatorMap.set(OperatorType.TEXT, this.textOperator);
    this.operatorMap.set(OperatorType.DRAW, this.drawOperator);
    this.operatorMap.set(OperatorType.MOSAIC, this.mosaicOperator);
    this.canvas.selection = false;
    this.screenshoter = new Screenshoter();
    this.shortcutManager = new ImageEditorShortcutManager(this);
  }

  init() {
    this.elementManager.init(this);
    this.elementManager.bindEvents();
    this.screenshoter.init(this, this.elementManager);
    FabricUtils.setCornerControlsOnly(this.backgroundImage!);
  }

  bindOperators() {
    const rectOperator = this.rectOperator;
    this.canvas.on('mouse:down', rectOperator.handleMouseDown.bind(rectOperator));
    this.canvas.on('mouse:move', rectOperator.handleMouseMove.bind(rectOperator));
    this.canvas.on('mouse:up', rectOperator.handleMouseUp.bind(rectOperator));
    const ellipseOperator = this.ellipseOperator;
    this.canvas.on('mouse:down', ellipseOperator.handleMouseDown.bind(ellipseOperator));
    this.canvas.on('mouse:move', ellipseOperator.handleMouseMove.bind(ellipseOperator));
    this.canvas.on('mouse:up', ellipseOperator.handleMouseUp.bind(ellipseOperator));
    const arrowOperator = this.arrowOperator;
    this.canvas.on('mouse:down', arrowOperator.handleMouseDown.bind(arrowOperator));
    this.canvas.on('mouse:move', arrowOperator.handleMouseMove.bind(arrowOperator));
    this.canvas.on('mouse:up', arrowOperator.handleMouseUp.bind(arrowOperator));
    const textOperator = this.textOperator;
    this.canvas.on('mouse:down:before', textOperator.handleMouseDownBefore.bind(textOperator))
    this.canvas.on('mouse:down', textOperator.handleMouseDown.bind(textOperator));
    this.canvas.on('mouse:up', textOperator.handleMouseUp.bind(textOperator));
    const drawOperator = this.drawOperator;
    this.canvas.on('mouse:down:before', drawOperator.tryToStartDraw.bind(drawOperator))
    this.canvas.on('mouse:up', drawOperator.tryToFinishDraw.bind(drawOperator))
    const mosaicOperator = this.mosaicOperator;
    this.canvas.on('mouse:down:before', mosaicOperator.tryToStartMosaic.bind(mosaicOperator));
    this.canvas.on('mouse:up', mosaicOperator.tryToFinishMosaic.bind(mosaicOperator));

    this.canvas.on('before:transform', (e) => {
      this.currTransform = e.transform;
      const target = e.transform.target;
      this.transformStartState = {
        x: target.getX(),
        y: target.getY(),
        width: target.width,
        height: target.height,
        scaleX: target.scaleX,
        scaleY: target.scaleY,
        angle: target.angle,
        rx: 0, ry: 0
      }
      if (target instanceof Ellipse) {
        this.transformStartState.rx = target.getRx();
        this.transformStartState.ry = target.getRy();
      }
    });

    this.canvas.on('mouse:up', () => {
      if (!!this.currTransform) {
        const transform = this.currTransform;
        const action = transform.action;
        const target = transform.target;
        const beforeState = this.transformStartState;
        if (action === 'drag') {
          const { x, y } = beforeState;
          this.history.recordMoveAction(target, x, y);
        } else if (action === 'scale' || action === 'scaleX' || action === 'scaleY') {
          // 框选，椭圆，箭头，都不是等比例缩放
          // 文字、画笔是等比例缩放，要考虑一下等比例缩放的问题
          const scaleRatio = target instanceof IText || target instanceof Path || target instanceof FabricImage;
          const scaleRedraw = target instanceof Arrow || target instanceof Rect || target instanceof Ellipse;
          const { scaleX, scaleY, x, y, width, height, rx, ry } = beforeState;
          // 等比例缩放，直接记录
          if (scaleRatio) {
            this.history.recordKeepRatioScaleAction(target, scaleX, scaleY, x, y);
          }
          // 框选、箭头、椭圆都是重绘，需要特别注意，尤其是椭圆
          else if (scaleRedraw) {
            if (!(target instanceof Ellipse)) {
              this.history.recordRedrawScaleAction(target, width, height, x, y)
            } else {
              this.history.recordEllipseScaleAction(target, width, height, x, y, rx, ry)
            }
          } else {
            throw new Error('未知的类型');
          }
        } else if (action === 'rotate') {
          const { angle } = beforeState;
          this.history.recordRotateAction(target, angle);
        }
        this.transformStartState = DEFAULT_STATE;
        this.currTransform = null;
      }
    })
  }

  getCanvas() {
    return this.canvas;
  }

  getActiveOperator() {
    return this.operatorMap.get(this.operatorType);
  }

  getOperatorType() {
    return this.operatorType;
  }

  changeOperatorType(type: OperatorType) {
    // 如果要修改的type和当前的是一样的话，那么就不变
    if (this.operatorType == type) {
      return;
    }
    const current = type;
    this.operatorType = current;
  }

  getHistory(): OperationHistory {
    return this.history;
  }

  setCanvasHeight(height: number) {
    this.canvas.setDimensions({ height })
  }

  setCanvasWidth(width: number) {
    this.canvas.setDimensions({ width })
  }

  setCanvasDims(width: number, height: number) {
    this.canvas.setDimensions({ height, width });
  }

  transform(offsetX: number, offsetY: number) {
    const backgroundImage = this.getBackgroundImage();
    console.log(backgroundImage)
    const x = backgroundImage.getX();
    const y = backgroundImage.getY();
    backgroundImage.setXY(new Point(x + offsetX, y + offsetY));
    backgroundImage.setCoords();
    const objs = this.canvas.getObjects();
    if (offsetX != 0 || offsetY != 0) {
      for (const obj of objs) {
        if (obj === backgroundImage) {
          continue;
        }
        obj.left += offsetX;
        obj.top += offsetY;
        obj.setCoords();
      }
    }
    this.canvas.renderAll();
  }

  transformX(fabricLeft: number) {
    const backgroundImage = this.getBackgroundImage();
    const x = backgroundImage.getX()
    backgroundImage.setX(x + fabricLeft)
    let objs = this.canvas.getObjects();
    if (objs == null) {
      objs = [];
    }
    for (const obj of objs) {
      if (obj != backgroundImage) {
        obj.left += fabricLeft;
      }
      obj.setCoords();
    }
    this.canvas.renderAll();
  }

  transformY(fabricTop: number) {
    const backgroundImage = this.getBackgroundImage();
    const y = backgroundImage.getY()
    backgroundImage.setY(y + fabricTop)
    let objs = this.canvas.getObjects();
    if (objs == null) {
      objs = [];
    }
    for (const obj of objs) {
      if (obj != backgroundImage) {
        obj.top += fabricTop;
      }
      obj.setCoords();
    }
    this.canvas.renderAll();
  }

  getAreaImageInfo(start: Point, bottom: Point) {

    const width = bottom.x - start.x;
    const height = bottom.y - start.y;

    const tempCanvas = new StaticCanvas(undefined, { width, height });
    tempCanvas.add(new FabricImage(this.canvas.lowerCanvasEl, {
      left: 0,
      top: 0,
    }))

    const dpr = devicePixelRatio || 1;
    const image = tempCanvas.toDataURL({
      format: 'jpeg',
      left: start.x * dpr,
      top: start.y * dpr,
      width: width * dpr,
      height: height * dpr,
      quality: 0.92, // 这个要考虑改成1
      multiplier: 1
    });

    return image;
  }

  async renderToCanvas(imageDataUrl: string) {
    const canvas = this.canvas;
    const objects = canvas.getObjects();
    for (const object of objects) {
      canvas.remove(object);
    }
    canvas.clear();
    const elementManger = this.elementManager;
    let ret;

    await FabricImage.fromURL(imageDataUrl, { crossOrigin: 'anonymous' }).then(img => {
      ret = img;
      img.evented = false;
      img.selectable = false;
      img.lockScalingFlip = true;
      const width = img.width;
      const height = img.height;
      canvas.setDimensions({ width, height })
      FabricUtils.setCenterOrigin(img);
      img.setXY(new Point(width / 2, height / 2));
      this.backgroundImage = img;
      this.backgroundImageDimension = {
        width, height
      }
      FabricUtils.setCornerControlsOnly(img);

      canvas.add(img);
      canvas.backgroundColor = '#FFF';
      const style = elementManger.getFabricWrapper()!.style;
      style.left = '0px';
      style.top = '0px';
      elementManger.resetWrapper(width, height);
      canvas.renderAll();
    })
    return ret;
  }

  getScreenshoter() {
    return this.screenshoter;
  }

  // 保存状态，后面还原直接用
  storeCanvasState() {
  }

  destory() {
    this.shortcutManager.destroy();
    this.canvas.destroy();
  }

  removeActiveObjects() {
    const active = this.canvas!.getActiveObject();
    if (active) {
      this.canvas.remove(active);
      this.history.recordRemoveAction(active);
    }
  }

  scale(scale: number) {
    const newScale = this.globalScale + scale;
    if (newScale < ImageEditor.MIN_SCALE || newScale > ImageEditor.MAX_SCALE) {
      return false;
    }
    this.globalScale = newScale;
    return true;
  }

  getBackgroundImage() {
    return this.backgroundImage;
  }

  setBackgroundImage(image: FabricImage) {
    this.backgroundImage = image;
  }

  getInitialBackgroundImage() {
    return this.initialBackgroundImage;
  }

  getBackgroundImageDimension() {
    return this.backgroundImageDimension;
  }

  getInitialBackgroundImageDimension() {
    return this.initialBackgroundImageDimension;
  }

  confirm(dataUrl: string) {
    this.confirmFn(dataUrl);
  }

  cancel() {
    this.cancelFn();
  }

  getTransform() {
    return this.currTransform;
  }

  getTransformState() {
    return this.transformStartState;
  }

  moveCanvasToCenter() {
    this.elementManager.moveCanvasToCenter();
  }

  resetGlobalScale() {
    this.globalScale = 1;
  }
}