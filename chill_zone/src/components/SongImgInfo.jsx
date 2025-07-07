import { memo } from "react";
import { LoadImg } from "./LoadImg";
function SongImgInfo({ src, artist, songName }) {
  console.log("SongImgInfo: " + src);
  return (
    <div className="flex">
      <LoadImg img={src} className="h-15 w-15 object-cover rounded-lg" />
      <div className="flex flex-col justify-end font-default pl-4 space-y-1">
        <p className="font-light text-xs">{artist}</p>
        <p className="font-sm">{songName}</p>
      </div>
    </div>
  );
}

export const SongImgInfoMemo = memo(SongImgInfo);
