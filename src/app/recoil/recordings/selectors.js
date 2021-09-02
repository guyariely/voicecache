import { selector } from "recoil";
import { recordingsState } from "./atoms";

export const recordingsLengthState = selector({
  key: "recordingsLength",
  get: ({ get }) => {
    const recordings = get(recordingsState);
    return recordings.length;
  },
});
