import { memo, useState } from "react";
import { Shuffle, Repeat1, Volume1, Volume2, VolumeX } from "lucide-react";

function SongControls({
  setSoundLevel,
  repeat,
  setRepeat,
  shuffle,
  setShuffle,
}) {
  const [showVolume, setShowVolume] = useState(false);
  const [volume, setVolume] = useState(50);

  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX className="w-5 h-5" />;
    if (volume < 50) return <Volume1 className="w-5 h-5" />;
    return <Volume2 className="w-5 h-5" />;
  };

  return (
    <div className="h-20 flex gap-4 items-center overflow-x-auto">
      <button
        onClick={() => {
          if (repeat) {
            setRepeat(false);
          }
          setShuffle((s) => !s);
        }}
        className="relative flex flex-col justify-center items-center p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <Shuffle className={`w-5 h-5 ${shuffle && "text-purple-950"}`} />
        <div
          className={`${shuffle ? "opacity-100" : "opacity-0"} transition-all duration-350 absolute bg-purple-950 h-2 w-2 rounded-full top-full`}
        />
      </button>

      <button
        onClick={() => {
          if (shuffle) {
            setShuffle(false);
          }
          setRepeat((s) => !s);
        }}
        className="relative flex flex-col justify-center items-center p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <Repeat1 className={`w-5 h-5 ${repeat && "text-purple-950"}`} />
        <div
          className={`${repeat ? "opacity-100" : "opacity-0"} transition-all duration-350 absolute bg-purple-950 h-2 w-2 rounded-full top-full`}
        />
      </button>

      <div className="flex items-center">
        <button
          onClick={() => setShowVolume((s) => !s)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          {getVolumeIcon()}
        </button>

        <div
          className={` transition-all duration-300 ease-in-out ${
            showVolume ? "w-40 ml-2 opacity-100" : "w-0 ml-0 opacity-0"
          }`}
        >
          <div className="flex items-center gap-2 whitespace-nowrap">
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => {
                setVolume(Number(e.target.value));
                setSoundLevel(Number(e.target.value) / 100);
              }}
              className="accent-black"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export const SongControlsMemo = memo(SongControls);
