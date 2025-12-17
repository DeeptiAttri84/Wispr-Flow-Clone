import { AudioRecorder } from "./recorder";
import { DeepgramClient } from "../deepgram/client";

export class AudioStream {
  private recorder = new AudioRecorder();
  private deepgram = new DeepgramClient();

  constructor(
    private onTranscript: (text: string) => void,
    private onError?: (err: string) => void
  ) {}

  async start() {
    try {
      this.deepgram.connect(this.onTranscript);
      await this.recorder.start(chunk => {
        this.deepgram.sendAudio(chunk);
      });
    } catch (err) {
      console.error(err);
      this.onError?.("Failed to start audio stream");
    }
  }

  stop() {
    this.recorder.stop();
    this.deepgram.close();
  }
}
