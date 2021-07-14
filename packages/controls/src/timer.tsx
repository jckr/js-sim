import React from 'react'
import { Flex } from 'rebass'
import Play from './play';
import Step from './step';
import { RangeComponent } from './range';
import Stop from './stop';
import {withControls, TimerProps} from '.';

export function TimerComponent(props: TimerProps) {
  const {
      background = '',
      isPlaying,
      label = 'Time',
      name = 'Time',
      maxTime = 100,
      minTime = 0,
      pause, 
      play,
      setValue,
      showTimeSlider = true,
      showTime = true,
      stop,
      value,
      ...rangeProps
  } = props;

  const step = () => setValue(value + 1);
  return (
    <Flex sx={{ alignItems: 'center', flexDirection: 'row' }}>
      <Play background={background} isPlaying={isPlaying} play={play} pause={pause} />
      <Stop background={background} shouldShowReset={isPlaying === false && value === minTime} stop={stop} />
      <Step background={background} step={step} />
      {showTime && (
        <RangeComponent
          minValue={minTime}
          maxValue={maxTime}
          name={name}
          value={value}
          setValue={setValue}
          shouldDisplaySlider={showTimeSlider}
          label={label}
          {...rangeProps}
        />
      )}
    </Flex>
  )
}

export default withControls<TimerProps>(TimerComponent);
