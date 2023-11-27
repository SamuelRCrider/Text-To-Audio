import React from "react";
import s from "./styles.module.css";

const TextToAudio = () => {
  // Get text from text area
  //
  // Convert text to speech and configure speech
  // start recording and play speech
  // stop recording when speech ends

  return (
    <div className={s.container}>
      <textarea
        rows={10}
        cols={40}
        className={s.textArea}
        placeholder="Enter text here"
      />
      {/* TODO: extract buttons into their own component */}
      <button className={s.convertButton}>Convert To Audio</button>
      <div className={s.recordContainer}>
        <button className={s.recordButton}>Start Recording</button>
        <button className={s.stopButton}>Stop Recording</button>
      </div>
    </div>
  );
};

export default TextToAudio;
