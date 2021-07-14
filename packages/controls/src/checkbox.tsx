import React from 'react'
import { Label, Checkbox as RBCheckbox } from '@rebass/forms'
import { Flex } from 'rebass'
import { CheckboxProps, withControls } from '.';

export function CheckboxComponent(props: CheckboxProps) {
    const {label, name, value, setValue, ...otherProps} = props;
  return (
    <Flex mr={1} {...otherProps}>
      <Label htmlFor={name || label}>
        <RBCheckbox
          checked={value}
          id={name || label}
          name={name || label}
          readOnly
          onClick={() => setValue(!value)}
        />
        {label}
      </Label>
    </Flex>
  )
}

export default withControls<CheckboxProps>(CheckboxComponent);

