export class DeepgramClient {
  private socket?: WebSocket;

  connect(onTranscript: (text: string) => void) {
    this.socket = new WebSocket(
      "wss://api.deepgram.com/v1/listen" +
        "?encoding=linear16" +
        "&sample_rate=16000" +
        "&punctuate=true" +
        "&interim_results=true",
      ["token", import.meta.env.VITE_DEEPGRAM_API_KEY]
    );

    this.socket.binaryType = "arraybuffer";

    this.socket.onopen = () => {
      console.log("✅ Deepgram connected");
    };

    this.socket.onerror = (e) => {
      console.error("❌ Deepgram error", e);
    };

    this.socket.onmessage = (msg) => {
      const data = JSON.parse(msg.data);

      // Only final transcripts (prevents duplicates)
      if (!data.is_final) return;

      const transcript =
        data.channel?.alternatives?.[0]?.transcript;

      if (transcript && transcript.trim()) {
        onTranscript(transcript);
      }
    };
  }

  sendAudio(chunk: ArrayBuffer) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(chunk);
    }
  }

  close() {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type: "CloseStream" }));
      setTimeout(() => this.socket?.close(), 300);
    }
  }
}
