type Props = {
  text: string;
  recording: boolean;
  onReset: () => void;
  onStart: () => void;
  onStop: () => void;
};

export default function ToolsPanel({
  text,
  recording,
  onReset,
  onStart,
  onStop,
}: Props) {
  /* 📋 COPY */
  const copyText = async () => {
    await navigator.clipboard.writeText(text);
    alert("Transcript copied!");
  };

  /* 💾 DOWNLOAD */
  const downloadText = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "transcript.txt";
    a.click();

    URL.revokeObjectURL(url);
  };

  /* ⌨️ SPACEBAR TALK */
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === "Space" && !recording) {
      e.preventDefault();
      onStart();
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.code === "Space" && recording) {
      e.preventDefault();
      onStop();
    }
  };

  /* Attach keyboard listeners */
  window.onkeydown = handleKeyDown;
  window.onkeyup = handleKeyUp;

  return (
    <div className="tools-panel">
      <h3 className="tools-title">Tools</h3>

      <button className="tool-button" onClick={copyText}>
        📋 Copy Transcript
      </button>

      <button className="tool-button" onClick={downloadText}>
        💾 Download
      </button>

      <button className="tool-button">
        ⌨️ Hold Space to Talk
      </button>
    </div>
  );
}
