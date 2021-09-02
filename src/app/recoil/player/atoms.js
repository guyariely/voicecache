import { atom } from "recoil";

export const loopRecordingState = atom({
  key: "loopRecording",
  default: false,
});

export const volumeState = atom({
  key: "volume",
  default: 0.8,
});
