import React from 'react'
import { Flex } from 'rebass'
import Play from './play';
import Step from './step';
import { RangeComponent } from './range';
import Stop from './stop';
import {withControls, forms, TimerProps} from '.';
import {useThemeUI} from 'theme-ui';

export function TimerComponent(props: TimerProps) {
  const {
    colors = {
      background: String(useThemeUI()?.theme?.colors?.primary || forms.colors.primary),
      color: String(useThemeUI()?.theme?.colors?.background || forms.colors.background)
    },
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
      <Play colors={colors} isPlaying={isPlaying} play={play} pause={pause} />
      <Stop colors={colors} shouldShowReset={isPlaying === false && value === minTime} stop={stop} />
      <Step colors={colors} step={step} />
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
