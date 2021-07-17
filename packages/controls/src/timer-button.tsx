import React from "react";
import { Button } from "rebass";
import {TimerButtonProps} from '.';

export default function TimerButton(props: TimerButtonProps) {
  
  const {children, colors, onClick, ...otherProps} = props;
  return (
    <Button
      sx={{
        backgroundColor: colors.background,
        color: colors.color
      }}
      px={2}
      py={1}
      mr={2}
      lineHeight={1}
      onClick={onClick}
      {...otherProps}
    >
      {children}
    </Button>
  );
}