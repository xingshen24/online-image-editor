/* eslint-disable no-param-reassign */
import { Line } from 'fabric';

// 原来的createClass不太好使了，现在改成使用extends
// 由上到下，由左到右
export default class Arrow extends Line {

  private arrowWidth: number = 4;

  constructor([x1, y1, x2, y2] = [0, 0, 0, 0], options: any = {}) {
    super([x1, y1, x2, y2], options);
  }

  // 8种情况的分解 是在所难免的
  _render(ctx: CanvasRenderingContext2D): void {
    super._render(ctx);
    ctx.save();

    // 角度要重新计算一下，应该根据宽高来搞
    const xDiff = this.x2 - this.x1;
    const yDiff = this.y2 - this.y1;
    let y = yDiff > 0 ? this.height : -this.height;
    let x = xDiff > 0 ? this.width : -this.width;
    if (xDiff == 0) {
      x = 0;
    }
    if (yDiff == 0) {
      y = 0;
    }
    const angle = Math.atan2(y, x);
    // 画一个三角形，然后将其移动到合适的位置去
    this.translateArrow(ctx);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(this.arrowWidth * 2, 0);
    ctx.lineTo(-this.arrowWidth * 2, this.arrowWidth * 2);
    ctx.lineTo(-this.arrowWidth * 2, -this.arrowWidth * 2);
    ctx.closePath();
    ctx.fillStyle = (String)(this.stroke);
    ctx.fill();
    ctx.restore();
  }

  translateArrow(ctx: CanvasRenderingContext2D) {
    const diffX = this.x2 - this.x1, diffY = this.y2 - this.y1;
    if (diffX == 0 && diffY > 0) {
      ctx.translate(0, this.height / 2);
    } else if (diffX == 0 && diffY < 0) {
      ctx.translate(0, -this.height / 2);
    } else if (diffY == 0 && diffX > 0) {
      ctx.translate(this.width / 2, 0);
    } else if (diffY == 0 && diffX < 0) {
      ctx.translate(-this.width / 2, 0);
    } else if (diffX > 0 && diffY > 0) {
      ctx.translate(this.width / 2, this.height / 2);
    } else if (diffX > 0 && diffY < 0) {
      ctx.translate(this.width / 2, -this.height / 2);
    } else if (diffX < 0 && diffY > 0) {
      ctx.translate(-this.width / 2, this.height / 2);
    } else if (diffX < 0 && diffY < 0) {
      ctx.translate(-this.width / 2, -this.height / 2);
    }
  }
}