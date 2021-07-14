import React from 'react';
import { Label, Switch } from '@rebass/forms';
import { Flex } from 'rebass';
import { ToggleProps, withControls } from '.';

export function ToggleComponent(props: ToggleProps) {
  const { label, value, setValue, ...otherProps } = props;
  return (
    <Flex flexDirection="column" mr={1}>
      {label && (
        <Label htmlFor={label} mb={1}>
          {label}
        </Label>
      )}
      <Switch
        id={label}
        checked={value}
        onClick={() => {
          setValue(!value);
        }}
        {...otherProps}
      />
    </Flex>
  );
}

export default withControls<ToggleProps>(ToggleComponent);
