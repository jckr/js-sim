import Model from '@sim/core';
import type {Props} from '@sim/core';

export const roundRectangleWithCtx = (
  args: { x: number, y: number, width: number, height: number, r?: number, tl?: number, tr?: number, br?: number, bl?: number },
  ctx: CanvasRenderingContext2D
) => {
  const r = args.r ?? 1;
  const {x, y, width, height} = args;
  const topLeft = args.tl ?? r;
  const topRight = args.tr ?? r;
  const bottomLeft = args.bl ?? r;
  const bottomRight = args.br ??r;

  ctx.beginPath();
  ctx.moveTo(x + topLeft, y);
  ctx.lineTo(x + width - topRight, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + topRight);
  ctx.lineTo(x + width, y + height - bottomRight);
  ctx.quadraticCurveTo(
    x + width,
    y + height,
    x + width - bottomRight,
    y + height
  );
  ctx.lineTo(x + bottomLeft, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - bottomLeft);
  ctx.lineTo(x, y + topLeft);
  ctx.quadraticCurveTo(x, y, x + topLeft, y);
  ctx.closePath();
};

export const circleWithCtx = (args: { x: number, y: number, r: number}, ctx: CanvasRenderingContext2D) => {
  const {r, x, y} = args;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.closePath();
};

type CanvasProps<T, U> = Props<T, U> & {
  canvas?: HTMLCanvasElement,
  ctx?: CanvasRenderingContext2D};

export default class CanvasModel<T = any, U = any> extends Model<T, U> {
  canvasProps: {
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    height: number
    width: number,
  }
  constructor(props: CanvasProps<T, U>) {
    super(props);
    let ctx: CanvasRenderingContext2D | null, canvas: HTMLCanvasElement;
    if (props.ctx) {
      ctx = props.ctx;
      if (ctx === null) {
        // cannot happen, but this pleases typescript
        throw('ctx is null');
      }
      canvas = ctx.canvas;
    } else {
      if (props.canvas) {
        canvas = props.canvas;
        ctx = canvas.getContext('2d');
        if (ctx === null) {
          throw(`couldn't get context from canvas`);
        }
      }
      else {
        throw(`neither ctx nor canvas provided`);
      }
    }
    this.canvasProps = {
      canvas,
      ctx,
      height: canvas.height,
      width: canvas.width
    };
  }
}