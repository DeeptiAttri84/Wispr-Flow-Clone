import { useRef, useState } from "react";
import PushToTalk from "./ui/PushToTalk";
import ToolsPanel from "./ui/ToolsPanel";
import { AudioStream } from "./audio/stream";

export default function App() {
  const [text, setText] = useState("");
  const [recording, setRecording] = useState(false);
  const streamRef = useRef<AudioStream | null>(null);

  const startRecording = async () => {
    streamRef.current = new AudioStream(
      (t) => setText((prev) => prev + t + "\n"),
      (err) => console.error(err)
    );
    await streamRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    streamRef.current?.stop();
    setRecording(false);
  };

  const reset = () => setText("");

  return (
    <div className="app-wrapper">
      <ToolsPanel
        text={text}
        recording={recording}
        onReset={reset}
        onStart={startRecording}
        onStop={stopRecording}
      />

      <div className="app-container">
        <h1 className="title">Wispr Flow Clone</h1>
        <p className="subtitle">
          Hold the button and speak to transcribe in real-time
        </p>

      <PushToTalk
  text={text}
  recording={recording}
  onStart={startRecording}
  onStop={stopRecording}
  onReset={reset}
/>
      </div>
    </div>
  );
}
