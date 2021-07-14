import Model from '../src';
import {beforeEach, describe, expect, it} from '@jest/globals';

function initData() {
  return 0;
}

function updateData({data} : {data?: number}) {
  return (data || 0) + 1;
}

let MyModel: Model<number>;
describe('tests for core Model', () => {
  beforeEach(() => {
    MyModel = new Model<number>({maxTime: 10, initData, updateData});
  });
  it('Model can be created', () => {
    expect(MyModel.state.data).toBe(0);
  });
  it('Model data is updated manually', () => {
    MyModel.updateToTick({target: 5});
    expect(MyModel.state.data).toBe(5);
  });
  it('Model can update automatically', () => {
    MyModel.play();
    expect(MyModel.state.isPlaying).toBe(true);
  });
  it('auto-updating model can be stopped', () => {
    MyModel.play();
    expect(MyModel.state.isPlaying).toBe(true);
    MyModel.stop();
    expect(MyModel.state.isPlaying).toBe(false);
  });
  it('model will stop auto-updating when tick reaches maxTime', () => {
    MyModel.play();
    setTimeout(() => {
      expect(MyModel.state.tick).toBe(10);
      expect(MyModel.state.isPlaying).toBe(false);
      expect(MyModel.state.canPlay).toBe(false);
    }, 100)
  });
});
