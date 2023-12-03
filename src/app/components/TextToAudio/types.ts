export type Fields = {
    handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, 
    handleDownload: (url: string) => void, 
    handlePlayAudio: (u: SpeechSynthesisUtterance) => void,
    handleStartRecording: () => void,
    handleStopRecording: () => void, 
    audioUrls: string[], 
    inputText: string,
}