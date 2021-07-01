import { bookmarkStorage } from "@/storage";
import { bookmarkStore } from "@/stores";
import {
  GET_BOOKMARK_SUCCESS,
  GET_BOOKMARK_FAIL,
  ADD_BOOKMARK_SUCCESS,
  ADD_BOOKMARK_FAIL,
  REMOVE_BOOKMARK_SUCCESS,
  REMOVE_BOOKMARK_FAIL,
} from "@/actions/bookmark";
import { IContents } from "@/types";

const bookmarkService = {
  getBookmark: (): void => {
    try {
      const data = bookmarkStorage.get();
      bookmarkStore.dispatch(GET_BOOKMARK_SUCCESS(data));
    } catch (error) {
      bookmarkStore.dispatch(GET_BOOKMARK_FAIL(error));
    }
  },
  addBookmark: (data: IContents): void => {
    try {
      const updatedData = [data, ...bookmarkStorage.get()];
      bookmarkStorage.set(updatedData);
      bookmarkStore.dispatch(ADD_BOOKMARK_SUCCESS(updatedData));
    } catch (error) {
      bookmarkStore.dispatch(ADD_BOOKMARK_FAIL(error));
    }
  },

  removeBookmark: (index: string): void => {
    try {
      const updatedData = bookmarkStorage
        .get()
        .filter((data) => data.idx !== +index);
      bookmarkStorage.set(updatedData);
      bookmarkStore.dispatch(REMOVE_BOOKMARK_SUCCESS(updatedData));
    } catch (error) {
      bookmarkStore.dispatch(REMOVE_BOOKMARK_FAIL(error));
    }
  },
};

export default bookmarkService;
