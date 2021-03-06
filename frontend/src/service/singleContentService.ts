import { singleContentStore } from "@/stores";
import { GET_CONTENT_SUCCESS, GET_CONTENT_FAIL } from "@/actions/singleContent";
import api from "@/api";

const singleContentService = {
  getContent: async ({ index }): Promise<void> => {
    try {
      const data = await api.getDetailContent(index);
      singleContentStore.dispatch(GET_CONTENT_SUCCESS(data));
    } catch (error) {
      singleContentStore.dispatch(GET_CONTENT_FAIL(error));
    }
  },
};

export default singleContentService;
