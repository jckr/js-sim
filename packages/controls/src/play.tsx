import React from 'react';
import TimerButton from './timer-button';
import { iconService } from './constants';
import {PlayProps} from '.';

export default function Play(props: PlayProps) {
    const { colors = {color: '', background: ''}} = props;
    const {isPlaying, pause, play} = props;
    const icon = props.isPlaying ? 'pause' : 'play_arrow';
  const content = (
    <img
      src={`${iconService}/${icon}/${(colors?.color || '').replace('#', '')}`}
      style={{ display: 'block' }}
      alt={icon}
    />
  );
  return (
    <TimerButton colors={colors} onClick={isPlaying ? pause : play}>
      {content}
    </TimerButton>
  );
}