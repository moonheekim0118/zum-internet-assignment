import api from "@/api";
import { HUBCONTENTS_SUCCESS, HUBCONTENTS_FAIL } from "@/actions/hubContents";
import { BEST_SUCCESS, BEST_FAIL } from "@/actions/best";
import { hubContentsStore, bestStore } from "@/stores";
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
      return hubContentsStore.dispatch(HUBCONTENTS_SUCCESS(data));
    } catch (error) {
      return hubContentsStore.dispatch(HUBCONTENTS_FAIL(error));
    }
  },

  getBestData: async () => {
    try {
      let data;
      if (serverCache.has("/best")) {
        data = serverCache.get("/best");
      } else {
        data = await api.getBest();
        serverCache.set("/best", data);
      }
      return bestStore.dispatch(BEST_SUCCESS(data));
    } catch (error) {
      return bestStore.dispatch(BEST_FAIL(error));
    }
  },
};

export default mainService;
