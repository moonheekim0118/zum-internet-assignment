import { IHubContents } from "@/types";

export enum actions {
  GET_REQUEST = "GET_REQUEST",
  GET_SUCCESS = "GET_SUCCESS",
  GET_FAIL = "GET_FAIL",
}

export const HUBCONTENTS_REQUEST = () => {
  return { type: actions.GET_REQUEST };
};

export const HUBCONTENTS_SUCCESS = (data: IHubContents) => {
  return { type: actions.GET_SUCCESS, data };
};

export const HUBCONTENTS_FAIL = (error: string) => {
  return { type: actions.GET_FAIL, error };
};