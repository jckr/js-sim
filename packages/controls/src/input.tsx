import React, { ChangeEvent } from "react";
import { Label, Input as RBInput } from "@rebass/forms";
import { Flex } from "rebass";
import { InputProps, withControls } from ".";

export function InputComponent(props: InputProps) {
  const {label, name, value, setValue, ...otherProps} = props;
  return (
    <Flex flexDirection="column" mr={1}>
    {label && <Label htmlFor={name || label}>{label}</Label>}
    <RBInput
      id={name || label}
      name={name || label}
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)}
      {...otherProps}
    />
    </Flex>
  );
}

export default withControls<InputProps>(InputComponent);
