type Props = {
  text: string;
  recording: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
};

export default function PushToTalk({
  text,
  recording,
  onStart,
  onStop,
  onReset,
}: Props) {
  return (
    <div className="ptt-container">
      {/* Transcript */}
      <textarea
        className="transcript-box"
        value={text}
        readOnly
        placeholder="Your transcription will appear here..."
      />

      {/* Mic waveform */}
      {recording && <div className="mic-waveform" />}

      {/* Push-to-talk */}
      <button
        className={`ptt-button ${recording ? "active" : ""}`}
        onMouseDown={onStart}
        onMouseUp={onStop}
        onMouseLeave={onStop}
      >
        {recording ? "Listening..." : "Hold to Talk"}
      </button>

      {/* Reset */}
      <button
        className="reset-button"
        onClick={onReset}
        disabled={!text}
      >
        Reset
      </button>
    </div>
  );
}
