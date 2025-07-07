import { create } from "zustand";

export const useStore = create((set) => ({
  hasSong: false,
  currentSong: {
    title: "",
    artist: "",
    img: "",
    song: "",
  },
  setSong: (newSong) =>
    set(() => ({
      currentSong: newSong,
      hasSong: true,
    })),
  setHasSong: (hasSong) =>
    set(() => ({
      hasSong,
    })),
}));
