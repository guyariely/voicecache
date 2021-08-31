import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { recordingState, selectedRecordingState } from "../../atoms/recording";
import { toDateString, toTimeString } from "../../utils";
import "./styles.css";

export function RecordingItem(props) {
  const { id } = props;
  const recording = useRecoilValue(recordingState(id));
  const [selectedRecording, setSelectedRecording] = useRecoilState(
    selectedRecordingState
  );

  return (
    <li
      className={`recording-item ${
        selectedRecording === recording.id ? "active" : ""
      }`}
      onClick={() => setSelectedRecording(id)}
    >
      <h2 className="date">{toDateString(recording.createdAt)}</h2>
      <p className="duration">{toTimeString(recording.duration)}</p>
    </li>
  );
}
