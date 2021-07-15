import React from 'react';
import TimerButton from './timer-button';
import { iconService } from './constants';
import { withTheme, StopProps } from '.';

export default function Stop(props: StopProps) {
  const { background = '' } = props;
  const content = props.shouldShowReset ? (
    <img
      src={`${iconService}/refresh/${background.replace('#', '')}`}
      style={{ transform: 'scaleX(-1)', display: 'block' }}
      alt="reset"
    />
  ) : (
    <img
      src={`${iconService}/stop/${background.replace('#', '')}`}
      style={{ display: 'block' }}
      alt="stop"
    />
  );
  return <TimerButton onClick={props.stop}>{content}</TimerButton>;
}