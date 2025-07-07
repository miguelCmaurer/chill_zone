import { SkipBack, SkipForward, Pause, Play } from "lucide-react";
import { useState, memo } from "react";

function PlayPauseControls({ isPlaying, setIsPlaying, setPlay, skip }) {
  const [lastClick, setLastClick] = useState(null);

  function skipOrBack() {
    console.log(lastClick - Date.now());
    if (lastClick + 800 < Date.now()) {
      setPlay(0);
    } else {
      setPlay(0.5);
    }
    setLastClick(Date.now());
  }

  return (
    <div className="flex space-x-7 items-center">
      <SkipBack onClick={skipOrBack} />
      <div
        className="bg-black p-3 rounded-full"
        onClick={() => setIsPlaying((s) => !s)}
      >
        {isPlaying ? <Pause stroke="white" /> : <Play stroke="white" />}
      </div>
      <SkipForward
        onClick={() => {
          skip(true);
        }}
      />
    </div>
  );
}

export const PlayPauseControlsMemo = memo(PlayPauseControls);
