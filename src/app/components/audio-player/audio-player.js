import React from "react";
import H5AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Pause, PlayArrow } from "@material-ui/icons";
import "./styles.css";

export function AudioPlayer(props) {
  const { src } = props;

  return (
    <H5AudioPlayer
      className="audio-player"
      autoPlayAfterSrcChange={false}
      autoPlay={false}
      src={src}
      showJumpControls={false}
      showDownloadProgress={false}
      customProgressBarSection={[RHAP_UI.PROGRESS_BAR]}
      customVolumeControls={[]}
      customAdditionalControls={[]}
      layout="horizontal-reverse"
      customIcons={{
        play: <PlayArrow className="play-icon" />,
        pause: <Pause className="pause-icon" />,
      }}
    />
  );
}
