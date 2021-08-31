import React from "react";
import "./styles.css";
import { StylesProvider } from "@material-ui/core/styles";
import {
  RecordingList,
  SoundVisualizer,
  Recorder,
  AudioPlayer,
} from "./components";
import { useRecorder } from "./hooks";
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from "recoil";
import {
  recordingsState,
  recordingState,
  selectedRecordingState,
} from "./atoms/recording";
import { PlayerControls } from "./components/player-controls/player-controls";

function Main(props) {
  const { recorder } = props;
  const selectedRecording = useRecoilValue(selectedRecordingState);
  const recording = useRecoilValue(recordingState(selectedRecording));

  if (recorder.isRecording) {
    return (
      <SoundVisualizer
        width={600}
        height={200}
        lineWidth={1}
        backgroundColor="#ebf3fa"
        color="#31456a"
        stream={recorder.stream}
      />
    );
  }

  if (recording.data) {
    return <AudioPlayer src={URL.createObjectURL(recording.data)} />;
  }

  return (
    <p className="welcome-message">Press on the mic icon to start recording</p>
  );
}

function App() {
  const setSelectedRecording = useSetRecoilState(selectedRecordingState);

  const recorder = useRecorder(recording => addRecording(recording));

  const addRecording = useRecoilCallback(({ set }) => newRecording => {
    set(selectedRecordingState, newRecording.id);
    set(recordingsState, recordings => [...recordings, newRecording.id]);
    set(recordingState(newRecording.id), newRecording);
  });

  return (
    <StylesProvider injectFirst>
      <div className="app">
        <aside className="recordings-container">
          <RecordingList />
        </aside>
        <main className="main-container">
          <Main recorder={recorder} />
        </main>
        <footer className="recorder-container">
          <Recorder
            start={() => {
              setSelectedRecording(null);
              recorder.start();
            }}
            stop={recorder.stop}
            isRecording={recorder.isRecording}
          />
        </footer>
        <aside className="controls-container">
          <PlayerControls />
        </aside>
      </div>
    </StylesProvider>
  );
}

export default App;
