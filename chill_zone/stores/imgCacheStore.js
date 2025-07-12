import { create } from "zustand";

export function SignedUrl(title, ttl, url) {
  return { title, ttl, url };
}

export const useImgCacheStore = create((set, get) => ({
  songLinks: {},
  imgLinks: {},
  ongoingFetches: {}, // Track ongoing fetches
  addSong: (title, signedUrl) =>
    set((state) => ({
      songLinks: { ...state.songLinks, [title]: signedUrl },
    })),
  getSong: (title) => get().songLinks[title],
  addImg: (title, signedUrl) =>
    set((state) => ({
      imgLinks: { ...state.imgLinks, [title]: signedUrl },
    })),
  getImg: (title) => get().imgLinks[title],

  /**
  @param {string} title
  @param {boolean} inProgress
  */
  setFetchInProgress: (title, inProgress) =>
    set((state) => {
      if (!inProgress) {
        delete state.ongoingFetches[title];
        return { ongoingFetches: { ...state.ongoingFetches } };
      }
      return {
        ongoingFetches: { ...state.ongoingFetches, [title]: inProgress },
      };
    }),

  /**
  @param {string} title
  @returns {boolean}
  */
  isFetchInProgress: (title) => !!get().ongoingFetches[title],
}));
