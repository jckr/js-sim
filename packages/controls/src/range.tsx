import React from 'react';
import { Flex, Text } from 'rebass';
import { Label, Slider } from '@rebass/forms';
import {withControls, RangeProps} from '.';

export function RangeComponent(props: RangeProps) {
  const {
    label,
    name,
    maxValue = 100,
    minValue = 0,
    setValue,
    shouldDisplayLabel = true,
    shouldDisplayMaxValue = true,
    shouldDisplayMinValue = true,
    shouldDisplayValue = true,
    shouldDisplaySlider = true,
    step = 1,
    value,
  } = props;

  const LabelRow =
    (label !== undefined || value !== undefined) &&
    (shouldDisplayLabel || shouldDisplayValue) ? (
      <Label htmlFor={name || label}>
        {shouldDisplayLabel && label && `${label}: `}
        {shouldDisplayValue && value}
      </Label>
    ) : null;

  const ControlRow = shouldDisplaySlider &&
    maxValue !== undefined &&
    maxValue < Infinity && (
      <Flex flexDirection="row" alignItems="center" sx={{ width: [158] }}>
        {shouldDisplayMinValue && (
          <Text
            sx={{
              color: 'gray',
              cursor: 'pointer',
              fontSize: 1,
              userSelect: 'none',
              width: 'max-content',
            }}
            onClick={() => setValue(Math.max(minValue, value - step))}
          >
            {minValue}
          </Text>
        )}
        <Slider
          id={name || label}
          name={name || label}
          sx={{
            mx: 2,
          }}
          max={maxValue}
          min={minValue}
          onChange={e => {
            setValue(Number(e.target.value));
          }}
          step={step}
          value={value}
        />
        {shouldDisplayMaxValue && (
          <Text
            sx={{
              color: 'gray',
              cursor: 'pointer',
              fontSize: 1,
              userSelect: 'none',
              width: 'max-content',
              minWidth: [40],
            }}
            onClick={() => setValue(Math.min(maxValue, value + step))}
          >
            {maxValue}
          </Text>
        )}
      </Flex>
    );

  return (
    <Flex flexDirection="column">
      {LabelRow}
      {ControlRow}
    </Flex>
  );
}

export default withControls<RangeProps>(RangeComponent);