import React from 'react';
import TimerButton from './timer-button';
import { iconService } from './constants';
import { StopProps } from '.';

export default function Stop(props: StopProps) {
  const { colors = {color: '', background: ''}} = props;
  const content = props.shouldShowReset ? (
    <img
      src={`${iconService}/refresh/${colors.color.replace('#', '')}`}
      style={{ transform: 'scaleX(-1)', display: 'block' }}
      alt="reset"
    />
  ) : (
    <img
      src={`${iconService}/stop/${colors.color.replace('#', '')}`}
      style={{ display: 'block' }}
      alt="stop"
    />
  );
  return <TimerButton colors={colors} onClick={props.stop}>{content}</TimerButton>;
}