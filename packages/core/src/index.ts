export type Param = boolean | number | string | null;

export type Params = {
  [key: string]: Param;
};

export interface State<T, U> {
  cachedData: { [tick: number]: T };
  canPlay: boolean;
  data: T;
  initialTick: number;
  isPlaying: boolean | null;
  maxTick: number;
  params: Params;
  results?: U[];
  tick: number;
  time: DOMHighResTimeStamp | null;
  timer: number | null;
}

interface DefaultProps {
  delay?: number;
  initialTick?: number;
  maxTime?: number;
  minTime?: number;
  noCache?: boolean;
  ticksPerAnimation?: number;
}

interface RequiredProps<T, U> {
  initData: (params?: Params) => T;
  updateData: (args: UpdateData<T, U>) => T;
}

export interface Props<T, U> extends RequiredProps<T, U>, DefaultProps {
  initialParams?: Params;
  render?: (args: RenderData<T>) => void;
}

export interface RenderData<T> {
  cachedData?: { [tick: number]: T };
  data?: T;
  tick?: number;
  params?: Params;
}

export interface UpdateData<T, U> extends RenderData<T> {
  complete: (result: U) => void;
  stop: () => void;
  pause: () => void;
}

const defaultProps: DefaultProps = {
  delay: 0,
  initialTick: 0,
  maxTime: 100,
  minTime: 0,
  noCache: false,
  ticksPerAnimation: 1,
};

export default class Model<T = any, U = any> {
  props: Props<T, U>;
  state: State<T, U>;

  constructor(props: Props<T, U>) {
    this.props = { ...defaultProps, ...props };
    this.state = this.reset();
  }

  reset() {
    const params = this.state?.params || this.props.initialParams || {};
    const data = this.props.initData(params);
    const tick = this.props.initialTick ?? this.props.minTime ?? 0;
    return {
      cachedData: this.state?.cachedData || {},
      canPlay: true,
      data,
      initialTick: tick,
      isPlaying: this.state?.isPlaying ?? null,
      maxTick: tick,
      params,
      tick,
      time: null,
      timer: null,
    };
  }

  checkCanPlay(tick: number) {
    const maxTime = this.props.maxTime ?? defaultProps.maxTime;
    if (maxTime === undefined) {
      // this can't ever happen as defaultProps.maxTime is defined,
      // typescript is being unreasonable here
      throw('maxTime is undefined');
    }
    if (this.state.canPlay === false || tick > maxTime) {
      this.state.canPlay = false;
      this.state.isPlaying = false;
      return false;
    }
    return true;
  }

  advance(timestamp: DOMHighResTimeStamp = performance.now()) {
    const delay = this.props.delay ?? defaultProps.delay;
    const ticksPerAnimation = this.props.ticksPerAnimation ?? defaultProps.ticksPerAnimation;
    if (delay === undefined || ticksPerAnimation === undefined) {
       // this can't ever happen, see checkCanPlay
       throw('delay or ticksPerAnimation are undefined');
    }
    if (this.checkCanPlay(this.state.tick)) {
      if (this.state.time === null) {
        this.state.time = timestamp;
      }
      // if there is a delay specified, we're only going
      // to update the state if we are passed that delay
      if (timestamp - this.state.time >= delay) {
        this.state.time = timestamp;
        this.updateToTick({
          target: this.state.tick + ticksPerAnimation,
        });
      }
      // and delay or not, if we can continue looping, we
      // keep on looping
      if (this.state.isPlaying) {
        if (this.state.timer) {
          window.cancelAnimationFrame(this.state.timer);
        }
        this.state.timer = window.requestAnimationFrame(
          this.advance.bind(this)
        );
      }
    }
  }
  // stops the cycle of request animation frame calls, and clears the timer.
  stopAndCancelTimer() {
    if (this.state.timer) {
      window.cancelAnimationFrame(this.state.timer);
      this.state.timer = null;
    }
  }

  // updates the data directly.
  setData(data: T) {
    // this will also stop the timer.
    this.stopAndCancelTimer();
    this.state.data = data;
    // and reset to the initial tick.
    this.state.isPlaying = false;
    this.state.tick = this.state.initialTick;
  }

  setParams(updatedParams: Params = {}, resetOnChange: boolean = false) {
    this.state.params = { ...this.state.params, ...updatedParams };
    if (resetOnChange) {
      this.reset();
    }
  }

  stop() {
    this.stopAndCancelTimer();
    this.state.isPlaying = false;
    this.state = this.reset();
  }

  play() {
    this.state.isPlaying = true;
    this.state.timer = window.requestAnimationFrame(this.advance.bind(this));
  }

  pause() {
    this.stopAndCancelTimer();
    this.state.isPlaying = false;
  }

  // As a model updates data, it may reach a stopping position.
  complete(result: U) {
    this.state.results?.push(result);
    this.state.canPlay = false;
    this.stop();
  }

  render() {
    if (this.props.render) {
      this.props.render({
        cachedData: this.state.cachedData,
        data: this.state.data,
        params: this.state.params,
        tick: this.state.tick,
      });
    }
  }

  setTick(target: number) {
    this.stopAndCancelTimer();
    this.updateToTick({ target, shouldStop: true });
  }

  updateToTick({
    target,
    shouldStop = false,
  }: {
    target: number;
    shouldStop?: boolean;
  }) {
    let { data } = this.state;
    let tick;

    // if we've already computed (and cached) data for a given tick,
    // we'll just retrieve it.
    if (this.state.cachedData.hasOwnProperty(target)) {
      data = this.state.cachedData[target];
      tick = target;
    } else {
      // else, we're starting from the last tick for which we cached data.
      // failing that, we start from the current tick.

      if (this.state.cachedData[this.state.maxTick]) {
        tick = this.state.maxTick;
      } else {
        tick = this.state.tick;
      }

      // note - if data is not cached, and user wants
      // to go back in time, before current tick, nothing
      // will happen

      while (tick < target && this.checkCanPlay(tick)) {
        // then, we're going to advance tick by one and update data.
        // however, each time we run the updateData, there's a chance
        // that the simulation completes. In this case, we shouldn't go
        // further.
        //
        // this is what the checkCanPlay method addresses. If false, we
        // stop updating data and tick.
        tick++;
        data = this.props.updateData({
          cachedData: this.state.cachedData,
          data,
          tick,
          params: this.state.params,
          complete: this.complete,
          stop: this.stop,
          pause: this.pause,
        });

        // then, we cache the data which is calculated.
        // it's possible to opt out cache, because if there's no maxTime
        // and the dataset is large and the simulation can't complete (open ended)
        // we'll run out of memory eventually.

        if (!this.props.noCache) {
          this.state.maxTick = tick;
          this.state.cachedData[tick] = data;
        }

        this.state.data = data;
        this.state.tick = tick;
        if (shouldStop) {
          this.state.isPlaying = false;
        }

        this.render();
      }
    }
  }

  debugString() {
    console.log({ props: this.props, state: this.state });
  }
}
