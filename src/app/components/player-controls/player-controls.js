import { IconButton } from "@material-ui/core";
import { Loop, Shuffle, SkipNext, SkipPrevious } from "@material-ui/icons";
import React from "react";
import { useRecoilState } from "recoil";
import {
  LoopRecordingState,
  ShuffleRecordingsState,
} from "../../atoms/recording";
import { usePlaylist } from "../../hooks";
import "./styles.css";

function Control(props) {
  const { icon, className = "", ...passThroughProps } = props;

  const Icon = icon;

  return (
    <IconButton className={`control button ${className}`} {...passThroughProps}>
      <Icon className="icon" />
    </IconButton>
  );
}

export function PlayerControls() {
  const [loopRecording, setLoopRecording] = useRecoilState(LoopRecordingState);
  const [shuffleRecordings, setShuffleRecordings] = useRecoilState(
    ShuffleRecordingsState
  );

  const playlist = usePlaylist();

  return (
    <div className="player-controls">
      {playlist.at !== -1 && (
        <div className="controls">
          <Control
            icon={Shuffle}
            className={`shuffle ${shuffleRecordings ? "active" : ""}`}
            onClick={() => setShuffleRecordings(shuffle => !shuffle)}
          />
          <Control
            icon={SkipPrevious}
            className="prev"
            disabled={!playlist.hasPrev}
            onClick={() => playlist.prev()}
          />
          <Control
            icon={SkipNext}
            className="next"
            disabled={!playlist.hasNext}
            onClick={() => playlist.next()}
          />
          <Control
            icon={Loop}
            className={`loop ${loopRecording ? "active" : ""}`}
            onClick={() => setLoopRecording(loop => !loop)}
          />
        </div>
      )}
    </div>
  );
}
