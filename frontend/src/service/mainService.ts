import api from "@/api";
import {
  GET_HUBCONTENTS_SUCCESS,
  GET_HUBCONTENTS_FAIL,
} from "@/actions/hubContents";
import { GET_BEST_SUCCESS, GET_BEST_FAIL } from "@/actions/best";
import { hubContentsStore, bestStore } from "@/stores";

const mainService = {
  getContentsData: async (): Promise<void> => {
    try {
      const data = await api.getSummaryContents();
      hubContentsStore.dispatch(GET_HUBCONTENTS_SUCCESS(data));
    } catch (error) {
      hubContentsStore.dispatch(GET_HUBCONTENTS_FAIL(error));
    }
  },

  getBestData: async (): Promise<void> => {
    try {
      const data = await api.getBest();
      bestStore.dispatch(GET_BEST_SUCCESS(data));
    } catch (error) {
      bestStore.dispatch(GET_BEST_FAIL(error));
    }
  },
};

export default mainService;
