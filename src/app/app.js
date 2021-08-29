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

function Content(props) {
  const { recorder, selectedRecording } = props;

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

  if (selectedRecording) {
    return <AudioPlayer src={URL.createObjectURL(selectedRecording.data)} />;
  }

  return <p>Press on the mic icon to start recording</p>;
}

function App() {
  const [recordings, setRecordings] = React.useState([]);
  const [selectedRecording, setSelectedRecording] = React.useState(null);
  const recorder = useRecorder(recording => {
    setRecordings(recordings => [...recordings, recording]);
    setSelectedRecording(recording);
  });

  return (
    <StylesProvider injectFirst>
      <div className="app">
        <aside className="sidebar">
          <RecordingList
            selectRecordingId={selectedRecording ? selectedRecording.id : null}
            selectRecording={setSelectedRecording}
            recordings={recordings}
          />
        </aside>
        <main className="main">
          <div className="content">
            <Content
              recorder={recorder}
              selectedRecording={selectedRecording}
            />
          </div>
          <Recorder
            start={() => {
              setSelectedRecording(null);
              recorder.start();
            }}
            stop={recorder.stop}
            isRecording={recorder.isRecording}
          />
        </main>
      </div>
    </StylesProvider>
  );
}

export default App;
