import React from "react";
import { toDateString, toTimeString } from "../../utils";
import "./styles.css";

export function RecordingList(props) {
  const { recordings, selectRecordingId, selectRecording } = props;

  return (
    <ul className="recording-list">
      {recordings.map(recording => (
        <li
          key={recording.id}
          className={`recording-item ${
            selectRecordingId === recording.id ? "active" : ""
          }`}
          onClick={() => selectRecording(recording)}
        >
          <h2 className="date">{toDateString(recording.createdAt)}</h2>
          <p className="duration">{toTimeString(recording.duration)}</p>
        </li>
      ))}
    </ul>
  );
}
