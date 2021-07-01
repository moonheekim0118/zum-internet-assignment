import { IBest } from "@/types";
import actions from ".";

export const BEST_REQUEST = () => {
  return { type: actions.GET_REQUEST };
};

export const BEST_SUCCESS = (data: IBest[]) => {
  return { type: actions.GET_SUCCESS, data };
};

export const BEST_FAIL = (error: string) => {
  return { type: actions.GET_FAIL, error };
};
