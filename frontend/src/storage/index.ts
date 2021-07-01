import { Storage } from "@/core";
import { IContents } from "@/types";

export const bookmarkStorage = new Storage<IContents>("bookmark");

export const isBookMarked = (idx: number) => {
  return bookmarkStorage.get().findIndex((data) => data.idx === idx) !== -1;
};
