import React from "react";
import Component from "./component";
import { useTextToAudioData } from "./data";

const TextToAudio = () => {
  const {
    // handlers
    handleInputChange,
    handleDownload,
    handleStartRecording,
    handleStopRecording,
    handlePlayAudio,
    // values
    inputText,
    audioUrls,
  } = useTextToAudioData();
  return (
    <div>
      {/*
       * Please pass down whatever data the component needs. -az
       */}
      <Component
        handleDownload={handleDownload}
        handleInputChange={handleInputChange}
        handlePlayAudio={handlePlayAudio}
        handleStartRecording={handleStartRecording}
        handleStopRecording={handleStopRecording}
        inputText={inputText}
        audioUrls={audioUrls}
      />
    </div>
  );
};

export default TextToAudio;
