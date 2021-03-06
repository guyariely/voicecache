import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  nextRecordingState,
  playlistIndexState,
  prevRecordingState,
} from "../recoil/playlist";
import { selectedRecordingState } from "../recoil/recordings";

export function usePlaylist() {
  const setSelectedRecording = useSetRecoilState(selectedRecordingState);
  const playlistIndex = useRecoilValue(playlistIndexState);
  const prevRecording = useRecoilValue(prevRecordingState);
  const nextRecording = useRecoilValue(nextRecordingState);

  return {
    at: playlistIndex,
    hasPrev: !!prevRecording,
    prev: () => setSelectedRecording(prevRecording),
    hasNext: !!nextRecording,
    next: () => setSelectedRecording(nextRecording),
  };
}
