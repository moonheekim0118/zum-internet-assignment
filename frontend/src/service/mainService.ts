import api from "@/api";
import { CONTENTS_SUCCESS, CONTENTS_FAIL } from "@/actions/contents";
import { contentsStore } from "@/stores";
import serverCache from "@/api/serverCache";

const mainService = {
  getContentsData: async () => {
    try {
      let data;
      if (serverCache.has("/content")) {
        data = serverCache.get("/content");
      } else {
        data = await api.getSummaryContents();
        serverCache.set("/content", data);
      }
      return contentsStore.dispatch(CONTENTS_SUCCESS(data));
    } catch (error) {
      return contentsStore.dispatch(CONTENTS_FAIL(error));
    }
  },
};

export default mainService;
