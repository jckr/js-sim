import React, { createContext } from 'react';
import { ControlsContextInterface } from './types';

const noop = () => {};

const ControlsContext = createContext<ControlsContextInterface>({
  isPlaying: false,
  params: {},
  pause: noop,
  play: noop,
  setParams: noop,
  stop: noop,
});

interface ControlsProviderProps extends ControlsContextInterface {
  children: JSX.Element;
}

export function ControlsProvider(props: ControlsProviderProps) {
  const {
    isPlaying = false,
    params = {},
    pause = noop,
    play = noop,
    setParams = noop,
    stop = noop,
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
      }}
    >
      {props.children}
    </ControlsContext.Provider>
  );
}

export function withControls<P>(Component: React.ComponentType<P>) {
  function ControlsComponent(props: P & ControlsContextInterface) {
    return (
      <ControlsContext.Consumer>
        {({ isPlaying, params, pause, play, setParams, stop }) => (
          <Component
            {...props}
            isPlaying={isPlaying}
            params={params}
            pause={pause}
            play={play}
            setParams={setParams}
            stop={stop}
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

