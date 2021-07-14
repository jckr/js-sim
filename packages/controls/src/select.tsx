import React from 'react';
import { Label, Select as RBSelect } from '@rebass/forms';
import { Flex } from 'rebass';
import { SelectProps, withControls } from '.';

export function SelectComponent(props: SelectProps) {
    const { label, name, options = [], value, setValue, ...otherProps } = props;
  return (
    <Flex flexDirection='column' mr={1} {...otherProps}>
      {label && <Label htmlFor={name || label}>{label}</Label>}
      <RBSelect
        id={name || label}
        name={name || label}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        {options.map((option) => {
          const label = typeof option === 'string' ? option : option.label;
          const value = typeof option === 'string' ? option :option.value;
          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
      </RBSelect>
    </Flex>
  );
}

export default withControls<SelectProps>(SelectComponent);
