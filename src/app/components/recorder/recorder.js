import React from "react";
import { IconButton } from "@material-ui/core";
import { Mic } from "@material-ui/icons";
import "./styles.css";

export function Recorder(props) {
  const { stop, start, isRecording } = props;

  return (
    <div className="recorder">
      {isRecording ? (
        <IconButton className="stop button" onClick={() => stop()}>
          <Mic className="mic-icon" />
        </IconButton>
      ) : (
        <IconButton className="start button" onClick={() => start()}>
          <Mic className="mic-icon" />
        </IconButton>
      )}
    </div>
  );
}
