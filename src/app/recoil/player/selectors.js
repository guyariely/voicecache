import { selector } from "recoil";
import { volumeState } from "./atoms";

export const sliderVolumeState = selector({
  key: "sliderVolume",
  get: ({ get }) => {
    const volume = get(volumeState);
    return Math.round(volume * 100);
  },
  set: ({ set }, newValue) => {
    set(volumeState, (newValue / 100).toFixed(2));
  },
});
