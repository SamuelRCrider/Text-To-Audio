import { useState } from "react";

export const useTextToAudioData = () => {
  // Input text, the audio url, and the utterance will change often
  // By declaring them with useState, they can be easily managed
  const [inputText, setInputText] = useState<string>("");
  const [audioUrls, setAudioUrls] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  // Set initial variables to allow for use of the media recorder
  let mediaRecorder: MediaRecorder | null = null;
  let audioChunks: Blob[] = [];

  // Event Handlers

  const handlePlayAudio = (u: SpeechSynthesisUtterance) => {
    // Play utterance
    if (u) {
      const synth = window.speechSynthesis;
      synth.speak(u);
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

  return {
    // handlers
    handleInputChange,
    handleDownload,
    handleStartRecording,
    handleStopRecording,
    handlePlayAudio,
    // values
    inputText, // bad name, but as we only have one input it's not that deep.
    audioUrls
  };
};
