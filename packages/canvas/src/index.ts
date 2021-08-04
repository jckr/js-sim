import Model from '@js-sim/core';
import type {Props, RenderData} from '@js-sim/core';

interface RenderCanvas<T> extends RenderData<T> {
  canvas?: HTMLCanvasElement,
  ctx?: CanvasRenderingContext2D,
  roundRectangle?: (args: RoundRectangle) => void,
  circle?: (args: Circle) => void,
  height?: number,
  width?: number
};

const defaultProps = {
  delay: 0,
  initialTick: 0,
  maxTime: 100,
  minTime: 0,
  noCache: false,
  ticksPerAnimation: 1,
};


interface RoundRectangle {
  x: number;
  y: number;
  width: number;
  height: number;
  r?: number;
  tl?: number;
  tr?: number;
  bl?: number;
  br?: number;
}

interface Circle {
  x: number;
  y: number;
  r: number;
}

type CanvasProps<T, U> = Props<T, U> & {
  canvas?: HTMLCanvasElement,
  ctx?: CanvasRenderingContext2D,
  height?: number,
  width?: number,
  render?: (args: RenderCanvas<T>) => void
};

export const roundRectangleWithCtx = (
  args: RoundRectangle,
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

export const circleWithCtx = (args: Circle, ctx: CanvasRenderingContext2D) => {
  const {r, x, y} = args;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.closePath();
};

export default class CanvasModel<T = any, U = any> extends Model<T, U> {
  props: CanvasProps<T, U>;
  circle: (args: Circle) => void;
  roundRectangle: (args: RoundRectangle) => void;

  constructor(props: CanvasProps<T, U>) {
    super(props);
    let ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement;
    if (props.ctx) {
      ctx = props.ctx;
      canvas = ctx.canvas;
    } else {
      if (props.canvas) {
        canvas = props.canvas;
        let getContext = canvas.getContext('2d');
        if(getContext === null) {
          throw(`couldn't get 2d context from canvas`);
        };
        ctx = getContext;
      }
      else {
        throw(`neither ctx nor canvas provided`);
      }
    }
    if (ctx === null) {
      throw('ctx is undefined');
    }
    this.props = {
      ...defaultProps,
      ...props,
      canvas,
      ctx,
    };
    this.circle = (args: Circle) => circleWithCtx(args, ctx);
    this.roundRectangle = (args: RoundRectangle) => roundRectangleWithCtx(args, ctx);
  }
  render() {
    if (this.props.render) {
      this.props.render({
        // arguments from the internals of the model
        cachedData: this.state.cachedData,
        data: this.state.data,
        params: this.state.params,
        tick: this.state.tick,

        // canvas specific arguments
        canvas: this.props.canvas,
        ctx: this.props.ctx,
        height: this.props.canvas?.height,
        width: this.props.canvas?.width,

        // convenience methods
        circle: this.circle,
        roundRectangle: this.roundRectangle,
      });
    }
  }
}