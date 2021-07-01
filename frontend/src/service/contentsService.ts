import { contentsStore } from "@/stores";
import { GET_CONTENTS_SUCCESS, GET_CONTENTS_FAIL } from "@/actions/contents";
import { Category } from "@/types";
import api from "@/api";

const contentsService = {
  getContents: async (category: Category, lastKey: number): Promise<void> => {
    try {
      const data = await api.getInfiniteContents(category, lastKey);
      contentsStore.dispatch(GET_CONTENTS_SUCCESS(data));
    } catch (error) {
      contentsStore.dispatch(GET_CONTENTS_FAIL(error));
    }
  },
};

export default contentsService;
