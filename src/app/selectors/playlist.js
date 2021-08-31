import { selector } from "recoil";
import { shuffle } from "../utils";
import {
  recordingsState,
  selectedRecordingState,
  ShuffleRecordingsState,
} from "../atoms/recording";

export const playlistIndexState = selector({
  key: "selectedRecordingIndex",
  get: ({ get }) => {
    const selectedRecording = get(selectedRecordingState);
    if (!selectedRecording) return;
    const playlist = get(playlistState);
    return playlist.indexOf(selectedRecording);
  },
});

export const nextRecordingState = selector({
  key: "nextRecording",
  get: ({ get }) => {
    const selectedIndex = get(playlistIndexState);
    const playlist = get(playlistState);
    const shuffleRecordings = get(ShuffleRecordingsState);

    if (!shuffleRecordings) {
      return playlist[selectedIndex + 1];
    }

    return playlist[selectedIndex + 1] || playlist[0];
  },
});

export const prevRecordingState = selector({
  key: "prevRecording",
  get: ({ get }) => {
    const selectedIndex = get(playlistIndexState);
    const playlist = get(playlistState);

    const shuffleRecordings = get(ShuffleRecordingsState);

    if (!shuffleRecordings) {
      return playlist[selectedIndex - 1];
    }

    return playlist[selectedIndex - 1] || playlist[playlist.length - 1];
  },
});

export const playlistState = selector({
  key: "playlist",
  get: ({ get }) => {
    const recordings = get(recordingsState);
    const shuffleRecordings = get(ShuffleRecordingsState);

    if (shuffleRecordings) {
      return shuffle(recordings);
    }
    return recordings;
  },
});
