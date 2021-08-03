import React, { useRef, useEffect } from 'react';
import CanvasModel from '@js-sim/canvas';

function initData() {
  const data = { x: 50, y: 50, angle: 0 };
  console.log({ data });
  return data;
}

function updateData({ data, tick }) {
  const { x, y, angle } = data;
  let updatedAngle = angle + Math.random() * 0.4 - 0.2;
  const vx = Math.cos(angle) * 1;
  const vy = Math.sin(angle) * 1;

  let updatedX = x + vx;
  let updatedY = y + vy;
  if (updatedX < 0 || updatedX > 100) {
    updatedX = x - vx;
    updatedAngle = Math.PI - updatedAngle;
  }
  if (updatedY < 0 || updatedY > 100) {
    updatedY = y - vy;
    updatedAngle = Math.PI + updatedAngle;
  }
  const updatedData = { x: updatedX, y: updatedY, angle: updatedAngle };
  return updatedData;
}

function render({ ctx, circle, cachedData, data, tick, height, width }) {
  const { x, y } = data;
  circle({x: x * width / 100, y: y * height / 100, r: 2});
  ctx.fill();
  
}

function App() {
  const canvas = useRef();
  useEffect(() => {
    const ctx = canvas.current.getContext('2d');
    ctx.globalAlpha = 0.5;
    const model = new CanvasModel({
      ctx,
      initData,
      updateData,
      render,
      maxTime: 1000,
    });
    model.play();
  });
  return <canvas ref={canvas} height={300} width={300} />;
}

export default App;
