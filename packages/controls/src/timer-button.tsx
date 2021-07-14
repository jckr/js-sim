import React from "react";
import { Button } from "rebass";
import {withTheme, TimerButtonProps} from '.';

function TimerButton(props: TimerButtonProps) {
  const {children, onClick, ...otherProps} = props;
  return (
    <Button
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

export default withTheme<TimerButtonProps>(TimerButton);
