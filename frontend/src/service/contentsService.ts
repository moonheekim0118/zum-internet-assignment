import { contentsStore } from "@/stores";
import { Category } from "@/pages";
import { CONTENTS_SUCCESS, CONTENTS_FAIL } from "@/actions/contents";
import api from "@/api";
import serverCache from "@/api/serverCache";

const contentsService = {
  getData: async (category, lastKey) => {
    try {
      let data;
      if (serverCache.has(`/contents/${category}`)) {
        data = serverCache.get(`/contents/${category}`);
      } else {
        data = await api.getInfiniteContents(category, lastKey);
        serverCache.set(`/contents/${category}`, data);
      }
      return contentsStore.dispatch(CONTENTS_SUCCESS(data));
    } catch (error) {
      return contentsStore.dispatch(CONTENTS_FAIL(error));
    }
  },
};

export default contentsService;
