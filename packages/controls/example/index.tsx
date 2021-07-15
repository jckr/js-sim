import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ControlsWithContextExample, RangeExample, RadioExample, InputExample, CheckboxExample, SelectExample, TimerExample, ControlsExample, ControlsWithContextExample} from './example';

const App = () => {
  return (
    <div>
      {/* <CheckboxExample />
      <RangeExample />
      <InputExample />
      <RadioExample />
      <SelectExample />
      <TimerExample />
      <ControlsExample /> */}
      <ControlsWithContextExample />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
