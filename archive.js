import React, { useEffect } from "react";

export const useCanvas = (draw, options = {}) => {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext(options.context || "2d");

    let animationFrameId;
    const render = () => {
      draw(context);
      setTimeout(render, 1000);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return canvasRef;
};

const Canvas = props => {
  const { draw, ...canavsProps } = props;

  const canvasRef = useCanvas(draw);

  return <canvas ref={canvasRef} {...canavsProps} />;
};

export function SoundVisualizer(props) {
  const [audio, setAudio] = React.useState(null);

  useEffect(() => {
    if (props.stream) {
      const audioCtx = new AudioContext();
      const source = audioCtx.createMediaStreamSource(props.stream);

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 2048;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      source.connect(analyser);

      setAudio({
        analyser,
        bufferLength,
        dataArray,
      });
    }
  }, [props.stream]);

  const draw = React.useCallback(ctx => {
    if (audio) {
      const { analyser, bufferLength, dataArray } = audio;

      const WIDTH = 1000;
      const HEIGHT = 60;

      analyser.getByteTimeDomainData(dataArray);

      ctx.fillStyle = "rgb(200, 200, 200)";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgb(0, 0, 0)";
      ctx.beginPath();
      let sliceWidth = (WIDTH * 1.0) / bufferLength;
      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        let v = dataArray[i] / 128.0;
        let y = (v * HEIGHT) / 2;
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        x += sliceWidth;
      }
      ctx.lineTo(WIDTH, HEIGHT / 2);
      ctx.stroke();
    }
  }, []);

  if (!props.stream) return null;

  return <Canvas draw={draw} width="1000" height="60" />;
}
