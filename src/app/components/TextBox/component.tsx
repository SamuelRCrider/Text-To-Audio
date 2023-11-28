import React, { useEffect, useState } from "react";
import s from "./styles.module.css";

const TextToAudio = () => {
  // Input text, the audio url, and the utterance will change often
  // By declaring them with useState, they can be easily managed
  const [inputText, setInputText] = useState<string>("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(
    null
  );

  // Set initial variables to allow for use of the media recorder
  let mediaRecorder: MediaRecorder | null = null;
  let audioChunks: Blob[] = [];

  // Update utterance state every time input text is changed
  useEffect(() => {
    const u = new SpeechSynthesisUtterance(inputText);
    setUtterance(u);
  }, [inputText]);

  // Event Handlers

  const handleConvert = () => {
    // Play utterance
    if (utterance) {
      const synth = window.speechSynthesis;
      synth.speak(utterance);
    } else {
      console.log("Failure, buddy.");
    }
  };

  const handleStartRecording = () => {
    // TODO
  };

  const handleStopRecording = () => {
    // TODO
  };

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
