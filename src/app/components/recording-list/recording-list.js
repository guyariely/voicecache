import React from "react";
import { useRecoilValue } from "recoil";
import { recordingsState } from "../../atoms/recording";
import { RecordingItem } from "../recording-item/recording-item";
import "./styles.css";

export function RecordingList() {
  const recordings = useRecoilValue(recordingsState);

  return (
    <ul className="recording-list">
      {recordings.map(id => (
        <RecordingItem key={id} id={id} />
      ))}
    </ul>
  );
}
