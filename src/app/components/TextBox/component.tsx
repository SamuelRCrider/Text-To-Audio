import React, { useEffect, useState } from "react";
import s from "./styles.module.css";

const TextToAudio = () => {
  const [inputText, setInputText] = useState<string>("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(
    null
  );

  let mediaRecorder: MediaRecorder | null = null;
  let audioChunks: Blob[] = [];

  useEffect(() => {
    const u = new SpeechSynthesisUtterance(inputText);
    setUtterance(u);
  }, [inputText]);

  // Event Handlers
  const handleConvert = () => {
    // start media recorder

    // play utterance
    if (utterance) {
      const synth = window.speechSynthesis;
      synth.speak(utterance);
    } else {
      console.log("Failure, buddy.");
    }
    //end media recorder
  };

  const handleStartRecording = () => {};

  const handleStopRecording = () => {};

  return (
    <div className={s.container}>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        rows={10}
        cols={40}
        className={s.textArea}
        name="textArea"
        placeholder="Enter text here"
      />
      {/* TODO: extract buttons into their own component */}
      <button className={s.convertButton} onClick={handleConvert}>
        Convert To Audio
      </button>
      <div className={s.recordContainer}>
        <button className={s.recordButton} onClick={handleStartRecording}>
          Start Recording
        </button>
        <button className={s.stopButton} onClick={handleStopRecording}>
          Stop Recording
        </button>
      </div>
    </div>
  );
};

export default TextToAudio;
