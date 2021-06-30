import { IContents } from "@/types";
export enum actions {
  GET_REQUEST = "GET_REQUEST",
  GET_SUCCESS = "GET_SUCCESS",
  GET_FAIL = "GET_FAIL",
}

export const SINGLE_CONTENT_REQUEST = (data) => {
  return { type: actions.GET_REQUEST, data };
};

export const SINGLE_CONTENT_SUCCESS = (data: IContents) => {
  return { type: actions.GET_SUCCESS, data };
};

export const SINGLE_CONTENT_FAIL = (error: string) => {
  return { type: actions.GET_FAIL, error };
};
