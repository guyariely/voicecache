import { atom, atomFamily } from "recoil";

export const selectedRecordingState = atom({
  key: "selectedRecording",
  default: null,
});

export const recordingsState = atom({
  key: "recordings",
  default: [],
});

export const recordingState = atomFamily({
  key: "recording",
  default: {
    data: null,
    duration: 0,
    createdAt: 0,
    id: "",
  },
});
