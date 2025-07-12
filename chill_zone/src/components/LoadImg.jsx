import { useEffect, useState } from "react";
import { useImgCacheStore, SignedUrl } from "../../stores/imgCacheStore";

async function fetchImg(img, setSRC, store) {
  const { setFetchInProgress, isFetchInProgress, getImg, addImg } = store;
  // img url already cached
  if (getImg(img) && getImg(img).ttl > Date.now()) {
    setSRC(getImg(img).url);
    return;
  }
  // curently being fetched - handle polling
  if (isFetchInProgress(img)) {
    const srcPole = setInterval(() => {
      if (getImg(img)) {
        setSRC(getImg(img).url);
        clearInterval(srcPole);
      }
    }, 15);
    return;
  }
  setFetchInProgress(img, true);
  const resp = await fetch(`${import.meta.env.VITE_API_URL}/img?song=${img}`);
  const { ttl, link } = await resp.json();
  addImg(img, SignedUrl(img, ttl, link));
  setFetchInProgress(img, false);
  setSRC(link);
}

export function LoadImg({ img, className, onClick }) {
  const [src, setSRC] = useState(undefined);
  const store = useImgCacheStore();
  useEffect(() => {
    fetchImg(img, setSRC, store);
  }, [img, store]);

  return (
    <img
      draggable={false}
      onClick={onClick}
      src={src}
      alt={img}
      className={className}
    />
  );
}
