import { bookmarkStorage } from "@/storage";
import { bookmarkStore } from "@/stores";
import {
  BOOKMARK_SUCCESS,
  BOOKMARK_FAIL,
  BOOKMARK_ADD_SUCCESS,
  BOOKMARK_ADD_FAIL,
  BOOKMARK_REMOVE_SUCCESS,
  BOOKMARK_REMOVE_FAIL,
} from "@/actions/bookmark";

const bookmarkService = {
  getBookmark: () => {
    try {
      const data = bookmarkStorage.get();
      bookmarkStore.dispatch(BOOKMARK_SUCCESS(data));
    } catch (error) {
      bookmarkStore.dispatch(BOOKMARK_FAIL(error));
    }
  },
  addBookmark: (data) => {
    try {
      const updatedData = [data, ...bookmarkStorage.get()];
      bookmarkStorage.set(updatedData);
      bookmarkStore.dispatch(BOOKMARK_ADD_SUCCESS(updatedData));
    } catch (error) {
      bookmarkStore.dispatch(BOOKMARK_ADD_FAIL(error));
    }
  },

  removeBookmark: (index) => {
    try {
      const updatedData = bookmarkStorage
        .get()
        .filter((data) => data.idx !== index);
      bookmarkStorage.set(updatedData);
      bookmarkStore.dispatch(BOOKMARK_REMOVE_SUCCESS(updatedData));
    } catch (error) {
      bookmarkStore.dispatch(BOOKMARK_REMOVE_FAIL(error));
    }
  },
};

export default bookmarkService;
