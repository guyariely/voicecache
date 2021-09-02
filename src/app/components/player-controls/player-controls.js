import { IconButton } from "@material-ui/core";
import { Loop, Shuffle, SkipNext, SkipPrevious } from "@material-ui/icons";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  LoopRecordingState,
  recordingsLengthState,
  ShuffleRecordingsState,
} from "../../atoms/recording";
import { usePlaylist } from "../../hooks";
import { VolumeSlider } from "../volume-slider/volume-slider";
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
  const recordingsLength = useRecoilValue(recordingsLengthState);
  const [loopRecording, setLoopRecording] = useRecoilState(LoopRecordingState);
  const [shuffleRecordings, setShuffleRecordings] = useRecoilState(
    ShuffleRecordingsState
  );

  const playlist = usePlaylist();

  return (
    recordingsLength > 0 && (
      <div className="player-controls">
        {!Object.is(playlist.at, undefined) && (
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
            <VolumeSlider />
          </div>
        )}
      </div>
    )
  );
}
