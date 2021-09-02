import React, { useEffect } from "react";
import H5AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Pause, PlayArrow } from "@material-ui/icons";
import "./styles.css";
import { useRecoilValue } from "recoil";
import { loopRecordingState, volumeState } from "../../recoil/player";

export function AudioPlayer(props) {
  const { src } = props;
  const loop = useRecoilValue(loopRecordingState);
  const volume = useRecoilValue(volumeState);

  useEffect(() => {
    /**
     * The H5AudioPlayer component does not react to prop updates,
     * so this effect will manually update the underlying audio element
     */
    const audioPlayer = document.querySelector(".audio-player audio");
    audioPlayer.loop = loop;
    audioPlayer.volume = volume;
  }, [loop, volume]);

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
