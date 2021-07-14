import { MouseEventHandler } from "react";
import type {Params} from 'core';

export type OptionProps = Array<string> | Array<{label: string, value: string}>;

type coreControlProps = {
  background?: string;
  label?: string,
  name?: string,
}

export interface CheckboxProps extends coreControlProps {
  value: boolean,
  setValue: (value: boolean) => void
};

export interface InputProps extends coreControlProps {
  value: string,
  setValue: (value: string) => void
}

export interface RadioProps extends coreControlProps {
  options?: OptionProps
  value: string,
  vertical?: boolean,
  setValue: (value: string) => void
};

export interface RangeProps extends coreControlProps {
  maxValue?: number;
  minValue?: number;
  setValue: (value: number) => void;
  shouldDisplayLabel?: boolean;
  shouldDisplayMaxValue?: boolean;
  shouldDisplayMinValue?: boolean;
  shouldDisplayValue?: boolean;
  shouldDisplaySlider?: boolean;
  step?: number;
  value: number;
}

export interface PlayProps extends coreControlProps {
  isPlaying: boolean,
  pause: MouseEventHandler<HTMLButtonElement>,
  play: MouseEventHandler<HTMLButtonElement>,
}
export interface SelectProps extends coreControlProps {
  options?: OptionProps,
  value: string,
  setValue: (value: string) => void
};

export interface StepProps extends coreControlProps  {
  step: MouseEventHandler<HTMLButtonElement>
};

export interface StopProps extends coreControlProps {
  shouldShowReset: boolean;
  stop: MouseEventHandler<HTMLButtonElement>;
};

export interface TimerProps extends coreControlProps {
  isPlaying: boolean,
  maxTime?: number,
  minTime?: number,
  pause: MouseEventHandler<HTMLButtonElement>,
  play: MouseEventHandler<HTMLButtonElement>,
  showTimeSlider?: boolean,
  showTime?: boolean,
  stop: MouseEventHandler<HTMLButtonElement>,
  value: number,
  setValue: (time: number) => void,
};

export interface TimerButtonProps {
  children: JSX.Element,
  onClick: MouseEventHandler<HTMLButtonElement>,
};

export interface ToggleProps extends coreControlProps {
  value: boolean;
  setValue: (value: boolean) => void;
};

export interface Control extends coreControlProps {
  param: string
  type?: 'checkbox' | 'input' | 'radio' | 'range' | 'select' | 'timer' | 'toggle',
  value: boolean | number | string,
  setValue: ((value: boolean) => void) | ((value: number) => void) | ((value: string) => void),
  resetOnchange?: boolean,

  isPlaying?: boolean,
  maxTime?: number,
  maxValue?: number,
  minTime?: number,
  minValue?: number,
  options?: OptionProps,
  pause?: MouseEventHandler<HTMLButtonElement>,
  play?: MouseEventHandler<HTMLButtonElement>,
  shouldShowReset?: boolean;
  showTimeSlider?: boolean,
  showTime?: boolean,
  stop?: MouseEventHandler<HTMLButtonElement>,
  vertical?: boolean
};

export interface ControlsComponentInterface {
  controls?: ControlsType,
  params: Params,
  setParams?: (params: Params, shouldResetOnChange?: boolean) => void,
  horizontally?: boolean,
  isPlaying?: boolean,
  pause?: () => void,
  play?: () => void,
  stop?: () => void,
  tick?: number,
  updateTime?: (time: number) => void
}

export interface ControlsContextInterface {
  isPlaying: boolean,
  params: Params,
  pause: () => void,
  play: () => void,
  setParams: (params: Params) => void,
  stop: () => void,
}

export type ControlsType = Control | Control[] | ControlsType[];
