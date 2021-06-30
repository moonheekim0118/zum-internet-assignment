import { contentsStore } from "@/stores";
import { Category } from "@/pages";
import { CONTENTS_SUCCESS, CONTENTS_FAIL } from "@/actions/contents";
import api from "@/api";
import serverCache from "@/api/serverCache";

const contentsService = {
  getData: async (category, lastKey) => {
    try {
      const data = await api.getInfiniteContents(category, lastKey);
      return contentsStore.dispatch(CONTENTS_SUCCESS(data));
    } catch (error) {
      return contentsStore.dispatch(CONTENTS_FAIL(error));
    }
  },
};

export default contentsService;
