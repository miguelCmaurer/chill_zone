import { useEffect, useState } from "react";

async function fetchImgFromServer(img, setSRC) {
  const resp = await fetch(`http://localhost:8080/img?song=${img}`);
  const data = await resp.json();
  setSRC(data.link);
}

export function LoadImg({ img, className, onClick }) {
  const [src, setSRC] = useState(undefined);
  useEffect(() => {
    fetchImgFromServer(img, setSRC);
  }, [img]);

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
