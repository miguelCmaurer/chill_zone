import { useEffect, useState, useCallback } from "react";
export function useAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [audioRef, setAudioRef] = useState(new Audio());
  const [needNewKey, setNeedNewKey] = useState(true);

  useEffect(() => {
    isPlaying ? audioRef.play() : audioRef.pause();
  }, [isPlaying, audioRef]);

  const setSoundLevel = useCallback(
    (level) => {
      const audio = audioRef;
      if (audio) {
        audio.volume = level;
      }
    },
    [audioRef],
  );

  const setPlay = useCallback(
    (percent) => {
      const audio = audioRef;
      if (audio) {
        audio.currentTime = percent * duration;
      }
    },
    [audioRef, duration],
  );

  useEffect(() => {
    if (!(audioRef instanceof Audio)) return;

    console.log("Hook: new audioRef attached");

    const handleLoadedMetadata = () => setDuration(audioRef.duration);
    const updateProgress = () => setProgress(audioRef.currentTime);
    const handleAudioEnd = () => {
      if (repeat) {
        audioRef.currentTime = 0;
        setProgress(0);
        audioRef.play();
      } else {
        setIsPlaying(false);
      }
    };

    const handleKeyNeed = () => {
      console.log("all loaded");
      setNeedNewKey(false);
    };

    audioRef.addEventListener("loadedmetadata", handleLoadedMetadata);
    audioRef.addEventListener("timeupdate", updateProgress);
    audioRef.addEventListener("ended", handleAudioEnd);
    audioRef.addEventListener("canplaythrough", handleKeyNeed);

    return () => {
      audioRef.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audioRef.removeEventListener("timeupdate", updateProgress);
      audioRef.removeEventListener("ended", handleAudioEnd);
      audioRef.removeEventListener("canplaythrough", handleKeyNeed);
    };
  }, [audioRef, repeat]);

  return {
    setNeedNewKey,
    needNewKey,
    setAudioRef,
    shuffle,
    setShuffle,
    repeat,
    setRepeat,
    audioRef,
    isPlaying,
    setIsPlaying,
    duration,
    progress,
    setPlay,
    setSoundLevel,
  };
}
