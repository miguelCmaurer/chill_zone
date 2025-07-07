import { useAudio } from "../hooks/useAudio";
import { useStore } from "../hooks/useStore";
import { SoundWaveProgress } from "./SoundWaveProgress";
import { PlayPauseControlsMemo } from "./PlayPauseControls";
import { SongControlsMemo } from "./SongControls";
import { SongImgInfoMemo } from "./SongImgInfo";
import { useEffect, useState } from "react";

async function fetchSongUrlAndLoad(song, audioRef, setIsPlaying, setTtl) {
  try {
    const resp = await fetch(
      `${import.meta.env.VITE_API_URL}/songs?song=${song}`,
    );
    const data = await resp.json();
    audioRef.src = data.link;
    audioRef.load();
    setIsPlaying(true);
    audioRef.play();
    setTtl(data.ttl);
  } catch (e) {
    console.log("ERROR: fetchSongUrlAndLoad(): ", e);
  }
}

async function refreshSong(song, audioRef, setTtl, setSong) {
  const resp = await fetch(
    `${import.meta.env.VITE_API_URL}/songs?song=${song}`,
  );
  const data = await resp.json();
  const audio = audioRef;
  const wasPlaying = !audio.paused;
  const currentTime = audio.currentTime;
  audio.pause();
  audio.src = data.link;
  audio.currentTime = currentTime;
  audio.load();
  if (wasPlaying) {
    await audio.play();
  }
  setTtl(data.ttl);
  setSong(data.link);
}

export function BottomSoundControl() {
  const {
    needNewKey,
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
    setNeedNewKey,
  } = useAudio();
  const setSong = useStore((state) => state.setSong);
  const currentSong = useStore((state) => state.currentSong);
  const [ttl, setTtl] = useState(0);

  useEffect(() => {
    if (!audioRef) return;
    fetchSongUrlAndLoad(currentSong.song, audioRef, setIsPlaying, setTtl);
  }, [currentSong.song, audioRef, setIsPlaying, setTtl]);

  useEffect(() => {
    if (!ttl || !currentSong.song || !needNewKey || !isPlaying) return;
    const now = Date.now();
    const refreshBuffer = 30000;
    const timeUntilRefresh = ttl - now - refreshBuffer;
    if (timeUntilRefresh <= 0) {
      refreshSong(currentSong.song, audioRef, setTtl, setSong);
      return;
    }
    const timeoutId = setTimeout(() => {
      refreshSong(currentSong.song, audioRef, setTtl, setSong);
    }, timeUntilRefresh);
    return () => clearTimeout(timeoutId);
  }, [ttl, currentSong.song, needNewKey, isPlaying, audioRef, setSong]);

  return (
    <div className="z-20 w-full p-4 h-20 bg-white/70 flex items-center justify-between ">
      <SongImgInfoMemo
        src={currentSong.img}
        artist={currentSong.artist}
        songName={currentSong.title}
      />
      <PlayPauseControlsMemo
        setPlay={setPlay}
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        skip={setNeedNewKey}
      />
      <SoundWaveProgress
        setPlay={setPlay}
        duration={duration}
        progress={progress}
        setIsPlaying={setIsPlaying}
      />
      <SongControlsMemo
        setSoundLevel={setSoundLevel}
        shuffle={shuffle}
        setShuffle={setShuffle}
        repeat={repeat}
        setRepeat={setRepeat}
      />
    </div>
  );
}
