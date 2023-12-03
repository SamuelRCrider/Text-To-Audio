import React from "react";
import s from "./styles.module.css";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import Image from "next/image";
import { Fields } from "./types";

const Component = ({
  handleDownload,
  handleInputChange,
  handlePlayAudio,
  handleStartRecording,
  handleStopRecording,
  inputText,
  audioUrls,
}: Fields) => {
  return (
    <div className={s.container}>
      <div className={s.infoTitle}>
        <Image
          src="/audioicon.png"
          alt="Text 2 Audio Icon"
          width={50}
          height={50}
          className={s.infoImage}
        />
        <h1 className={s.title}>Text 2 Audio</h1>
      </div>
      <div className={s.information}>
        <h2 className={s.note}>
          Disclaimer: The computer microphone will pick up all audio from your
          surroudings, so record in a quiet place!
        </h2>
        <h3 className={s.howItWorksHeader}>How it works:</h3>
        <ol>
          <li>
            Type whatever text you need converted into an audio file in the text
            area below
          </li>
          <li>Click Start Recording and then Read Text Aloud</li>
          <li>Once your text has been completely read, click Stop Recording</li>
          <li>Your audio will appear in Your Recordings!</li>
        </ol>
      </div>
      <textarea
        value={inputText}
        onChange={(e) => handleInputChange(e)}
        rows={10}
        cols={40}
        className={s.textArea}
        name="textArea"
        placeholder="Enter text here"
      />

      <div className={s.recordContainer}>
        <button className={s.recordButton} onClick={handleStartRecording}>
          Start Recording
        </button>
        <MdOutlineArrowRightAlt className={s.arrow} />
        <button
          className={s.convertButton}
          onClick={() => {
            const u: SpeechSynthesisUtterance = new SpeechSynthesisUtterance(
              inputText
            );
            handlePlayAudio(u);
          }}
        >
          Read Text Aloud
        </button>
        <MdOutlineArrowRightAlt className={s.arrow} />
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

export default Component;
