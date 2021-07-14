import React from 'react';
import type { ComponentType } from 'react';
import {ThemeContext} from 'styled-components'

export {
  OptionProps,
  CheckboxProps,
  InputProps,
  RadioProps,
  RangeProps,
  PlayProps,
  SelectProps,
  StepProps,
  StopProps,
  TimerButtonProps,
  TimerProps,
  ToggleProps,
  Control,
  ControlsType
} from './types';

export function withTheme<BaseProps>(BaseComponent: ComponentType<BaseProps>) {
  return function ThemeComponent(props: BaseProps) {
    return (
      <ThemeContext.Consumer>
        {({ theme }) => <BaseComponent theme={theme} {...props} />}
      </ThemeContext.Consumer>
    );
  };
}


export {ControlsProvider, withControls} from './controls-context';

export {CheckboxComponent, default as Checkbox} from './checkbox';
export {InputComponent, default as Input} from './input';
export {RadioComponent, default as Radio} from './radio';
export {RangeComponent, default as Range} from './range';
export {SelectComponent, default as Select} from './select';
export {TimerComponent, default as Timer} from './timer';
export {ToggleComponent, default as Toggle} from './toggle';

export {ControlsComponent, hasTimer, default as Controls} from './controls';