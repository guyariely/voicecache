import React from "react";
import { useCanvas } from "../../hooks";

const Canvas = props => {
  const { draw, ...canavsProps } = props;

  const canvasRef = useCanvas(draw);

  return <canvas ref={canvasRef} {...canavsProps} />;
};

export function SoundVisualizer(props) {
  const {
    width = 1000,
    height = 60,
    backgroundColor = "white",
    color = "black",
    lineWidth = 1,
    stream = null,
  } = props;

  if (!stream) return null;

  const audioCtx = new AudioContext();
  const source = audioCtx.createMediaStreamSource(stream);

  const analyser = audioCtx.createAnalyser();
  analyser.fftSize = 2048;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  source.connect(analyser);

  const draw = ctx => {
    analyser.getByteTimeDomainData(dataArray);

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.beginPath();

    let sliceWidth = (width * 1.0) / bufferLength;

    let x = 0;
    for (let i = 0; i < bufferLength; i++) {
      let v = dataArray[i] / 128.0;
      let y = (v * height) / 2;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      x += sliceWidth;
    }

    ctx.lineTo(width, height / 2);

    ctx.stroke();
  };

  return <Canvas draw={draw} width={width} height={height} />;
}
