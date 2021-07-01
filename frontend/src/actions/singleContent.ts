import { IContents } from "@/types";
import actions from ".";

export const SINGLE_CONTENT_REQUEST = (data) => {
  return { type: actions.GET_REQUEST, data };
};

export const SINGLE_CONTENT_SUCCESS = (data: IContents) => {
  return { type: actions.GET_SUCCESS, data };
};

export const SINGLE_CONTENT_FAIL = (error: string) => {
  return { type: actions.GET_FAIL, error };
};
