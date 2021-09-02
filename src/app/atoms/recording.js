import { atom, atomFamily, selector } from "recoil";

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

export const LoopRecordingState = atom({
  key: "loopRecording",
  default: false,
});

export const ShuffleRecordingsState = atom({
  key: "shuffleRecordings",
  default: false,
});

export const VolumeState = atom({
  key: "volume",
  default: 0.8,
});

export const SliderVolumeState = selector({
  key: "sliderVolume",
  get: ({ get }) => {
    const volume = get(VolumeState);
    return Math.round(volume * 100);
  },
  set: ({ set }, newValue) => {
    set(VolumeState, (newValue / 100).toFixed(2));
  },
});
