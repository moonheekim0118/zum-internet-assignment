import { IBest } from "@/types";
import actions from ".";

export const GET_BEST_REQUEST = () => {
  return { type: actions.GET_REQUEST };
};

export const GET_BEST_SUCCESS = (data: IBest[]) => {
  return { type: actions.GET_SUCCESS, data };
};

export const GET_BEST_FAIL = (error: string) => {
  return { type: actions.GET_FAIL, error };
};
