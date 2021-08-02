import React from 'react';

import {
  ControlsContextInterface,
  ControlsComponentInterface,
  CheckboxComponent,
  InputComponent,
  RadioComponent,
  RangeComponent,
  SelectComponent,
  TimerComponent,
  ToggleComponent,
  withControls
} from '.';

import type {ControlsType} from '.';

const noop = () => {};

import { Flex } from 'rebass';

export function ControlsComponent(props: ControlsComponentInterface) {
  const {
    controls = null,
    params = {},
    setParams = noop,
    horizontally = false,
    isPlaying = false,
    pause = noop,
    play = noop,
    stop = noop,
    tick = 0,
    updateTime = noop
  } = props;
  if (!controls) {
    return null;
  }
  const renderControls = (
    controls?: ControlsType,
    horizontally?: boolean,
) => {
    if (!controls) {
        return null;
    }
    
    // if parameter is an array, we render a series of controls
    if (Array.isArray(controls)) {
        return controls.map((c, i) => (
          <Flex
            flexDirection={horizontally ? 'row' : 'column'}
            sx={
              horizontally
                ? { mt: 1, alignItems: 'center', flexWrap: 'wrap' }
                : { my: 1 }
            }
            key={`c-${i}`}
          >
            {/* If original parameter is a nested array, we render nested rows of columns */}
            {renderControls(
              c,
                !horizontally,
                )
                }
          </Flex>
        ));
      }
       // parameter is a single control

    // we can do something different depending on type

    const paramName = controls.param;
    const value = params[paramName];

    const setBooleanValue = (value: boolean) => setParams({[paramName]: value}, controls.resetOnchange);
    const setNumberValue = (value: number) => setParams({[paramName]: value}, controls.resetOnchange);
    const setStringValue = (value: string) => setParams({[paramName]: value}, controls.resetOnchange); 

    let control;

    switch (controls.type) {
      case 'checkbox':
        control = <CheckboxComponent
          label={paramName}
          {...controls}
          value={Boolean(value)}
          setValue={setBooleanValue}
        />;
        break;
      case 'input':
        control = <InputComponent label={paramName} 
        {...controls}
        value={String(value)}
        setValue={setStringValue}
        />;
        break;
      case 'radio':
        control = <RadioComponent label={paramName} {...controls} 
        value={String(value)}
        setValue={setStringValue}
        />;
        break;
      case 'select':
        control = <SelectComponent label={paramName} {...controls}   value={String(value)}
        setValue={setStringValue} />;
        break;
      case 'timer':
        control = (
          <TimerComponent
            label={paramName}
            {...controls}
            isPlaying={isPlaying}
            value={tick}
            setValue={updateTime}
            pause={pause}
            play={play}
            stop={stop}
          />
        );
        break;
      case 'toggle':
        control = <ToggleComponent label={paramName} {...controls} 
        value={Boolean(value)}
        setValue={setBooleanValue}
        />;
        break;
      default:
        control = <RangeComponent label={paramName} {...controls}
        value={Number(value)}
        setValue={setNumberValue}
      />;
    }
    return <Flex mr={2}>{control}</Flex>;
  };
  return <Flex flexDirection='column' sx={{touchAction: 'manipulation'}}>{renderControls(controls, horizontally)}</Flex>;
}

export function hasTimer(controls: ControlsType): Boolean {
  // no controls
  if (!controls) {
    return false;
  }

  // array of controls (rows or columns of controls)
  if (Array.isArray(controls)) {
    // if this is true for one of the children, returns true.
    return controls.some((c) => hasTimer(c));
  }

  // single object
  return controls.type === 'timer';
}

export default withControls<{controls?: ControlsType, horizontally?: boolean}>(ControlsComponent);