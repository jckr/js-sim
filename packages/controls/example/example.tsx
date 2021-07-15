import React, {useState} from 'react';
import {
  CheckboxComponent,
  InputComponent,
  RadioComponent,
  RangeComponent,
  SelectComponent,
  TimerComponent,
  ToggleComponent,
  ControlsComponent,
  ControlsProvider,
  ControlsConsumer,
  Controls,
} from '../src';

type Param = boolean | number | string | null;

type Params = {
  [key: string]: Param;
};
const noop = () => {};

export const RangeExample = () => {
  const [value, setValue] = useState(0);

  return (
    <div>
      <h3>Range example</h3>
      <pre>{value}</pre>
      <RangeComponent value={value} setValue={setValue} />
    </div>
  );
};

export const CheckboxExample = () => {
  const [value, setValue] = useState(false);

  return (
    <div>
      <h3>Checkbox example</h3>
      <pre>{String(value)}</pre>
      <CheckboxComponent value={value} setValue={setValue} />
    </div>
  );
};

export const InputExample = () => {
  const [value, setValue] = useState('example');

  return (
    <div>
      <h3>Input example</h3>
      <pre>{value}</pre>
      <InputComponent value={value} setValue={setValue} />
    </div>
  );
};

export const RadioExample = () => {
  const [value, setValue] = useState('jet');
  const options = ['jet', 'set', 'radio'];
  return (
    <div>
      <h3>Radio example</h3>
      <pre>{String(value)}</pre>
      <RadioComponent options={options} value={value} setValue={setValue} vertical />
    </div>
  );
};

export const SelectExample = () => {
  const [value, setValue] = useState('jet');
  const options = ['jet', 'set', 'radio'];
  return (
    <div>
      <h3>Select example</h3>
      <pre>{String(value)}</pre>
      <SelectComponent options={options} value={value} setValue={setValue} />
    </div>
  );
};

export const TimerExample = () => {
  const [value, setValue] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [lastCommand, setLastCommand] = useState('');

  const play = () => {
    setLastCommand('play');
    setIsPlaying(true);
  };
  const pause = () => {
    setLastCommand('pause');
    setIsPlaying(false);
  };
  const stop = () => {
    setLastCommand('stop');
    setIsPlaying(false);
    setValue(0);
  };

  return (
    <div>
      <h3>Timer example</h3>
      <pre>{JSON.stringify({time: value, isPlaying, lastCommand}, null, 2)}</pre>
      <TimerComponent
        isPlaying={isPlaying}
        play={play}
        pause={pause}
        stop={stop}
        value={value}
        setValue={setValue}
      />
    </div>
  );
};

export const ControlsExample = () => {
  const [params, setParams] = useState<Params>({a: 0, b: 0, c: 0});

  const updateParam = (updatedParams: Params) => setParams({...params, ...updatedParams});
  return (
    <div>
      <div>Controls example</div>
      <pre>{JSON.stringify(params, null, 2)}</pre>
      <ControlsComponent
        params={params}
        setParams={updateParam}
        controls={[
          {
            param: 'a',
            type: 'range',
          },
          {
            param: 'b',
            type: 'range',
          },
        ]}
      />
    </div>
  );
};

export const ControlsWithContextExample = () => {
  const [params, setParams] = useState<Params>({a: 0, b: 0, c: 0});
  const [tick, updateTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastCommand, setLastCommand] = useState('');

  const play = () => {
    setLastCommand('play');
    setIsPlaying(true);
  };
  const pause = () => {
    setLastCommand('pause');
    setIsPlaying(false);
  };
  const stop = () => {
    setLastCommand('stop');
    setIsPlaying(false);
    updateTime(0);
  };
  const updateParam = (updatedParams: Params) => setParams({...params, ...updatedParams});


  return (
    <div>
      <div>Controls example</div>
      <pre>{JSON.stringify(params, null, 2)}</pre>
      <pre>{JSON.stringify({tick, isPlaying, lastCommand}, null, 2)}</pre>
      <ControlsProvider params={params} setParams={updateParam} pause={pause} play={play} stop={stop} tick={tick} updateTime={updateTime} isPlaying={isPlaying} >
        
      <Controls 
        controls={[
          {
            param: 'a',
            type: 'range',
          },
          {
            param: 'b',
            type: 'range',
          },
          { 
            param: 'timer',
            type: 'timer'
          }
        ]}/>
      </ControlsProvider>
    </div>
  );
};
