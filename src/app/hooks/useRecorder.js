import React from "react";
import { v4 as uuid } from "uuid";

export function useRecorder(onStop) {
  const mediaRecorder = React.useRef();
  const [stream, setStream] = React.useState(null);
  const [isRecording, setIsRecording] = React.useState(false);

  async function record() {
    setIsRecording(true);
    const duration = { startTime: null, endTime: null };

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });

    setStream(stream);

    const options = { mimeType: "audio/webm" };
    const recordedChunks = [];
    mediaRecorder.current = new MediaRecorder(stream, options);

    mediaRecorder.current.addEventListener("start", () => {
      duration.startTime = new Date().getTime();
    });

    mediaRecorder.current.addEventListener("dataavailable", e => {
      if (e.data.size > 0) recordedChunks.push(e.data);
    });

    mediaRecorder.current.addEventListener("stop", () => {
      duration.endTime = new Date().getTime();
      onStop({
        data: new Blob(recordedChunks),
        duration: duration.endTime - duration.startTime,
        createdAt: new Date().getTime(),
        id: uuid(),
      });
      stream.getTracks().forEach(track => track.stop);
      mediaRecorder.current = null;
      setIsRecording(false);
    });

    mediaRecorder.current.start();
  }

  return {
    start: record,
    stop: () => mediaRecorder.current.stop(),
    isRecording,
    stream,
  };
}
