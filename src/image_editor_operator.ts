
export interface ImageEditorOperator {
  handleMouseDownBefore?(event: any): void;
  handleMouseDown?(event: any): void;
  handleMouseMove?(event: any): void;
  handleMouseUp?(event: any): void;
}

export interface OperatorProps {
  setOperatorSize(width: number): void;
  setOperatorColor(color: string): void;
  getOperatorSize(): number;
  getOperatorColor(): string;
}

export const DEFAULT_COLOR = '#FF0000';

export const DEFAULT_STROKE_WIDTH = 4;

export enum OperatorType {
  RECT, ELLIPSE, ARROW, DRAW, TEXT, MOSAIC, NONE
}

