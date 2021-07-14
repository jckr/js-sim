import React from 'react';
import { Label, Radio as RBRadio } from '@rebass/forms';
import { Flex } from 'rebass';
import type {RadioProps} from '.';
import { withControls} from '.';
export function RadioComponent(props: RadioProps) {
    const {
        label,
        name,
        options = [],
        vertical,
        setValue,
        value,
        ...otherProps
    } = props;
  return (
    <Flex flexDirection='column' mr={1} {...otherProps}>
      {label && <Label>{label}</Label>}
      <Flex flexDirection={vertical ? 'column' : 'row'}>
        {options.map((option) => {
          const optionLabel = typeof option === 'string' ? option : option.label;
          const optionValue = typeof option === 'string' ? option : option.value;
          return (
            <Label key={optionValue}>
              <RBRadio
                name={`${name ? name + '-' : ''}${optionValue}`}
                id={`${name ? name + '-' : ''}${optionValue}`}
                value={optionValue}
                checked={value === optionValue}
                onClick={() => setValue(optionValue)}
                readOnly
              />
              {optionLabel}
            </Label>
          );
        })}
      </Flex>
    </Flex>
  );
}

export default withControls<RadioProps>(RadioComponent);
