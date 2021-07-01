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
  getData: () => {
    try {
      const data = bookmarkStorage.getAll();
      bookmarkStore.dispatch(BOOKMARK_SUCCESS(data));
    } catch (error) {
      bookmarkStore.dispatch(BOOKMARK_FAIL(error));
    }
  },
  hasBookmark: (index: string) => {},
  addBookmark: (data) => {
    try {
      bookmarkStorage.add(data);
      bookmarkStore.dispatch(BOOKMARK_ADD_SUCCESS(data));
    } catch (error) {
      bookmarkStore.dispatch(BOOKMARK_ADD_FAIL(error));
    }
  },

  removeBookmark: (index) => {
    try {
      bookmarkStorage.remove(index);
      bookmarkStore.dispatch(BOOKMARK_REMOVE_SUCCESS(index));
    } catch (error) {
      bookmarkStore.dispatch(BOOKMARK_REMOVE_FAIL(error));
    }
  },
};

export default bookmarkService;
