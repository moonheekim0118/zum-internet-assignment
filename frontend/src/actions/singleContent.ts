import { IContents } from "@/types";
import actions from ".";

export const GET_CONTENT_REQUEST = (data) => {
  return { type: actions.GET_REQUEST, data };
};

export const GET_CONTENT_SUCCESS = (data: IContents) => {
  return { type: actions.GET_SUCCESS, data };
};

export const GET_CONTENT_FAIL = (error: string) => {
  return { type: actions.GET_FAIL, error };
};
