import React from "react";
import { Slider } from "@material-ui/core";
import "./styles.css";
import { useRecoilState } from "recoil";
import { SliderVolumeState } from "../../atoms/recording";

function VolumeThumb(props) {
  return (
    <span {...props} className="thumb">
      <span className="thumb-value">{props["aria-valuenow"]}%</span>
    </span>
  );
}

export function VolumeSlider() {
  const [volume, setVolume] = useRecoilState(SliderVolumeState);

  console.log(volume);

  return (
    <Slider
      value={volume}
      onChange={(_, newValue) => setVolume(newValue)}
      className="volume-slider"
      orientation="vertical"
      ThumbComponent={VolumeThumb}
    />
  );
}
