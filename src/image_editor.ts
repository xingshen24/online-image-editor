import { Canvas, FabricImage, FabricObject, Point, StaticCanvas } from "fabric";
import ArrowOperator from "./operator/arrow_operator";
import DrawOperator from "./operator/draw_operator";
import EllipseOperator from "./operator/ellipse_operator";
import { OperatorType } from "./image_editor_operator";
import ElementManager from "./element_manager";
import MosaicOperator from "./operator/mosaic_operator";
import RectangleOperator from "./operator/rect_operator";
import TextOperator from "./operator/text_operator";
import OperationHistory from "./history";
import { Screenshoter } from "./screenshoter";
import { ImageEditorShortcutManager } from "./shortcut_manager";
import { FabricUtils } from "./fabric_utils";

export default class ImageEditor {

  private canvas: Canvas;

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

  constructor(canvas: Canvas, elementManager: ElementManager) {
    this.elementManager = elementManager;
    this.canvas = canvas;
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
    this.canvas.on('mouse:down:before', mosaicOperator.tryToStartMosaic.bind(mosaicOperator))
    this.canvas.on('mouse:up', mosaicOperator.tryToFinishMosaic.bind(mosaicOperator))
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
    if (current == OperatorType.NONE) {
      // this.canvas.getObjects().forEach((obj: FabricObject) => {
      //   // 重新调整完后，要将对象激活一下，这或许是个坑？
      //   this.canvas.setActiveObject(obj);
      // })
    }
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
    const backgroundImage = this.canvas.backgroundImage!;
    const x = backgroundImage.getX();
    const y = backgroundImage.getY();
    backgroundImage.setXY(new Point(x + offsetX, y + offsetY));
    const objs = this.canvas.getObjects();
    for (const obj of objs) {
      obj.left += offsetX;
      obj.top += offsetY;
      obj.setCoords();
    }
    this.canvas.renderAll();
  }

  transformX(fabricLeft: number) {
    const x = this.canvas.backgroundImage!.getX()
    this.canvas.backgroundImage?.setX(x + fabricLeft)
    let objs = this.canvas.getObjects();
    if (objs == null) {
      objs = [];
    }
    for (const obj of objs) {
      obj.left += fabricLeft;
      obj.setCoords();
    }
    this.canvas.renderAll();
  }

  transformY(fabricTop: number) {
    const y = this.canvas.backgroundImage!.getY()
    this.canvas.backgroundImage?.setY(y + fabricTop)
    let objs = this.canvas.getObjects();
    if (objs == null) {
      objs = [];
    }
    for (const obj of objs) {
      obj.top += fabricTop;
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

    const image = tempCanvas.toDataURL({
      format: 'png',
      left: start.x,
      top: start.y,
      width, height,
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
    canvas.backgroundImage = undefined;
    canvas.clear();
    const elementManger = this.elementManager;
    let ret;

    await FabricImage.fromURL(imageDataUrl).then(img => {
      ret = img;

      const width = img.width;
      const height = img.height;
      canvas.setDimensions({ width, height })
      FabricUtils.setCenterOrigin(img);
      img.setXY(new Point(width / 2, height / 2));
      canvas.backgroundImage = img;
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
  }

  removeActiveObjects() {
    const active = this.canvas!.getActiveObject();
    if (active) {
      this.canvas.remove(active);
      this.history.recordRemoveAction(active);
    }
  }
}