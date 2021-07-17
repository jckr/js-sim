import React from 'react';
import TimerButton from './timer-button';
import {StepProps} from '.';

export default function Step(props: StepProps) {
  const {colors = {color: '', background: ''} , step} = props;
  const content = (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      style={{ display: 'block' }}
    >
      <path
        d='M10.72 7.423C10.72 8.523 11.62 9.423 12.72 9.423C13.82 9.423 14.72 8.523 14.72 7.423C14.72 6.323 13.82 5.423 12.72 5.423C11.62 5.423 10.72 6.323 10.72 7.423Z'
        fill={colors.color}
      />
      <path d='M10 7.5L6 3V6H2V9H6V12L10 7.5Z' fill={colors.color} />
    </svg>
  );

  return <TimerButton colors={colors} onClick={step}>{content}</TimerButton>;
}