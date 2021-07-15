import React, {createContext} from 'react';
import {ControlsContextInterface} from '.';

const noop = () => {};

const ControlsContext = createContext<ControlsContextInterface>({
  isPlaying: false,
  params: {},
  pause: noop,
  play: noop,
  setParams: noop,
  stop: noop,
  tick: 0,
  updateTime: noop,
});

interface ControlsProviderProps extends ControlsContextInterface {
  children?: JSX.Element | JSX.Element[];
}

export function ControlsProvider(props: ControlsProviderProps) {
  const {
    isPlaying = false,
    params = {},
    pause = noop,
    play = noop,
    setParams = noop,
    stop = noop,
    tick = 0,
    updateTime = noop,
  } = props;

  return (
    <ControlsContext.Provider
      value={{
        isPlaying,
        params,
        pause,
        play,
        setParams,
        stop,
        tick,
        updateTime,
      }}
    >
      {props.children}
    </ControlsContext.Provider>
  );
}

export const ControlsConsumer: () => JSX.Element = () => {
  return (<div>
    <ControlsContext.Consumer>
    {({isPlaying, params,tick}) => (<pre>
      <ul>
        <li>{String(isPlaying)}</li>
        <li>{JSON.stringify(params)}</li>
        <li>{tick}</li>
        </ul>
        </pre>)}
  </ControlsContext.Consumer>
  </div>);
}

export function withControls<P>(Component: React.ComponentType<P & ControlsContextInterface>) {
  function ControlsComponent(props: P) {
    return (
      <ControlsContext.Consumer>
        {({isPlaying, params, pause, play, setParams, stop, tick, updateTime}) => (
          <Component
            {...props}
            isPlaying={isPlaying}
            params={params}
            pause={pause}
            play={play}
            setParams={setParams}
            stop={stop}
            tick={tick}
            updateTime={updateTime}
          />
        )}
      </ControlsContext.Consumer>
    );
  }

  const componentName = getDisplayName(Component);
  ControlsComponent.displayName = `withControls(${componentName})`;
  return ControlsComponent;
}

function getDisplayName(primitive: any) {
  return typeof primitive === 'string'
    ? primitive
    : primitive?.displayName || primitive?.name || 'Component';
}
