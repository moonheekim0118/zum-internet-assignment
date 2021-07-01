import { contentsStore } from "@/stores";
import { GET_CONTENTS_SUCCESS, GET_CONTENTS_FAIL } from "@/actions/contents";
import api from "@/api";

const contentsService = {
  getContents: async (category, lastKey) => {
    try {
      const data = await api.getInfiniteContents(category, lastKey);
      return contentsStore.dispatch(GET_CONTENTS_SUCCESS(data));
    } catch (error) {
      return contentsStore.dispatch(GET_CONTENTS_FAIL(error));
    }
  },
};

export default contentsService;
