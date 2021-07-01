import { Storage } from "@/core";
import { bookmarkStore } from "@/stores";
import { IContents } from "@/types";

export const bookmarkStorage = new Storage("bookmark");

export const isBookMarked = (idx: number) => {
  return bookmarkStorage.has(idx);
};
