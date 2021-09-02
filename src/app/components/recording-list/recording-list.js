import React from "react";
import { useRecoilValue } from "recoil";
import { recordingsState } from "../../recoil/recordings";
import { RecordingItem } from "../recording-item/recording-item";
import "./styles.css";

export function RecordingList() {
  const recordings = useRecoilValue(recordingsState);

  return (
    <ul className="recording-list">
      {recordings.map(id => (
        <RecordingItem key={id} id={id} />
      ))}
      <div className="bottom-padding"></div>
    </ul>
  );
}
