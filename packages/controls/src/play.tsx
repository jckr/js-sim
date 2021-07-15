import React from 'react';
import TimerButton from './timer-button';
import { iconService } from './constants';
import {PlayProps, withTheme} from '.';

export default function Play(props: PlayProps) {
    const {background = '', isPlaying, pause, play} = props;
    const icon = props.isPlaying ? 'pause' : 'play_arrow';
  const content = (
    <img
      src={`${iconService}/${icon}/${background.replace('#', '')}`}
      style={{ display: 'block' }}
      alt={icon}
    />
  );
  return (
    <TimerButton onClick={isPlaying ? pause : play}>
      {content}
    </TimerButton>
  );
}