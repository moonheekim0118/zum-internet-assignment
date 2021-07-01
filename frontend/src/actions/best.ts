import { IBest, IAction } from "@/types";
import actions from ".";

export const GET_BEST_REQUEST = (): IAction => {
  return { type: actions.GET_REQUEST };
};

export const GET_BEST_SUCCESS = (data: IBest[]): IAction<IBest[]> => {
  return { type: actions.GET_SUCCESS, data };
};

export const GET_BEST_FAIL = (error: string): IAction => {
  return { type: actions.GET_FAIL, error };
};
