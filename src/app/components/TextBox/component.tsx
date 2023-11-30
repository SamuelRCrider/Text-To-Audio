import React, { useEffect, useState } from "react";
import s from "./styles.module.css";

const TextToAudio = () => {
  // Input text, the audio url, and the utterance will change often
  // By declaring them with useState, they can be easily managed
  const [inputText, setInputText] = useState<string>("");
  const [audioUrls, setAudioUrls] = useState<string[]>([]);
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
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.start();
      console.log(mediaRecorder.state);
    });
  };

  const handleStopRecording = () => {
    if (mediaRecorder?.state == "recording") {
      mediaRecorder.stop();
      console.log(mediaRecorder?.state);

      mediaRecorder.ondataavailable = (e) => {
        audioChunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrls((prevUrls) => [...prevUrls, url]);
        audioChunks = [];
      };
    } else {
      console.log("No active recording to stop");
    }
  };

  const handleDownload = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "audio.wav";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
        Read Text Aloud
      </button>
      <div className={s.recordContainer}>
        <button className={s.recordButton} onClick={handleStartRecording}>
          Start Recording
        </button>
        <button className={s.stopButton} onClick={handleStopRecording}>
          Stop Recording
        </button>
      </div>

      <div className={s.audioTitleContainer}>
        <h2 className={s.audioTitle}>Your Recordings</h2>
        <div className={s.audioDivider}></div>

        <div className={s.audioList}>
          {audioUrls.map((url, index) => (
            <div key={index} className={s.audioContainer}>
              <audio controls src={url} />
              <button
                className={s.downloadButton}
                onClick={() => handleDownload(url)}
              >
                Download Audio {index + 1}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TextToAudio;
