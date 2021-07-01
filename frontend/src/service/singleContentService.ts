import { singleContentStore } from "@/stores";
import {
  SINGLE_CONTENT_SUCCESS,
  SINGLE_CONTENT_FAIL,
} from "@/actions/singleContent";
import api from "@/api";

const singleContentService = {
  getContent: async ({ index }) => {
    try {
      const data = await api.getDetailContent(index);
      return singleContentStore.dispatch(SINGLE_CONTENT_SUCCESS(data));
    } catch (error) {
      return singleContentStore.dispatch(SINGLE_CONTENT_FAIL(error));
    }
  },
};

export default singleContentService;
